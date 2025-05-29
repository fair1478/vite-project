import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Tag from "./Tag";

export function PropertyCard({
  id,
  imageUrlList = [],
  title = "",
  subtitle = "",
  location = "",
  areaSquareWah = 0,
  areaRai = 0,
  price = 0,
  pricePerSquareWah = 0,
  pricePerRai = 0,
  finalPrice = 0,
  tags = [],
  onClick,
}) {
  const isVideo = (url) => {
    return !/\.(png|jpeg|jpg|jfif|pjpeg|pjp|gif)$/i.test(url);
  };
  const formatPrice = (price) => {
    if (price === 0) return "-";
    return price.toLocaleString("en-US");
  };

  return (
    <Card
      shadow={false}
      className={
        "hover:shadow-0 w-full flex lg:grid grid-flow-row lg:grid-flow-col grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-3 h-fit"
      }
    >
      <CardHeader
        shadow={false}
        floated={false}
        className="col-span-1 mb-4 h-56 md:h-72 lg:h-80"
      >
        <Carousel
          key={id}
          loop={true}
          navigation={({ setActiveIndex, activeIndex, length }) => {
            return (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 bg-[#F3F3F3]/40 p-1 rounded-full">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-2 w-2 cursor-pointer rounded-full transition-colors content-[''] ${
                      activeIndex === i
                        ? "bg-bg"
                        : "border-bg border-[1px] bg-none"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            );
          }}
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
          {imageUrlList.length > 0 ? (
            imageUrlList.slice(0, 6).map((image, index) =>
              isVideo(image) ? (
                <video
                  className="h-full w-full object-cover object-center"
                  src={image}
                  muted
                  loading="lazy"
                  onContextMenu={(e) => e.preventDefault()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  autoPlay={false}
                  disablePictureInPicture
                  playsInline
                  poster=""
                  preload="metadata"
                  onLoadedMetadata={(e) => {
                    const video = e.target;
                    video.currentTime = 0.5;
                    video.onseeked = () => {
                      const canvas = document.createElement("canvas");
                      canvas.width = video.videoWidth;
                      canvas.height = video.videoHeight;
                      const ctx = canvas.getContext("2d");
                      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                      video.setAttribute("poster", canvas.toDataURL());
                    };
                  }}
                />
              ) : (
                <img
                  key={index}
                  src={image}
                  alt={`image ${index + 1}`}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              )
            )
          ) : (
            <div className="flex h-full w-full flex-wrap items-center gap-8">
              <div className="flex flex-col h-full w-full items-center justify-center rounded-lg bg-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-12 w-12 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p>No image</p>
              </div>
            </div>
          )}
        </Carousel>
      </CardHeader>
      <div
        className="lg:col-span-2 flex flex-col hover:cursor-pointer active:cursor-progress "
        onClick={onClick}
      >
        <CardBody className="flex-grow flex flex-col justify-start py-2 lg:p-6">
          <Typography className="!text-h3 text-[#131D10] lg:mb-2">
            {title}
          </Typography>
          <div className="flex gap-x-4 items-center mb-2 lg:mb-4">
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
                {location}
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
                {areaRai} ไร่ {areaSquareWah} ตารางวา
              </Typography>
            </div>
          </div>
          <Typography className="w-full !text-sm lg:!text-body1 !line-clamp-5 h-full max-h-[110px] break-words text-[#60675E]">
            {subtitle}
          </Typography>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                title={tag}
                className="!text-sm lg:!text-body1"
              />
            ))}
          </div>
        </CardBody>
        <CardFooter className="flex justify-between phone:items-end flex-col phone:flex-row !py-2">
          <div className="flex flex-col h-full gap-1 items-start">
            <Typography className="!text-sm lg:!text-body1 text-[#162113]">
              {pricePerSquareWah == 0 ? "-" : formatPrice(pricePerSquareWah)}{" "}
              บาท/ตารางวา
            </Typography>
            <Typography className="!text-sm lg:!text-body1 text-[#162113]">
              {pricePerRai == 0 ? "-" : formatPrice(pricePerRai)} บาท/ไร่
            </Typography>
          </div>
          <div className="flex flex-col items-end">
            {price != 0 && (
              <Typography className="!text-h3 text-[#D8C9C4] line-through">
                ยกแปลง {formatPrice(price)} บาท
              </Typography>
            )}
            <Typography
              className={`!text-h2 flex items-center ${
                price != 0 ? "text-primaryDark" : "h-[50px]"
              }`}
            >
              ยกแปลง {formatPrice(finalPrice)} บาท
            </Typography>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}

export default PropertyCard;
