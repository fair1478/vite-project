import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const SeeFull = () => {
  return (
    <Link to="/properties">
      <Button
        variant="filled"
        color="white"
        className="px-6 py-1 !text-button2 rounded-full shadow-none"
      >
        ดูทั้งหมด
      </Button>
    </Link>
  );
};

export default SeeFull;
