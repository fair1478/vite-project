import { Typography } from "@material-tailwind/react";

function HomePage() {
  return (
    <div className="flex w-screen min-h-screen justify-center items-center  pt-20 lg:px-20 px-5">
      <div className="flex flex-col gap-5 h-full justify-center items-center w-full lg:pb-0 pb-6">
        <p className="font-semibold text-4xl text-blac">Title</p>
        <p className="title-fontSize title-fontWeight">title</p>
        <Typography className="bg-sky-500 text-title h-[1100px]">
          ดูฐานข้อมูลปัจจุบันได้ในเล่มรายงาน{" "}
        </Typography>
      </div>
    </div>
  );
}

export default HomePage;
