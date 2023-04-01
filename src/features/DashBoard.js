import React from "react";
import Header from "../layout/Header";
import PageContainer from "../layout/PageContainer";
import PDFFILE from "./JAVA.pdf";

function DashBoard() {
  return (
    <React.Fragment>
      <Header title="Dashboard" />
      <PageContainer>
        <iframe
          src={PDFFILE}
          frameborder="0"
          height="500px"
          width="100%"
          title="My Results"
          aria-label="20-20-02-20-20"
          style={{
            border: "none",
          }}
          allow="fullscreen"
          aria-hidden="true"
          seamless
        ></iframe>
      </PageContainer>
    </React.Fragment>
  );
}

export default DashBoard;
