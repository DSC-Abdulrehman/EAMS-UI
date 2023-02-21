import React from "react";
import axios from "axios";
import { fetchAllCity } from "../../redux/dashboardActions";
import { useSelector, useDispatch } from "react-redux";

import {
  ListsWidget10,
  ListsWidget11,
  AdvanceTablesWidget1,
  MixedWidget6,
  MixedWidget10,
  MixedWidget11,
  MixedWidget12,
  TilesWidget1,
  TilesWidget3,
  TilesWidget10,
  TilesWidget11,
  TilesWidget12,
  TilesWidget13,
  TilesWidget14,
} from "../widgets";

// async function getCities() {
//   try {
//     const response = await axios.get(
//       "http://app-8e308de5-0daf-4f85-ac89-7ce29bdad705.cleverapps.io/apis/settings/read-all-cities-master-data",
//       { countryID: 1 }
//     );
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
// getCities();
export function Demo2Dashboard() {
  // console.log("state", cities);
  return (
    <>
      {/* begin::Dashboard */}

      {/* begin::Row */}
      <div className="row">
        <div className="col-xl-12">
          <TilesWidget10 className="gutter-b" widgetHeight="125px" />
        </div>
        <div className="col-xl-4">
          <TilesWidget1
            className="gutter-b card-stretch"
            chartColor="danger"
            heading="Stand By"
            buttonHeading="Create Incident"
            NoofVehicle="20"
          />
        </div>
        <div className="col-xl-4">
          <TilesWidget1
            className="gutter-b card-stretch"
            chartColor="danger"
            heading="On Duty"
            buttonHeading="In Vehicle"
            NoofVehicle="5"
          />
        </div>
        <div className="col-xl-4">
          <TilesWidget1
            className="gutter-b card-stretch"
            chartColor="danger"
            heading="Off Duty"
            buttonHeading="Active vehicle"
            NoofVehicle="10"
          />
        </div>
        {/* <div className="col-xl-4">
          <TilesWidget1 className="gutter-b card-stretch" chartColor="danger" />
        </div>
        <div className="col-xl-8">
          <div className="row">
            <div className="col-xl-3">
              <TilesWidget3 className="gutter-b" widgetHeight="150px" />
            </div>
            <div className="col-xl-9">
              <TilesWidget10 className="gutter-b" widgetHeight="150px" />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6">
              <TilesWidget13 className="gutter-b" widgetHeight="175px" />
              <div className="row">
                <div className="col-xl-6">
                  <TilesWidget11
                    className="gutter-b"
                    baseColor="primary"
                    widgetHeight="150px"
                  />
                </div>
                <div className="col-xl-6">
                  <TilesWidget12
                    className="gutter-b"
                    iconColor="success"
                    widgetHeight="150px"
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <TilesWidget14 className="gutter-b card-stretch" />
            </div>
          </div>
        </div> */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      {/* <div className="row">
        <div className="col-lg-6 col-xxl-4">
          <MixedWidget6 className="gutter-b card-stretch" chartColor="danger" />
        </div>

        <div className="col-lg-6 col-xxl-8">
          <AdvanceTablesWidget1 className="card-stretch gutter-b" />
        </div>
      </div> */}
      {/* end::Row */}

      {/* begin::Row */}
      {/* <div className="row">
        <div className="col-xl-4">
          <MixedWidget10 className="card-stretch gutter-b" />
        </div>

        <div className="col-xl-4">
          <MixedWidget11 className="card-stretch gutter-b" />
        </div>

        <div className="col-xl-4">
          <MixedWidget12 className="card-stretch gutter-b" />
        </div>
      </div> */}
      {/* end::Row */}

      {/* begin::Row */}
      {/* <div className="row">
        <div className="col-lg-6">
          <ListsWidget10 className="card-stretch gutter-b" />
        </div>
        <div className="col-lg-6">
          <ListsWidget11 className="card-stretch gutter-b" />
        </div>
      </div> */}
      {/* end::Row */}

      {/* end::Dashboard */}
    </>
  );
}
