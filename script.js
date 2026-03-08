document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  const yearSpan = document.getElementById("year");
  const themeToggle = document.querySelector(".theme-toggle");
  const root = document.documentElement;

  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  const THEME_STORAGE_KEY = "flp-theme";

  function applyTheme(theme) {
    const isDark = theme === "dark";

    if (isDark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }

    if (themeToggle instanceof HTMLButtonElement) {
      themeToggle.classList.toggle("is-dark", isDark);
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );

      const labelEl = themeToggle.querySelector(".theme-toggle-text");
      if (labelEl) {
        labelEl.textContent = isDark ? "Dark" : "Light";
      }
    }

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors (e.g., private mode)
    }
  }

  // Initialize theme from storage or system preference
  let initialTheme = "light";
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      initialTheme = stored;
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      initialTheme = "dark";
    }
  } catch {
    // fall back to light
  }

  applyTheme(initialTheme);

  if (themeToggle instanceof HTMLButtonElement) {
    themeToggle.addEventListener("click", () => {
      const currentTheme =
        root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      navList.classList.toggle("open", !isOpen);
    });

    navList.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) {
        navToggle.setAttribute("aria-expanded", "false");
        navList.classList.remove("open");
      }
    });
  }

  // Smooth scrolling for same-page links and buttons with data-scroll-target
  function smoothScrollTo(targetSelector) {
    const targetEl = document.querySelector(targetSelector);
    if (!targetEl) return;

    const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
    const rect = targetEl.getBoundingClientRect();
    const offsetTop = rect.top + window.pageYOffset - (headerHeight + 16);

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }

  document.addEventListener("click", (event) => {
    const target = event.target;

    // Handle buttons with data-scroll-target
    if (
      target instanceof HTMLButtonElement &&
      target.dataset.scrollTarget
    ) {
      event.preventDefault();
      smoothScrollTo(target.dataset.scrollTarget);
      return;
    }

    // Handle nav / anchor internal links
    if (target instanceof HTMLAnchorElement) {
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        event.preventDefault();
        smoothScrollTo(href);
      }
    }
  });

  // Reveal-on-scroll for sections and cards
  const revealEls = document.querySelectorAll(
    ".section, .card, .process-steps li, .cta-inner, .hero-inner"
  );
  revealEls.forEach((el) => el.setAttribute("data-reveal", "pending"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all immediately
    revealEls.forEach((el) => el.setAttribute("data-reveal", "visible"));
  }

  // Lightweight fake form handling (prevent page reload)
  const contactForm = document.querySelector(".contact-form");

if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener("submit", () => {
    const button = contactForm.querySelector("button[type='submit']");
    const note = contactForm.querySelector(".form-note");

    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    if (note) {
      note.textContent = "Sending your inquiry...";
    }
  });
}

window.addEventListener("load", () => {
  const form = document.querySelector(".contact-form");
  if (form instanceof HTMLFormElement) {
    form.reset();
  }
});

// Initialize Flatpickr for timeline input
flatpickr("#timeline", {
  dateFormat: "m/d/Y", // MM/DD/YYYY
  allowInput: true     // allow typing as well as using the picker
});

const budgetInput = document.getElementById("budget");

budgetInput.addEventListener("input", (e) => {
  // Remove everything except digits
  let numericValue = e.target.value.replace(/[^\d]/g, "");

  if (numericValue) {
    // Add commas for thousands
    numericValue = parseInt(numericValue, 10).toLocaleString("en-PH");

    // Format with peso sign
    e.target.value = "₱" + numericValue;
  } else {
    e.target.value = "₱";
  }
});

});

