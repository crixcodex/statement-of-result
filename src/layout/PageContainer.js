import { Grid } from "@mui/material";
import React from "react";

function PageContainer({ children, direction }) {
  return (
    <Grid
      container
      spacing={0}
      direction={direction ?? "column"}
      alignItems={"center"}
      justifyContent="center"
      style={{
        minHeight: "70vh",
      }}
    >
      {children}
    </Grid>
  );
}

export default PageContainer;
