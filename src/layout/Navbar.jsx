import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useRef } from "react";
import { MEDIA_URL } from "../api/axios";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";

import {
  ShoppingCart,
  User,
  Search,
  Heart
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
    const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const username = user?.username || user?.name || null;

  const [hideTopBars, setHideTopBars] = useState(false);
const userMenuRef = useRef(null);

  const navigate = useNavigate();
const { cartCount } = useCart();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");
const [results, setResults] = useState([]);
const [showResults, setShowResults] = useState(false);
const searchRef = useRef();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
const [showUserMenu, setShowUserMenu] = useState(false);







  // 🔹 FETCH CATEGORIES FROM BACKEND
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("categories/");
        setCategories(res.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
  if (!query) {
    setResults([]);
    setShowResults(false);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      const res = await api.get(`products/search/?q=${query}`);
      setResults(res.data);
      setShowResults(true);
    } catch (err) {
      console.error(err);
    }
  }, 300);

  return () => clearTimeout(timer);
}, [query]);
useEffect(() => {
  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
useEffect(() => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // scrolling down
      setHideTopBars(true);
    } else {
      // scrolling up
      setHideTopBars(false);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const handleCategoryHover = async (categoryId) => {
  setActiveCategory(categoryId);
  try {
    const res = await api.get(`subcategories/?category=${categoryId}`);
    setSubcategories(res.data);
  } catch (err) {
    console.error(err);
  }
};
useEffect(() => {
  const handleClickOutsideUserMenu = (e) => {
    if (
      userMenuRef.current &&
      !userMenuRef.current.contains(e.target)
    ) {
      setShowUserMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutsideUserMenu);

  return () => {
    document.removeEventListener("mousedown", handleClickOutsideUserMenu);
  };
}, []);

useEffect(() => {
  if (hideTopBars) {
    setShowMobileSearch(false);
  }
}, [hideTopBars]);


  return (
    <>
      {/* ================= TOP STRIP ================= */}
    <div className={`top-strip ${hideTopBars ? "hide-bar" : ""}`}>
      FREE DELIVERY, RETURN & EXCHANGE ▾
    </div>
<div className={`welcome-bar ${hideTopBars ? "hide-bar" : ""}`}>
  {username ? (
    <>
      Hey <strong>{username}</strong>, welcome to
      <span> Marvelous Merchandise</span>
    </>
  ) : (
    <>
      Hello{" "}
      <strong
        className="signin-link"
        onClick={() => navigate("/login")}
      >
        Sign In
      </strong>
      , for
      <span> Better Experience</span>
    </>
  )}
</div>


      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className={`navbar desktop-only ${hideTopBars ? "hide-navbar" : ""}`}>

        <div className="navbar-inner">

          {/* LOGO */}
          <div
  className="brand"
  onClick={() => navigate("/")}
  style={{ cursor: "pointer" }}
>
  MARVELOUS MART
</div>


          {/* 🔹 CATEGORIES FROM BACKEND */}
<div className="categories">
  {categories.map(cat => (
    <div
      key={cat.id}
      className="category-item"
      onMouseEnter={() => handleCategoryHover(cat.id)}
      onMouseLeave={() => setActiveCategory(null)}
    >
      {/* CATEGORY CLICK */}
      <Link to={`/category/${cat.slug}`}>
        {cat.name.toUpperCase()}
      </Link>

      {/* MEGA MENU */}
      {activeCategory === cat.id && (
        <div className="mega-menu">
          {subcategories
            .filter(sub => sub.category === cat.id)
            .map(sub => (
             <span
  key={sub.id}
  className="subcategory-link"
  onClick={() => {
    navigate(`/category/${cat.slug}`, {
      state: { subcategoryId: sub.id }
    });
    setActiveCategory(null);
  }}
>
  {sub.name}
</span>

            ))}
        </div>
      )}
    </div>
  ))}
</div>


          {/* RIGHT ICONS */}
          <div className="nav-icons">
            <div className="search-box"  ref={searchRef}>
             <input
  placeholder="Search"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onFocus={() => setShowResults(true)}
/>
{showResults && results.length > 0 && (
  <div className="search-dropdown">
    {results.map(item => (
      <div
        key={item.id}
        className="search-item"
        onClick={() => {
          navigate(`/product/${item.id}`);
          setShowResults(false);
          setQuery("");
        }}
      >
<img
  src={item.image ? `${MEDIA_URL}${item.image}` : "/placeholder.png"}
  alt={item.name}
/>

        <div>
          <p className="search-name">{item.name}</p>
          <p className="search-price">${item.price}</p>
        </div>
      </div>
    ))}
  </div>
)}

              <button
  onClick={() => {
    navigate(`/search?q=${query}`);
    setShowResults(false);
  }}
>
  <Search size={18} />
</button>

            </div>

          <div className="user-menu-wrapper" ref={userMenuRef}>

  <User
    size={20}
    style={{ cursor: "pointer" }}
    onClick={() => setShowUserMenu(prev => !prev)}
  />

  {showUserMenu && (
    <div className="user-dropdown">

      {/* GUEST USER */}
      {!isLoggedIn && (
        <>
          

          <hr />

          <p className="user-hint">
            Login to save orders & access from any device
          </p>

          <button
            className="login-btn"
            onClick={() => {
              navigate("/login");
              setShowUserMenu(false);
            }}
          >
            Login
          </button>

          <p
            className="signup-link"
            onClick={() => {
              navigate("/signup");
              setShowUserMenu(false);
            }}
          >
            New user? Signup
          </p>
        </>
      )}

      {/* LOGGED IN USER */}
      {isLoggedIn && (
        <>
          <p
            className="menu-item"
            onClick={() => {
              navigate("/my-orders");
              setShowUserMenu(false);
            }}
          >
            My Orders
          </p>

          <p
            className="menu-item"
            onClick={() => {
              navigate("/profile");
              setShowUserMenu(false);
            }}
          >
            My Profile
          </p>

<LogoutButton />


        </>
      )}

    </div>
  )}
</div>


<div
  className="cart"
  onClick={() => navigate("/cart")}
>
  <ShoppingCart size={20} />
  <span className="cart-count">{cartCount}</span>
</div>

          </div>
        </div>
      </nav>

      {/* ================= MOBILE HEADER ================= */}
      <div className={`mobile-navbar mobile-only ${hideTopBars ? "hide-navbar" : ""}`}>


        {/* LEFT ICONS */}
        <div className="mobile-left">
          <button className="icon-btn" onClick={() => setOpen(true)}>☰</button>
          <User
  size={20}
  style={{ cursor: "pointer" }}
  onClick={() => {
    navigate(isLoggedIn ? "/my-orders" : "/login");
  }}
/>
        </div>

        {/* CENTER LOGO TEXT */}
        <div
          className="mobile-logo-text"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          MARVELOUS MART
        </div>


        {/* RIGHT ICONS */}
                  <div className="mobile-icons">
                   


         <Search
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setShowMobileSearch(prev => !prev)}
          />

          <div
            className="cart"
            onClick={() => navigate("/cart")}
          >
          <ShoppingCart size={20} />
          <span className="cart-count">{cartCount}</span>
        </div>

        </div>
      </div>
      {/* ================= MOBILE SEARCH BAR ================= */}
{showMobileSearch && (
  <div className={`mobile-search-bar ${hideTopBars ? "hide-navbar" : ""}`}>
    <div className="mobile-search-input-wrap">
      <input
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {/* ❌ CLOSE BUTTON */}
      <button
        className="mobile-search-close"
        onClick={() => {
          setShowMobileSearch(false);
          setShowResults(false);
          setQuery("");
        }}
      >
        ✕
      </button>
    </div>

    {/* SEARCH RESULTS */}
    {showResults && results.length > 0 && (
      <div className="mobile-search-dropdown">
        {results.map(item => (
          <div
            key={item.id}
            className="mobile-search-item"
            onClick={() => {
              navigate(`/product/${item.id}`);
              setShowMobileSearch(false);
              setShowResults(false);
              setQuery("");
            }}
          >
            <img
              src={
                item.image
                  ? `https://api.marvelousmart.com${item.image}`
                  : "/placeholder.png"
              }
              alt={item.name}
            />
            <div>
              <p className="search-name">{item.name}</p>
              <p className="search-price">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)}


      {/* ================= MOBILE MENU ================= */}
      <div className={`mobile-menu ${open ? "show" : ""}`}>
        <div className="mobile-menu-header">
          <div className="menu-logo">MARVELOUS</div>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* 🔹 SAME 5 CATEGORIES */}
        <nav className="mobile-menu-links">
          {categories.map(cat => (
            <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={() => setOpen(false)}
                >
              {cat.name.toUpperCase()} <span>›</span>
            </Link>
          ))}
        </nav>

         <div className="mobile-menu-footer">
            <Link to="/orders" onClick={() => setOpen(false)}>
              Order Tracker
            </Link>

            <Link to="/my-orders" onClick={() => setOpen(false)}>
              My Profile
            </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                About Us
              </Link>

            <Link to="/store-finder" onClick={() => setOpen(false)}>
              Store Finder
            </Link>

            <Link to="/help" onClick={() => setOpen(false)}>
              Help & Customer Service
            </Link>

            <Link to="/returns" onClick={() => setOpen(false)}>
              Returns
            </Link>

            <div className="country">🇮🇳 India</div>
          </div>
      </div>
    </>
  );
};

export default Navbar;
