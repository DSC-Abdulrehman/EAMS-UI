import React, { useMemo } from "react"

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls"
import { ItemsTable } from "../items-table/itemsTable"
import { useItemUIContext } from "../ItemUIContext"

import { useDispatch, useSelector, shallowEqual } from "react-redux"

export function ItemsCard() {
  const itemsUIContext = useItemUIContext()

  const centersUIProps = useMemo(() => {
    return {
      newCenterButtonClick: itemsUIContext.newCenterButtonClick,
      openEditCenterDialog: itemsUIContext.openEditCenterDialog,
    }
  }, [itemsUIContext])

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state.auth.userAccess.Users,
    }),
    shallowEqual
  )

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateUser"
  )

  return (
    <>
      <Card>
        <CardHeader title="list">
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={centersUIProps.newCenterButtonClick}
              >
                Add New Vehicle
              </button>
            ) : (
              <></>
            )}
            {/* {userAccess.find((item) => {
              if (
                item.componentName === "CreateUser" ||
                item.isAccess === true
              ) {
                return (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={usersUIProps.newUserButtonClick}
                  >
                    Add New User
                  </button>
                )
              }
            })} */}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>
          <ItemsTable />
        </CardBody>
      </Card>
    </>
  )
}
