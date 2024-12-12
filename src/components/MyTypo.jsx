import React from "react";
import { Typography } from "@material-tailwind/react";

const MyTypo = ({ children, classname, ...props }) => {
  return (
    <Typography {...props} className="bg-deep-orange-500">
      {children}
    </Typography>
  );
};

export default MyTypo;
