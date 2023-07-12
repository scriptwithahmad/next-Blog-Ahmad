import { Author } from "./_child/author";
import Link from "next/link";
import Image from "next/image";

export const Section4 = () => {
  return (
    <section className="contaienr mx:auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Bussiness</h1>
          <div className="flex flex-col gap-6">
            {/* Posts */}
            {Post()}
            {Post()}
            {Post()}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12">Travel</h1>
          <div className="flex flex-col gap-6">
            {Post()}
            {Post()}
            {Post()}
          </div>
        </div>
      </div>
    </section>
  );
};

function Post() {
  return (
    <div className="flex gap-4">
      <div className="image flex flex-col jusitfy-start">
        <Image
          src={"/Images/image2.jpg"}
          className="rounded"
          width={300}
          height={250}
          alt=""
        />
      </div>
      <div className="info flex justify-center flex-col">
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
