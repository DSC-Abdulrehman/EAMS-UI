/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import objectPath from "object-path";
import { Dropdown } from "react-bootstrap";
import {
  DropdownCustomToggler,
  DropdownMenu4,
  DropdownMenu3,
} from "../../dropdowns";
import { useHtmlClassService } from "../../../layout";
import Button from "@material-ui/core/Button";
import { IncidentsEditDialog } from "../../../../app/modules/IncidentDetails/pages/incidents/incident-edit-dialog/IncidentEditDialog";
import Modal from "react-bootstrap/Modal";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import {
  updateVehicelStatus,
  fetchDashboardVehicles,
} from "../../../redux/dashboardActions";
import { useDispatch } from "react-redux";

export function TilesWidget1({
  className,
  chartColor = "danger",
  heading,
  buttonHeading,
  NoofVehicle,
  vehiclesData,
  handleClickOpen,
  setVehicle,
  vehicle,
  seletedCity,
  selectionType,
}) {
  //console.log("seletedCity", seletedCity);
  const dispatch = useDispatch();
  const [selectedVehile, setSelectedVehicle] = useState([]);
  const [diable, setDisable] = useState(true);
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseColor: objectPath.get(
        uiService.config,
        `js.colors.theme.base.${chartColor}`
      ),
      colorsThemeLightColor: objectPath.get(
        uiService.config,
        `js.colors.theme.light.${chartColor}`
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
    };
  }, [uiService, chartColor]);

  const statusFormater = (cell, row) => (
    <span className={row.status === true ? "text-success" : "text-warning"}>
      {row.name}
    </span>
  );

  const actionFormater = (cell, row) => {
    const standToOff = () => {
      //console.log("city", seletedCity);
      const body = {
        id: row.vehicleid,
        available: false,
        offDuty: true,
      };
      dispatch(updateVehicelStatus(body)).then(() => {
        dispatch(fetchDashboardVehicles({ cityId: seletedCity.value }));
      });
    };

    const offToStand = () => {
      const body = {
        id: row.vehicleid,
        available: true,
        offDuty: false,
      };

      // dispatch(updateVehicelStatus(body)).then(() => {
      //   // console.log("seletedCity", seletedCity);
      //   //dispatch(fetchDashboardVehicles({ cityId: 0 }));
      // });
      dispatch(updateVehicelStatus(body)).then(() => {
        dispatch(fetchDashboardVehicles({ cityId: seletedCity.value }));
      });
    };

    return (
      <>
        <Dropdown className="dropdown-inline" alignRight>
          <Dropdown.Toggle
            className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
            variant="transparent"
            id="dropdown-toggle-top"
            as={DropdownCustomToggler}
          >
            <i className="ki ki-bold-more-hor" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
            <ul className="navi navi-hover py-5">
              {heading === "Stand By" ? (
                <>
                  <li className="navi-item" onClick={() => standToOff()}>
                    <a href="#" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-list-3"></i>
                      </span>
                      <span className="navi-text">Off Duty</span>
                    </a>
                  </li>
                  <li className="navi-item">
                    <a href="#" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-rocket-1"></i>
                      </span>
                      <span className="navi-text">Update</span>
                    </a>
                  </li>
                  <li className="navi-item">
                    <a href="#" className="navi-link">
                      <span className="navi-icon">
                        <i className="flaticon2-bell-2"></i>
                      </span>
                      <span className="navi-text">Last 20 Trips</span>
                    </a>
                  </li>
                </>
              ) : (
                <li className="navi-item" onClick={() => offToStand()}>
                  <a href="#" className="navi-link">
                    <span className="navi-icon">
                      <i className="flaticon2-list-3"></i>
                    </span>
                    <span className="navi-text">Stand By</span>
                  </a>
                </li>
              )}

              {/* <li className="navi-item">
                <a href="#" className="navi-link">
                  <span className="navi-icon">
                    <i className="flaticon2-drop"></i>
                  </span>
                  <span className="navi-text">Out</span>
                </a>
              </li> */}
            </ul>
            {/* {heading === "Stand By" ? (
              <>
                <DropdownMenu4 column={row} seletedCity={seletedCity} />
              </>
            ) : (
              <>
                <DropdownMenu3 column={row} />
              </>
            )} */}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  // useEffect(() => {
  //   dispatch(fetchDashboardVehicles({ cityId: seletedCity.value }));
  // }, [dispatch, seletedCity]);

  const columns = [
    {
      dataField: "name",
      text: "Vehicle Name",
      align: "center",
      headerAlign: "center",
      headerAttrs: {
        hidden: true,
      },
      style: { verticalAlign: "middle" },
    },

    {
      dataField: "regNo",
      text: "Registration No",
      align: "center",
      //formatter: (cell, row) => types[cell],
      //headerTitle: false,
      headerAttrs: {
        hidden: true,
      },
      style: { verticalAlign: "middle" },
      // formatter: statusFormater,
    },
    // {
    //   dataField: "center",
    //   text: "Center",
    //   align: "center",
    //   headerAttrs: {
    //     hidden: true,
    //   },

    //   // filter: textFilter(), // apply text filter
    // },
    {
      dataField: "",
      text: "Action",
      headerAlign: "center",
      headerAttrs: {
        hidden: true,
      },
      formatter: actionFormater,
      style: { verticalAlign: "middle" },
    },
  ];

  const selectRow = {
    mode: selectionType,
    style: { backgroundColor: "#c8e6c9" },
    selectColumnStyle: {
      textAlign: "center",
      verticalAlign: "middle",
    },
    classes: "custom-class",
    align: "center",
    hideSelectAll: true,
    // style: { verticalAlign: "middle" },
    //clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        let vehicleId;
        // console.log("row", row);
        if (row.status === "Available") {
          vehicleId = row.vehicleid;
          setVehicle((item) => [...item, vehicleId]);
        } else {
          vehicleId = row.tripLogId;
          setVehicle(row.tripLogId);
        }
      } else if (!isSelect) {
        const index = vehicle && vehicle.indexOf(row.vehicleid);
        if (index > -1) {
          vehicle.splice(index, 1);
          setVehicle(vehicle);
        }
      }
    },
  };

  const emptyDataMessage = () => {
    return <h6 className="text-center mt-2">No Data to Display</h6>;
  };

  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0">
          <div className="card-title">
            <div className="card-label">
              <div className="font-weight-bolder">{heading}</div>
              <div className="font-size-sm text-muted mt-2">{NoofVehicle}</div>
            </div>
          </div>
          <div className="card-toolbar">
            {buttonHeading && (
              <button
                className="btn btn-dark"
                //disabled={diable}
                onClick={handleClickOpen}
                //onClick={handleShow}
              >
                {buttonHeading}
              </button>
            )}
          </div>
        </div>

        <div className="">
          <BootstrapTable
            keyField="vehicleid"
            data={vehiclesData || []}
            columns={columns}
            selectRow={selectRow}
            condensed
            bordered={false}
            noDataIndication={emptyDataMessage}
          />
        </div>
      </div>
    </>
  );
}
