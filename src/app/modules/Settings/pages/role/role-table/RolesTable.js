import React, { useEffect, useMemo } from "react"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers"
import * as actions from "../../../_redux/roles/rolesAction"
import { useRolesUIContext } from "../RolesUIContext"
import { Pagination } from "../../../../../../_metronic/_partials/controls"
import * as columnFormatters from "./column-formatters"
import * as uiHelpers from "../RolesUIHelpers"
export function RolesTable() {
  const rolesUIContext = useRolesUIContext()

  const rolesUIProps = useMemo(() => {
    return {
      setIds: rolesUIContext.setIds,
      queryParams: rolesUIContext.queryParams,
      setQueryParams: rolesUIContext.setQueryParams,
      openEditRoleDialog: rolesUIContext.openEditRoleDialog,
      openDeleteRoleDialog: rolesUIContext.openDeleteRoleDialog,
      openRoleAccessPage: rolesUIContext.openRoleAccessPage,
    }
  }, [rolesUIContext])
  
  const { currentState } = useSelector(
    (state) => ({
      currentState: state.roles,
    }),
    shallowEqual
  )

  const { entities, listLoading, totalCount } = currentState

  //console.log("currentState+RoleTable", currentState.entities.length)
  // const totalCount = entities.length

  //Role Redux State
  const dispatch = useDispatch()
  useEffect(() => {
    // clear selections List
    rolesUIProps.setIds([])
    // Serer call by params
    dispatch(actions.fetchRoles(rolesUIProps.queryParams))
  }, [rolesUIProps.queryParams, dispatch])

  // Table
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "isActive",
      text: "Active",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
      formatter: columnFormatters.DatetimeColumnFormatter
      //  (cell) => {
      //   let dateObj = cell
      //   if (typeof cell !== "object") {
      //     dateObj = new Date(cell)
      //   }
      //   return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
      //     "0" +
      //     (dateObj.getUTCMonth() + 1)
      //   ).slice(-2)}/${dateObj.getUTCFullYear()}`
      // },
    },
    // {
    //   dataField: "updatedAt",
    //   text: "Updated At",
    //   sort: false,

    // },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditUserDialog: rolesUIProps.openEditRoleDialog,
        openDeleteRoleDialog: rolesUIProps.openDeleteRoleDialog,
        openRoleAccessPage: rolesUIProps.openRoleAccessPage,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ]

  //table paginations
  //const totalCount = 10
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: rolesUIProps.queryParams.pageSize,
    page: rolesUIProps.queryParams.pageNumber,
    // custom: true,
    // totalSize: totalCount,
    // sizePerPageList: uiHelpers.sizePerPageList,
    // sizePerPage: rolesUIProps.queryParams.limit,
    // page: rolesUIProps.queryParams.page,
  }

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
                  rolesUIProps.setQueryParams
                )}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          )
        }}
      </PaginationProvider>
    </>
  )
}
