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

export function ModalWithImage({ imageLink, imageList, imageIndex }) {
  // const openRef = useRef(false);
  // const handleOpen = () => openRef.current = !openRef.current;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const setActiveIndexRef = useRef(null);

  useEffect(() => {
    if (open && setActiveIndexRef.current) {
      // Set the initial slide index when the modal is opened
      setActiveIndexRef.current(imageIndex);
    }
  }, [open]);

  return (
    <>
      <Card
        className="h-full w-full object-cover object-center cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
      >
        <img
          alt="nature"
          className="h-full w-full object-cover object-center"
          src={imageLink}
        />
      </Card>
      <Dialog
        size="lg"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 1, y: 0 },
        }}
      >
        <DialogBody>
          <Carousel
            className="h-fit w-fit"
            loop={true}
            transition={{ duration: 0 }}
            navigation={({ setActiveIndex, activeIndex, length }) => {
              setActiveIndexRef.current = setActiveIndex;
              return (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-3 w-3 cursor-pointer rounded-full transition-colors content-[''] ${
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
            {imageList.map(({ imageLink }, index) => (
              <img
                key={index}
                src={imageLink}
                alt={`image ${index + 1}`}
                className="max-h-full max-w-full object-cover object-center"
              />
            ))}
          </Carousel>
        </DialogBody>
        <DialogFooter className="justify-between">
          <div className="flex items-center gap-16">
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Views
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                44,082,044
              </Typography>
            </div>
            <div>
              <Typography variant="small" color="gray" className="font-normal">
                Downloads
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                553,031
              </Typography>
            </div>
          </div>
          <Button
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="mr-5 flex items-center"
          >
            Share
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default function MultiGallery() {
  const data = [
    {
      imageLink:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    },
    {
      imageLink:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
      imageLink:
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-2">
      {data.slice(0, 3).map(
        ({ imageLink }, index) =>
          (index === 0 && (
            <div key={index} className="col-span-3">
              <ModalWithImage
                imageLink={imageLink}
                imageList={data}
                imageIndex={index}
              />
              <p>{index}</p>
            </div>
          )) ||
          (index < 3 && (
            <div
              key={index}
              className="grid grid-rows-subgrid col-span-2 gap-6 w-full"
            >
              <div className={"col-span-1"}>
                <ModalWithImage
                  imageLink={imageLink}
                  imageList={data}
                  imageIndex={index}
                />
                <p>{index}</p>
              </div>
            </div>
          ))
      )}
      {data.slice(3).map(({ imageLink }, index) => (
        <div key={index} className="grid grid-rows-1 gap-6 w-full">
          <div className={"col-span-1"}>
            <ModalWithImage
              imageLink={imageLink}
              imageList={data}
              imageIndex={index + 3}
            />
            <p>{index} fff</p>
          </div>
        </div>
      ))}
    </div>
  );
}
