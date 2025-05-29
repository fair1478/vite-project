import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Button, Typography } from "@material-tailwind/react";
import MultiGallery from "../../components/MultiGallery";
import PropertyCardDetail from "../../components/PropertyCardDetail";
import Editor from "../../components/Lexcical/Lexcical";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import Tag from "../../components/Tag";
import { decode } from "html-entities";
import DOMPurify from "dompurify";

const cleanHtml = (html) => {
  return DOMPurify.sanitize(decode(html));
};
const initstate = {
  title: "",
  subtitle: "",
  imageUrlList: [],
  location: "",
  price: 0,
  pricePerSquareWah: 0,
  pricePerRai: 0,
  finalPrice: 0,
  tags: [],
  date: new Date(),
  description: "",
  nearLocation: "",
  treeList: "",
};

function PropertyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  function handlePrev() {
    navigate(-1);
  }

  const [data, setData] = useState(initstate);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/properties/${id}`);
        const fetchedData = response.data;
        fetchedData.description = cleanHtml(fetchedData.description);
        fetchedData.nearLocation = cleanHtml(fetchedData.nearLocation);
        fetchedData.treeList = cleanHtml(fetchedData.treeList);
        const date = new Date(fetchedData.date);
        setData({ ...fetchedData, date });
      } catch (error) {
        console.error("Error fetching property:", error);
        navigate("/not-found");
      }
    };
    if (id) {
      fetchProperty();
    } else {
      console.error("No id provided");
      navigator("/not-found");
    }
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen pb-6">
      <div className="flex flex-col h-full justify-center items-center w-full px-4 lg:px-16 lg:pb-10 pb-6">
        <Button
          variant="filled"
          color="orange"
          size="sm"
          className="self-start rounded-2xl my-2 py-1 px-2 text-bg !text-button1"
          onClick={handlePrev}
        >
          <ChevronLeftIcon className="size-6" />
        </Button>
        <MultiGallery data={data.imageUrlList} />

        <div className="flex flex-col md:grid md:grid-col md:grid-cols-5 lg:grid-cols-6 w-full pt-14 pb-6 md:gap-x-4 lg:gap-x-8">
          <div className="w-full md:col-span-3 lg:col-span-4">
            <div className="flex flex-col gap-y-4 justify-start items-start w-full">
              <Typography variant="h1" className="!text-h1">
                {data.title}
              </Typography>
              <div className="!text-body2 lg:!text-body1 flex gap-1 items-center">
                {new Date(data.date).toLocaleDateString("en-GB", {
                  timeZone: "Asia/Bangkok",
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </div>
              <div className="flex gap-x-4 items-center">
                <div className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 19.325C7.76667 19.325 7.53333 19.2833 7.3 19.2C7.06667 19.1167 6.85833 18.9917 6.675 18.825C5.59167 17.825 4.63333 16.85 3.8 15.9C2.96667 14.95 2.27083 14.0292 1.7125 13.1375C1.15417 12.2458 0.729167 11.3875 0.4375 10.5625C0.145833 9.7375 0 8.95 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 8.95 15.8542 9.7375 15.5625 10.5625C15.2708 11.3875 14.8458 12.2458 14.2875 13.1375C13.7292 14.0292 13.0333 14.95 12.2 15.9C11.3667 16.85 10.4083 17.825 9.325 18.825C9.14167 18.9917 8.93333 19.1167 8.7 19.2C8.46667 19.2833 8.23333 19.325 8 19.325ZM8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10Z"
                      fill="#5F6368"
                    />
                  </svg>
                  <Typography className="!text-sm md:!text-base text-[#294023]">
                    {data.location}
                  </Typography>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 22V19H7C6.45 19 5.97917 18.8042 5.5875 18.4125C5.19583 18.0208 5 17.55 5 17V7H2C1.71667 7 1.47917 6.90417 1.2875 6.7125C1.09583 6.52083 1 6.28333 1 6C1 5.71667 1.09583 5.47917 1.2875 5.2875C1.47917 5.09583 1.71667 5 2 5H5V2C5 1.71667 5.09583 1.47917 5.2875 1.2875C5.47917 1.09583 5.71667 1 6 1C6.28333 1 6.52083 1.09583 6.7125 1.2875C6.90417 1.47917 7 1.71667 7 2V17H22C22.2833 17 22.5208 17.0958 22.7125 17.2875C22.9042 17.4792 23 17.7167 23 18C23 18.2833 22.9042 18.5208 22.7125 18.7125C22.5208 18.9042 22.2833 19 22 19H19V22C19 22.2833 18.9042 22.5208 18.7125 22.7125C18.5208 22.9042 18.2833 23 18 23C17.7167 23 17.4792 22.9042 17.2875 22.7125C17.0958 22.5208 17 22.2833 17 22ZM17 15V7H9V5H17C17.55 5 18.0208 5.19583 18.4125 5.5875C18.8042 5.97917 19 6.45 19 7V15H17Z"
                      fill="#5F6368"
                    />
                  </svg>
                  <Typography className="!text-sm md:!text-base text-[#294023]">
                    {data.areaRai} ไร่ {data.areaSquareWah} ตารางวา
                  </Typography>
                </div>
              </div>
              <Typography className="w-full !text-sm lg:!text-base h-full break-words text-[#60675E]">
                {data.subtitle}{" "}
              </Typography>
            </div>
            <div className="flex flex-row flex-wrap gap-4 mt-8">
              {data.tags.map((title, index) => (
                <Tag key={index} title={title} />
              ))}
            </div>
            <div className="flex flex-col gap-6 justify-start items-start w-full mt-14">
              <div className="flex flex-col justify-start items-start w-full">
                <Typography className="!text-h4 lg:!text-h3 text-[#131D10] mb-2">
                  รายละเอียด
                </Typography>
                <Editor
                  editAble={false}
                  htmlValue={data.description}
                  editorState={data.description}
                  setEditorState={null}
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <Typography className="!text-h4 lg:!text-h3 text-[#131D10] mb-2">
                  สถานที่ใกล้เคียง
                </Typography>
                <Editor
                  editAble={false}
                  htmlValue={data.nearLocation}
                  editorState={data.nearLocation}
                  setEditorState={null}
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <Typography className="!text-h4 lg:!text-h3 text-[#131D10] mb-2">
                  ต้นไม้ในที่ดิน
                </Typography>
                <Editor
                  editAble={false}
                  htmlValue={data.treeList}
                  editorState={data.treeList}
                  setEditorState={null}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:block md:col-span-2 items-center justify-center space-y-4 w-full h-fit !sticky top-[110px] z-50">
            <PropertyCardDetail
              price={data.price}
              finalPrice={data.finalPrice}
              pricePerSquareWah={data.pricePerSquareWah}
              pricePerRai={data.pricePerRai}
            />
            <Button
              size="lg"
              variant="outlined"
              className="flex items-center justify-center gap-x-1 w-full px-3 lg:px-5 2xl:px-7 !text-[#5B76C9] border-[#5B76C9] rounded-[100px] text-nowrap text-xs md:text-sm [@media(min-height:1400px)]:!text-2xl"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/pitcha.wichthong",
                  "_blank"
                )
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2015_3161)">
                  <path
                    d="M32 16C32 7.1635 24.8365 0 16 0C7.1635 0 0 7.1635 0 16C0 23.986 5.851 30.6054 13.5 31.8056V20.625H9.4375V16H13.5V12.475C13.5 8.465 15.8888 6.25 19.5435 6.25C21.294 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1075C19.1199 10.5 18.5 11.7334 18.5 12.9987V16H22.9375L22.2281 20.625H18.5V31.8056C26.149 30.6054 32 23.9861 32 16Z"
                    fill="#396BE9"
                  />
                  <path
                    d="M22.2281 20.625L22.9375 16H18.5V12.9987C18.5 11.7332 19.1199 10.5 21.1075 10.5H23.125V6.5625C23.125 6.5625 21.294 6.25 19.5434 6.25C15.8888 6.25 13.5 8.465 13.5 12.475V16H9.4375V20.625H13.5V31.8056C14.327 31.9352 15.1629 32.0002 16 32C16.8371 32.0002 17.673 31.9353 18.5 31.8056V20.625H22.2281Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2015_3161">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <Typography className="!text-button1 md:!text-button2 2xl:!text-button1">
                Direct Message ติดต่อแปลงนี้
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
