import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Outlet } from "react-router-dom";
import logo from "../assets/Logo.svg";
import Footer from "../components/Footer";
import MenuDropdown from "../components/MenuDropdown";
import {
  Navbar,
  Typography,
  Collapse,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

export function GalleryLayout() {
  const [isSticky, setIsSticky] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const [searchText, setSearchText] = useState("");

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
        setIsSticky(heroSearchBarBottom <= 192);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="bg-bg">
      <div
        className={`sticky top-0 w-full z-[999] px-4 lg:px-[120px] pt-6 lg:pt-0 mb-4 bg-bg ${
          isTop ? "shadow-none" : "shadow-0"
        }`}
      >
        <nav
          className={`flex flex-col justify-between items-center w-full py-4 space-y-4`}
        >
          <div className="flex flex-row justify-between items-center w-full">
            <div className="hidden lg:block">
              <a as="a" href="/">
                <img src={logo} alt="logo" className="h-12" />
              </a>
            </div>

            <div className="relative w-full lg:w-7/12">
              <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Find your right property..."
                className={`pl-6 pr-2 h-[48px] w-full text-body2 lg:text-paragraph justify-center rounded-[100px] focus:outline-none shadow-search`}
              />
              <div className="absolute inset-y-0 right-2 mt-[8px] flex items-center justify-center w-8 h-8 rounded-full bg-primary">
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

            <div className="hidden lg:flex items-center space-x-4">
              <a as="a" href="/contract">
                <Button
                  variant="filled"
                  color="orange"
                  className="rounded-2xl px-6 py-3 text-bg !text-button1"
                >
                  ติดต่อเรา
                </Button>
              </a>
            </div>
          </div>
          // Add the following code snippet
          <div className="flex flex-row justify-center items-center w-full">
            <MenuDropdown item={navListMenuItems} />
            <MenuDropdown item={navListMenuItems} />
            <MenuDropdown item={navListMenuItems} />
          </div>
        </nav>
      </div>
      <div className="mx-4 lg:mx-[120px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default GalleryLayout;
