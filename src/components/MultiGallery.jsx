import React, { useEffect, useRef } from "react";
import {
  Button,
  Carousel,
  Dialog,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// const isMobileDevice = () => {
//   console.log("navigator.userAgent", navigator.userAgent);
//   return /Mobi|Android|iPhone/i.test(navigator.userAgent);
// };

export function ModalWithMedia({ mediaLink, mediaList, mediaIndex, isMore }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const setActiveIndexRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  // console.log("isMobileDevice", isMobileDevice());

  useEffect(() => {
    if (open && setActiveIndexRef.current) {
      setCurrentIndex(mediaIndex);
      setTimeout(() => {
        if (setActiveIndexRef.current) {
          setActiveIndexRef.current(mediaIndex);
          const element = document.getElementById("navigation");
          if (element) {
            element.scrollIntoView({
              behavior: "instant",
              block: "center",
              inline: "center",
            });
          }
        }
      }, 0);
    }
  }, [open, mediaIndex]);

  const isVideo = (url) => {
    return !/\.(png|jpeg|jpg|jfif|pjpeg|pjp|gif)$/i.test(url);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > 80 && currentIndex > 0) {
      setActiveIndexRef.current(currentIndex - 1); // Swipe Right (Previous)
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    } else if (deltaX < -80 && currentIndex < mediaList.length - 1) {
      setActiveIndexRef.current(currentIndex + 1); // Swipe Left (Next)
      setCurrentIndex((prev) => Math.min(mediaList.length - 1, prev + 1));
    }
  };

  return (
    <>
      <Card
        className="h-full w-full object-cover object-center cursor-pointer overflow-hidden transition-opacity hover:opacity-90  rounded-none"
        onClick={mediaList.length > 0 ? handleOpen : null}
      >
        {mediaList.length > 0 ? (
          isVideo(mediaLink) ? (
            <video
              className="h-full w-full object-cover object-center"
              src={mediaLink}
              muted
              loading="lazy"
              onContextMenu={(e) => e.preventDefault()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              onClick={mediaList.length > 0 ? handleOpen : null}
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
              alt="media"
              className="h-full w-full object-cover object-center"
              src={mediaLink}
              loading="lazy"
            />
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
        {isMore && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-2xl text-white">+{mediaList.length - 7}</span>
          </div>
        )}
      </Card>
      <Dialog
        size="lg"
        className="[@media(min-height:1400px)]:max-w-[80%] [@media(min-height:1400px)]:w-[80%]"
        open={open}
        handler={handleOpen}
      >
        <DialogBody>
          <Carousel
            className="h-fit w-full flex items-center bg-black"
            loop={true}
            transition={{ duration: 0.2 }}
            navigation={({ setActiveIndex, activeIndex, length }) => {
              setActiveIndexRef.current = setActiveIndex;
              useEffect(() => {
                setCurrentIndex(activeIndex);
              }, [activeIndex]);
              return (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2 [@media(min-height:1400px)]:gap-6 bg-[#F3F3F3]/40 p-2 rounded-full">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-3 w-3 [@media(min-height:1400px)]:h-6 [@media(min-height:1400px)]:w-6 cursor-pointer rounded-full transition-colors content-[''] ${
                        activeIndex === i ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              );
            }}
            prevArrow={({ handlePrev }) => (
              <ChevronLeftIcon
                id="navigation"
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="px-[2px] py-[4px] size-6 [@media(min-height:1400px)]:size-12 rounded-lg text-bg bg-[#F3F3F366] !absolute top-2/4 left-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
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
                className="testClass px-[2px] py-[4px] size-6 [@media(min-height:1400px)]:size-12 rounded-lg text-bg bg-[#F3F3F366] !absolute top-2/4 !right-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                  testArrow
                </svg>
              </ChevronRightIcon>
            )}
          >
            {mediaList.map((mediaLink, index) => (
              <div
                key={index}
                id={`media-${index}`}
                onTouchStart={handleTouchStart}
                onTouchMove={(e) => (touchEndX.current = e.touches[0].clientX)}
                onTouchEnd={handleTouchEnd}
                className="flex items-center justify-center w-full h-full bg-black"
              >
                {isVideo(mediaLink) ? (
                  <div>
                    <video
                      src={mediaLink}
                      className="max-h-[80dvh] max-w-full object-cover object-center"
                      muted
                      autoPlay={true}
                      controls
                      controlsList="nodownload noplaybackrate"
                      disablePictureInPicture
                      playsInline
                      loading="lazy"
                      onContextMenu={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchMove={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                    />
                  </div>
                ) : (
                  <img
                    src={mediaLink}
                    alt={`media ${index + 1}`}
                    className="max-h-[80dvh] max-w-full object-cover object-center"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </Carousel>
        </DialogBody>
        <DialogFooter className="justify-between">
          <div className="flex items-center gap-16">
            <div>
              <Typography
                variant="small"
                color="gray"
                className="!text-sm [@media(min-height:1400px)]:!text-3xl"
              >
                รูปที่ {currentIndex + 1} จาก {mediaList.length}
              </Typography>
            </div>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default function MultiGallery({ data }) {
  return (
    <div className="grid grid-cols-5 gap-x-1 gap-y-0.5 w-[90%]">
      <div className="col-span-3 h-[150px] sm:h-[200px] lg:h-[300px] xl:h-[500px]">
        <ModalWithMedia mediaLink={data[0]} mediaList={data} mediaIndex={0} />
      </div>
      <div className="grid col-span-2 grid-rows-2 gap-y-0.5 w-full">
        {data.slice(1, 3).map((mediaLink, index) => (
          <div
            className="col-span-1 h-[75px] sm:h-[100px] lg:h-[150px] xl:h-[250px]"
            key={index}
          >
            <ModalWithMedia
              mediaLink={mediaLink}
              mediaList={data}
              mediaIndex={index + 1}
            />
          </div>
        ))}
      </div>
      {data.slice(3, 8).map((mediaLink, index) => (
        <div
          key={index}
          className="grid col-span-1 w-full relative h-[75px] sm:h-[100px] lg:h-[150px] xl:h-[250px]"
        >
          <ModalWithMedia
            mediaLink={mediaLink}
            mediaList={data}
            mediaIndex={index + 3}
            isMore={index === 4 && data.length > 8 ? true : false}
          />
        </div>
      ))}
    </div>
  );
}
