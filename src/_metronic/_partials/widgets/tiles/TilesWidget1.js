/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Dropdown } from "react-bootstrap";
import objectPath from "object-path";
import { DropdownCustomToggler, DropdownMenu4 } from "../../dropdowns";
import { useHtmlClassService } from "../../../layout";
import Button from "@material-ui/core/Button";
import { IncidentsEditDialog } from "../../../../app/modules/IncidentDetails/pages/incidents/incident-edit-dialog/IncidentEditDialog";
import Modal from "react-bootstrap/Modal";

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
}) {
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

  const actionFormater = (cell, row) => (
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
          <DropdownMenu4 />
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const columns = [
    {
      dataField: "name",
      text: "Vehicle Name",
      align: "center",
      headerAlign: "center",
      headerAttrs: {
        hidden: true,
      },
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
    // {
    //   text: "Action",
    //   headerAlign: "center",
    //   headerAttrs: {
    //     hidden: true,
    //   },
    //   formatter: actionFormater,
    // },
  ];

  const selectRow = {
    mode: "checkbox",
    style: { backgroundColor: "#c8e6c9" },
    selectColumnStyle: {
      textAlign: "center",
    },
    classes: "custom-class",
    align: "center",
    hideSelectAll: true,
    //clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        const vehicleId = row.id;
        setVehicle((item) => [...item, vehicleId]);
      } else if (!isSelect) {
        const index = vehicle && vehicle.indexOf(row.id);
        if (index > -1) {
          vehicle.splice(index, 1);
          setVehicle(vehicle);
          // console.log("unselect arr", vehicle);
        }
      }
    },
  };

  const emptyDataMessage = () => {
    return <h6 className="text-center mt-2">No Data to Display</h6>;
  };

  return (
    <>
      {/* begin::Tiles Widget 1 */}
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
            <button
              className="btn btn-dark"
              //disabled={diable}
              onClick={handleClickOpen}
              //onClick={handleShow}
            >
              {buttonHeading}
            </button>
            {/* <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                variant="transparent"
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-hor" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <DropdownMenu4 />
              </Dropdown.Menu>
            </Dropdown> */}
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="">
          <BootstrapTable
            keyField="id"
            data={vehiclesData || []}
            columns={columns}
            selectRow={selectRow}
            condensed
            bordered={false}
            noDataIndication={emptyDataMessage}
          />
        </div>
      </div>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {vehicle.map((item) => {
              return (
                <>
                  <li Key={item}> selected vehicle id is {item}</li>
                </>
              );
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
}
