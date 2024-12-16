import { IconButton, Typography } from "@material-tailwind/react";
import logo from "../assets/Logo.svg";
import logo_facebook from "../assets/logo_facebook.svg";
import logo_line from "../assets/cib_line.svg";
import logo_phone from "../assets/el_phone-alt.svg";

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative bg-[#EBE7E5]">
      <div className="mx-auto w-full px-40 pt-[58px]">
        <div className="flex flex-col justify-center gap-64 md:flex-row">
          <div className="flex flex-col">
            <img src={logo} alt="logo" className="h-12" />
            <Typography
              variant="paragraph"
              className="!text-primaryDark text-paragraph mt-12"
            >
              เกี่ยวกับเรา
            </Typography>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com/pitcha.wichthong">
                <img src={logo_facebook} alt="logo-facebook" className="h-8" />
              </a>
              <a href="https://line.me/ti/p/LeUP5YHMZs">
                <img src={logo_line} alt="logo-line" className="h-8" />
              </a>
              <a href="tel:064-974-9249">
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
            <div className="grid grid-cols-3 justify-between gap-16">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-3 font-medium opacity-40"
                  >
                    {title}
                  </Typography>
                  {items.map((link) => (
                    <li key={link}>
                      <Typography
                        as="a"
                        href="#"
                        color="gray"
                        className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                      >
                        {link}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ))}
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
    </footer>
  );
}

export default Footer;
