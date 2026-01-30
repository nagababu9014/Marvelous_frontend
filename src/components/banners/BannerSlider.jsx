// BannerSlider.jsx (AUTO SLIDE – PREMIUM)
import { useEffect, useRef, useState } from "react";
import api from "../../api/axios";
import "./banner.css";

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const sliderRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    api.get("banners/").then(res => {
      setBanners(res.data.filter(b => b.is_active));
    });
  }, []);

  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      indexRef.current =
        (indexRef.current + 1) % banners.length;

      sliderRef.current.scrollTo({
        left:
          indexRef.current *
          sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }, 3500); // auto-slide time

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="banner-slider" ref={sliderRef}>
      {banners.map(banner => (
        <div key={banner.id} className="banner-slide">
          <img src={banner.image} alt={banner.title} />
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;
