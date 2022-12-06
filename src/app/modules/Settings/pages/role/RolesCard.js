import React, { useMemo } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls"
import { RolesTable } from "./role-table/RolesTable"
import { useRolesUIContext } from "./RolesUIContext"
import { RolesFilter } from "./role-filter/RolesFilter"
export function RolesCard() {
  const rolesUIContext = useRolesUIContext()
  //console.log("RoleUIContext", rolesUIContext)

  const rolesUIProps = useMemo(() => {
    return {
      newRoleButtonClick: rolesUIContext.newRoleButtonClick,
    }
  }, [rolesUIContext])
  return (
    <Card>
      <CardHeader title="">
        <CardHeaderToolbar>
          {/* <RolesFilter /> */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={rolesUIProps.newRoleButtonClick}
          >
            New Role
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <RolesTable />
      </CardBody>
    </Card>
  )
}
