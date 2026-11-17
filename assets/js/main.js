(function () {
  "use strict";

  var root = document.documentElement;
  var STORAGE_KEY = "pv-theme";

  /* ---------- Tema claro / oscuro ---------- */
  function readStored() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      return s === "light" || s === "dark" ? s : null;
    } catch (e) {
      return null;
    }
  }

  function systemMode() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function effectiveMode() {
    return readStored() || systemMode();
  }

  function syncButtons() {
    var mode = effectiveMode();
    document.querySelectorAll("[data-theme-choice]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.themeChoice === mode ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-theme-choice]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var mode = btn.dataset.themeChoice;
      root.setAttribute("data-theme", mode);
      try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) {}
      syncButtons();
    });
  });

  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () { if (!readStored()) syncButtons(); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
  }
  syncButtons();

  /* ---------- Menú móvil ---------- */
  var menuBtn = document.getElementById("menu-toggle");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.querySelector("[data-menu-label]").textContent = open
      ? menuBtn.dataset.labelOpen
      : menuBtn.dataset.labelClosed;
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a[href^='#']").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- Botones flotantes: se ocultan al llegar a Contacto ---------- */
  var contact = document.getElementById("contacto");
  function updateFabs() {
    if (!contact) return;
    var r = contact.getBoundingClientRect();
    var vh = window.innerHeight || root.clientHeight;
    var atContact = r.top < vh - 88 && r.bottom > 0;
    if (atContact) root.setAttribute("data-at-contact", "");
    else root.removeAttribute("data-at-contact");
  }
  window.addEventListener("scroll", updateFabs, { passive: true });
  window.addEventListener("resize", updateFabs);
  updateFabs();
})();
