import React, { useMemo } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { MortuaryTable } from "../mortuary-table/MortuaryTable";
import { useCentersUIContext } from "../MortuaryUIContext";
import { useSelector, shallowEqual } from "react-redux";
import { MortuaryFilter } from "../mortuary-filter/MortuaryFilter";

export function MortuaryCard() {
  const centersUIContext = useCentersUIContext();

  const centersUIProps = useMemo(() => {
    return {
      newCenterButtonClick: centersUIContext.newCenterButtonClick,
      openEditCenterDialog: centersUIContext.openEditCenterDialog,
    };
  }, [centersUIContext]);

  const { userAccess } = useSelector(
    (state) => ({
      userAccess: state?.auth?.userAccess?.Centers,
    }),
    shallowEqual
  );

  const accessUser = userAccess.find(
    (item) => item.componentName === "CreateCenter"
  );

  return (
    <>
      <Card>
        <CardHeader title={<MortuaryFilter />}>
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={centersUIProps.newCenterButtonClick}
              >
                Add New Info
              </button>
            ) : (
              <></>
            )}
          </CardHeaderToolbar>
        </CardHeader>

        <CardBody>
          <MortuaryTable />
        </CardBody>
      </Card>
    </>
  );
}
