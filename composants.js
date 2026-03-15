document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then((r) => r.text())
    .then((data) => {
      document.querySelector("header").innerHTML = data;

      // 🔥 Maintenant que le header existe, on active le burger
      const burger = document.querySelector(".burger");
      const mobileMenu = document.querySelector(".mobile-menu");

      if (burger && mobileMenu) {
        burger.addEventListener("click", () => {
          const isOpen = mobileMenu.classList.toggle("open");
          burger.classList.toggle("open", isOpen);
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
          link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            burger.classList.remove("open");
          });
        });
      }
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer");
  if (footer) {
    fetch("footer.html")
      .then((response) => response.text())
      .then((data) => {
        footer.innerHTML = data;
      })
      .catch((err) => console.error("Erreur chargement footer:", err));
  }
});
