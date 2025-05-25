import { GalleryCardPagination } from "../components/GalleryCardPagination";
import { Button, Typography } from "@material-tailwind/react";
import SeeFull from "../components/SeeFull";
import SubDistrict from "../components/SubDistrict";
import { useEffect, useState } from "react";
import api from "../utils/api";
import maeKai from "../assets/mae-kai.png";

function HomePage() {
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
            <Typography id="land-0" className="!text-h3 md:!text-h2">
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
            <Typography id="land-1" className="!text-h3 md:!text-h2">
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
            <Typography id="land-2" className="!text-h3 md:!text-h2">
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
            <img src={maeKai} alt="mae-kai" className="size-32 lg:size-64" />
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
              className="text-bg text-center !text-body1 md:!text-paragraph"
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
