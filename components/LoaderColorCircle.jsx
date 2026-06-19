import React from 'react'
import { ColorRing } from "react-loader-spinner";

const LoaderColorCircle = () => {
  return (
    <div className="w-full flex justify-center mt-4">
<ColorRing
            visible={true}
            height="60"
            width="60"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
    </div>
     
  )
}

export default LoaderColorCircle