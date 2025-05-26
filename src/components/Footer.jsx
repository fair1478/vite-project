import { IconButton, Typography } from "@material-tailwind/react";
import logo from "../assets/Logo.svg";
import logo_facebook from "../assets/logo_facebook.svg";
import logo_line from "../assets/cib_line.svg";
import logo_phone from "../assets/el_phone-alt.svg";
import { useFilters } from "../context/FilterContext";
import { useNavigate } from "react-router-dom";
const LINKS = [
  {
    items: ["ยอดนิยม", "ใหม่ล่าสุด", "ลดราคาแรง"],
  },
  {
    items: [
      "ต.เขาพระ อ.เมือง",
      "ต.สาริกา อ.เมือง",
      "ต.ดอนยอ อ.เมือง",
      "ต.พรหมมณี อ.เมือง",
      "ต.เขาเพิ่ม อ.บ้านนา",
      "ต.เกาะหวาย อ.ปากพลี",
    ],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  const navigate = useNavigate();
  const { updateApplyedFilter } = useFilters();
  const handleClick = (filterLocation) => {
    (event) => {
      event.preventDefault();
    };
    return () => {
      updateApplyedFilter("locations", [filterLocation]);
      navigate("/properties");
      window.scrollTo(0, 0);
    };
  };

  return (
    <footer className="relative bg-[#EBE7E5] md:px-16">
      <div className="hidden md:flex flex-col mx-auto justify-center w-full pt-[58px]">
        <div className="flex flex-col justify-center gap-24 2xl:gap-64 md:flex-row">
          <div className="flex flex-col">
            <img src={logo} alt="logo" className="h-12" />
            <Typography
              variant="paragraph"
              className="!text-primaryDark text-paragraph mt-12"
            >
              เกี่ยวกับเรา
            </Typography>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/pitcha.wichthong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo_facebook} alt="logo-facebook" className="h-8" />
              </a>
              <a
                href="https://line.me/ti/p/LeUP5YHMZs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo_line} alt="logo-line" className="h-8" />
              </a>
              <a
                href="tel:064-974-9249"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo_phone} alt="logo-phone" className="h-8" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Typography
                variant="paragraph"
                className="!text-primaryDark text-paragraph"
              >
                ที่ดินนครนายก
              </Typography>
              <a
                href="/properties"
                className="!text-primaryDark text-button2 underline"
              >
                ดูทั้งหมด
              </a>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-2 justify-between gap-16 w-full">
              {LINKS.flatMap(({ items }, groupIdx) =>
                items
                  .reduce((acc, link, linkIdx) => {
                    const colIdx = Math.floor(linkIdx / 3);
                    if (!acc[colIdx]) acc[colIdx] = [];
                    acc[colIdx].push(
                      <li key={`li-${groupIdx}-${colIdx}-${linkIdx}-${link}`}>
                        <Typography
                          as="a"
                          color="gray"
                          className="py-1.5 font-normal transition-colors hover:text-blue-gray-900 cursor-pointer"
                          onClick={
                            groupIdx === 0
                              ? (e) => {
                                  e.preventDefault();
                                  // Scroll to the element with id "popular-land" in Homepage.jsx
                                  const el = document.getElementById(
                                    `land-${linkIdx}`
                                  );
                                  if (el) {
                                    const y =
                                      el.getBoundingClientRect().top +
                                      window.pageYOffset -
                                      150;
                                    window.scrollTo({
                                      top: y,
                                      behavior: "smooth",
                                    });
                                  }
                                }
                              : handleClick(link)
                          }
                        >
                          {link}
                        </Typography>
                      </li>
                    );
                    return acc;
                  }, [])
                  .map((col, colIdx) => (
                    <ul key={`ul-${groupIdx}-${colIdx}`}>{col}</ul>
                  ))
              )}
            </div>
          </div>
        </div>
        <div className="mt-20 flex w-full flex-col items-center justify-center py-4 md:flex-row">
          <Typography
            variant="small"
            className="mb-4 text-center !text-body1 text-textDark md:mb-0"
          >
            &copy; {currentYear} Pinyaphat Wiangthongjirayot. (c) All Rights
            Reserved.
          </Typography>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="flex flex-col items-center justify-center gap-4 pt-6">
          <img src={logo} alt="logo" className="h-14" />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-8 px-8">
          <div className="flex flex-row items-center justify-between w-full gap-4">
            <Typography
              id="land-0"
              variant="paragraph"
              color="blue-gray"
              className="font-medium text-[#E73D00]"
            >
              ที่ดินนครนายก
            </Typography>
            <a
              href="/properties"
              className="text-[#E73D00] text-button2 underline"
            >
              ดูทั้งหมด
            </a>
          </div>
          <div className="grid grid-cols-2 justify-between w-full gap-4">
            {LINKS.map(({ items }, index) => (
              <ul key={`ul-${index}`}>
                {items.map((link, linkIdx) => (
                  <li key={`li-${index}-${linkIdx}-${link}`}>
                    <Typography
                      as="a"
                      color="gray"
                      className="py-1.5 font-normal text-sm transition-colors hover:text-blue-gray-900 cursor-pointer"
                      onClick={
                        index === 0
                          ? (e) => {
                              e.preventDefault();
                              // Scroll to the element with id "popular-land" in Homepage.jsx
                              const el = document.getElementById(
                                `land-${index}`
                              );
                              if (el) {
                                const y =
                                  el.getBoundingClientRect().top +
                                  window.pageYOffset -
                                  150;
                                window.scrollTo({
                                  top: y,
                                  behavior: "smooth",
                                });
                              }
                            }
                          : handleClick(link)
                      }
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="flex justify-between w-full gap-4 mt-4">
            <Typography
              variant="paragraph"
              className="!text-primaryDark text-body1 font-medium"
            >
              เกี่ยวกับเรา
            </Typography>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/pitcha.wichthong"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo_facebook} alt="logo-facebook" className="h-5" />
              </a>
              <a href="https://line.me/ti/p/LeUP5YHMZs" target="_blank">
                <img src={logo_line} alt="logo-line" className="h-5" />
              </a>
              <a href="tel:064-974-9249" target="_blank">
                <img src={logo_phone} alt="logo-phone" className="h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center py-4">
          <Typography
            variant="small"
            className="mb-4 text-center !text-body1 text-textDark md:mb-0"
          >
            &copy; {currentYear} Pinyapat Wiangthongjirayot. (c) All Rights
            Reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
