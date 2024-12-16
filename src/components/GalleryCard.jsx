import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export function GalleryCard({
  images = [],
  title = "",
  bodyText = "",
  location = "",
  price = "",
  pricePerUnit = "",
  pricePerRiai = "",
  finalPrice = "",
  className = "",
}) {
  return (
    <Card shadow={false} className={"h-[580px] flex flex-col ${className}"}>
      <CardHeader
        shadow={false}
        floated={false}
        className="rounded-b-none h-[384px]"
      >
        <Carousel
          loop={true}
          prevArrow={({ handlePrev }) => (
            <ChevronLeftIcon
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="px-[2px] py-[4px] h-6 w-6 rounded-lg text-bg bg-[#F3F3F366] !absolute top-2/4 left-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </ChevronLeftIcon>
          )}
          nextArrow={({ handleNext }) => (
            <ChevronRightIcon
              onClick={handleNext}
              className="px-[2px] py-[4px] h-6 w-6 rounded-lg text-bg bg-[#F3F3F366] !absolute top-2/4 !right-4 -translate-y-2/4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </ChevronRightIcon>
          )}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image ${index + 1}`}
              className="h-full w-full object-cover object-center"
            />
          ))}
        </Carousel>
      </CardHeader>
      <CardBody className="flex-grow flex flex-col justify-start">
        <Typography className="!text-h3 text-[#131D10] mb-2">
          {title}
        </Typography>
        <div className="flex gap-1 items-center">
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
          <Typography className="!text-body1 text-[#294023]">
            {location}
          </Typography>
        </div>
        <Typography className="!text-body1 text-[#60675E]">
          {bodyText}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-between items-end">
        <div className="flex flex-col h-full gap-1 items-start">
          <Typography className="!text-body1 text-[#162113]">
            {pricePerUnit} บาท/ตารางวา
          </Typography>
          <Typography className="!text-body1 text-[#162113]">
            {pricePerRiai} บาท/ไร่
          </Typography>
        </div>
        <div className="flex flex-col items-end">
          <Typography className="!text-h3 text-[#D8C9C4] line-through">
            ยกแปลง {price} บาท
          </Typography>
          <Typography className="!text-h2 text-primaryDark">
            ยกแปลง {finalPrice} บาท
          </Typography>
        </div>
      </CardFooter>
    </Card>
  );
}

export default GalleryCard;
