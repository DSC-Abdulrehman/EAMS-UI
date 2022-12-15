import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
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
import * as actions from "../../../_redux/centersActions";
import { useCentersUIContext } from "../CentersUIContext";
import { Pagination } from "../../../../../../_metronic/_partials/controls";

export function CentersTable() {
  //Users UI Context
  const centersUIContext = useCentersUIContext();

  const centersUIProps = useMemo(() => {
    return {
      openEditCenterDialog: centersUIContext.openEditCenterDialog,
      openDeleteCenterDialog: centersUIContext.openDeleteCenterDialog,
      openReadCenterDialog: centersUIContext.openReadCenterDialog,
      queryParms: centersUIContext.queryParams,
      setQueryParams: centersUIContext.setQueryParams,
    };
  }, [centersUIContext]);

  const { currentStatecenters, userAccess } = useSelector(
    (state) => ({
      currentStatecenters: state.centers,
      userAccess: state?.auth?.userAccess?.Users,
      //userAccess: state.auth.userAccess.Users,
    }),
    shallowEqual
  );
  // Centers Redux state
  const dispatch = useDispatch();

  useEffect(() => {
    //console.log("Fetch Centers")
    dispatch(actions.fetchCenters(centersUIProps.queryParms));
  }, [centersUIProps.queryParms, dispatch]);

  const isAccessForEdit = userAccess.find(
    (item) => item.componentName === "UpdateUser"
  );

  const isAccessForDelete = userAccess.find(
    (item) => item.componentName === "DeleteUser"
  );

  const { totalCount, entities, listLoading } = currentStatecenters;
  // console.log("currentStatecenters", currentStatecenters)

  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
     
    },
    {
      dataField: "name",
      text: "Center Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "location",
      text: "Location",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "phoneNo",
      text: "Phone",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== "object") {
          dateObj = new Date(cell);
        }
        return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
          "0" +
          (dateObj.getUTCMonth() + 1)
        ).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
      style: {
        minWidth: "130px",
      },
    },
    // {
    //   dataField: "phNo",
    //   text: "Phone",
    //   sort: false,
    //   sortCaret: sortCaret,
    // },
    // {
    //   dataField: "role.name",
    //   text: "Role",
    //   sort: false,
    //   sortCaret: sortCaret,
    // },
    // {
    //   dataField: "center.name",
    //   text: "Center",
    //   sort: false,
    //   sortCaret: sortCaret,
    // },
    {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditCenterDialog: centersUIProps.openEditCenterDialog,
        openDeleteCenterDialog: centersUIProps.openDeleteCenterDialog,
        openReadCenterDialog: centersUIProps.openReadCenterDialog,
        isAccessForEdit: isAccessForEdit ? isAccessForEdit.isAccess : false,
        isAccessForDelete: isAccessForDelete
          ? isAccessForDelete.isAccess
          : false,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "170px",
      },
    },
  ];

  //Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: centersUIProps.queryParms.pageSize,
    page: centersUIProps.queryParms.pageNumber,
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                bordered={false}
                classes="table table-head-custom table-vertical-center overflow-hidden table-hover"
                bootstrap4
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                // defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  centersUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
      {/* <BootstrapTable
        wrapperClasses="table-responsive"
        bordered={false}
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        remote
        keyField="id"
        data={entities === null ? [] : entities}
        columns={columns}
      ></BootstrapTable> */}
    </>
  );
}
