import { useState, useEffect } from "react";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { Outlet, Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import { Collapse } from "@material-tailwind/react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import PriceRangeFilter from "../components/MenuPrice";
import AreaRangeFilter from "../components/MenuArea";
import LocationFilter from "../components/MenuLocation";
import TagsFilter from "../components/MenuTags";
import { useFilters } from "../context/FilterContext";
import { getPropertiesByQuery } from "../store/propertyReducers";
import Footer from "../components/Footer";

export function GalleryLayout() {
  const [isSticky, setIsSticky] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State for collapse
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    filters,
    updateFilter,
    updateApplyedFilter,
    clearApplyedFilters,
    valid,
  } = useFilters();
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const needFilter =
    location.pathname === "/properties" || location.pathname === "/properties/";
  const ishomePage = location.pathname === "/";

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      updateFilter("searchText", searchText);
    } else {
      updateFilter("searchText", "");
    }
    navigate("/properties");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      // Reset isSticky only when navigating to the homepage
      setIsSticky(false);
      updateFilter("searchText", ""); // Clear the search text filter
      setSearchText(""); // Clear the search text input
    }
  }, [location.pathname]); // Run this effect whenever the pathname changes

  useEffect(() => {
    const handleTop = () => {
      const scrollTop = window.scrollY;
      setIsTop(scrollTop <= 0);
    };

    window.addEventListener("scroll", handleTop);
    return () => window.removeEventListener("scroll", handleTop);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const heroSearchBar = document.getElementById("hero-section");
      if (heroSearchBar) {
        const heroSearchBarBottom =
          heroSearchBar.getBoundingClientRect().bottom;
        if (window.innerWidth > 720) {
          setIsSticky(heroSearchBarBottom <= 192);
        } else {
          setIsSticky(heroSearchBarBottom <= 54);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
    updateFilter("searchText", event.target.value);
  };

  const handleApplyFilters = async () => {
    try {
      setLoading(true);

      // Construct query parameters dynamically
      const queryParams = new URLSearchParams();

      if (filters.locations?.length > 0) {
        queryParams.append("locations", filters.locations.join(","));
      }

      if (filters.minPrice > 0) {
        queryParams.append("minPrice", filters.minPrice);
      }

      if (filters.maxPrice > 0) {
        queryParams.append("maxPrice", filters.maxPrice);
      }

      if (filters.tags?.length > 0) {
        queryParams.append("tags", filters.tags.join(","));
      }

      if (filters.minAreaRai > 0) {
        queryParams.append("minAreaRai", filters.minAreaRai);
      }

      if (filters.minAreaSquareWah > 0) {
        queryParams.append("minAreaSquareWah", filters.minAreaSquareWah);
      }
      console.log("filters.maxAreaRai", filters.maxAreaRai);
      if (filters.maxAreaRai > 0) {
        queryParams.append("maxAreaRai", filters.maxAreaRai);
      }

      if (filters.maxAreaSquareWah > 0) {
        queryParams.append("maxAreaSquareWah", filters.maxAreaSquareWah);
      }

      // Dispatch the API call with the constructed query string
      await dispatch(getPropertiesByQuery(queryParams.toString())).unwrap();
      clearApplyedFilters();
      // Update applied filters in the context
      queryParams.forEach((value, key) => {
        if (key === "locations") {
          value = value.split(",");
        } else if (key === "tags") {
          value = value.split(",");
        } else {
          value = Number(value);
        }
        updateApplyedFilter(key, value);
      });
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
      setIsFilterOpen(false); // Close the filter menu after applying
    }
  };

  return (
    <div className="bg-bg">
      <div
        className={`sticky top-0 w-full z-[999] px-2 md:px-[80px] 2xl:px-[160px] pt-2 lg:pt-0 mb-8 bg-bg ${
          window.innerWidth < 720 && ishomePage
            ? isSticky
              ? "shadow-0"
              : "hidden"
            : isTop
            ? "shadow-none"
            : "shadow-0"
        }`}
      >
        <nav className="flex flex-col justify-between items-center w-full py-2 md:py-4 space-y-2 3xl:space-y-4">
          <div className="flex flex-row items-center justify-between w-full space-x-2 lg:space-x-4">
            {ishomePage && window.innerWidth < 720 ? (
              ""
            ) : (
              <div>
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo"
                    loading="lazy"
                    className="h-9 md:h-12 lg:h-14"
                  />
                </Link>
              </div>
            )}
            <div className="block relative w-full 3xl:w-7/12">
              {(needFilter || isSticky) && (
                <div>
                  <input
                    type="text"
                    value={searchText}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="ค้นหาที่ดิน..."
                    className={`!text-base 3xl:!text-lg shadow-search pl-4 md:pl-6 !pr-12 h-10 md:!h-12 3xl:!h-[56px] [@media(min-height:1400px)]:h-20 w-full text-body1 lg:text-paragraph justify-center rounded-[100px] focus:outline-none`}
                  />
                  <div
                    onClick={handleSearch}
                    className="absolute inset-y-0 !right-1 md:!right-[6px] 3xl:!right-2 !mt-[4px] md:!mt-[6px] 3xl:!mt-[8px] [@media(min-height:1400px)]:mt-3 [@media(min-height:1400px)]:right-3 flex items-center justify-center !size-8 md:!size-9 3xl:!size-10 [@media(min-height:1400px)]:size-14 rounded-full bg-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="white"
                      className="!size-5 [@media(min-height:1400px)]:size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <Button
                variant="filled"
                size="sm"
                color="orange"
                className="flex flex-row rounded-2xl px-2 md:px-6 md:py-4 text-bg !text-sm xl:!text-button1 [@media(min-height:1400px)]:!text-2xl"
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/pitcha.wichthong",
                    "_blank"
                  );
                }}
              >
                <p className="w-fit !text-nowrap">ติดต่อเรา</p>
              </Button>
            </div>
          </div>
          {needFilter && (
            <div className="hidden lg:block w-full max-h-[60dvh]">
              {/* Desktop Filters */}
              <div className="hidden lg:flex flex-row flex-wrap items-center justify-center w-full space-x-4">
                <div className="flex flex-col">
                  <LocationFilter />
                </div>
                <div className="flex flex-col">
                  <PriceRangeFilter />
                </div>
                <div className="flex flex-col">
                  <TagsFilter />
                </div>
                <div className="flex flex-col">
                  <AreaRangeFilter />
                </div>
                <div className="flex flex-col">
                  <Button
                    onClick={handleApplyFilters}
                    disabled={loading || !valid}
                    color="orange"
                    className="flex items-center gap-2 !text-body1 !font-semibold text-white "
                  >
                    {loading ? <Spinner className="h-4 w-4" /> : "ใช้ตัวกรอง"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
      {/* Mobile Filters */}
      {needFilter && (
        <div
          className={`px-2 md:px-[80px] lg:hidden
       ${isFilterOpen ? "shadow-md" : "shadow-none"}`}
        >
          <div className="flex justify-end lg:hidden mb-2">
            <Button
              variant="text"
              onClick={handleToggleFilter}
              className="flex items-center space-x-2 bg-white !p-2 hover:!bg-white"
            >
              <AdjustmentsHorizontalIcon className="size-5 text-primary" />
            </Button>
          </div>
          <Collapse open={isFilterOpen}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 items-start justify-center w-full mb-4">
              <div className="flex flex-col w-full">
                <LocationFilter />
              </div>
              <div className="flex flex-col w-full">
                <TagsFilter />
              </div>
              <div className="flex flex-col w-full h-full">
                <PriceRangeFilter />
              </div>
              <div className="flex flex-col w-full">
                <AreaRangeFilter />
              </div>
              <div className="flex flex-col col-span-1 md:col-span-2">
                <Button
                  color="orange"
                  onClick={handleApplyFilters}
                  disabled={loading}
                >
                  {loading ? <Spinner className="h-4 w-4" /> : "ใช้ตัวกรอง"}
                </Button>
              </div>
            </div>
          </Collapse>
        </div>
      )}
      <div
        className={`mx-2 md:mx-[80px] 2xl:mx-[160px] ${
          window.innerWidth < 720 && ishomePage
            ? isSticky
              ? ""
              : "pt-[92px]"
            : ""
        }`}
      >
        {ishomePage && (
          <div
            id="hero-section"
            className={`px-2 md:bg-[url('/src/assets/hero-image.jpg')] relative flex flex-col items-center justify-center w-full h-full md:h-[500px] 3xl:h-[800px] md:bg-cover md:bg-center rounded-[32px] mb-8 md:mb-32`}
          >
            <div className="hidden md:block absolute inset-0 md:bg-none md:bg-black md:opacity-30 rounded-[32px]"></div>
            <img src={logo} alt="hero" className="md:hidden block mb-11" />
            <h1 className="relative text-h4 leading-[44px] md:!text-title mb-2 text-black md:text-bg z-10">
              มองหาที่ดินนครนายก มองหา
              <span className="text-primary">แม่ไก่</span>
            </h1>
            {!isSticky && (
              <div className="relative w-full md:w-7/12 z-10">
                <input
                  type="text"
                  value={searchText}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="ค้นหาที่ดิน..."
                  className={`!text-base 3xl:!text-lg pl-4 md:pl-6 !pr-12 h-[54px] md:!h-14 3xl:h-[48px] [@media(min-height:1400px)]:h-20 w-full text-body1 lg:text-paragraph justify-center rounded-[100px] focus:outline-none shadow-search`}
                />
                <div
                  onClick={handleSearch}
                  className="absolute inset-y-0 !right-2 3xl:right-2 !mt-[8px] 3xl:mt-[8px] [@media(min-height:1400px)]:mt-3 [@media(min-height:1400px)]:right-3 flex items-center justify-center !size-9 md:!size-10 [@media(min-height:1400px)]:size-14  rounded-full bg-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default GalleryLayout;
