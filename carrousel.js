function triggerWiggle() {
  const card = section.querySelector(".project-card");
  if (!card) return;

  card.classList.add("wiggle");
  setTimeout(() => card.classList.remove("wiggle"), 500);
}

function initCarousel(section) {
  const cardsContainer = section.querySelector(".carousel-container");
  let cards = Array.from(section.querySelectorAll(".project-card"));

  const leftArrow = section.querySelector(".left-arrow");
  const rightArrow = section.querySelector(".right-arrow");
  const indicator = section.querySelector(".carousel-indicator");

  const count = cards.length;

  /* ---------- CAS 1 : 1 CARTE ---------- */
  if (count === 1) {
    if (indicator) indicator.textContent = "1/1";

    leftArrow.addEventListener("click", triggerWiggle);
    rightArrow.addEventListener("click", triggerWiggle);

    return;
  }

  /* ---------- CAS 2 : 2 CARTES → simple échange ---------- */
  if (count === 2) {
    let index = 0; // 0 : A centre, B droite ; 1 : A droite, B centre

    function applyTwoCards() {
      cards.forEach((c) =>
        c.classList.remove("card-left", "card-center", "card-right"),
      );

      const A = cards[0];
      const B = cards[1];

      if (index === 0) {
        A.classList.add("card-center");
        B.classList.add("card-right");
        if (indicator) indicator.textContent = "1/2";
      } else {
        A.classList.add("card-right");
        B.classList.add("card-center");
        if (indicator) indicator.textContent = "2/2";
      }
    }

    applyTwoCards();

    rightArrow.addEventListener("click", () => {
      index = 1 - index;
      applyTwoCards();
    });

    leftArrow.addEventListener("click", () => {
      index = 1 - index;
      applyTwoCards();
    });

    return;
  }

  /* ---------- CAS 3+ : CARROUSEL INFINI ---------- */
  let isAnimating = false;

  function updateIndicator() {
    if (!indicator) return;
    const centerCard = cards[1];
    const index = parseInt(centerCard.dataset.index, 10);
    indicator.textContent = `${index}/${count}`;
  }

  function applyClasses() {
    cards.forEach((card) => {
      card.classList.remove(
        "card-left",
        "card-center",
        "card-right",
        "card-out-left",
        "card-out-right",
      );
    });

    cards[0].classList.add("card-left");
    cards[1].classList.add("card-center");
    cards[2].classList.add("card-right");

    updateIndicator();
  }

  function slideLeft() {
    if (isAnimating) return;
    isAnimating = true;

    const nextCard = cards[3] || cards[0]; // marche aussi avec exactement 3 cartes

    nextCard.classList.add("card-out-right");
    void nextCard.offsetWidth;

    cards[0].classList.replace("card-left", "card-out-left");
    cards[1].classList.replace("card-center", "card-left");
    cards[2].classList.replace("card-right", "card-center");
    nextCard.classList.replace("card-out-right", "card-right");

    setTimeout(() => {
      const first = cards.shift();
      cards.push(first);
      cardsContainer.appendChild(first);

      applyClasses();
      isAnimating = false;
    }, 450);
  }

  function slideRight() {
    if (isAnimating) return;
    isAnimating = true;

    const prevCard = cards[cards.length - 1];

    prevCard.classList.add("card-out-left");
    void prevCard.offsetWidth;

    cards[2].classList.replace("card-right", "card-out-right");
    cards[1].classList.replace("card-center", "card-right");
    cards[0].classList.replace("card-left", "card-center");
    prevCard.classList.replace("card-out-left", "card-left");

    setTimeout(() => {
      const last = cards.pop();
      cards.unshift(last);
      cardsContainer.insertBefore(last, cardsContainer.firstChild);

      applyClasses();
      isAnimating = false;
    }, 450);
  }

  leftArrow.addEventListener("click", slideRight);
  rightArrow.addEventListener("click", slideLeft);

  applyClasses();
}

/* Initialisation de tous les carrousels */
document.querySelectorAll(".carousel-section").forEach((section) => {
  initCarousel(section);
});
