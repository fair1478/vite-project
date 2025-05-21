import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import PropertyCard from "../../components/PropertyCard";
import api from "../../utils/api";
import { Button, Typography, Chip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useFilters } from "../../context/FilterContext";
import { getPropertiesByQuery } from "../../store/propertyReducers";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
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

        console.log("Fetching properties with filters:", applyedFilters);
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
    console.log("Current filter", applyedFilters);
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
      console.log("updatedFilters.maxAreaRai", updatedFilters.maxAreaRai);
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

            // Render combined price chip
            if (key === "locations" || key === "tags") {
              if (Array.isArray(value) && value.length > 0) {
                return value.map((item) => (
                  <Chip
                    key={`${key}-${item}`}
                    value={`${key}: ${item}`}
                    action={
                      <Button
                        variant="filled"
                        color="white"
                        onClick={() => handleRemoveFilter(key, item)}
                        className="!px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                      >
                        <XCircleIcon className="h-6 w-6 text-[#5F6368]" />
                        // Render combined price chip
                      </Button>
                    }
                    className="flex space-x-2 bg-secondary !px-2 !py-1 md:!px-4 md:!py-3 text-body2 md:text-body1 rounded-full shadow-none text-primary !normal-case"
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
                  value={`${key}: ${value}`}
                  action={
                    <Button
                      variant="filled"
                      color="white"
                      onClick={() => handleRemoveFilter(key, value)}
                      className="!px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                    >
                      <XCircleIcon className="h-6 w-6 text-[#5F6368]" />
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
              value={`ราคา: ${
                currentFilters.minPrice > 0 ? currentFilters.minPrice : "-"
              } - ${
                currentFilters.maxPrice > 0 ? currentFilters.maxPrice : "-"
              } บาท`}
              action={
                <Button
                  variant="filled"
                  color="white"
                  onClick={() => {
                    handleRemoveFilter("minPrice", currentFilters.minPrice);
                    handleRemoveFilter("maxPrice", currentFilters.maxPrice);
                  }}
                  className="!px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                >
                  <XCircleIcon className="h-6 w-6 text-[#5F6368]" />
                </Button>
              }
              className="flex space-x-2 bg-secondary !px-2 !py-1 md:!px-4 md:!py-3 !text-body2 md:!text-body1 rounded-full shadow-none text-primary !normal-case"
            />
          )}
          {(currentFilters.minAreaRai > 0 ||
            currentFilters.minAreaSquareWah > 0) && (
            <Chip
              key="areaRai"
              value={`ขนาด(ไร่): ${
                currentFilters.minAreaRai > 0 ? currentFilters.minAreaRai : "-"
              } - ${
                currentFilters.minAreaSquareWah > 0
                  ? currentFilters.minAreaSquareWah
                  : "-"
              } ไร่`}
              action={
                <Button
                  variant="filled"
                  color="white"
                  onClick={() => {
                    handleRemoveFilter("minAreaRai", currentFilters.minAreaRai);
                    handleRemoveFilter(
                      "minAreaSquareWah",
                      currentFilters.minAreaSquareWah
                    );
                  }}
                  className="!px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                >
                  <XCircleIcon className="h-6 w-6 text-[#5F6368]" />
                </Button>
              }
              className="flex space-x-2 bg-secondary !px-2 !py-1 md:!px-4 md:!py-3 !text-body2 md:!text-body1 rounded-full shadow-none text-primary !normal-case"
            />
          )}
          {(currentFilters.maxAreaRai > 0 ||
            currentFilters.maxAreaSquareWah > 0) && (
            <Chip
              key="areaWah"
              value={`ขนาด(วา): ${
                currentFilters.maxAreaRai > 0 ? currentFilters.maxAreaRai : "-"
              } - ${
                currentFilters.maxAreaSquareWah > 0
                  ? currentFilters.maxAreaSquareWah
                  : "-"
              } วา`}
              action={
                <Button
                  variant="filled"
                  color="white"
                  onClick={() => {
                    handleRemoveFilter("maxAreaRai", currentFilters.maxAreaRai);
                    handleRemoveFilter(
                      "maxAreaSquareWah",
                      currentFilters.maxAreaSquareWah
                    );
                  }}
                  className="!px-0 py-0 !text-button2 rounded-full shadow-none hover:bg-gray-200"
                >
                  <XCircleIcon className="h-6 w-6 text-[#5F6368]" />
                </Button>
              }
              className="flex space-x-2 bg-secondary !px-2 !py-1 md:!px-4 md:!py-3 !text-body2 md:!text-body1 rounded-full shadow-none text-primary !normal-case"
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
            <div className="flex gap-2">
              <Button
                variant="outlined"
                className="flex items-center w-fit !px-4 !py-2 bg-white"
                color="deep-orange"
                onClick={handleSortByTime}
              >
                {sortOrder === "newest" ? (
                  <BarsArrowDownIcon className="h-5 w-5" />
                ) : (
                  <BarsArrowUpIcon className="h-5 w-5" />
                )}
                <span className="hidden md:block">
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
              <Typography className="text-gray-500 text-center text-h1">
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
