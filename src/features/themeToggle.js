export function initTheme(toggle, icon) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}