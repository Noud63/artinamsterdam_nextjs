"use client";
import React from "react";
import { Grid } from "react-loader-spinner";

const Spinner = ({ loading = true, height = 40, width = 40}) => {
  return (
    <>
    {loading && <Grid
      visible={true}
      height={height}
      width={width}
      color="#fff"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass="grid-wrapper w-full flex justify-center items-center"
    />}
    
    </>
    
  );
};

export default Spinner;