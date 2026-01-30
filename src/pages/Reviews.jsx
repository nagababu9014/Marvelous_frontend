import { useEffect, useState } from "react";
import "./Reviews.css";
import reviewsBg from "../assets/bg.png"; // ✅ IMPORT IMAGE

const reviews = [
  {
    name: "Emily Johnson",
    role: "Verified Customer",
    rating: 5,
    text: "The quality exceeded my expectations. The experience felt premium from start to finish.",
  },
  {
    name: "Michael Carter",
    role: "Repeat Buyer",
    rating: 5,
    text: "Stylish products, smooth checkout, and fast delivery. This is now my go-to store.",
  },
  {
    name: "Sophia Williams",
    role: "Fashion Enthusiast",
    rating: 5,
    text: "Loved the clean designs and comfort. Customer support was quick and helpful.",
  },
  {
    name: "Daniel Brown",
    role: "Long-Term Customer",
    rating: 5,
    text: "Reliable, elegant, and consistent quality. Highly recommend Marvelous Merchandise.",
  },
];


const Reviews = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="reviews-section"
        style={{ backgroundImage: `url(${reviewsBg})` }}>
      <div className="reviews-overlay" />

      <div className="reviews-container">
        <h2 className="reviews-title">What Our Customers Say</h2>
        <p className="reviews-subtitle">
          Trusted by customers for quality, style, and service
        </p>

        <div className="reviews-carousel">
          {reviews.map((review, i) => (
            <div
  key={i}
  className={`review-card ${i === index ? "active" : ""}`}
>
  {/* ⭐ STARS */}
  <div className="review-stars">
    {Array.from({ length: review.rating }).map((_, idx) => (
      <span key={idx}>★</span>
    ))}
  </div>

  <p className="review-text">“{review.text}”</p>

  <div className="review-user">
    <h4>{review.name}</h4>
    <span>{review.role}</span>
  </div>
</div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
