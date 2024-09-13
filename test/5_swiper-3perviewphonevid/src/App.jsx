import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Pagination } from "swiper/modules";

function Phone(mediaAsset) {
  return (
    <div>
      <div className="phoneHolder">
        <img
          alt=""
          src={"https://www.exo.inc/assets/images/iphone-hollow.webp"}
        />
        <div className="videoHolder">
          <video
            src={mediaAsset.mediaAsset.videoUrl}
            playsInline
            preload="auto"
            autoPlay={true}
            muted
            loop
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  let items = [
    { videoUrl: "https://cdn.pixabay.com/video/2024/07/14/221180_tiny.mp4" },
    { videoUrl: "https://cdn.pixabay.com/video/2024/08/30/228847_large.mp4" },
    {
      videoUrl:
        "https://cdn.pixabay.com/video/2020/06/04/41127-427876264_large.mp4",
    },
    {
      videoUrl:
        "https://cdn.pixabay.com/video/2020/06/04/41128-427876270_large.mp4",
    },
    { videoUrl: "https://cdn.pixabay.com/video/2024/07/14/221180_tiny.mp4" },
    { videoUrl: "https://cdn.pixabay.com/video/2024/08/30/228847_large.mp4" },
    {
      videoUrl:
        "https://cdn.pixabay.com/video/2020/06/04/41127-427876264_large.mp4",
    },
    {
      videoUrl:
        "https://cdn.pixabay.com/video/2020/06/04/41128-427876270_large.mp4",
    },
  ];

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {items.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <Phone mediaAsset={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
