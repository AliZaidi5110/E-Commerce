import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { getImageSrc } from "../utils/imageUtils.js";
import homeone from "../assets/homeimg1.png";
import hometwo from "../assets/homeimg2.png";
import homethree from "../assets/homeimg3.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import icon6 from "../assets/icon6.png";
import icon7 from "../assets/icon7.png";
import icon8 from "../assets/icon8.png";
import video from "../video/vedio.mp4";

const Home = () => {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [homeone, hometwo, homethree];
  const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];
  const categories = [
    "Books of the Month",
    "Signed",
    "New on Our Shelves",
    "Christmas at Foyles",
    "Halloween",
    "Independent Publishing",
    "Coming Soon",
    "Paperbacks",
  ];
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const booksPerPage = 6;
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const filteredProducts =
    products && Array.isArray(products)
      ? products.filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil((filteredProducts.length || 0) / booksPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextCategorySlide = () => {
    setCurrentCategorySlide((prev) =>
      prev === icons.length - 4 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const categoryTimer = setInterval(() => {
      nextCategorySlide();
    }, 5000);
    return () => clearInterval(categoryTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 text-gray-900 dark:text-white overflow-hidden transition-colors duration-300 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <main className="relative max-w-7xl mx-auto px-6 py-16 space-y-32">
        {/* Hero Image Slider */}
        <section>
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
          <div className="relative h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 group">
            {slides.map((slide, index) => (
              <img
                key={index}
                src={slide}
                alt={`Slide ${index}`}
                className={`absolute w-full h-full object-cover transition-all duration-700 ${
                  currentSlide === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white p-4 rounded-full backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white p-4 rounded-full backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-3 rounded-full transition-all ${
                    currentSlide === i
                      ? "w-8 bg-blue-500"
                      : "w-3 bg-gray-400/60 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <header className="relative overflow-hidden pt-24 pb-32">
          {/* Soft glowing background blobs */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left: Intro Text */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block mb-6 px-5 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-300 dark:border-blue-500/40 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold tracking-wide backdrop-blur-sm shadow-md">
                Welcome to StudentStore 📚
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 leading-tight mb-6 drop-shadow-[0_3px_10px_rgba(59,130,246,0.3)]">
                Discover Your Next Favorite Book
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Explore our curated collection of thousands of books. Find
                bestsellers, hidden gems, and trending reads — fast, easy, and
                affordable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg font-bold shadow-lg hover:shadow-blue-600/50 hover:-translate-y-1 transition-all duration-300"
                >
                  Browse Collection
                </Link>
                <button className="px-8 py-4 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                  Explore Categories
                </button>
              </div>

              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-10 text-center">
                <div>
                  <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                    10k+
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Books Available</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">
                    5k+
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-green-600 dark:text-green-400">
                    100+
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Categories</div>
                </div>
              </div>
            </div>

            {/* Right: Video Card */}
            <div className="flex-1 relative">
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all duration-500 shadow-xl hover:shadow-blue-500/30">
                <video
                  autoPlay
                  loop
                  playsInline
                  muted
                  src={video}
                  className="w-full h-90 md:h-96 object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 p-6">
                  <h3 className="text-2xl font-bold">Featured Video</h3>
                  <p className="text-gray-300 text-sm">
                    Watch our latest collection highlights
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-blue-400 font-semibold">
                    Watch Now{" "}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full shadow-lg text-white text-sm font-bold">
                🎬 Video Tour
              </div>
            </div>
          </div>
        </header>

        {/* Category{/* Icons Section */}
        <section className="md:px-12 lg:px-20 ">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Explore{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>

          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800/40 to-gray-900/40 border border-white/10 p-6 md:p-8 backdrop-blur-sm">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6"
              style={{
                transform: `translateX(-${currentCategorySlide * 25}%)`,
              }}
            >
              {[...icons, ...icons].map((icon, i) => (
                <div
                  key={i}
                  className="
            flex-shrink-0 
            w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 
            text-center 
            bg-gradient-to-br from-gray-700 to-gray-800 
            p-4 md:p-6 rounded-2xl 
            border border-gray-600/30 
            hover:border-blue-500/40 
            hover:shadow-lg hover:shadow-blue-500/30 
            hover:scale-105 
            transition-all duration-300 
            cursor-pointer
          "
                >
                  <img
                    src={icon}
                    alt={categories[i % categories.length]}
                    className="h-16 sm:h-20 mx-auto mb-3 md:mb-4 object-contain hover:brightness-125 transition-all"
                  />
                  <p className="font-semibold text-white text-xs sm:text-sm md:text-base">
                    {categories[i % categories.length]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section>
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <div>
              <h2 className="md:text-4xl font-bold">
                Featured{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Books
                </span>
              </h2>
              <p className="text-gray-400 mt-1">
                Curated picks for every reader
              </p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="px-5 py-3 rounded-full bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              />
              <Link
                to="/products"
                className="
    inline-block 
    px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
    text-sm sm:text-base md:text-lg 
    bg-gradient-to-r from-blue-600 to-purple-600 
    rounded-full font-semibold 
    text-white text-center
    hover:shadow-lg hover:shadow-blue-500/50 
    hover:scale-105 
    transition-all duration-300 ease-in-out
  "
              >
                View All →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto lg:grid-cols-3 gap-4">
            {currentProducts.map((p) => (
              <div
                key={p._id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-5 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-2 transition-all duration-500"
              >
                <img
                  src={
                    p.image.startsWith("http") ? p.image : getImageSrc(p.image)
                  }
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2">by {p.author}</p>
                <p className="text-blue-400 font-bold">${p.price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 rounded-lg bg-gray-800/50 border border-gray-600/50 hover:bg-gray-700 disabled:opacity-50 transition-all"
            >
              Previous
            </button>

            {pageNumbers.map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === num
                    ? "bg-blue-600 text-white scale-110 shadow-lg"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(pageNumbers.length, prev + 1))
              }
              disabled={currentPage === pageNumbers.length}
              className="px-6 py-3 rounded-lg bg-gray-800/50 border border-gray-600/50 hover:bg-gray-700 disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 md:p-12 border border-blue-500/30 backdrop-blur-sm text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Subscribe to get new book releases and exclusive offers directly to
            your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none flex-1"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all">
              Subscribe
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
