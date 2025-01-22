import { useNavigate, useParams } from "react-router-dom";
import MyTypo from "../../components/MyTypo";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import {
  Breadcrumbs,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  List,
  Typography,
} from "@material-tailwind/react";
import MultiGallery from "../../components/MultiGallery";

function handlePrev() {
  let navigate = useNavigate();
  navigate(-1);
}
const newProperty = {
  id: 1,
  title: "Property 3",
  description: "Description for Property 3",
  location: "Location 3",
  date: "",
  imageUrlList: [
    "https://img.f4-ir.com/Dota%202%20Screenshot%202023.12.20%20-%2020.41.22.52.png",
    "https://img.f4-ir.com/testing.png",
  ],
  bodyText:
    "Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3",
  price: 300000,
  pricePerUnit: 3000,
  pricePerRiai: 1500,
  finalPrice: 285000,
  tags: ["tag5", "tag6"],
};
function PropertyDetail() {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen justify-center pb-6">
      <div className="flex gap-x-16 items-center h-full w-full lg:pb-0 pb-6">
        <ChevronLeftIcon className="size-6 text-[#5F6368]" />
        <Breadcrumbs className="bg-bg">
          <a href="#" className="opacity-60">
            ที่ดินนครนายก
          </a>
          <a href="#">{id}</a>
        </Breadcrumbs>
        {/* Add more details about the property here */}
      </div>
      <div className="flex flex-col h-full justify-center items-center w-full px-16 lg:pb-0 pb-6">
        <MultiGallery />
        <div className="flex flex-row pt-14 pb-6 space-x-8">
          <div className="w-4/6">
            <p className="font-black text-black bg-red-500">Property Page</p>
            <MyTypo>Property ID: {id}</MyTypo>
            <Typography className="!text-h4 lg:!text-h3 text-[#131D10] mb-2">
              {newProperty.title}
            </Typography>
            <div className="flex gap-1 items-center mb-4">
              <svg
                width="13"
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
              <Typography className="!text-body3 lg:!text-body1 text-[#294023]">
                {newProperty.location}
              </Typography>
            </div>
            <div className="!text-body3 lg:!text-body1 flex gap-1 items-center">
              {newProperty.date}
            </div>
            <Typography className="!text-body3 lg:!text-body1 text-[#60675E]">
              {newProperty.bodyText}
            </Typography>
            <div className="flex flex-wrap gap-2 mt-2">
              {newProperty.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 !text-body3 lg:!text-body1 px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Card
            shadow={false}
            className="h-full w-2/6 border-[1px] border-primary"
          >
            <CardBody
              shadow={false}
              floated={false}
              className="bg-primaryLight rounded-t-xl text-[#162113] !text-body1"
            >
              <div className="flex justify-between">
                <Typography>เนื้อที่</Typography>
                <Typography>387 ตารางวา</Typography>
              </div>
              <div className="flex justify-between">
                <Typography>ตารางวาละ</Typography>
                <Typography>{newProperty.pricePerUnit} บาท</Typography>
              </div>
              <div className="flex justify-between">
                <Typography>ไร่ละ</Typography>
                <Typography>{newProperty.pricePerRiai} บาท</Typography>
              </div>
            </CardBody>
            <CardFooter className="flex flex-col justify-center lg:items-center border-t-[1px] border-primary">
              <Typography className="!text-h3 text-[#D8C9C4] line-through">
                ยกแปลง {newProperty.price} บาท
              </Typography>
              <Typography className="!text-h2 text-primaryDark">
                ยกแปลง {newProperty.finalPrice} บาท
              </Typography>
            </CardFooter>
          </Card>
        </div>
        <div className="flex flex-col gap-4 justify-start items-start w-full">
          <Typography className="!text-h4 lg:!text-h3 text-[#131D10] mb-2">
            Details
          </Typography>
          <ul className="list-disc list-inside">
            <li>Detail 1</li>
            <li>Detail 2</li>
            <li>Detail 3</li>
            <li>Detail 4</li>
          </ul>
          <Typography className="!text-h4 lg:!text-h3 text-[#131D10] mb-2">
            Details
          </Typography>
          <ul className="list-disc list-inside">
            <li>Detail 1</li>
            <li>Detail 2</li>
            <li>Detail 3</li>
            <li>Detail 4</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetail;
