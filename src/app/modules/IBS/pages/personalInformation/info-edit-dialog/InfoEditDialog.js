import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { InfoEditForm } from "./InfoEditForm";
import { InfoEditDialogHeader } from "./InfoEditDialogHeader";
import { useInfoUIContext } from "../PersonalUIContext";
import * as actions from "../../../_redux/info-personal/infoActions";
import { fetchAllCity } from "../../../../../../_metronic/redux/dashboardActions";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));

export function InfoEditDialog({ id, show, isNew, onHide, userForRead }) {
  const [isForEdit, setIsForEdit] = useState();
  const infoUIContext = useInfoUIContext();
  const infoUIProps = useMemo(() => {
    return {
      initInfo: infoUIContext.initInfo,
      queryParams: infoUIContext.queryParams,
      secondQueryParams: infoUIContext.secondQueryParams,
    };
  }, [infoUIContext]);

  const dispatch = useDispatch();
  const {
    centerForEdit,
    actionLoading,
    roles,
    centers,
    isuserForRead,
    vehiclesForCenter,
    totalCount,
  } = useSelector(
    (state) => ({
      centerForEdit: state.centers.centerForEdit,
      actionLoading: state.centers.actionsLoading,
      roles: state.users.roles,
      centers: state.users.centers,
      isuserForRead: state.users.userForRead,
      vehiclesForCenter: state.centers.vehiclesForCenter?.rows,
      totalCount: state.centers.vehiclesForCenter?.totalResults,
    }),
    shallowEqual
  );

  const { infoForEdit } = useSelector((state) => ({
    infoForEdit: state.personalInformation.infoForEdit,
  }));

  useEffect(() => {
    if (id) {
      //dispatch(actions.fetchCenter(id));
      dispatch(
        actions.fetchVehicles({
          ...infoUIProps.secondQueryParams,
          centerId: id,
        })
      );
    }
  }, [id, infoUIProps.secondQueryParams]);

  const saveInfo = (info) => {
    console.log("Updateed Info", info);
    if (!id) {
      dispatch(actions.createInfo(info)).then((res) => {
        onHide();
      });
    } else {
      dispatch(actions.updateInfo(info)).then((res) => {
        onHide();
      });
    }
  };

  return (
    <Modal
      size="xl"
      dialogClassName="modal-90w"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <InfoEditDialogHeader id={id} isUserForRead={userForRead} />
      <InfoEditForm
        saveInfo={saveInfo}
        initialInfo={id ? infoForEdit : infoUIProps.initInfo}
        onHide={onHide}
        roles={roles}
        centers={centers}
        isUserForRead={userForRead}
        vehiclesForCenter={vehiclesForCenter}
        totalCount={totalCount}
      />
    </Modal>
  );
}
