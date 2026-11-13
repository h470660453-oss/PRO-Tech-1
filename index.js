/* PRO.Tech — الصفحة الرئيسية: تبديل الوضع (داكن / فاتح) */
(function () {
  "use strict";

  var THEME_KEY = "protech-theme";
  var button = document.getElementById("themeToggle");

  function load() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function save(value) {
    try { localStorage.setItem(THEME_KEY, value); } catch (e) { /* تجاهل */ }
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    button.textContent = theme === "dark" ? "☀ الوضع الفاتح" : "☾ الوضع الداكن";
  }

  apply(load() === "light" ? "light" : "dark");

  button.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    save(next);
    apply(next);
  });
})();
