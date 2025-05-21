import { Checkbox, Select, Option } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const MultiSelect = ({ name, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newOption, setNewOption] = useState("");
  const [sortBy, setSortBy] = useState("count-desc");
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    if (value.includes(option)) {
      // Remove the option if already selected
      onChange(value.filter((item) => item !== option));
    } else {
      // Add the option if not selected
      onChange([...value, option]);
    }
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    if (newOption && !options.some((opt) => opt.value === newOption)) {
      options.push({ value: newOption, count: 0 }); // Add new option with default count
      handleSelect(newOption);
      setNewOption("");
    }
  };

  const sortedOptions = [...options].sort((a, b) => {
    switch (sortBy) {
      case "count-desc":
        return b.count - a.count;
      case "count-asc":
        return a.count - b.count;
      case "name-asc":
        return a.value.localeCompare(b.value);
      case "name-desc":
        return b.value.localeCompare(a.value);
      default:
        return 0;
    }
  });

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="relative">
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={handleToggle}
          className="flex justify-between items-center w-full [@media(min-height:1400px)]:!h-20 [@media(min-height:1400px)]:!text-2xl bg-white/70 border border-blue-gray-200 rounded-md shadow-sm px-4 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
        >
          {value.length > 0 ? value.join(", ") : `เลือก${name}`}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-blue-gray-200 rounded-lg shadow-lg h-72 overflow-y-auto">
            {/* Sort Button */}
            <div className="flex justify-end px-4 py-2">
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
            <ul>
              {sortedOptions.map((option) => (
                <li
                  key={option.value}
                  className="flex items-center px-4 py-2 [@media(min-height:1400px)]:!text-2xl [@media(min-height:1400px)]:!h-20 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(option.value)}
                >
                  <Checkbox
                    className="size-4 [@media(min-height:1400px)]:!size-6"
                    labelProps={{ className: "whitespace-nowrap" }}
                    checked={value.includes(option.value)}
                    readOnly
                  />
                  {option.value}
                  <span className="ml-1 text-gray-500">
                    ({option.count || 0})
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex items-center px-4 py-2">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                className="w-full border border-blue-gray-200 rounded-lg px-2 py-1"
                placeholder={`เพิ่ม${name}ใหม่`}
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="ml-2 bg-primary text-white px-4 py-1 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
