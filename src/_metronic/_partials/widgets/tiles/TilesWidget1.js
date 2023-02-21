/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useMemo, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import SVG from "react-inlinesvg";
import { Dropdown } from "react-bootstrap";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import { toAbsoluteUrl } from "../../../_helpers";
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
}) {
  var selectedVehiclesArr = [];
  const [vehicle, setVehicle] = useState(selectedVehiclesArr);
  const [diable, setDisable] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    // console.log("Seleted vehicle is", vehicle);
    setShow(true);
  };
  // setDisable(vehicle.length < 0 ? false : true);
  useEffect(() => {
    // setDisable((item) => console.log("item of disbale", item));
  }, [vehicle]);
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
  const products = [
    {
      id: 3,
      vehicleId: "LEH 4617",
      name: "Maruti Suzuki Omni",
      center: "Gullberg",
      status: true,
    },
    {
      id: 2,
      vehicleId: "LEH 4717",
      name: "Maruti Suzuki Eeco",
      center: "Johar town",
      status: false,
      align: "center",
    },
    {
      id: 4,
      vehicleId: "LEH 5817",
      name: "Tata Winger",
      center: "Johar town",
      status: true,
    },
    {
      id: 5,
      vehicleId: "LEH 5617",
      name: "Mahindra Bolero",
      center: "Town Ship",
      status: true,
    },
    {
      id: 6,
      vehicleId: "LEH 8976",
      name: "Force Trax",
      center: "Johar town",
      status: true,
    },
  ];
  const columns = [
    {
      dataField: "vehicleId",
      text: "Vehicle ID",
      align: "center",
      headerAlign: "center",
      headerAttrs: {
        hidden: true,
      },
    },
    {
      dataField: "name",
      text: "Vehicle Name",
      align: "center",
      //formatter: (cell, row) => types[cell],
      //headerTitle: false,
      headerAttrs: {
        hidden: true,
      },
      formatter: statusFormater,
    },
    {
      dataField: "center",
      text: "Center",
      align: "center",
      headerAttrs: {
        hidden: true,
      },

      // filter: textFilter(), // apply text filter
    },
    // {
    //   text: "Action",
    //   headerAlign: "center",
    //   // formatter: actionFormater,
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
        const index = vehicle.indexOf(row.id);
        if (index > -1) {
          vehicle.splice(index, 1);
          setVehicle(vehicle);
          // console.log("unselect arr", vehicle);
        }
      }
    },
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
              disabled={diable}
              onClick={handleShow}
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
        <div className="card-body d-flex flex-column px-0 pt-0 pb-0">
          <BootstrapTable
            keyField="id"
            data={products}
            columns={columns}
            selectRow={selectRow}
            condensed
            bordered={false}
          />
        </div>
        {/* end::Body */}
      </div>
      {/* end::Tiles Widget 1 */}

      <Modal show={show} onHide={handleClose}>
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
      </Modal>
    </>
  );
}

function getChartOption(layoutProps) {
  const options = {
    series: [
      {
        name: "Net Profit",
        data: [20, 22, 30, 28, 25, 26, 30, 28, 22, 24, 25, 35],
      },
    ],
    chart: {
      type: "area",
      height: 150,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0.55,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.2,
        stops: [25, 50, 100],
        colorStops: [],
      },
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: [layoutProps.colorsThemeBaseColor],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 37,
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily,
      },
      y: {
        formatter: function(val) {
          return "$" + val + " thousands";
        },
      },
    },
    colors: [layoutProps.colorsThemeLightColor],
    markers: {
      colors: [layoutProps.colorsThemeLightColor],
      strokeColor: [layoutProps.colorsThemeBaseColor],
      strokeWidth: 3,
    },
    padding: {
      top: 0,
      bottom: 0,
    },
  };
  return options;
}
