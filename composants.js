document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  if (header) {
    fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
        header.innerHTML = data;
      })
      .catch((err) => console.error("Erreur chargement header:", err));
  }
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
