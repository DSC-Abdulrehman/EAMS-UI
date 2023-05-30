import React, { useMemo, useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { InfoTable } from "../info-table/InfoTable";
import { useInfoUIContext } from "../PersonalUIContext";
import { useSelector, shallowEqual } from "react-redux";
import { InfoFilter } from "../info-filter/InfoFilter";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function InfoCard() {
  const centersUIContext = useInfoUIContext();

  const centersUIProps = useMemo(() => {
    return {
      newCenterButtonClick: centersUIContext.addNewButtonClick,
      makePDFreport: centersUIContext.makePDFreport,
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

  var dd = {
    content: [
      {
        layout: "lightHorizontalLines", // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*", "auto", 100, "*"],

          body: [
            ["First", "Second", "Third", "The last one"],
            ["Value 1", "Value 2", "Value 3", "Value 4"],
            [{ text: "Bold value", bold: true }, "Val 2", "Val 3", "Val 4"],
          ],
        },
      },
    ],
  };

  const [url, setUrl] = useState(null);

  const createPdf = () => {
    const pdfGenerater = pdfMake.createPdf(dd).open();
    // console.log("pdfGererater", pdfGenerater);
    // pdfGenerater.getBlob((blob) => {
    //   const url = URL.createObjectURL(blob);
    //   setUrl(url);
    // });
  };

  return (
    <>
      <Card>
        <CardHeader title={<InfoFilter />}>
          <CardHeaderToolbar>
            {accessUser ? (
              <button
                type="button"
                className="btn btn-primary mr-3"
                onClick={centersUIProps.newCenterButtonClick}
              >
                Add New Info
              </button>
            ) : (
              <></>
            )}

            {/* <button
              type="button"
              className="btn btn-primary mr-3"
              onClick={() => centersUIProps.openEditCenterDialog(1)}
            >
              Edit
            </button> */}
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={createPdf}
            >
              Make report
            </button>
            {url && <div>{url}</div>} */}
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
          <InfoTable />
        </CardBody>
      </Card>
    </>
  );
}
