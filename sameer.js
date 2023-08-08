import React from "react";
import { Toast, Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const Dashboard = ({ News }) => {
  function createMarkup(c) {
    return { __html: c.slice(0, 100) };
  }

  /*fiteration*/
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getall?title=${query}`
      );
      setData(response.data); // Assuming the API returns an array of data
      // console.log(response.data.blog.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const enterkey = (e) => {
    if (e.key === "Enter") {
      setQuery("");
      fetchData();
    }
    if (e.key === "Backspace") {
      setData(null);
    }
  };

  /*fiteration----------------------*/

  const router = useRouter();

  const HandleDelete = async (slug) => {
    try {
      if (window.confirm("Do you want to delete the news?") === true) {
        const del = await fetch(`http://localhost:3000/api/blog/${slug}`, {
          method: "DELETE",
        });
        del && toast.success("News Deleted Successfully");
        del && router.push("/Dash");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <div className="dashboard-col-main ">
        <div className="dashboard-inner ">
          <div className="searchBox">
            <h1>
              News & <span style={{ color: "orange" }}> Updates</span>
            </h1>
            <div className="NewsDashBoardFilterDiv">
              <input
                type="search"
                value={query}
                placeholder="Search..."
                onKeyDown={enterkey}
                onChange={handleInputChange}
              />

              {data?.blog ? (
                <button
                  type="reset"
                  onClick={(e) => setData(null)}
                  className="NewsDashBoardSeracbtn"
                >
                  <i class="fa-solid fa-x"></i>
                </button>
              ) : (
                <button onClick={fetchData} className="NewsDashBoardSeracbtn">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
              )}
            </div>
          </div>

          <div className="dash-all-blogs">
            {data?.blog
              ? data?.blog?.data?.map((v) => {
                  return (
                    <div className="eachDashboard" key={v._id}>
                      <div className="dash-info">
                        <h3>{v.title}</h3>

                        <div
                          className="NewsDashBoardCard"
                          dangerouslySetInnerHTML={createMarkup(v.description)}
                        ></div>
                      </div>
                      <div className="action-btns">
                        <i class="fa-regular fa-pen-to-square"></i>

                        <i
                          class="fa-regular fa-trash-can"
                          onClick={() => HandleDelete(v.slug)}
                        ></i>
                      </div>
                    </div>
                  );
                })
              : News?.map((v) => {
                  return (
                    <div className="eachDashboard" key={v._id}>
                      <div className="dash-info">
                        <h3>{v.title}</h3>

                        <div
                          className="NewsDashBoardCard"
                          dangerouslySetInnerHTML={createMarkup(v.description)}
                        ></div>
                      </div>
                      <div className="action-btns">
                        <Link href={`/edit/${v.slug}`}>
                          <i class="fa-regular fa-pen-to-square"></i>
                        </Link>
                        <i
                          class="fa-regular fa-trash-can"
                          onClick={() => HandleDelete(v.slug)}
                        ></i>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>

        {/* ---------- pagination ---------- */}

        <div className="pagination">
          <i class="fa-solid fa-chevron-left"></i>
          <span>2 - 30 of 200</span>
          <i class="fa-solid fa-chevron-right"></i>
        </div>

        {/* ---------- pagination ---------- */}
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/getall");
  const resData = await res.json();
  return { props: { News: resData?.blog?.data } };
}
