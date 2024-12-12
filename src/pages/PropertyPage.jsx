import { Typography } from "@material-tailwind/react";
import MyTypo from "../components/MyTypo";

function PropertyPage() {
  return (
    <div className="flex w-screen min-h-screen justify-center items-center  pt-20 lg:px-20 px-5">
      <div className="flex flex-col gap-5 h-full justify-center items-center w-full lg:pb-0 pb-6">
        <p className="font-black text-black bg-red-500">Property Page</p>
        <MyTypo>asdjkas</MyTypo>
      </div>
    </div>
  );
}

export default PropertyPage;
