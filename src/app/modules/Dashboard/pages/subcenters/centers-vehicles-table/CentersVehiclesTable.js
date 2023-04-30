import React, { useCallback, useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import { ActionsColumnFormatter } from "./column-formatter/ActionsColumnFormatter";
import { CreatedColumnFormatter } from "./column-formatter/CreatedColumnFormatter";
import * as uiHelpers from "../CentersUIHelpers";
import { useCentersUIContext } from "../CentersUIContext";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { Spinner, Button, ButtonToolbar } from "react-bootstrap";
import { CenterVehiclesFilter } from "./center-vehicle-filter/CenterVehiclesFilter";
import { DatetimeColumnFormatter } from "./column-formatter/CreatedColumnFormatter";
import { updateTripLog } from "../../../_redux/dashboardActions";

export function CentersVehiclesTable({ vehiclesForCenter, totalCount }) {
  const [isFetching, setIsFetching] = useState(true);
  const centersUIContext = useCentersUIContext();
  const dispatch = useDispatch();

  const centersUIProps = useMemo(() => {
    return {
      openEditCenterDialog: centersUIContext.openEditCenterDialog,
      openDeleteCenterDialog: centersUIContext.openDeleteCenterDialog,
      openReadCenterDialog: centersUIContext.openReadCenterDialog,
      queryParms: centersUIContext.secondQueryParams,
      setQueryParams: centersUIContext.setSecondQueryParams,
    };
  }, [centersUIContext]);

  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "Id",
    },
    // {
    //   dataField: "driver.firstName",
    //   text: "Driver Name",
    //   editable: false,
    // },
    // {
    //   dataField: "driver.phNo",
    //   text: "Ph#",
    //   editable: false,
    // },
    // {
    //   dataField: "vehicle.regNo",
    //   text: "Reg No",
    //   editable: false,
    // },
    {
      dataField: "initialReading",
      text: "Initial Reading",
      editable: false,
    },
    {
      dataField: "finalReading",
      text: "Final Reading",
      editable: false,
    },
    {
      dataField: "logBookNo",
      text: "Log Book No",
      editable: false,
    },
    {
      dataField: "sourcecenter.name",
      text: "Center Name",
      editable: false,
      editable: false,
    },
    {
      dataField: "price",
      text: "Price",
      editor: {
        type: "text",
        onBlur: (oldValue, newValue, row, column) => {
          console.log("new value", newValue);
          //dispatch(updateData(row.id, column.dataField, newValue));
        },
      },
    },
    {
      dataField: "status",
      text: "status",
      editable: false,
    },
    {
      dataField: "startDateTime",
      text: "Start Time",
      editable: false,
      formatter: DatetimeColumnFormatter,
    },
    {
      dataField: "endDateTime",
      text: "End Time",
      editable: false,
      formatter: DatetimeColumnFormatter,
    },
  ];

  const dumyData = [
    {
      id: 42,
      startDateTime: "2023-04-28T08:02:04.591Z",
      endDateTime: "2023-04-28T14:20:11.271Z",
      initialReading: 20,
      finalReading: 25,
      kiloMeters: 5,
      price: 220,
      logBookNo: 58,
      status: "Close",
      dateTime: "2023-04-28T08:02:04.591Z",
      isActive: true,
      createdBy: 3,
      updatedBy: 3,
      createdAt: "2023-04-28T08:02:05.253Z",
      updatedAt: "2023-04-28T14:20:11.279Z",
      alarmTimeId: 2,
      sourceCenterId: 3,
      sourceSubCenterId: 6,
      destinationCenterId: 3,
      destinationSubCenterId: 6,
      vehicleId: 28,
      incidentId: 217,
      driverId: 9,
      sourcecenter: {
        name: "Shalamar Zone",
      },
      vehicle: {
        regNo: "ksd-549625",
      },
      driver: {
        firstName: "Abdul",
        lastName: "Salam",
        phNo: "03345678900",
      },
    },
    {
      id: 41,
      startDateTime: "2023-04-28T08:01:03.589Z",
      endDateTime: "2023-04-28T12:09:43.406Z",
      initialReading: 15,
      finalReading: 20,
      kiloMeters: 5,
      price: 100,
      logBookNo: 56,
      status: "Close",
      dateTime: "2023-04-28T08:01:03.589Z",
      isActive: true,
      createdBy: 3,
      updatedBy: 3,
      createdAt: "2023-04-28T08:01:04.276Z",
      updatedAt: "2023-04-28T12:09:43.414Z",
      alarmTimeId: 2,
      sourceCenterId: 3,
      sourceSubCenterId: 6,
      destinationCenterId: 3,
      destinationSubCenterId: 6,
      vehicleId: 28,
      incidentId: 216,
      driverId: 9,
      sourcecenter: {
        name: "Shalamar Zone",
      },
      vehicle: {
        regNo: "ksd-549625",
      },
      driver: {
        firstName: "Abdul",
        lastName: "Salam",
        phNo: "03345678900",
      },
    },
    {
      id: 40,
      startDateTime: "2023-04-28T07:58:50.687Z",
      endDateTime: "2023-04-28T07:59:31.816Z",
      initialReading: 10,
      finalReading: 15,
      kiloMeters: 5,
      price: 100,
      logBookNo: 55,
      status: "Close",
      dateTime: "2023-04-28T07:58:50.687Z",
      isActive: true,
      createdBy: 3,
      updatedBy: 3,
      createdAt: "2023-04-28T07:58:51.341Z",
      updatedAt: "2023-04-28T07:59:31.818Z",
      alarmTimeId: 2,
      sourceCenterId: 3,
      sourceSubCenterId: 6,
      destinationCenterId: 3,
      destinationSubCenterId: 6,
      vehicleId: 28,
      incidentId: 215,
      driverId: 9,
      sourcecenter: {
        name: "Shalamar Zone",
      },
      vehicle: {
        regNo: "ksd-549625",
      },
      driver: {
        firstName: "Abdul",
        lastName: "Salam",
        phNo: "03345678900",
      },
    },
    {
      id: 36,
      startDateTime: "2023-04-28T07:44:10.856Z",
      endDateTime: "2023-04-28T07:45:38.339Z",
      initialReading: 5,
      finalReading: 10,
      kiloMeters: 5,
      price: 100,
      logBookNo: 51,
      status: "Close",
      dateTime: "2023-04-28T07:44:10.856Z",
      isActive: true,
      createdBy: 3,
      updatedBy: 3,
      createdAt: "2023-04-28T07:44:11.509Z",
      updatedAt: "2023-04-28T07:45:38.342Z",
      alarmTimeId: 2,
      sourceCenterId: 3,
      sourceSubCenterId: 6,
      destinationCenterId: 3,
      destinationSubCenterId: 6,
      vehicleId: 28,
      incidentId: 211,
      driverId: 9,
      sourcecenter: {
        name: "Shalamar Zone",
      },
      vehicle: {
        regNo: "ksd-549625",
      },
      driver: {
        firstName: "Abdul",
        lastName: "Salam",
        phNo: "03345678900",
      },
    },
  ];

  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount === undefined ? 0 : totalCount,
    sizePerPageList: uiHelpers.sizePerPage,
    sizePerPage: centersUIProps.queryParms.pageSize,
    page: centersUIProps.queryParms.pageNumber,
  };

  return (
    <>
      <CenterVehiclesFilter />
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              // isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden table-hover"
                bootstrap4
                remote
                keyField="id"
                //data={vehiclesForCenter === undefined ? [] : vehiclesForCenter}
                data={dumyData}
                columns={columns}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                  // onStartEdit: (row, column, rowIndex, columnIndex) => {
                  //   console.log("start to edit!!!");
                  // },
                  // beforeSaveCell: (oldValue, newValue, row, column) => {
                  //   const updatedObj = {};
                  //   const {
                  //     id,
                  //     destinationSubCenterId,
                  //     status,
                  //     logBookNo,
                  //   } = row;
                  //   const { dataField } = column;
                  //   updatedObj.id = id;
                  //   updatedObj.subCenterId = destinationSubCenterId;
                  //   updatedObj.status = status;
                  //   updatedObj.logBookNo = +logBookNo;
                  //   updatedObj[dataField] = +newValue;

                  //   // console.log("updatedObj", updatedObj);

                  //   // console.log("row", row);
                  //   // console.log("column", column);
                  //   // console.log("newValue", newValue);

                  //   //dispatch(updateTripLog(updatedObj));
                  // },
                  // afterSaveCell: (oldValue, newValue, row, column) => {
                  //   console.log("After Saving Cell!!");
                  // },
                })}
                // defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  centersUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={vehiclesForCenter} />
                <NoRecordsFoundMessage entities={vehiclesForCenter} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
