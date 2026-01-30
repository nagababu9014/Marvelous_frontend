import "./home.css";
import { useEffect, useState } from "react";
import BannerSlider from "../components/banners/BannerSlider";
import api from "../api/axios";

import CategorySection from "../components/category/CategorySection";
import AboutUs from "../pages/AboutUs";
import Reviews from "../pages/Reviews"; // ✅ ADD THIS
import ContactUs from "../pages/ContactUs";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <section className="container home-banner">
        <BannerSlider />
      </section>

      <section className="container home-products">
        {categories.map(cat => (
          <CategorySection key={cat.id} category={cat} />
        ))}
      </section>
       {/* ABOUT US PAGE SECTION */}
      <section className="container home-about">
        <AboutUs />
      </section>
            {/* ⭐ REVIEWS (PREMIUM SECTION) */}
      <section className="home-reviews">
        <Reviews />
      </section>
          {/* 📞 CONTACT US (PREMIUM CTA SECTION) */}
    <section className="home-contact">
      <ContactUs />
    </section>
    </>
  );
};

export default Home;
