import { useParams } from "react-router-dom";
import MyTypo from "../../components/MyTypo";

function PropertyDetail() {
    const { id } = useParams();

    return (
        <div className="flex w-screen min-h-screen justify-center items-center pt-20 lg:px-20 px-5">
            <div className="flex flex-col gap-5 h-full justify-center items-center w-full lg:pb-0 pb-6">
                <p className="font-black text-black bg-red-500">Property Page</p>
                <MyTypo>Property ID: {id}</MyTypo>
                {/* Add more details about the property here */}
            </div>
        </div>
    );
}

export default PropertyDetail;