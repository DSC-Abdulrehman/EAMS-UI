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
import { DatetimeColumnFormatter } from "./column-formatter/CreatedColumnFormatter";
import * as uiHelpers from "../PersonalUIHelpers";
import * as actions from "../../../_redux/info-personal/infoActions";
import { useInfoUIContext } from "../PersonalUIContext";
import { Pagination } from "../../../../../../_metronic/_partials/controls";

export function InfoTable() {
  //Users UI Context
  const centersUIContext = useInfoUIContext();
  //  console.log("centersUIContext in center", centersUIContext);
  const centersUIProps = useMemo(() => {
    return {
      openEditDialog: centersUIContext.openEditDialog,
      openDeleteDialog: centersUIContext.openDeleteDialog,
      openActiveDialog: centersUIContext.openActiveDialog,
      openReadDialog: centersUIContext.openReadDialog,
      queryParms: centersUIContext.queryParams,
      setQueryParams: centersUIContext.setQueryParams,
    };
  }, [centersUIContext]);

  const { currentStatecenters, userAccess } = useSelector(
    (state) => ({
      currentStatecenters: state.personalInformation,
      userAccess: state?.auth?.userAccess?.Centers,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const { totalCount, entities, listLoading } = currentStatecenters;

  useEffect(() => {
    async function fetchData() {
      await dispatch(actions.fetchIbs(centersUIProps.queryParms));
    }
    fetchData();
  }, [centersUIProps.queryParms, dispatch, totalCount]);

  const isAccessForEdit = userAccess.find(
    (item) => item.componentName === "UpdateCenter"
  );

  const isAccessForDelete = userAccess.find(
    (item) => item.componentName === "DeleteCenter"
  );

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
      dataField: "city.name",
      text: "City",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "district.name",
      text: "District",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "area.name",
      text: "Area",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    {
      dataField: "incidentType.name",
      text: "Incident",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "patientName",
      text: "Name",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
      },
    },
    {
      dataField: "status.name",
      text: "Status",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      style: {
        minWidth: "130px",
        maxWidth: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: false,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: DatetimeColumnFormatter,
      style: {
        minWidth: "130px",
      },
    },

    {
      dataField: "action",
      text: "Actions",
      isDummyField: true,
      formatter: ActionsColumnFormatter,
      formatExtraData: {
        openEditDialog: centersUIProps.openEditDialog,
        openDeleteDialog: centersUIProps.openDeleteDialog,
        openActiveDialog: centersUIProps.openActiveDialog,
        openReadDialog: centersUIProps.openReadDialog,
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
                defaultSorted={uiHelpers.defaultSorted}
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
    </>
  );
}
