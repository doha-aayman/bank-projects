const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navLinks = document.querySelector(".nav__links");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const h1 = document.querySelector("h1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabscontent = document.querySelectorAll(".operations__content");
const sections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section--1");
const section3 = document.querySelector("#section--3");
const btnOpenModel = document.querySelector(".btn--show-modal");
const btnCloseModel = document.querySelector(".btn--close-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  //   window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset,
  //   );

  //  window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  // behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();

//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

navLinks.addEventListener("click", function (e) {
  //event delegation
  e.preventDefault();

  //matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;

  //remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabscontent.forEach((c) => c.classList.remove("operations__content--active"));

  //activate content area
  clicked.classList.add("operations__tab--active");

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

const initialCoords = section1.getBoundingClientRect();
window.addEventListener("scroll", function () {
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => (el !== link ? (el.style.opacity = opacity) : el));
    logo.style.opacity = opacity;
  }
};
nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));
nav.addEventListener("mouseout", (e) => handleHover(e, 1));

// const obsCallback =function(entries , observer){
// console.log('keky');
// }

// const obsOptions = {
//     root:null,
//     threshold:0.1,
// }

// const observer = new IntersectionObserver(obsCallback , obsOptions);
// observer.observe(section3);

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const navHeight = nav.getBoundingClientRect().height;
const headerOpserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerOpserver.observe(header);

//reveal sections

const revealSection1 = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add("section--hidden");
});
