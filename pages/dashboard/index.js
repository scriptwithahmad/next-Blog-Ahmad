import Image from "next/image";
import Link from "next/link";
import NavBar from "../../components/header";
import { Toast, Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Dashboard = ({ data }) => {
  const router = useRouter();

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
    <Toaster/>
      <NavBar />
      <h1 className="text-center p-7 text-3xl font-semibold">Dashboard</h1>
      <div class="backCover">
      <div className="dash-wrapper">
        <h1 className="mainTitle">
          CricCode <span>Blog</span>
        </h1>
        <div className="dasboard-Main">
          {data?.blogs?.map((v) => {
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
                  <Link  href={`/edit/${v.slug}`}>
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
  const res = await fetch("https://next-blog-ahmad.vercel.app/api/get-all-posts");
  const data = await res.json();

  return { props: { data } };
}
