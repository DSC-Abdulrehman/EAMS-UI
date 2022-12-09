import React from "react"
import SVG from "react-inlinesvg"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,

  {
    openEditUserDialog,
    openDeleteUserDialog,
    openReadUserDialog,
    isAccessForEdit,
    isAccessForDelete,
  }
) {
  const isUserRead = false
  // const { userAccess } = useSelector(
  //   (state) => ({
  //     userAccess: state.auth.userAccess.Users,
  //   }),
  //   shallowEqual
  // )

  // // const isAccessForEdit = userAccess.find(
  // //   (item) => item.componentName === "UpdateUser"
  // // )
  // console.log("userAccess", userAccess)
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">Read User</Tooltip>}
      >
        <a
          title="Read User"
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => openReadUserDialog(row.id, isUserRead)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/view.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>
      {isAccessForEdit && (
        <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Edit User</Tooltip>}
        >
          <a
            title="Edit User"
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openEditUserDialog(row.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-primary">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
              />
            </span>
          </a>
        </OverlayTrigger>
      )}

      <> </>
      {isAccessForDelete && (
        <OverlayTrigger
          overlay={<Tooltip id="products-edit-tooltip">Delete User</Tooltip>}
        >
          <a
            title="Delete User"
            className="btn btn-icon btn-light btn-hover-danger btn-sm mx-3"
            onClick={() => openDeleteUserDialog(row.id)}
          >
            <span className="svg-icon svg-icon-md svg-icon-danger">
              <SVG
                src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")}
                title=""
              />
            </span>
          </a>
        </OverlayTrigger>
      )}
    </>
  )
}
