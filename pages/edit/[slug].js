import React, { useState, useRef, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import NavBar from "../../components/header";
import { useRouter } from "next/router";
import Image from "next/image";

// import Router from "next/router";

// For Jodit React
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Dashborad = () => {
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const slug = router.query.slug;

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    authorID: "",
    avatarAlt: "",
    metaDesc: "",
    desc: "",
    category: "",
    avatar: "",
  });

  const formDataChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cloudinary States
  const [tempImage, setTempImage] = useState("");

  const uploadImageToCloudinary = async () => {
    try {
      const data = new FormData();
      data.append("file", tempImage);
      data.append("upload_preset", "blog-image");

      console.log(tempImage);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmyrswz0r/image/upload",
        {
          body: data,
          method: "POST",
        }
      );

      const jsonRes = await res.json();

      return jsonRes.secure_url;
    } catch (error) {
      alert("Something wrong! while Uplading images");
    }
  };
  // const [data, setData] = useState("");
  //   const router = Router

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/blog/${slug}`);
      const data = await res.json();
      
      setFormData(data?.singleBlog);
    };
    fetchData();
  }, []);

  const submitBlogHandler = async (e) => {
    try {
      e.preventDefault();
      const imageURI = await uploadImageToCloudinary();
      const send = await axios.put(`/api/blog/${slug}`, {
        ...formData,
        avatar: imageURI,
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="main">
        <Toaster />

        <h1 className="font-bold text-4xl py-8 px-8">
          Edit <span className="text-sky-700"> BLOG </span>
        </h1>
        <div className="d-col-inner">
          <form onSubmit={submitBlogHandler}>
            <label htmlFor="title">Title</label>
            <input
              value={formData.title}
              onChange={formDataChangeHandler}
              name="title"
              type="text"
              id="title"
              placeholder="Blog Title"
            />
            <label htmlFor="subTitle">Sub Title</label>
            <input
              value={formData.subTitle}
              onChange={formDataChangeHandler}
              name="subTitle"
              type="text"
              id="subTitle"
              placeholder="Blog Sub Title"
            />

            <label htmlFor="category">Category</label>

            <select
              value={formData.category}
              onChange={formDataChangeHandler}
              name="category"
              id="category"
              required
            >
              <option value="">Select Category</option>
              <option>Programming</option>
              <option>Art and Design</option>
              <option>ECommerace</option>
              <option>Degital Marketing</option>
              <option>Education</option>
              <option>News</option>
            </select>

            <label htmlFor="metaDesc">Meta Description</label>
            <input
              value={formData.metaDesc}
              onChange={formDataChangeHandler}
              name="metaDesc"
              type="text"
              id="metaDesc"
              placeholder="Meta Desc..."
            />

            {/* --- Cloudinary --- */}
            <div className="ImgShowArea">
              {tempImage ? (
                <div className="imgCenter">
                  <Image
                    width={400}
                    height={300}
                    src={URL.createObjectURL(tempImage)}
                    alt=""
                  />
                  <ImCancelCircle
                    onClick={() => setTempImage("")}
                    className="delIcon"
                  />
                </div>
              ) : (
                <>
                  <label className="uploadLabel" htmlFor="uploadFile">
                    upload image
                  </label>
                  <input
                    id="uploadFile"
                    className="fInput"
                    type="file"
                    onChange={(e) => setTempImage(e.target.files[0])}
                  />
                </>
              )}
            </div>
            {/* --- Cloudinary --- */}

            <label htmlFor="altText">Alternate Text</label>
            <input
              value={formData.avatarAlt}
              onChange={formDataChangeHandler}
              name="avatarAlt"
              type="text"
              id="altText"
              placeholder="Avtar Alt Text"
            />

            <label htmlFor="authorId">Author ID</label>
            <input
              value={formData.authorID}
              onChange={formDataChangeHandler}
              name="authorID"
              type="text"
              id="authorId"
              placeholder="Author ID"
            />

            <JoditEditor
              ref={editor}
              value={formData.desc}
              tabIndex={1}
              onBlur={(v) => setFormData({ ...formData, desc: v })}
              onChange={(v) => setFormData({ ...formData, desc: v })}
            />

            <button
              disabled={loading}
              className="SubBtn text-sky-700 border-2 my-2 border-black-100 p-1"
            >
              Update
            </button>
            <span className="spin">{loading ? "Loading...." : ""}</span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashborad;
