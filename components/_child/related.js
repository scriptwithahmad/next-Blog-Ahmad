import Link from "next/link";
import Image from "next/image";
import { Author } from "./author";

export default function Realted() {

  return (
    <div>
     {Post()}
     {Post()}
     {Post()}
    </div>
  );
}

function Post() {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col jusitfy-start">
        <Image
          src={"/Images/image2.jpg"}
          className="rounded"
          width={250}
          height={200}
        />
      </div>
      <div className="info flex justify-center flex-col gap-3">
        <div className="cat">
          <Link className="text-orange-600 hover:text-orange-800" href={"/"}>
            Bussiness, Travel
          </Link>
          <Link className="text-gray-800 hover:text-gray-600" href={"/"}>
            -July 3, 2023
          </Link>
        </div>
        <div className="title">
          <Link
            href={"/"}
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            Your most unhappy costomers are your greatest source of learning
          </Link>
        </div>
        <Author></Author>
      </div>
    </div>
  );
}




