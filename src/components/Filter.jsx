import { Outlet } from "react-router-dom";
import { FilterProvider } from "../context/FilterContext";

const Filter = () => {
  return (
    <FilterProvider>
      <Outlet />
    </FilterProvider>
  );
};

export default Filter;
