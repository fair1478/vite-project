import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFilters } from "../context/FilterContext";

const SubDistrict = () => {
  const navigate = useNavigate();
  const { updateApplyedFilter } = useFilters();
  const handleClick = (filterLocation) => {
    (event) => {
      event.preventDefault();
    };
    return () => {
      console.log("filterLocation", filterLocation);
      updateApplyedFilter("locations", [filterLocation]);
      navigate("/properties");
    };
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="grid grid-cols-6 md:grid-cols-3 md:gap-6 gap-x-2 w-max md:w-full">
        <Button
          variant="outlined"
          color="orange"
          ripple={false}
          className="rounded-[100px] col-span-1 px-8 py-3 w-full bg-[#F9ECE8]"
          onClick={handleClick("ต.เขาพระ อ.เมือง")}
        >
          <Typography className="!text-h4 md:!text-button1 text-primary text-nowrap">
            ต.เขาพระ <br /> อ.เมือง
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="orange"
          ripple={false}
          className="rounded-[100px] col-span-1 px-8 py-3 w-full bg-[#F9ECE8]"
        >
          <Typography className="!text-h4 md:!text-button1 text-primary text-nowrap">
            ต.สาริกา <br /> อ.เมือง
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="orange"
          ripple={false}
          className="rounded-[100px] col-span-1 px-8 py-3 w-full bg-[#F9ECE8]"
          onClick={handleClick("ต.ดอนยอ อ.เมือง")}
        >
          <Typography className="!text-h4 md:!text-button1 text-primary text-nowrap">
            ต.ดอนยอ <br /> อ.เมือง
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="orange"
          ripple={false}
          className="rounded-[100px] col-span-1 px-8 py-3 w-full bg-[#F9ECE8]"
          onClick={handleClick("ต.เขาพระ อ.เมือง")}
        >
          <Typography className="!text-h4 md:!text-button1 text-primary text-nowrap">
            ต.พรหมมณี <br /> อ.เมือง
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="orange"
          ripple={false}
          className="rounded-[100px] col-span-1 px-8 py-3 w-full bg-[#F9ECE8]"
          onClick={handleClick("ต.เขาพระ อ.เมือง")}
        >
          <Typography className="!text-h4 md:!text-button1 text-primary text-nowrap">
            ต.เขาเพิ่ม <br /> อ.เมือง
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="orange"
          ripple={false}
          className="rounded-[100px] col-span-1 px-8 py-3 w-full bg-[#F9ECE8]"
          onClick={handleClick("ต.เขาพระ อ.เมือง")}
        >
          <Typography className="!text-h4 md:!text-button1 text-primary text-nowrap">
            ต.เกาะหวาย <br /> อ.เมือง
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default SubDistrict;
