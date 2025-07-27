import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <Box sx={{ display: "flex" }}>
        <CircularProgress size={"4rem"} color="secondary" />
      </Box>
    </div>
  );
};

export default Spinner;
