import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  ListItem,
  Collapse,
  Button,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useFilters } from "../context/FilterContext";

function PriceRangeFilter() {
  const { filters, updateFilter, updateValid } = useFilters();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [error, setError] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  function formatNumberWithCommas(value) {
    if (value === null || value === "" || value === 0) return "";
    return Number(value).toLocaleString("en-US");
  }

  const validateRange = (newMin, newMax) => {
    if (newMin !== 0 && newMax !== 0 && newMax !== "" && newMin !== "") {
      console.log("newMin", newMin, "newMax", newMax);
      setError(Number(newMin) > Number(newMax));
      updateValid(Number(newMin) > Number(newMax) ? false : true);
    } else {
      setError(false);
      updateValid(true);
    }
  };

  const handlePriceChange = (type, value) => {
    updateFilter(type, value);
    validateRange(
      type === "minPrice" ? value : filters.minPrice,
      type === "maxPrice" ? value : filters.maxPrice
    );
  };

  return (
    <div className="flex lg:relative" ref={dropdownRef}>
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
            d="M14 13C13.1667 13 12.4583 12.7083 11.875 12.125C11.2917 11.5417 11 10.8333 11 10C11 9.16667 11.2917 8.45833 11.875 7.875C12.4583 7.29167 13.1667 7 14 7C14.8333 7 15.5417 7.29167 16.125 7.875C16.7083 8.45833 17 9.16667 17 10C17 10.8333 16.7083 11.5417 16.125 12.125C15.5417 12.7083 14.8333 13 14 13ZM7 16C6.45 16 5.97917 15.8042 5.5875 15.4125C5.19583 15.0208 5 14.55 5 14V6C5 5.45 5.19583 4.97917 5.5875 4.5875C5.97917 4.19583 6.45 4 7 4H21C21.55 4 22.0208 4.19583 22.4125 4.5875C22.8042 4.97917 23 5.45 23 6V14C23 14.55 22.8042 15.0208 22.4125 15.4125C22.0208 15.8042 21.55 16 21 16H7ZM9 14H19C19 13.45 19.1958 12.9792 19.5875 12.5875C19.9792 12.1958 20.45 12 21 12V8C20.45 8 19.9792 7.80417 19.5875 7.4125C19.1958 7.02083 19 6.55 19 6H9C9 6.55 8.80417 7.02083 8.4125 7.4125C8.02083 7.80417 7.55 8 7 8V12C7.55 12 8.02083 12.1958 8.4125 12.5875C8.80417 12.9792 9 13.45 9 14ZM19 20H3C2.45 20 1.97917 19.8042 1.5875 19.4125C1.19583 19.0208 1 18.55 1 18V8C1 7.71667 1.09583 7.47917 1.2875 7.2875C1.47917 7.09583 1.71667 7 2 7C2.28333 7 2.52083 7.09583 2.7125 7.2875C2.90417 7.47917 3 7.71667 3 8V18H19C19.2833 18 19.5208 18.0958 19.7125 18.2875C19.9042 18.4792 20 18.7167 20 19C20 19.2833 19.9042 19.5208 19.7125 19.7125C19.5208 19.9042 19.2833 20 19 20Z"
            fill="#F77A32"
          />
        </svg>
        ราคา
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`h-3.5 w-3.5 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Desktop Dropdown */}
      <div
        className={`hidden lg:block absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg z-50 transition-all duration-100 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-2 scale-100 pointer-events-auto visible"
            : "opacity-0 scale-95 pointer-events-none invisible"
        }`}
      >
        <div className="p-3">
          <Typography variant="h6" className="mb-2 text-sm">
            ช่วงราคา
          </Typography>
          <div className="flex flex-row gap-2">
            <Input
              min={0}
              type="text"
              label="ราคาต่ำสุด (บาท)"
              className="!h-9 3xl:!h-10"
              value={formatNumberWithCommas(filters.minPrice)}
              onChange={(e) => {
                const input = e.target;
                let rawValue = input.value.replace(/,/g, ""); // Remove commas
                const cursorPosition = input.selectionStart; // Track cursor position
                const textBeforeCursor = input.value.slice(0, cursorPosition); // Text before cursor
                const commasBeforeCursor = (textBeforeCursor.match(/,/g) || [])
                  .length; // Count commas before cursor

                // Prevent leading zeros
                if (rawValue.startsWith("0")) {
                  rawValue = rawValue.replace(/^0+/, ""); // Remove leading zeros
                  handlePriceChange(
                    "minPrice",
                    rawValue === "" ? 0 : Number(rawValue)
                  );
                  window.requestAnimationFrame(() => {
                    input.setSelectionRange(0, 0);
                  });
                }

                const numericValue = rawValue === "" ? 0 : Number(rawValue);

                if (!isNaN(numericValue)) {
                  handlePriceChange("minPrice", numericValue);

                  // Format the value with commas
                  const formattedValue =
                    Number(numericValue).toLocaleString("en-US");

                  // Calculate the new cursor position
                  const newCursorPosition = cursorPosition - commasBeforeCursor;
                  const newTextBeforeCursor = formattedValue.slice(
                    0,
                    newCursorPosition
                  );
                  const newCommasBeforeCursor = (
                    newTextBeforeCursor.match(/,/g) || []
                  ).length;
                  const adjustedCursorPosition =
                    newCursorPosition + newCommasBeforeCursor;

                  // Restore the cursor position
                  window.requestAnimationFrame(() => {
                    input.setSelectionRange(
                      adjustedCursorPosition,
                      adjustedCursorPosition
                    );
                  });
                }
              }}
              error={error}
              onKeyDown={(e) => {
                const validKeys = /^[0-9]$/;
                if (
                  !validKeys.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                }
              }}
            />
            <Input
              min={1}
              type="text"
              label="ราคาสูงสุด (บาท)"
              className="!h-9 3xl:!h-10"
              value={formatNumberWithCommas(filters.maxPrice)}
              onChange={(e) => {
                const input = e.target;
                let rawValue = input.value.replace(/,/g, ""); // Remove commas
                const cursorPosition = input.selectionStart; // Track cursor position
                const textBeforeCursor = input.value.slice(0, cursorPosition); // Text before cursor
                const commasBeforeCursor = (textBeforeCursor.match(/,/g) || [])
                  .length; // Count commas before cursor

                const numericValue = rawValue === "" ? 0 : Number(rawValue);
                // Prevent leading zeros
                if (rawValue.startsWith("0") && rawValue.length > 1) {
                  rawValue = rawValue.replace(/^0+/, ""); // Remove leading zeros
                  handlePriceChange("maxPrice", rawValue);
                  window.requestAnimationFrame(() => {
                    input.setSelectionRange(0, 0);
                  });
                } else if (!isNaN(numericValue)) {
                  handlePriceChange("maxPrice", numericValue);

                  // Format the value with commas
                  const formattedValue =
                    Number(numericValue).toLocaleString("en-US");

                  // Calculate the new cursor position
                  const newCursorPosition = cursorPosition - commasBeforeCursor;
                  const newTextBeforeCursor = formattedValue.slice(
                    0,
                    newCursorPosition
                  );
                  const newCommasBeforeCursor = (
                    newTextBeforeCursor.match(/,/g) || []
                  ).length;
                  const adjustedCursorPosition =
                    newCursorPosition + newCommasBeforeCursor;

                  // Restore the cursor position
                  window.requestAnimationFrame(() => {
                    input.setSelectionRange(
                      adjustedCursorPosition,
                      adjustedCursorPosition
                    );
                  });
                }
              }}
              error={error}
              onKeyDown={(e) => {
                const validKeys = /^[0-9]$/;
                if (
                  !validKeys.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          {error && (
            <Typography variant="small" color="red" className="mt-2">
              Min price cannot be greater than max price
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
          ช่วงราคา
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMobileMenu ? "rotate-180" : ""
            }`}
          />
        </Typography>
        <Collapse open={openMobileMenu}>
          <div
            className={`flex flex-col h-full p-4 pt-2 bg-white ${
              openMobileMenu ? "rounded-b-lg" : ""
            }`}
          >
            <div className="flex flex-row flex-wrap gap-2">
              <Input
                min={0}
                type="text"
                label="ราคาต่ำสุด (บาท)"
                className="!h-9 !text-xs placeholder:!text-xs"
                labelProps={{
                  className: "peer-placeholder-shown:text-xs",
                }}
                value={formatNumberWithCommas(filters.minPrice)}
                onChange={(e) => {
                  const input = e.target;
                  let rawValue = input.value.replace(/,/g, ""); // Remove commas
                  const cursorPosition = input.selectionStart; // Track cursor position
                  const textBeforeCursor = input.value.slice(0, cursorPosition); // Text before cursor
                  const commasBeforeCursor = (
                    textBeforeCursor.match(/,/g) || []
                  ).length; // Count commas before cursor

                  // Prevent leading zeros
                  if (rawValue.startsWith("0")) {
                    rawValue = rawValue.replace(/^0+/, ""); // Remove leading zeros
                    handlePriceChange(
                      "minPrice",
                      rawValue === "" ? 0 : Number(rawValue)
                    );
                    window.requestAnimationFrame(() => {
                      input.setSelectionRange(0, 0);
                    });
                  }

                  const numericValue = rawValue === "" ? 0 : Number(rawValue);

                  if (!isNaN(numericValue)) {
                    handlePriceChange("minPrice", numericValue);

                    // Format the value with commas
                    const formattedValue =
                      Number(numericValue).toLocaleString("en-US");

                    // Calculate the new cursor position
                    const newCursorPosition =
                      cursorPosition - commasBeforeCursor;
                    const newTextBeforeCursor = formattedValue.slice(
                      0,
                      newCursorPosition
                    );
                    const newCommasBeforeCursor = (
                      newTextBeforeCursor.match(/,/g) || []
                    ).length;
                    const adjustedCursorPosition =
                      newCursorPosition + newCommasBeforeCursor;

                    // Restore the cursor position
                    window.requestAnimationFrame(() => {
                      input.setSelectionRange(
                        adjustedCursorPosition,
                        adjustedCursorPosition
                      );
                    });
                  }
                }}
                error={error}
                onKeyDown={(e) => {
                  const validKeys = /^[0-9]$/;
                  if (
                    !validKeys.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              <Input
                min={1}
                type="text"
                label="ราคาสูงสุด (บาท)"
                className="!h-9 !text-xs placeholder:!text-xs"
                labelProps={{
                  className: "peer-placeholder-shown:text-xs",
                }}
                value={formatNumberWithCommas(filters.maxPrice)}
                onChange={(e) => {
                  const input = e.target;
                  let rawValue = input.value.replace(/,/g, ""); // Remove commas
                  const cursorPosition = input.selectionStart; // Track cursor position
                  const textBeforeCursor = input.value.slice(0, cursorPosition); // Text before cursor
                  const commasBeforeCursor = (
                    textBeforeCursor.match(/,/g) || []
                  ).length; // Count commas before cursor

                  const numericValue = rawValue === "" ? 0 : Number(rawValue);
                  // Prevent leading zeros
                  if (rawValue.startsWith("0") && rawValue.length > 1) {
                    rawValue = rawValue.replace(/^0+/, ""); // Remove leading zeros
                    handlePriceChange("maxPrice", rawValue);
                    window.requestAnimationFrame(() => {
                      input.setSelectionRange(0, 0);
                    });
                  } else if (!isNaN(numericValue)) {
                    handlePriceChange("maxPrice", numericValue);

                    // Format the value with commas
                    const formattedValue =
                      Number(numericValue).toLocaleString("en-US");

                    // Calculate the new cursor position
                    const newCursorPosition =
                      cursorPosition - commasBeforeCursor;
                    const newTextBeforeCursor = formattedValue.slice(
                      0,
                      newCursorPosition
                    );
                    const newCommasBeforeCursor = (
                      newTextBeforeCursor.match(/,/g) || []
                    ).length;
                    const adjustedCursorPosition =
                      newCursorPosition + newCommasBeforeCursor;

                    // Restore the cursor position
                    window.requestAnimationFrame(() => {
                      input.setSelectionRange(
                        adjustedCursorPosition,
                        adjustedCursorPosition
                      );
                    });
                  }
                }}
                error={error}
                onKeyDown={(e) => {
                  const validKeys = /^[0-9]$/;
                  if (
                    !validKeys.test(e.key) &&
                    e.key !== "Backspace" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {error && (
              <Typography variant="small" color="red" className="mt-2">
                Min price cannot be greater than max price
              </Typography>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default PriceRangeFilter;
