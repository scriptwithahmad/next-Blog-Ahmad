import Image from "next/image";
import Link from "next/link";
import { Author } from "./_child/author";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";

const Section1 = ({ props }) => {
  SwiperCore.use([Autoplay]);

  // console.log(props.blogs[0].slug);
  // console.log(props.blogs);

  return (
    <section className="py-16">
      <div className="container mx-auto md:px-20">
        <h1 className="trendingFont font-bold text-4xl pb-12 text-center">
          Trending
        </h1>

        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
          }}
        >
          {props?.blogs?.slice(0, 3).map((v) => {
            return (
              <SwiperSlide>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="sec-1-image">
                    <Link href={"/"}>
                      <Image
                        className="img"
                        src={v.avatar}
                        alt={v.avatarAlt}
                        width={500}
                        height={400}
                      />
                    </Link>
                  </div>
                  <div className="info flex justify-center flex-col">
                    <div className="cat">
                      <Link
                        className="sec-category text-orange-600 hover:text-white-800"
                        href={"/"}
                      >
                        {v.category}
                      </Link>
                      <Link
                        className="text-gray-800 hover:text-gray-600"
                        href={"/"}
                      >
                        {new Date(v.createdAt).toDateString()}
                      </Link>
                    </div>
                    <div className="title">
                      <Link
                        href={`blog/${v.slug}`}
                        className="text-3xl md:text-5xl font-bold text-gray-800 hover:text-gray-600"
                      >
                        {v.title}
                      </Link>
                    </div>
                    <p className="sec-1-des text-gray-500 py-1 mt-2">
                      {v.desc}
                    </p>
                    <Author></Author>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Section1;
