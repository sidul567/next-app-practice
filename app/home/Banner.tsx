"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperType from "swiper";

type Props = {};

const Banner = (props: Props) => {
  const [swiper, setSwiper] = useState<SwiperType>();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex justify-center items-center">
      {/* <Image
        src="/img/img1.jpg"
        alt=""
        width={2000}
        height={2000}
        className="w-[620px] !h-[450px] object-cover"
      /> */}
      {/* <button onClick={() => swiper?.slidePrev()}>prev</button> */}
      {
        mounted && <Swiper
        // initialSlide={0}
        pagination={{ clickable: true }}
        // navigation={true}
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        <SwiperSlide>
          <Image
            src="/img/img1.jpg"
            alt=""
            width={2000}
            height={2000}
            className="w-[620px] !h-[450px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/img2.jpg"
            alt=""
            width={2000}
            height={2000}
            className="w-[620px] !h-[450px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/img3.jpg"
            alt=""
            width={2000}
            height={2000}
            className="w-[620px] !h-[450px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/img4.jpg"
            alt=""
            width={2000}
            height={2000}
            className="w-[620px] !h-[450px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/img5.jpg"
            alt=""
            width={2000}
            height={2000}
            className="w-[620px] !h-[450px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/img6.jpg"
            alt=""
            width={2000}
            height={2000}
            className="w-[620px] !h-[450px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/img/img7.jpg"
            alt=""
            width={2000}
            height={2000}
            className="w-[620px] !h-[450px] object-cover"
          />
        </SwiperSlide>
      </Swiper>
      }
    </div>
  );
};

export default Banner;
