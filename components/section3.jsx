import Link from "next/link";
import Image from "next/image";
import { Author } from "./_child/author";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";

export const Section3 = ({ props }) => {
  // console.log(props.blogs);
  SwiperCore.use([Autoplay]);
  return (
    <section className="contaienr mx:auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      <Swiper
        slidesPerView={2}
        loop={true}
        autoplay={true}
      >
        {props?.blogs?.map((v) => {
          return (
            <>
              <SwiperSlide>
                <div className="grid" key={v._id}>
                  <div className="images">
                    <Image
                      src={v.avatar}
                      alt={v.avatarAlt}
                      className="heroImg2 rounded"
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="info flex justify-center flex-col py-4">
                    <div className="cat">
                      <Link
                        className="text-orange-600 hover:text-orange-800"
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
                        className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600"
                      >
                        {v.title}
                      </Link>
                    </div>
                    <p className="sec-2-des text-xs text-gray-500 py-3">
                      {v.subTitle}
                    </p>
                    <Author></Author>
                  </div>
                </div>
              </SwiperSlide>
            </>
          );
        })}
      </Swiper>
    </section>
  );
};



