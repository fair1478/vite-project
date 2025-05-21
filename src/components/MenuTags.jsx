import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Typography,
  Spinner,
  Checkbox,
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
import { getTags } from "../store/propertyReducers";
import { useFilters } from "../context/FilterContext";

const TagsFilter = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("count-desc");
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { filters, updateFilter } = useFilters();
  const tags = useSelector((state) => state.property.tags);
  const tagsLoading = useSelector((state) => state.property.loading.tags);
  const apiError = useSelector((state) => state.property.error?.tags);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const handleTagChange = (tag) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    updateFilter("tags", newTags);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const filteredAndSortedTags = React.useMemo(() => {
    let filteredTags = [...tags];

    // Apply search filter
    if (searchQuery) {
      filteredTags = filteredTags.filter((tagData) =>
        tagData.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filteredTags.sort((a, b) => {
      switch (sortBy) {
        case "count-desc":
          return b.count - a.count;
        case "count-asc":
          return a.count - b.count;
        case "name-asc":
          return a.tag.localeCompare(b.tag);
        case "name-desc":
          return b.tag.localeCompare(a.tag);
        default:
          return 0;
      }
    });

    return filteredTags;
  }, [tags, searchQuery, sortBy]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="text"
        className="hidden lg:flex items-center gap-2 bg-white text-sm font-normal capitalize tracking-normal"
        onClick={toggleMenu}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.00023 18C2.58357 18 2.28357 17.8167 2.10023 17.45C1.9169 17.0834 1.95023 16.7334 2.20023 16.4L6.20023 11.075C6.30023 10.9417 6.42107 10.8417 6.56273 10.775C6.7044 10.7084 6.85023 10.675 7.00023 10.675C7.15023 10.675 7.29607 10.7084 7.43773 10.775C7.5794 10.8417 7.70023 10.9417 7.80023 11.075L11.5002 16H19.0002L14.0002 9.35005L12.3002 11.6C12.1002 11.8667 11.8669 12.0042 11.6002 12.0125C11.3336 12.0209 11.1002 11.95 10.9002 11.8C10.7002 11.65 10.5669 11.4459 10.5002 11.1875C10.4336 10.9292 10.5002 10.6667 10.7002 10.4L13.2002 7.07505C13.3002 6.94172 13.4211 6.84172 13.5627 6.77505C13.7044 6.70838 13.8502 6.67505 14.0002 6.67505C14.1502 6.67505 14.2961 6.70838 14.4377 6.77505C14.5794 6.84172 14.7002 6.94172 14.8002 7.07505L21.8002 16.4C22.0502 16.7334 22.0836 17.0834 21.9002 17.45C21.7169 17.8167 21.4169 18 21.0002 18H3.00023ZM11.5002 16H19.0002H11.2002H12.9127H11.5002ZM5.00023 16H9.00023L7.00023 13.325L5.00023 16Z"
            fill="#F77A32"
          />
        </svg>
        แท็ก
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`h-3.5 w-3.5 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Desktop Dropdown */}
      <div
        className={`hidden lg:block absolute top-full w-64 lg:w-96 mt-1 bg-white rounded-lg shadow-lg z-50 transition-all duration-100 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-2 scale-100 pointer-events-auto visible"
            : "opacity-0 scale-95 pointer-events-none invisible"
        }`}
      >
        <div className="px-6 py-4">
          <Typography variant="h6" className="mb-2 text-sm">
            เลือกแท็ก
          </Typography>

          {/* Search and Sort Controls */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="relative">
              <Input
                label="ค้นหาแท็ก"
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
            {tagsLoading ? (
              <div className="flex justify-center">
                <Spinner className="h-4 w-4" />
              </div>
            ) : filteredAndSortedTags.length === 0 ? (
              <Typography variant="small" className="text-gray-500 text-center">
                ไม่พบแท็กที่ค้นหา
              </Typography>
            ) : (
              filteredAndSortedTags.map((tagData) => (
                <div key={tagData.tag} className="pr-4 lg:pr-16">
                  <Checkbox
                    label={`${tagData.tag} (${tagData.count})`}
                    checked={filters.tags.includes(tagData.tag)}
                    onChange={() => handleTagChange(tagData.tag)}
                    labelProps={{
                      className:
                        "whitespace-nowrap !font-semibold !text-body1 text-[#505050]",
                    }}
                    ripple={false}
                    className="hover:before:opacity-0"
                  />
                </div>
              ))
            )}
          </div>
          {apiError && (
            <Typography variant="small" color="red" className="mt-2">
              {apiError}
            </Typography>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden">
        <Typography
          variant="h6"
          onClick={toggleMobileMenu}
          className={`flex justify-between items-center !text-sm w-full bg-white p-4 rounded-lg ${
            openMobileMenu ? "rounded-b-none" : ""
          } `}
        >
          แท็ก
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
                  label="ค้นหาแท็ก"
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
              {tagsLoading ? (
                <div className="flex justify-center">
                  <Spinner className="h-4 w-4" />
                </div>
              ) : filteredAndSortedTags.length === 0 ? (
                <Typography
                  variant="small"
                  className="text-gray-500 text-center"
                >
                  ไม่พบแท็กที่ค้นหา
                </Typography>
              ) : (
                filteredAndSortedTags.map((tagData) => (
                  <Checkbox
                    key={tagData.tag}
                    label={`${tagData.tag} (${tagData.count})`}
                    checked={filters.tags.includes(tagData.tag)}
                    onChange={() => handleTagChange(tagData.tag)}
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
            {apiError && (
              <Typography variant="small" color="red" className="mt-2">
                {apiError}
              </Typography>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default TagsFilter;
