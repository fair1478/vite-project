import { useState, useRef, useEffect } from "react";
import { Typography, Button, Input, Collapse } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useFilters } from "../context/FilterContext";

function AreaRangeFilter() {
  const { filters, updateFilter, updateValid } = useFilters();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [wahError, setWahError] = useState(""); // Error for Wah exceeding 400
  const [rangeError, setRangeError] = useState(""); // Error for invalid range
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

  useEffect(() => {
    // Check if wahError or rangeError is set and update the valid state accordingly
    if (wahError || rangeError) {
      updateValid(false);
    } else {
      updateValid(true);
    }
  }, [wahError, rangeError, updateValid]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const handleAreaChange = (type, value) => {
    if (value.startsWith("0")) {
      value = value.replace(/^0+/, ""); // Remove leading zeros
    }
    console.log("value", value);
    // Update the filter value
    updateFilter(type, value === "" ? 0 : Number(value));
    // Validate that minWah and maxWah do not exceed 400
    if (type === "minAreaSquareWah" || type === "maxAreaSquareWah") {
      if (Number(value) >= 400) {
        setWahError("ตารางวา ต้องไม่เกิน 400");
        return; // Set Wah-specific error
      } else {
        setWahError(""); // Clear Wah-specific error if corrected
      }
    }

    // Validate the range
    const minRai = type === "minAreaRai" ? value : filters.minAreaRai;
    const minWah =
      type === "minAreaSquareWah" ? value : filters.minAreaSquareWah;
    const maxRai = type === "maxAreaRai" ? value : filters.maxAreaRai;
    const maxWah =
      type === "maxAreaSquareWah" ? value : filters.maxAreaSquareWah;

    // If any wah value exceeds 400, skip range validation
    if (Number(minWah) > 400 || Number(maxWah) > 400) {
      return;
    }

    const minTotalWah = (Number(minRai) || 0) * 400 + (Number(minWah) || 0);
    const maxTotalWah = (Number(maxRai) || 0) * 400 + (Number(maxWah) || 0);

    if (minTotalWah !== 0 && maxTotalWah !== 0 && minTotalWah > maxTotalWah) {
      setRangeError("พื้นที่ต่ำสุดต้องน้อยกว่าพื้นที่สูงสุด");
    } else {
      setRangeError(""); // Clear range error if validation passes
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="text"
        className="hidden lg:flex items-center bg-white gap-2 text-sm font-normal capitalize tracking-normal"
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
            d="M17 22V19H7C6.45 19 5.97917 18.8042 5.5875 18.4125C5.19583 18.0208 5 17.55 5 17V7H2C1.71667 7 1.47917 6.90417 1.2875 6.7125C1.09583 6.52083 1 6.28333 1 6C1 5.71667 1.09583 5.47917 1.2875 5.2875C1.47917 5.09583 1.71667 5 2 5H5V2C5 1.71667 5.09583 1.47917 5.2875 1.2875C5.47917 1.09583 5.71667 1 6 1C6.28333 1 6.52083 1.09583 6.7125 1.2875C6.90417 1.47917 7 1.71667 7 2V17H22C22.2833 17 22.5208 17.0958 22.7125 17.2875C22.9042 17.4792 23 17.7167 23 18C23 18.2833 22.9042 18.5208 22.7125 18.7125C22.5208 18.9042 22.2833 19 22 19H19V22C19 22.2833 18.9042 22.5208 18.7125 22.7125C18.5208 22.9042 18.2833 23 18 23C17.7167 23 17.4792 22.9042 17.2875 22.7125C17.0958 22.5208 17 22.2833 17 22ZM17 15V7H9V5H17C17.55 5 18.0208 5.19583 18.4125 5.5875C18.8042 5.97917 19 6.45 19 7V15H17Z"
            fill="#F77A32"
          />
        </svg>
        ขนาดพื้นที่
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
        <div className="px-6 py-4">
          <Typography variant="h6" className="mb-4 text-sm">
            ขนาดพื้นที่
          </Typography>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-2">
              <Typography
                variant="small"
                className="!font-semibold !text-body2 text-[#505050]"
              >
                ต่ำสุด
              </Typography>
              <div className="flex flex-col gap-2">
                <Input
                  type="text"
                  label="ไร่"
                  className="!h-9 3xl:!h-10"
                  value={filters.minAreaRai === 0 ? "" : filters.minAreaRai}
                  onChange={(e) =>
                    handleAreaChange("minAreaRai", e.target.value)
                  }
                  error={wahError !== "" || rangeError !== ""}
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
                  className="!h-9 3xl:!h-10"
                  type="text"
                  label="ตารางวา"
                  value={
                    filters.minAreaSquareWah === 0
                      ? ""
                      : filters.minAreaSquareWah
                  }
                  onChange={(e) =>
                    handleAreaChange("minAreaSquareWah", e.target.value)
                  }
                  error={wahError !== "" || rangeError !== ""}
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
            </div>
            <div className="flex flex-col gap-2">
              <Typography
                variant="small"
                className="!font-semibold !text-body2 text-[#505050]"
              >
                สูงสุด
              </Typography>
              <div className="flex flex-col gap-2">
                <Input
                  className="!h-9 3xl:!h-10"
                  type="text"
                  label="ไร่"
                  value={filters.maxAreaRai === 0 ? "" : filters.maxAreaRai}
                  onChange={(e) =>
                    handleAreaChange("maxAreaRai", e.target.value)
                  }
                  error={wahError !== "" || rangeError !== ""}
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
                  className="!h-9 3xl:!h-10"
                  type="text"
                  label="ตารางวา"
                  value={
                    filters.maxAreaSquareWah === 0
                      ? ""
                      : filters.maxAreaSquareWah
                  }
                  onChange={(e) =>
                    handleAreaChange("maxAreaSquareWah", e.target.value)
                  }
                  error={wahError !== "" || rangeError !== ""}
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
            </div>
          </div>
          {(wahError !== "" || rangeError !== "") && (
            <Typography variant="small" color="red" className="mt-2">
              {wahError !== "" || rangeError !== ""}
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
          เลือกพื้นที่
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
            <div className="flex flex-row py-2 gap-6">
              <div className="flex flex-col gap-2 w-1/2">
                <Typography
                  variant="small"
                  className="mb-2 !font-semibold !text-body1 text-[#505050]"
                >
                  ต่ำสุด
                </Typography>
                <Input
                  min={0}
                  size="lg"
                  type="number"
                  label="ไร่"
                  className="!h-9 !text-xs placeholder:!text-xs"
                  labelProps={{
                    className: "peer-placeholder-shown:text-xs",
                  }}
                  containerProps={{
                    className: "!min-w-[0px]",
                  }}
                  value={filters.minAreaRai === 0 ? "" : filters.minAreaRai}
                  onChange={(e) =>
                    handleAreaChange("minAreaRai", e.target.value)
                  }
                  error={wahError !== "" || rangeError !== ""}
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
                  min={0}
                  max={400}
                  size="lg"
                  type="number"
                  label="ตารางวา"
                  className="!h-9 !text-xs placeholder:!text-xs"
                  labelProps={{
                    className: "peer-placeholder-shown:text-xs",
                  }}
                  containerProps={{
                    className: "!min-w-[0px]",
                  }}
                  value={
                    filters.minAreaSquareWah === 0
                      ? ""
                      : filters.minAreaSquareWah
                  }
                  onChange={(e) =>
                    handleAreaChange("minAreaSquareWah", e.target.value)
                  }
                  error={wahError !== "" || rangeError !== ""}
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
              <div className="flex flex-col gap-2 w-1/2">
                <Typography
                  variant="small"
                  className="mb-2 !font-semibold !text-body1 text-[#505050]"
                >
                  สูงสุด
                </Typography>
                <Input
                  min={0}
                  size="lg"
                  type="number"
                  label="ไร่"
                  className="!h-9 !text-xs placeholder:!text-xs"
                  labelProps={{
                    className: "peer-placeholder-shown:text-xs",
                  }}
                  containerProps={{
                    className: "!min-w-[0px]",
                  }}
                  value={filters.maxAreaRai === 0 ? "" : filters.maxAreaRai}
                  onChange={(e) =>
                    handleAreaChange("maxAreaRai", e.target.value)
                  }
                  error={wahError !== "" || rangeError !== ""}
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
                  max={400}
                  size="lg"
                  type="number"
                  label="ตารางวา"
                  className="!h-9 !text-xs placeholder:!text-xs"
                  labelProps={{
                    className: "peer-placeholder-shown:text-xs",
                  }}
                  containerProps={{
                    className: "!min-w-[0px]",
                  }}
                  value={
                    filters.maxAreaSquareWah === 0
                      ? ""
                      : filters.maxAreaSquareWah
                  }
                  onChange={(e) =>
                    handleAreaChange("maxAreaSquareWah", e.target.value)
                  }
                  error={wahError !== "" || rangeError !== ""}
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
            </div>
            {(wahError !== "" || rangeError !== "") && (
              <Typography variant="small" color="red" className="mt-2">
                {wahError !== "" || rangeError !== ""}
              </Typography>
            )}
          </div>
        </Collapse>
      </div>
    </div>
  );
}

export default AreaRangeFilter;
