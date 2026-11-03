(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("menu");
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  /* Menú móvil */
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  /* Sombra del encabezado al desplazarse */
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 4);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Enlace activo según la sección visible */
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        links.forEach(function (link) {
          var active = link.getAttribute("href") === id;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* Año del pie */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
