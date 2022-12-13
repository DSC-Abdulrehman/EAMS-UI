import React from "react";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      row?.status?.toLowerCase() == "close" ? "danger" : "success"
    } label-inline`}
  >
    {row.status}
  </span>
);
