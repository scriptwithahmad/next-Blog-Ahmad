import Realted from "@/components/_child/related";
import Format from "@/layout/format";
import Image from "next/image";
import { Author } from "../../components/_child/author";
import Link from "next/link";
import { useState } from "react";

const single = ({ data }) => {
  function createMarkup(c) {
    return { __html: c };
  }

  const [edit, setEdit] = useState(data.singleBlog);
  // console.log(data.singleBlog);
  return (
    <div>
      <Format>
        <section className="containerSingle container mx-auto md:px-2 py-16 w-1/2">
          <div className="flex justify-center">
            <Author></Author>
          </div>
          <div className="post py-10">
            <h1 className="font-bold text-4xl text-center pb-5">
              {data.singleBlog.title}
            </h1>
            <p className="text-gray-500 text-xl text-center">
              {data.singleBlog.subTitle}
            </p>
            <div className="py-10">
              <Image
                className="singlePageImg"
                src={data.singleBlog.avatar}
                width={900}
                height={200}
              ></Image>
            </div>
            <div className="mb-2">
              <Link className="cate" href={"/"}>
                {data.singleBlog.category}
              </Link>
            </div>
            <div className="content text-gray-600 text-lg flex flex-col gap-4">
              {edit && (
                <div
                  dangerouslySetInnerHTML={createMarkup(data.singleBlog.desc)}
                ></div>
              )}
            </div>
          </div>
          <Realted />
        </section>
      </Format>
    </div>
  );
};
export default single;

export async function getServerSideProps({ params }) {
  const slug = params.slug;
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`);
  const data = await res.json();
  return { props: { data } };
}
