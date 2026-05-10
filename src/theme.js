const THEME_STORAGE_KEY = "amazonCloneTheme";

(function applyStoredThemeEarly() {
  try {
    if (localStorage.getItem(THEME_STORAGE_KEY) === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } catch (error) {
    /* ignore */
  }
})();

function enableDarkMode() {
  document.documentElement.setAttribute("data-theme", "dark");
  localStorage.setItem(THEME_STORAGE_KEY, "dark");
  syncThemeToggleUi();
}

function disableDarkMode() {
  document.documentElement.removeAttribute("data-theme");
  localStorage.setItem(THEME_STORAGE_KEY, "light");
  syncThemeToggleUi();
}

function loadThemePreference() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (saved !== "light") {
        localStorage.setItem(THEME_STORAGE_KEY, "light");
      }
    }
  } catch (error) {
    document.documentElement.removeAttribute("data-theme");
  }
  syncThemeToggleUi();
}

function isDarkModeEnabled() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function syncThemeToggleUi() {
  const darkOn = isDarkModeEnabled();
  document.querySelectorAll(".theme_toggle").forEach((button) => {
    button.setAttribute("aria-pressed", darkOn ? "true" : "false");
    const labelBase = darkOn ? "Switch to light mode" : "Switch to dark mode";
    button.setAttribute("aria-label", labelBase);
    button.setAttribute("title", labelBase);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadThemePreference();
  document.querySelectorAll(".theme_toggle").forEach((button) => {
    button.addEventListener("click", () => {
      if (isDarkModeEnabled()) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });
  });
});
