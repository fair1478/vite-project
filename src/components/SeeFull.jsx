import React from "react";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

const SeeFull = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/properties");
    window.scrollTo(0, 0);
  };

  return (
    <Button
      variant="filled"
      color="white"
      className="px-6 py-1 !text-button2 rounded-full shadow-none"
      onClick={handleClick}
    >
      ดูทั้งหมด
    </Button>
  );
};

export default SeeFull;
