import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropertyCard from "../../components/PropertyCard";
import api from "../../utils/api";
import { Button, Typography, Chip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useFilters } from "../../context/FilterContext";
import { getPropertiesByQuery } from "../../store/propertyReducers";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
import Xcircle from "../../components/Xcircle.jsx";
function PropertyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property.properties);
  const loading = useSelector((state) => state.property.loading.properties);
  const error = useSelector((state) => state.property.error?.properties);
  const searchText = useFilters().filters.searchText;
  const { updateFilter, applyedFilters, updateApplyedFilter } = useFilters();
  const [currentFilters, setCurrentFilters] = useState(applyedFilters);
  const [sortOrder, setSortOrder] = useState("newest"); // State to track sort order

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const queryParams = new URLSearchParams();

        if (applyedFilters.locations?.length > 0) {
          queryParams.append("locations", applyedFilters.locations.join(","));
        }

        if (applyedFilters.minPrice > 0) {
          queryParams.append("minPrice", applyedFilters.minPrice);
        }

        if (applyedFilters.maxPrice > 0) {
          queryParams.append("maxPrice", applyedFilters.maxPrice);
        }

        if (applyedFilters.tags?.length > 0) {
          queryParams.append("tags", applyedFilters.tags.join(","));
        }

        if (applyedFilters.minAreaRai > 0) {
          queryParams.append("minAreaRai", applyedFilters.minAreaRai);
        }

        if (applyedFilters.minAreaSquareWah > 0) {
          queryParams.append(
            "minAreaSquareWah",
            applyedFilters.minAreaSquareWah
          );
        }

        if (applyedFilters.maxAreaRai > 0) {
          queryParams.append("maxAreaRai", applyedFilters.maxAreaRai);
        }

        if (applyedFilters.maxAreaSquareWah > 0) {
          queryParams.append(
            "maxAreaSquareWah",
            applyedFilters.maxAreaSquareWah
          );
        }
        dispatch(getPropertiesByQuery(queryParams.toString())).unwrap();
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  // Update currentFilters only when loading changes from true to false
  useEffect(() => {
    setCurrentFilters(applyedFilters);

    // prevLoading.current = loading; // Update the previous loading value
  }, [applyedFilters]);

  const handlePropertyClick = (id) => {
    try {
      api.post(`/incrementPopularity`, { id: id }).then((response) => {
        if (response.status === 200) {
          navigate(`/properties/${id}`);
        } else {
          console.error(
            "Error incrementing popularity: ",
            response.status,
            response.statusText
          );
        }
      });
    } catch (error) {
      console.error("Error incrementing popularity: ", error);
    }
    window.scrollTo(0, 0);
  };

  const handleRemoveFilter = async (filterKey, value) => {
    // Create a copy of the current filters
    let updatedFilters = { ...applyedFilters };
    // Update the filters locally
    if (Array.isArray(applyedFilters[filterKey])) {
      updatedFilters[filterKey] = applyedFilters[filterKey].filter(
        (item) => item !== value
      );
    } else {
      updatedFilters[filterKey] = ""; // Clear non-array filters
    }

    // Update the filters in the context
    updateFilter(filterKey, updatedFilters[filterKey]);
    updateApplyedFilter(filterKey, updatedFilters[filterKey]);
    try {
      const queryParams = new URLSearchParams();

      if (updatedFilters.locations?.length > 0) {
        queryParams.append("locations", updatedFilters.locations.join(","));
      }

      if (updatedFilters.minPrice > 0) {
        queryParams.append("minPrice", updatedFilters.minPrice);
      }

      if (updatedFilters.maxPrice > 0) {
        queryParams.append("maxPrice", updatedFilters.maxPrice);
      }

      if (updatedFilters.tags?.length > 0) {
        queryParams.append("tags", updatedFilters.tags.join(","));
      }

      if (updatedFilters.minAreaRai > 0) {
        queryParams.append("minAreaRai", updatedFilters.minAreaRai);
      }

      if (updatedFilters.minAreaSquareWah > 0) {
        queryParams.append("minAreaSquareWah", updatedFilters.minAreaSquareWah);
      }
      if (updatedFilters.maxAreaRai > 0) {
        queryParams.append("maxAreaRai", updatedFilters.maxAreaRai);
      }

      if (updatedFilters.maxAreaSquareWah > 0) {
        queryParams.append("maxAreaSquareWah", updatedFilters.maxAreaSquareWah);
      }

      // Dispatch the API call with the constructed query string
      await dispatch(getPropertiesByQuery(queryParams.toString())).unwrap();
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchText.toLowerCase()) ||
      property.subtitle.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSortByTime = () => {
    setSortOrder((prevOrder) => (prevOrder === "newest" ? "oldest" : "newest"));
  };

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortOrder === "newest") {
      return dateB - dateA; // Newest first
    } else {
      return dateA - dateB; // Oldest first
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Typography color="red" className="text-center">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center items-start">
      <div className="flex flex-col gap-4 h-full justify-start items-center w-full lg:pb-0 pb-6">
        {/* Active Filters Section */}
        <div className="flex flex-wrap gap-2 w-full">
          {Object.entries(currentFilters).map(([key, value]) => {
            // Combine min/max for price, areaRai, areaSquareWah
            if (key === "minPrice" || key === "maxPrice") return null;
            if (key === "minAreaRai" || key === "maxAreaRai") return null;
            if (key === "minAreaSquareWah" || key === "maxAreaSquareWah")
              return null;

            if (key === "locations" || key === "tags") {
              if (Array.isArray(value) && value.length > 0) {
                return value.map((item) => (
                  <Chip
                    key={`${key}-${item}`}
                    icon={
                      <div className="flex items-center justify-center mr-[-12px] md:mr-[-18px]">
                        {key === "locations" ? (
                          <svg
                            width="16"
                            height="20"
                            viewBox="0 0 16 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 md:h-5 md:w-5"
                          >
                            <path
                              d="M8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 19.325C7.76667 19.325 7.53333 19.2833 7.3 19.2C7.06667 19.1167 6.85833 18.9917 6.675 18.825C5.59167 17.825 4.63333 16.85 3.8 15.9C2.96667 14.95 2.27083 14.0292 1.7125 13.1375C1.15417 12.2458 0.729167 11.3875 0.4375 10.5625C0.145833 9.7375 0 8.95 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 8.95 15.8542 9.7375 15.5625 10.5625C15.2708 11.3875 14.8458 12.2458 14.2875 13.1375C13.7292 14.0292 13.0333 14.95 12.2 15.9C11.3667 16.85 10.4083 17.825 9.325 18.825C9.14167 18.9917 8.93333 19.1167 8.7 19.2C8.46667 19.2833 8.23333 19.325 8 19.325ZM8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10Z"
                              fill="#F77A32"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 md:h-5 md:w-5"
                          >
                            <path
                              d="M3.00023 18C2.58357 18 2.28357 17.8167 2.10023 17.45C1.9169 17.0834 1.95023 16.7334 2.20023 16.4L6.20023 11.075C6.30023 10.9417 6.42107 10.8417 6.56273 10.775C6.7044 10.7084 6.85023 10.675 7.00023 10.675C7.15023 10.675 7.29607 10.7084 7.43773 10.775C7.5794 10.8417 7.70023 10.9417 7.80023 11.075L11.5002 16H19.0002L14.0002 9.35005L12.3002 11.6C12.1002 11.8667 11.8669 12.0042 11.6002 12.0125C11.3336 12.0209 11.1002 11.95 10.9002 11.8C10.7002 11.65 10.5669 11.4459 10.5002 11.1875C10.4336 10.9292 10.5002 10.6667 10.7002 10.4L13.2002 7.07505C13.3002 6.94172 13.4211 6.84172 13.5627 6.77505C13.7044 6.70838 13.8502 6.67505 14.0002 6.67505C14.1502 6.67505 14.2961 6.70838 14.4377 6.77505C14.5794 6.84172 14.7002 6.94172 14.8002 7.07505L21.8002 16.4C22.0502 16.7334 22.0836 17.0834 21.9002 17.45C21.7169 17.8167 21.4169 18 21.0002 18H3.00023ZM11.5002 16H19.0002H11.2002H12.9127H11.5002ZM5.00023 16H9.00023L7.00023 13.325L5.00023 16Z"
                              fill="#F77A32"
                            />
                          </svg>
                        )}
                      </div>
                    }
                    value={
                      <Typography className="!text-body2 md:!text-body1 pl-2 pr-2">
                        {item}
                      </Typography>
                    }
                    action={
                      <Button
                        variant="filled"
                        color="white"
                        onClick={() => handleRemoveFilter(key, item)}
                        className="flex justify-center !px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                      >
                        <Xcircle className="size-4 md:size-5 text-[#5F6368]" />
                      </Button>
                    }
                    className="flex bg-secondary !px-2 !py-1 md:!px-4 md:!py-3 text-body2 md:text-body1 rounded-full shadow-none text-primary !normal-case"
                  />
                ));
              }
            } else if (
              value &&
              (typeof value === "string" || typeof value === "number")
            ) {
              return (
                <Chip
                  key={key}
                  value={`${key}: ${value}asdsd`}
                  action={
                    <Button
                      variant="filled"
                      color="white"
                      onClick={() => handleRemoveFilter(key, value)}
                      className="flex justify-center !px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                    >
                      <Xcircle className="size-4 md:size-5 text-[#5F6368]" />
                    </Button>
                  }
                  className="flex space-x-2 bg-secondary !px-2 !py-1 md:!px-4 md:!py-3 !text-body2 md:!text-body1 rounded-full shadow-none text-primary !normal-case"
                />
              );
            }
            return null;
          })}
          {(currentFilters.minPrice > 0 || currentFilters.maxPrice > 0) && (
            <Chip
              key="price"
              icon={
                <div className="flex items-center justify-center md:mt-[-2px] mr-[-12px] md:mr-[-18px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5"
                  >
                    <path
                      d="M14 13C13.1667 13 12.4583 12.7083 11.875 12.125C11.2917 11.5417 11 10.8333 11 10C11 9.16667 11.2917 8.45833 11.875 7.875C12.4583 7.29167 13.1667 7 14 7C14.8333 7 15.5417 7.29167 16.125 7.875C16.7083 8.45833 17 9.16667 17 10C17 10.8333 16.7083 11.5417 16.125 12.125C15.5417 12.7083 14.8333 13 14 13ZM7 16C6.45 16 5.97917 15.8042 5.5875 15.4125C5.19583 15.0208 5 14.55 5 14V6C5 5.45 5.19583 4.97917 5.5875 4.5875C5.97917 4.19583 6.45 4 7 4H21C21.55 4 22.0208 4.19583 22.4125 4.5875C22.8042 4.97917 23 5.45 23 6V14C23 14.55 22.8042 15.0208 22.4125 15.4125C22.0208 15.8042 21.55 16 21 16H7ZM9 14H19C19 13.45 19.1958 12.9792 19.5875 12.5875C19.9792 12.1958 20.45 12 21 12V8C20.45 8 19.9792 7.80417 19.5875 7.4125C19.1958 7.02083 19 6.55 19 6H9C9 6.55 8.80417 7.02083 8.4125 7.4125C8.02083 7.80417 7.55 8 7 8V12C7.55 12 8.02083 12.1958 8.4125 12.5875C8.80417 12.9792 9 13.45 9 14ZM19 20H3C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V8C1 7.71667 1.09583 7.47917 1.2875 7.2875C1.47917 7.09583 1.71667 7 2 7C2.28333 7 2.52083 7.09583 2.7125 7.2875C2.90417 7.47917 3 7.71667 3 8V18H19C19.2833 18 19.5208 18.0958 19.7125 18.2875C19.9042 18.4792 20 18.7167 20 19C20 19.2833 19.9042 19.5208 19.7125 19.7125C19.5208 19.9042 19.2833 20 19 20Z"
                      fill="#F77A32"
                    />
                  </svg>
                </div>
              }
              value={
                <Typography className="!text-body2 md:!text-body1 pl-2 pr-2">
                  {currentFilters.minPrice > 0 && currentFilters.maxPrice > 0
                    ? `${currentFilters.minPrice} - ${currentFilters.maxPrice}
                  บาท`
                    : currentFilters.minPrice > 0
                    ? `มากกว่า ${currentFilters.minPrice} บาท`
                    : currentFilters.maxPrice > 0
                    ? `น้อยกว่า ${currentFilters.maxPrice} บาท`
                    : ""}
                </Typography>
              }
              action={
                <Button
                  variant="filled"
                  color="white"
                  onClick={() => {
                    handleRemoveFilter("minPrice", currentFilters.minPrice);
                    handleRemoveFilter("maxPrice", currentFilters.maxPrice);
                  }}
                  className="flex justify-center !px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                >
                  <Xcircle className="size-4 md:size-5 text-[#5F6368]" />
                </Button>
              }
              className="flex bg-secondary !px-2 !py-1 md:!px-4 md:!py-3 !font-bold !text-body2 md:!text-body1 rounded-full shadow-none text-primary"
            />
          )}
          {(currentFilters.minAreaRai > 0 ||
            currentFilters.maxAreaRai > 0 ||
            currentFilters.minAreaSquareWah > 0 ||
            currentFilters.maxAreaSquareWah > 0) && (
            <Chip
              key="area"
              icon={
                <div className="flex items-center justify-center md:mt-[-2px] mr-[-12px] md:mr-[-18px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5"
                  >
                    <path
                      d="M17 22V19H7C6.45 19 5.97917 18.8042 5.5875 18.4125C5.19583 18.0208 5 17.55 5 17V7H2C1.71667 7 1.47917 6.90417 1.2875 6.7125C1.09583 6.52083 1 6.28333 1 6C1 5.71667 1.09583 5.47917 1.2875 5.2875C1.47917 5.09583 1.71667 5 2 5H5V2C5 1.71667 5.09583 1.47917 5.2875 1.2875C5.47917 1.09583 5.71667 1 6 1C6.28333 1 6.52083 1.09583 6.7125 1.2875C6.90417 1.47917 7 1.71667 7 2V17H22C22.2833 17 22.5208 17.0958 22.7125 17.2875C22.9042 17.4792 23 17.7167 23 18C23 18.2833 22.9042 18.5208 22.7125 18.7125C22.5208 18.9042 22.2833 19 22 19H19V22C19 22.2833 18.9042 22.5208 18.7125 22.7125C18.5208 22.9042 18.2833 23 18 23C17.7167 23 17.4792 22.9042 17.2875 22.7125C17.0958 22.5208 17 22.2833 17 22ZM17 15V7H9V5H17C17.55 5 18.0208 5.19583 18.4125 5.5875C18.8042 5.97917 19 6.45 19 7V15H17Z"
                      fill="#F77A32"
                    />
                  </svg>
                </div>
              }
              value={(() => {
                // Helper to format area as "x ไร่ y ตารางวา"
                const formatArea = (rai, wah) => {
                  let text = "";
                  if (rai) text += `${rai} ไร่`;
                  if (wah) text += (rai ? " " : "") + `${wah} ตารางวา`;
                  return text || "-";
                };

                const minRai =
                  currentFilters.minAreaRai > 0 ? currentFilters.minAreaRai : 0;
                const maxRai =
                  currentFilters.maxAreaRai > 0 ? currentFilters.maxAreaRai : 0;
                const minWah =
                  currentFilters.minAreaSquareWah > 0
                    ? currentFilters.minAreaSquareWah
                    : 0;
                const maxWah =
                  currentFilters.maxAreaSquareWah > 0
                    ? currentFilters.maxAreaSquareWah
                    : 0;

                // Both min and max
                if ((minRai || minWah) && (maxRai || maxWah)) {
                  return (
                    <Typography className="!text-body2 md:!text-body1 pl-2 pr-2">
                      {formatArea(minRai, minWah)} - {formatArea(maxRai, maxWah)}
                    </Typography>
                  );
                }
                // Only min
                if (minRai || minWah) {
                  return (
                    <Typography className="!text-body2 md:!text-body1 pl-2 pr-2">
                      มากกว่า {formatArea(minRai, minWah)}
                    </Typography>
                  );
                }
                // Only max
                if (maxRai || maxWah) {
                  return (
                    <Typography className="!text-body2 md:!text-body1 pl-2 pr-2">
                      ต่ำกว่า {formatArea(maxRai, maxWah)}
                    </Typography>
                  );
                }
                return "";
              })()}
              action={
                <Button
                  variant="filled"
                  color="white"
                  onClick={() => {
                    handleRemoveFilter("minAreaRai", currentFilters.minAreaRai);
                    handleRemoveFilter("maxAreaRai", currentFilters.maxAreaRai);
                    handleRemoveFilter(
                      "minAreaSquareWah",
                      currentFilters.minAreaSquareWah
                    );
                    handleRemoveFilter(
                      "maxAreaSquareWah",
                      currentFilters.maxAreaSquareWah
                    );
                  }}
                  className="flex justify-center !px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                >
                  <Xcircle className="size-4 md:size-5 text-[#5F6368]" />
                </Button>
              }
              className="flex bg-secondary !px-2 !py-1 md:!px-4 md:!py-3 !text-body2 md:!text-body1 rounded-full shadow-none text-primary !normal-case"
            />
          )}
        </div>
        <hr className="my-3 bg-gray-400 w-full h-1" />
        <div className="flex flex-col items-end gap-y-4 w-full">
          <div className="flex flex-row gap-2 px-2 items-center w-full justify-between">
            <Typography
              variant="paragraph"
              className="text-sm md:text-base lg:!text-paragraph"
            >
              {sortedProperties.length} รายการ
            </Typography>
            <div className="flex">
              <Button
                variant="outlined"
                className="flex items-center gap-2 w-fit !px-2 !py-1 bg-white"
                color="deep-orange"
                onClick={handleSortByTime}
              >
                {sortOrder === "newest" ? (
                  <BarsArrowDownIcon className="h-5 w-5" />
                ) : (
                  <BarsArrowUpIcon className="h-5 w-5" />
                )}
                <span className="hidden md:block text-body1">
                  {sortOrder === "newest"
                    ? "ใหม่ที่สุดไปเก่าที่สุด"
                    : "เก่าที่สุดไปใหม่ที่สุด"}
                </span>
              </Button>
            </div>
          </div>
          {sortedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              imageUrlList={property.imageUrlList}
              title={property.title}
              subtitle={property.subtitle}
              location={property.location}
              date={property.date}
              price={property.price}
              pricePerSquareWah={property.pricePerSquareWah}
              pricePerRai={property.pricePerRai}
              finalPrice={property.finalPrice}
              tags={property.tags}
              onClick={() => handlePropertyClick(property.id)}
            />
          ))}
          {sortedProperties.length === 0 && (
            <div className="flex justify-center items-center w-full h-64">
              <Typography className="!text-gray-500 text-center text-h3">
                ไม่พบที่ดินที่ตรงตามเงื่อนไขการค้นหา
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyPage;
