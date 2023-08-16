import Image from "next/image";
import Link from "next/link";
import NavBar from "../../components/header";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const Dashboard = ({ data }) => {
  const router = useRouter();
  // ------------------------------------------ Filteration
  const [query, setQuery] = useState("");
  const [fData, setFData] = useState([]);

  const [searchError, setSearchError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/get-all-posts?title=${query}`
      );
      setFData(response.data?.blogs);
      setSearchError(response.data?.blogs.length === 0);
      // console.log(response.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const OnKeyEnter = (e) => {
    if (e.key === "Enter") {
      setQuery("");
      fetchData();
    }
    if (e.key === "Escape") {
      setFData(null);
    }
  };

  const delBlog = async (slug) => {
    try {
      if (window.confirm("Do you want to delete the blog") === true) {
        const res = await fetch(`/api/blog/${slug}`, {
          method: "DELETE",
        });

        if (toast.success("Blog has been deleted")) {
          router.push("/dashboard");
        } else {
          toast.error("Something went Wrong");
        
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <NavBar />
      <h1 className="text-center p-7 text-3xl font-semibold">Dashboard</h1>
      <div class="backCover">
        <div className="dash-wrapper">
          <div className="filterBox">
            <h1 className="mainTitle">
              CricCode <span>Blog</span>
            </h1>
            <div className="innerInput">
              <input
                type="text"
                value={query}
                onKeyDown={OnKeyEnter}
                placeholder="Search..."
                onChange={handleInputChange}
              />
              <button onClick={fetchData}>Search</button>
            </div>
          </div>

          {/* ------------------ CATEGORY SECTION START ------------------- */}
          <div className="cate-buttons">
            <button>All</button>
            <button>Programming</button>
            <button>Digital Marketing</button>
            <button>Art & Design</button>
            <button>Education</button>
            <button>News</button>
            <button>ECommerace</button>
          </div>
          {/* ------------------ CATEGORY SECTION ENDS ------------------- */}
          <div className="dasboard-Main">
            {searchError && <p>No matching results found......</p>}
            {fData?.map((v) => {
              return (
                <div className="das-col" key={v._id}>
                  <div className="das-sub-col">
                    <div className="dasImgMain">
                      <Image
                        src={v.avatar}
                        alt={v.avatarAlt}
                        width={200}
                        height={200}
                        className="das-img"
                      />
                    </div>
                    <div className="das-info">
                      <h1 className="title"> {v.title} </h1>
                      <p style={{ display: "inline-block" }} className="cate">
                        {v.category}
                      </p>
                    </div>
                  </div>
                  <div className="action">
                    <Link href={`blog/${v.slug}`}>
                      <i class="fa-solid fa-eye"></i>
                    </Link>
                    <Link href={`/edit/${v.slug}`}>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <i
                      onClick={() => delBlog(v.slug)}
                      class="fa-solid fa-trash"
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  const res = await fetch(
    "https://next-blog-ahmad.vercel.app/api/get-all-posts"
  );
  const data = await res.json();

  return { props: { data } };
}
