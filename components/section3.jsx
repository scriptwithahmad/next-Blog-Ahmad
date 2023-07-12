import Link from "next/link";
import Image from "next/image";
import { Author } from "./_child/author";
import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, {Autoplay} from 'swiper'
import "swiper/css";

export const Section3 = ({ props }) => {
  // console.log(props.blogs);
  return (
    <section className="contaienr mx:auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      <Swiper slidesPerView={2}>
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

// function Post() {
//   return (
//     <div className="grid">
//       <div className="images">
//         <Image
//           src={"/Images/image2.jpg"}
//           className="heroImg2 rounded"
//           width={200}
//           height={400}
//           alt=""
//         />
//       </div>
//       <div className="info flex justify-center flex-col py-4">
//         <div className="cat">
//           <Link className="text-orange-600 hover:text-orange-800" href={"/"}>
//             Bussiness, Travel
//           </Link>
//           <Link className="text-gray-800 hover:text-gray-600" href={"/"}>
//             -July 3, 2023
//           </Link>
//         </div>
//         <div className="title">
//           <Link
//             href={"/"}
//             className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600"
//           >
//             Your most unhappy costomers are your greatest source of learning
//           </Link>
//         </div>
//         <p className="text-xs text-gray-500 py-3">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
//           harum corporis corrupti ipsum ratione, odio, fugiat explicabo a facere
//           aliquam voluptatum eius inventore saepe quidem sequi sunt
//           reprehenderit.
//         </p>
//         <Author></Author>
//       </div>
//     </div>
//   );
// }
