import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Button,
  Typography,
  Checkbox,
  Spinner,
  Input,
  Select,
  Option,
  Collapse,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../store/propertyReducers";
import { useFilters } from "../context/FilterContext";

const LocationFilter = () => {
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.property.locations);
  const locationsLoading = useSelector(
    (state) => state.property.loading.locations
  );
  const locationsError = useSelector(
    (state) => state.property.error?.locations
  );
  const { filters, updateFilter } = useFilters();
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("count-desc");
  const menuRef = useRef(null);

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationChange = (location) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter((l) => l !== location)
      : [...filters.locations, location];
    updateFilter("locations", newLocations);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const filteredAndSortedLocations = useMemo(() => {
    let filteredLocations = [...locations];

    // Apply search filter
    if (searchQuery) {
      filteredLocations = filteredLocations.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filteredLocations.sort((a, b) => {
      switch (sortBy) {
        case "count-desc":
          return b.count - a.count;
        case "count-asc":
          return a.count - b.count;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return filteredLocations;
  }, [locations, searchQuery, sortBy]);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu); // Toggle mobile menu visibility
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="text"
        className="hidden lg:flex items-center gap-2 bg-white text-sm font-normal capitalize tracking-normal"
        onClick={toggleMenu}
      >
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 19.325C7.76667 19.325 7.53333 19.2833 7.3 19.2C7.06667 19.1167 6.85833 18.9917 6.675 18.825C5.59167 17.825 4.63333 16.85 3.8 15.9C2.96667 14.95 2.27083 14.0292 1.7125 13.1375C1.15417 12.2458 0.729167 11.3875 0.4375 10.5625C0.145833 9.7375 0 8.95 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 8.95 15.8542 9.7375 15.5625 10.5625C15.2708 11.3875 14.8458 12.2458 14.2875 13.1375C13.7292 14.0292 13.0333 14.95 12.2 15.9C11.3667 16.85 10.4083 17.825 9.325 18.825C9.14167 18.9917 8.93333 19.1167 8.7 19.2C8.46667 19.2833 8.23333 19.325 8 19.325ZM8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10Z"
            fill="#F77A32"
          />
        </svg>
        พื้นที่
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`h-3.5 w-3.5 transition-transform ${
            openMenu ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Desktop Menu */}
      <div
        className={`hidden lg:block absolute top-full w-64 lg:w-96 mt-1 bg-white rounded-lg shadow-lg z-50 transition-all duration-100 ease-in-out ${
          openMenu
            ? "opacity-100 translate-y-2 scale-100 pointer-events-auto visible"
            : "opacity-0 scale-95 pointer-events-none invisible"
        }`}
      >
        <div className="py-4 px-6">
          <Typography variant="h6" className="mb-2 text-sm">
            พื้นที่
          </Typography>

          {/* Search and Sort Controls */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="relative">
              <Input
                label="ค้นหาพื้นที่"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Select
              label="เรียงลำดับ"
              value={sortBy}
              onChange={handleSortChange}
            >
              <Option value="count-desc">จำนวนมากไปน้อย</Option>
              <Option value="count-asc">จำนวนน้อยไปมาก</Option>
              <Option value="name-asc">ชื่อ A-Z</Option>
              <Option value="name-desc">ชื่อ Z-A</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
            {locationsLoading ? (
              <div className="flex justify-center">
                <Spinner className="h-4 w-4" />
              </div>
            ) : filteredAndSortedLocations.length === 0 ? (
              <Typography variant="small" className="text-gray-500 text-center">
                ไม่พบพื้นที่
              </Typography>
            ) : (
              filteredAndSortedLocations.map((locationData) => (
                <div key={locationData.name} className="pr-4 lg:pr-16">
                  <Checkbox
                    label={`${locationData.name} (${locationData.count})`}
                    checked={filters.locations.includes(locationData.name)}
                    onChange={() => handleLocationChange(locationData.name)}
                    labelProps={{
                      className:
                        "whitespace-nowrap !font-semibold !text-body1 text-[#505050]",
                    }}
                  />
                </div>
              ))
            )}
          </div>
          {locationsError && (
            <Typography variant="small" color="red" className="mt-2">
              {locationsError}
            </Typography>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Typography
          variant="h6"
          onClick={toggleMobileMenu}
          className={`flex justify-between items-center !text-sm w-full bg-white p-4 rounded-lg ${
            openMobileMenu ? "rounded-b-none" : ""
          } `}
        >
          พื้นที่
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMobileMenu ? "rotate-180" : ""
            }`}
          />
        </Typography>
        <Collapse open={openMobileMenu}>
          <div
            className={`flex flex-col h-64 p-4 pt-2 bg-white ${
              openMobileMenu ? "rounded-b-lg" : ""
            }`}
          >
            {/* Search and Sort Controls */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="relative">
                <Input
                  label="ค้นหาพื้นที่"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Select
                label="เรียงลำดับ"
                value={sortBy}
                onChange={handleSortChange}
              >
                <Option value="count-desc">จำนวนมากไปน้อย</Option>
                <Option value="count-asc">จำนวนน้อยไปมาก</Option>
                <Option value="name-asc">ชื่อ A-Z</Option>
                <Option value="name-desc">ชื่อ Z-A</Option>
              </Select>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
              {locationsLoading ? (
                <div className="flex justify-center">
                  <Spinner className="h-4 w-4" />
                </div>
              ) : filteredAndSortedLocations.length === 0 ? (
                <Typography
                  variant="small"
                  className="text-gray-500 text-center"
                >
                  ไม่พบพื้นที่ที่ค้นหา
                </Typography>
              ) : (
                filteredAndSortedLocations.map((locationData) => (
                  <Checkbox
                    key={locationData.name}
                    label={`${locationData.name} (${locationData.count})`}
                    checked={filters.locations.includes(locationData.name)}
                    onChange={() => handleLocationChange(locationData.name)}
                    labelProps={{ className: "text-sm whitespace-nowrap" }}
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "px-2 py-1",
                    }}
                  />
                ))
              )}
            </div>
            {locationsError && (
              <Typography variant="small" color="red" className="mt-2">
                {locationsError}
              </Typography>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default LocationFilter;
