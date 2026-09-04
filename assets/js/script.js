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

    if (index === 0) {
      accordion.classList.add("is-open");

      content.classList.remove("grid-rows-[0fr]");
      content.classList.add("grid-rows-[1fr]");

      plus.classList.add("hidden");
      minus.classList.remove("hidden");
    }

    button.addEventListener("click", () => {
      const isOpen = accordion.classList.contains("is-open");

      if (isOpen) {
        accordion.classList.remove("is-open");

        content.classList.remove("grid-rows-[1fr]");
        content.classList.add("grid-rows-[0fr]");

        plus.classList.remove("hidden");
        minus.classList.add("hidden");
      } else {
        accordion.classList.add("is-open");

        content.classList.remove("grid-rows-[0fr]");
        content.classList.add("grid-rows-[1fr]");

        plus.classList.add("hidden");
        minus.classList.remove("hidden");
      }
    });
  });
