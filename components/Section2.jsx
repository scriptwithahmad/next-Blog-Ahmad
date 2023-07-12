import Image from "next/image";
import Link from "next/link";
import { Author } from "./_child/author";
import { useState } from "react";

export const Section2 = ({ blog }) => {

  const [filter, setFilter] = useState({
    category: "",
  })

  const filterChangeHanderler = (e) => {
    console.log(filter)
    setFilter({ ...filter, [e.target.name]: e.target.value })
  }

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts </h1>

      <div className="filterMain">
        <div className="searcbox">
          <select name="cate" id="cate" onChange={filterChangeHanderler}>
            <option value="sel-cate">Select Category</option>
            <option value="Education">Education</option>
            <option value="digital">Digital Marketing</option>
            <option value="Art and design">Art and Design</option>
            <option value="Amazon">Amazon</option>
            <option value="Programming">Programming</option>
            <option value="News">News</option>
            <option value="Trevel">Trevel</option>
          </select>
        </div>

        <div className="col-pagination">
          <i class="fa-solid fa-angle-left"></i>
          <p> 1-5 of 12 </p>
          <i class="fa-solid fa-angle-right"></i>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blog?.blogs.map((v) => {
          return (
            <div key={v._id} id="blogMain" className="item">
              <div className="imagesBox">
                <Image
                  src={v.avatar}
                  alt={v.avatarAlt}
                  className="heroImg rounded"
                  width={200}
                  height={200}
                  id="blogImage"
                />
              </div>
              <div className="infoBlog flex justify-center flex-col py-4">
                <div className="cat">
                  <div className="colCateMain">
                    <Link className="Category" href={"/"}>
                      {v.category}
                    </Link>
                    <Link
                      className="text-gray-800 hover:text-gray-600"
                      href={"/"}
                    >
                      {new Date(v.createdAt).toDateString()}
                    </Link>
                  </div>
                </div>
                <div className="title">
                  <Link
                    href={`blog/${v.slug}`}
                    className="text-xl font-bold text-gray-800 hover:text-gray-600"
                  >
                    {v.title}
                  </Link>
                </div>
                <p className="sec-2-des text-xs text-gray-500 mt-4">
                  {v.subTitle}
                </p>
                {/* <Author user={v.avatar}></Author> */}
                <Author></Author>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
