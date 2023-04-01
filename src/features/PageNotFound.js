import React from "react";
import Header from "../layout/Header";
import PageContainer from "../layout/PageContainer";

const PageNotFound = () => {
  return (
    <React.Fragment>
      <Header title="404 NOT FOUND" />
      <PageContainer>
        <center>
          <h1>404 PAGE NOT FOUND</h1>
        </center>
      </PageContainer>
    </React.Fragment>
  );
};

export default PageNotFound;
