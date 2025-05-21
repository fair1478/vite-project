import { GalleryCardPagination } from "../components/GalleryCardPagination";
import { Button, Typography } from "@material-tailwind/react";
import SeeFull from "../components/SeeFull";
import SubDistrict from "../components/SubDistrict";
import { useEffect, useState } from "react";
import api from "../utils/api";
function HomePage() {
  const sampleCards = [
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      ],
      title: "ที่ดินติดแม่น้ำนครนายก 45 เมตร รวม 2 โฉนด",
      bodyText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.",
      location: "นครนายก",
      price: "1,800,000",
      pricePerUnit: "2,225",
      pricePerRiai: "890,000",
      finalPrice: "1,780,000",
    },
    {
      images: [
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "1,800,000",
      pricePerUnit: "2,225",
      pricePerRiai: "890,000",
      finalPrice: "1,780,000",
    },
    // Add more cards as needed
    {
      images: [
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Third Property Listing",
      bodyText:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      location: "นครนายก",
      price: "1,800,000",
      pricePerUnit: "2,225",
      pricePerRiai: "890,000",
      finalPrice: "1,780,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "1,800,000",
      pricePerUnit: "2,225",
      pricePerRiai: "890,000",
      finalPrice: "1,780,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "1,800,000",
      pricePerUnit: "2,225",
      pricePerRiai: "890,000",
      finalPrice: "1,780,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "1,800,000",
      pricePerUnit: "2,225",
      pricePerRiai: "890,000",
      finalPrice: "1,780,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "1,800,000",
      pricePerUnit: "2,225",
      pricePerRiai: "890,000",
      finalPrice: "1,780,000",
    },
    {
      images: [
        "https://s3-alpha-sig.figma.com/img/46b7/1fc0/c63b506d65d00af659b04b8a2a152697?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bGWQO~8mRUT38AsA3S1kHlqtneBz0czKPuQRZ76BatBP6JmQRGhFTYb0VXTYZL4VLblRDFIk1qyXTwFfh6msukO8vU~0M0ISwNfgfjLrVZZttcj1HLqN1rKXopgeWNwutGLxPjm5wYd~m-8uMnse6qI7Zml~-FzoakKG7zAsdIKQ6fmhUOWrstm3ORA47hlhHSLF329SDs-9TYedbrWThHNZ4dQMFsrIN6u48Zfu5OMzQdil~MYHxC4h1wAFpSqqKmz0pEYfX4y52XshX7XyvdZnCJHR~2HbxHbgw~GiUYKAjjAdzZzYQzFQzic~w~siePrxgiN2MoC~BEf~X8Tt7A__",
      ],
      title: "Another Property Listing",
      bodyText:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "นครนายก",
      price: "1,800,000",
      pricePerUnit: "2,225",
      pricePerRiai: "890,000",
      finalPrice: "1,780,000",
    },
  ];

  const [latestProperties, setLatestProperties] = useState([]);
  const [orderDiscount, setOrderDiscount] = useState([]);
  const [popularity, setPopularity] = useState([]);

  useEffect(() => {
    const fetchLatestProperties = async () => {
      try {
        const response = await api.get("/latestProperties");
        setLatestProperties(response.data);
      } catch (error) {
        console.error("Error fetching latest properties:", error);
      }
    };
    const fetchOrderDiscount = async () => {
      try {
        const response = await api.get("/orderDiscount");
        setOrderDiscount(response.data);
      } catch (error) {
        console.error("Error fetching order discount:", error);
      }
    };
    const fetchPopularity = async () => {
      try {
        const response = await api.get("/popularity");
        setPopularity(response.data);
      } catch (error) {
        console.error("Error fetching popularity:", error);
      }
    };

    fetchPopularity();
    fetchOrderDiscount();
    fetchLatestProperties();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-y-16 md:pb-64 px-2">
        <div className="flex flex-col gap-4 justify-center items-center">
          <Typography
            variant="paragraph"
            className="!text-body1 md:!text-paragraph text-center text-[#131D10] mb-4 lg:mb-8"
          >
            เรามีที่ดินให้คุณเลือกหลากหลายที่ใน{" "}
            <br className="block md:hidden" />
            จังหวัดนครนายก
          </Typography>
          <SubDistrict />
          <SeeFull />
        </div>
        <div>
          <div className="flex justify-between pb-6">
            <Typography className="!text-h2 md:!text-h1">
              ที่ดินยอดนิยม
            </Typography>
            <SeeFull />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <GalleryCardPagination
              cards={popularity}
              cardsPerPage={
                window.innerWidth > 1140
                  ? 3
                  : window.innerWidth > 720
                  ? 2
                  : popularity.length
              }
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between pb-6">
            <Typography className="!text-h2 md:!text-h1">
              ที่ดินใหม่ล่าสุด
            </Typography>
            <SeeFull />
          </div>
          <div className="gap-4 w-full">
            <GalleryCardPagination
              cards={latestProperties}
              cardsPerPage={
                window.innerWidth > 1140
                  ? 3
                  : window.innerWidth > 720
                  ? 2
                  : latestProperties.length
              }
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between pb-6">
            <Typography className="!text-h2 md:!text-h1">
              ที่ดินลดราคาแรง
            </Typography>
            <SeeFull />
          </div>
          <div className=" gap-4 w-full">
            <GalleryCardPagination
              cards={orderDiscount}
              cardsPerPage={
                window.innerWidth > 1140
                  ? 3
                  : window.innerWidth > 720
                  ? 2
                  : orderDiscount.length
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full justify-center items-center rounded-[32px] mb-24 md:mb-72 py-8 px-10 lg:py-12 lg:px-8 2xl:px-24 gap-[35px] mt-16 bg-[#F0884C] shadow-1">
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <img
              src="src/assets/mae-kai.png"
              alt="mae-kai"
              className="size-32 lg:size-64"
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <Typography
              variant="h1"
              className="text-bg text-center !text-h3 md:!text-h1"
            >
              ทำความรู้จักแม่ไก่
            </Typography>
            <Typography
              variant="paragraph"
              className="text-bg text-center !text-body2 md:!text-paragraph"
            >
              นายหน้าที่ดิน ดูแล บริการงานขายที่ดินนครนายก และจังหวัดใกล้เคียง{" "}
              <br />
              ใส่ใจงานให้ทั้งระบบและบริการงานหลังการขายที่ดิน
            </Typography>
          </div>
        </div>
        <div className="flex flex-col w-full justify-center gap-8 py-8">
          <Typography
            variant="paragraph"
            className="text-bg text-center !text-h4 md:!text-h2"
          >
            ช่องทางการติดต่อ
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              className="normal-case !text-body1 md:!text-paragraph text-[#F3F3F3] bg-[#396BE9] px-[12px] py-[8px] rounded-full"
              color="blue"
              variant="filled"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/pitcha.wichthong",
                  "_blank"
                )
              }
            >
              Facebook : แม่ไก่ คนธาตุดิน
            </Button>
            <Button
              className="normal-case !text-body1 md:!text-paragraph text-[#F3F3F3] bg-[#3BC340] px-[12px] py-[8px] rounded-full"
              color="green"
              variant="filled"
              onClick={() =>
                window.open("https://line.me/ti/p/LeUP5YHMZs", "_blank")
              }
            >
              Line : pimpert
            </Button>
            <Button
              className="normal-case !text-body1 md:!text-paragraph text-[#F3F3F3] bg-[#E75F2E] px-[12px] py-[8px] rounded-full"
              color="deep-orange"
              variant="filled"
              onClick={() => window.open("tel:064-974-9249", "_blank")}
            >
              โทร : 064-974-9249
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
