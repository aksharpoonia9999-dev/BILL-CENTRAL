// NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("mobile-menu-overlay");
  const menuLinks = document.querySelectorAll(".mobile-menu-link");

  if (!menuButton || !mobileMenu || !overlay) return;

  const openMenu = () => {
    mobileMenu.classList.remove("invisible", "translate-x-full", "opacity-0");
    mobileMenu.classList.add("visible", "translate-x-0", "opacity-100");

    overlay.classList.remove("pointer-events-none", "invisible", "opacity-0");

    overlay.classList.add("pointer-events-auto", "visible", "opacity-100");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");

    const spans = menuButton.querySelectorAll("span");

    spans[0].classList.add("translate-y-[9px]", "rotate-45");
    spans[1].classList.add("scale-0", "opacity-0");
    spans[2].classList.add("-translate-y-[9px]", "-rotate-45");

    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("visible", "translate-x-0", "opacity-100");
    mobileMenu.classList.add("invisible", "translate-x-full", "opacity-0");

    overlay.classList.remove("pointer-events-auto", "visible", "opacity-100");

    overlay.classList.add("pointer-events-none", "invisible", "opacity-0");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    const spans = menuButton.querySelectorAll("span");

    spans[0].classList.remove("translate-y-[9px]", "rotate-45");
    spans[1].classList.remove("scale-0", "opacity-0");
    spans[2].classList.remove("-translate-y-[9px]", "-rotate-45");

    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  menuButton.addEventListener("click", toggleMenu);

  overlay.addEventListener("click", closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1280) {
      closeMenu();
    }
  });
});

// LOGO INF SCROLL

const logosTrack = document.querySelector(".logos-track");

logosTrack.innerHTML += logosTrack.innerHTML;

let logoOffset = 0;

function moveLogos() {
  logoOffset -= 1;

  if (Math.abs(logoOffset) >= logosTrack.scrollWidth / 2) {
    logoOffset = 0;
  }

  logosTrack.style.transform = `translateX(${logoOffset}px)`;

  requestAnimationFrame(moveLogos);
}

moveLogos();

// SCROLL CARDS

const cards = document.getElementById("cards");

let position = 0;

function getCardWidth() {
  const card = cards.children[0];
  const gap = 24;

  return card.offsetWidth + gap;
}

function moveRight() {
  const cardWidth = getCardWidth();

  position -= cardWidth;

  cards.style.transition = "transform 500ms ease";
  cards.style.transform = `translateX(${position}px)`;

  setTimeout(() => {
    cards.appendChild(cards.children[0]);

    position += cardWidth;

    cards.style.transition = "none";
    cards.style.transform = `translateX(${position}px)`;
  }, 500);
}

function moveLeft() {
  const cardWidth = getCardWidth();

  cards.insertBefore(
    cards.children[cards.children.length - 1],
    cards.children[0],
  );

  position -= cardWidth;

  cards.style.transition = "none";
  cards.style.transform = `translateX(${position}px)`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      position += cardWidth;

      cards.style.transition = "transform 500ms ease";
      cards.style.transform = `translateX(${position}px)`;
    });
  });
}

// ACCORDIONS
document
  .querySelectorAll(".accordions-bottom .accordion")
  .forEach((accordion, index) => {
    const button = accordion.querySelector(".accordion-toggle");
    const content = accordion.querySelector(".accordion-content");
    const plus = accordion.querySelector(".accordion-plus");
    const minus = accordion.querySelector(".accordion-minus");

    const heading = accordion.querySelector(".heading");
    const paragraph = accordion.querySelector(".para");

    const circles = accordion.querySelectorAll("circle");
    const fills = accordion.querySelectorAll("rect");

    const openAccordion = () => {
      accordion.classList.add("is-open");

      accordion.classList.add("bg-prussian-blue");
      accordion.classList.remove("bg-white");

      heading.classList.add("text-white");
      heading.classList.remove("text-deep-blue");

      paragraph.classList.add("text-white");
      paragraph.classList.remove("text-deep-blue");

      circles.forEach((circle) => {
        circle.classList.add("stroke-[#FEFEFE]");
        circle.classList.remove("stroke-[#00171F]");
      });

      fills.forEach((fill) => {
        fill.classList.add("fill-[#FEFEFE]");
        fill.classList.remove("fill-[#00171F]");
      });

      content.classList.remove("grid-rows-[0fr]");
      content.classList.add("grid-rows-[1fr]");

      plus.classList.add("hidden");
      minus.classList.remove("hidden");
    };

    const closeAccordion = () => {
      accordion.classList.remove("is-open");

      accordion.classList.remove("bg-prussian-blue");
      accordion.classList.add("bg-white");

      heading.classList.remove("text-white");
      heading.classList.add("text-deep-blue");

      paragraph.classList.remove("text-white");
      paragraph.classList.add("text-deep-blue");

      circles.forEach((circle) => {
        circle.classList.remove("stroke-[#FEFEFE]");
        circle.classList.add("stroke-[#00171F]");
      });

      fills.forEach((fill) => {
        fill.classList.remove("fill-[#FEFEFE]");
        fill.classList.add("fill-[#00171F]");
      });

      content.classList.remove("grid-rows-[1fr]");
      content.classList.add("grid-rows-[0fr]");

      plus.classList.remove("hidden");
      minus.classList.add("hidden");
    };

    if (index === 0) {
      openAccordion();
    }

    button.addEventListener("click", () => {
      if (accordion.classList.contains("is-open")) {
        closeAccordion();
      } else {
        openAccordion();
      }
    });
  });
