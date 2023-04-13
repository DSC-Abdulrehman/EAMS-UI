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
//import Button from "@material-ui/core/Button";
import { IncidentsEditDialog } from "../../../../app/modules/IncidentDetails/pages/incidents/incident-edit-dialog/IncidentEditDialog";
import Modal from "react-bootstrap/Modal";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import {
  updateVehicelStatus,
  fetchDashboardVehicles,
} from "../../../redux/dashboardActions";
import { useDispatch } from "react-redux";
import { getDate, getTime, getCurrentTime } from "../../../../app/utils/common";
import moment from "moment";
import { func } from "prop-types";

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
  diable,
  rowSelection,
}) {
  //console.log("seletedCity", seletedCity);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const timerFormater = (cellContent) => {
    // setDutyVehicleTime(cellContent);
    // var now = moment(new Date());
    // var start = moment(cellContent);
    // //console.log("DutyVehicleTime", DutyVehicleTime);
    // //getMinutes(now, start);
    // // console.log("minutes", minutes);
    // var minutes = now.diff(start, "minutes");
    // console.log("minutes", minutes);
    // console.log("minutes", minutes);
    //console.log("DutyVehicleTime", DutyVehicleTime);

    return (
      <>
        <span>{getTime(cellContent)}</span>
      </>
    );
  };

  // useEffect(() => {
  //   // Start the interval to update the data every 5 seconds
  //   const interval = setInterval(() => {
  //     // Format the data
  //     const formattedData = vehiclesData.map((item) => {
  //       console.log("Data called");
  //       return {
  //         ...item,
  //         // Add formatted date to the row
  //         formattedDate: timerFormater,
  //       };
  //     });

  //     // Update the state with the formatted data
  //     setData(formattedData);
  //   }, 5000);

  //   // Clear the interval on component unmount
  //   return () => clearInterval(interval);
  // }, [vehiclesData]);

  const [DutyVehicleTime, setDutyVehicleTime] = useState();
  const [selectedVehile, setSelectedVehicle] = useState([]);

  const uiService = useHtmlClassService();

  // console.log("diable", diable);
  // const layoutProps = useMemo(() => {
  //   return {
  //     colorsGrayGray500: objectPath.get(
  //       uiService.config,
  //       "js.colors.gray.gray500"
  //     ),
  //     colorsGrayGray300: objectPath.get(
  //       uiService.config,
  //       "js.colors.gray.gray300"
  //     ),
  //     colorsThemeBaseColor: objectPath.get(
  //       uiService.config,
  //       `js.colors.theme.base.${chartColor}`
  //     ),
  //     colorsThemeLightColor: objectPath.get(
  //       uiService.config,
  //       `js.colors.theme.light.${chartColor}`
  //     ),
  //     fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
  //   };
  // }, [uiService, chartColor]);

  // useEffect(() =>{
  //   var now = moment(new Date());
  //   var end = moment(cellContent);
  //   var minutes = now.diff(end, "minutes");
  //   console.log("minutes", minutes);
  // },[])
  const statusFormater = (cell, row) => (
    <span className={row.status === true ? "text-success" : "text-warning"}>
      {row.name}
    </span>
  );

  // function func() {
  //   console.log("Ran");
  // }
  // setInterval(func, 5000);

  const getMinutes = (start) => {
    var now = moment(new Date());
    return now.diff(start, "minutes");
  };
  // useEffect(() => {
  //   setInterval(() => {
  //     return getMinutes();
  //   }, 10000);
  // }, []);

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
        {heading != "On Duty" && (
          <Dropdown className="dropdown-inline" alignRight>
            <Dropdown.Toggle
              className=" btn-clean btn-hover-light-primary btn-sm btn-icon"
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
              </ul>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </>
    );
  };

  //setInterval(timerFormater, 5000);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const columns = [
    {
      dataField: "name",
      text: "Vehicle Name",
      align: "center",
      headerAlign: "center",
      headerAttrs: {
        hidden: true,
      },
      style: (cell, row, rowIndex, colIndex) => {
        var minutes = getMinutes(row.start_time);
        if (row.status != "offDuty" && minutes > 5) {
          return { color: "red", verticalAlign: "middle" };
        }
        return { verticalAlign: "middle" };
      },
    },

    {
      dataField: "regNo",
      text: "Registration No",
      align: "center",
      headerAttrs: {
        hidden: true,
      },
      style: (cell, row, rowIndex, colIndex) => {
        var minutes = getMinutes(row.start_time);
        if (row.status != "offDuty" && minutes > 5) {
          return { color: "red", verticalAlign: "middle" };
        }
        return { verticalAlign: "middle" };
      },
    },
    {
      dataField: "start_time",
      text: "time",
      align: "center",
      headerAttrs: {
        hidden: true,
      },
      style: (cell, row, rowIndex, colIndex) => {
        var minutes = getMinutes(row.start_time);
        if (row.status != "offDuty" && minutes > 5) {
          return { color: "red", verticalAlign: "middle" };
        }
        return { verticalAlign: "middle" };
      },
      formatter: timerFormater,
    },
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
    hideSelectColumn: rowSelection,
    style: { backgroundColor: "#c8e6c9" },
    selectColumnStyle: {
      textAlign: "center",
      verticalAlign: "middle",
    },
    classes: "custom-class",
    align: "center",
    hideSelectAll: true,
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        let vehicleId;
        // console.log("row", row);
        if (row.status === "Available") {
          vehicleId = row.vehicleid;
          setVehicle((item) => [...item, vehicleId]);
        } else {
          vehicleId = row.tripLogId;
          setVehicle([row.tripLogId]);
        }
      } else if (!isSelect) {
        //console.log("seleted vehicel", vehicle);
        const index = vehicle && vehicle.indexOf(row.vehicleid);
        //  console.log("index", index);
        if (index > -1) {
          vehicle.splice(index, 1);
          setVehicle([...vehicle]);
          //setVehicle((item) => [...item, vehicle]);
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
                className="btn btn-primary"
                disabled={diable}
                onClick={handleClickOpen}
                //onClick={handleShow}
              >
                {buttonHeading}
              </button>
            )}
          </div>
        </div>

        <div className="table-box">
          <BootstrapTable
            classes="dasboard-table"
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
