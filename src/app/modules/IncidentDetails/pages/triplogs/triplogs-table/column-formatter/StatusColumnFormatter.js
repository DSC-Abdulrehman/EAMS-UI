import React from "react"
import {
  IncidentStatusCssClasses,
  IncidentStatusTitles,
} from "../../TripLogsUIHelpers"

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      row.status === "Open" ? "success" : "danger"
    } label-inline`}
  >
    {row.status}
  </span>

  //   <span
  //     className={`label label-lg label-light-${
  //       IncidentStatusCssClasses[row.isActive]
  //     } label-inline`}
  //   >
  //     {IncidentStatusTitles[row.isActive]}
  //   </span>
)
