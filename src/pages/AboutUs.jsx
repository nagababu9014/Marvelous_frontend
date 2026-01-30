import "./AboutUs.css";
import { useEffect, useRef } from "react";

import aboutImg1 from "../assets/logo.jpeg";
import aboutImg2 from "../assets/logo2.png";

const AboutUs = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show"); // 👈 KEY LINE
          }
        });
      },
      {
        threshold: 0.35,          // triggers when ~35% visible
        rootMargin: "0px 0px -80px 0px", // smoother exit
      }
    );

    imageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">

      {/* SECTION 1 */}
      <section className="about-section">
        <div
          className="about-image from-left"
          ref={(el) => (imageRefs.current[0] = el)}
        >
          <img src={aboutImg1} alt="Marvelous Merchandise Fashion" />
        </div>
          <div className="about-content">
            <h2>About Marvelous Merchandise</h2>

            <p>
              Marvelous Merchandise is a modern e-commerce platform offering premium-quality
              fashion and lifestyle products for kids, men, and women. We focus on delivering
              stylish, comfortable, and affordable products that suit everyday needs as well
              as special occasions.
            </p>

            <p>
              Every product is carefully curated to meet high standards of quality, durability,
              and design. Our goal is to make online shopping simple, reliable, and enjoyable
              for every customer.
            </p>
          </div>

      </section>

      {/* SECTION 2 */}
      <section className="about-section reverse">
        <div
          className="about-image from-right"
          ref={(el) => (imageRefs.current[1] = el)}
        >
          <img src={aboutImg2} alt="Kids Men Women Collection" />
        </div>

          <div className="about-content">
            <h2>Designed for Every Age & Style</h2>

            <p>
              From playful kids wear to trendy men’s collections and elegant women’s fashion,
              Marvelous Merchandise brings a wide range of styles together under one trusted
              platform.
            </p>

            <p>
              With secure payments, fast delivery, easy returns, and dedicated customer support,
              we are committed to providing a smooth and premium shopping experience you can
              trust.
            </p>
          </div>

      </section>

    </div>
  );
};

export default AboutUs;
