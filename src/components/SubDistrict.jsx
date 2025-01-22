import React, { useContext } from "react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { StateContext } from "../context/StateContext";
// import { useHistory } from "react-router-dom";

const SubDistrict = () => {
  const navigate = useNavigate();
  const handleClick = (filterLocation) => {
    return () => {
      //   setPageState(filterLocation);

      console.log("filterLocation", filterLocation);
      navigate("/properties", { state: { data: filterLocation } });
    };
  };

  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <Button
        variant="outlined"
        color="orange"
        className="!text-button1 rounded-[100px]"
        onClick={handleClick("Location 1")}
      >
        ต.เขาพระ <br /> อ.เมือง
      </Button>
      <Button
        variant="outlined"
        color="orange"
        className="!text-button1 rounded-[100px]"
      >
        ต. ฟหก้า่ <br /> อ.เมือง
      </Button>
      <Button
        variant="outlined"
        color="orange"
        className="!text-button1 rounded-[100px]"
      >
        ต. ฟหก้า่ <br /> อ.เมือง
      </Button>
      <Button
        variant="outlined"
        color="orange"
        className="!text-button1 rounded-[100px]"
      >
        ต.เขาพระ <br /> อ.เมือง
      </Button>
      <Button
        variant="outlined"
        color="orange"
        className="!text-button1 rounded-[100px]"
      >
        ต. ฟหก้า่ <br /> อ.เมือง
      </Button>
      <Button
        variant="outlined"
        color="orange"
        className="!text-button1 rounded-[100px]"
      >
        ต. ฟหก้า่ <br /> อ.เมือง
      </Button>
    </div>
  );
};

export default SubDistrict;
