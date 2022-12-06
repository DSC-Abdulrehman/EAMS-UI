import React from "react"
import {
  IncidentStatusCssClasses,
  IncidentStatusTitles,
} from "../../IncidentsUIHelpers"

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      row.isActive === true ? "success" : "danger"
    } label-inline`}
  >
    {row.isActive === true ? "Open" : "Close"}
  </span>

  //   <span
  //     className={`label label-lg label-light-${
  //       IncidentStatusCssClasses[row.isActive]
  //     } label-inline`}
  //   >
  //     {IncidentStatusTitles[row.isActive]}
  //   </span>
)
