import Image from "next/image";
import Link from "next/link";

export const Author = () => {
  return (
    <div className="author flex py-5">
      <Image
        className="authorImg"
        alt="something"
        src={"/Images/author.jpeg"}
        width={45}
        height={45}
      />
      <div className="flex flex-col justify-center px-4">
        <Link
          href={"/"}
          className="text-md font-bold text-gray-800 hover:text-gray-600"
        >
          M Ahmad
        </Link>
        <span className="text-sm text-gray-500">Web Developer</span>
      </div>
    </div>
  );
};
