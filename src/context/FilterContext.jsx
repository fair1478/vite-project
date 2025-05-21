import React, { createContext, useContext, useState, useCallback } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [valid, setValid] = useState(true);
  const [filters, setFilters] = useState({
    tags: [],
    locations: [],
    minPrice: 0,
    maxPrice: 0,
    minAreaSquareWah: 0,
    minAreaRai: 0,
    maxAreaSquareWah: 0,
    maxAreaRai: 0,
    searchText: "",
  });

  const [applyedFilters, setApplyedFilters] = useState({
    tags: [],
    locations: [],
    minPrice: 0,
    maxPrice: 0,
    minAreaSquareWah: 0,
    minAreaRai: 0,
    maxAreaSquareWah: 0,
    maxAreaRai: 0,
  });

  const updateValid = useCallback((value) => {
    setValid(value);
  }, []);

  const updateFilter = useCallback((filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  }, []);

  const updateApplyedFilter = useCallback((filterType, value) => {
    setApplyedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      tags: [],
      locations: [],
      minPrice: 0,
      maxPrice: 0,
      minAreaSquareWah: 0,
      minAreaRai: 0,
      maxAreaSquareWah: 0,
      maxAreaRai: 0,
      searchText: "",
    });
  }, []);

  const clearApplyedFilters = useCallback(() => {
    setApplyedFilters({
      tags: [],
      locations: [],
      minPrice: 0,
      maxPrice: 0,
      minAreaSquareWah: 0,
      minAreaRai: 0,
      maxAreaSquareWah: 0,
      maxAreaRai: 0,
    });
  }, []);

  return (
    <FilterContext.Provider
      value={{
        valid,
        updateValid,
        filters,
        applyedFilters,
        updateFilter,
        updateApplyedFilter,
        clearFilters,
        clearApplyedFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};
