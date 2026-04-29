const navbar = document.querySelector("#mainNavbar");
const navLinks = document.querySelectorAll("a[href^='#']:not([href='#'])");
const sections = document.querySelectorAll("main section[id]");
const animatedItems = document.querySelectorAll(
  ".solution-card, .news-card, .quote-card, .impact-summary, .hero-visual",
);

function setNavbarState() {
  navbar.classList.toggle("navbar-scrolled", window.scrollY > 24);
}

function closeMobileMenu() {
  const menu = document.querySelector("#navbarMenu");
  const collapse = bootstrap.Collapse.getOrCreateInstance(menu, {
    toggle: false,
  });

  if (collapse && menu.classList.contains("show")) {
    collapse.hide();
  }
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const section = document.querySelector(link.getAttribute("href"));

    if (!section) {
      return;
    }

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", link.getAttribute("href"));
    closeMobileMenu();
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const hash = `#${entry.target.id}`;

        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === hash);
        });

        if (window.location.hash !== hash) {
          history.replaceState(null, "", hash);
        }
      }
    });
  },
  {
    rootMargin: "-40% 0px -50% 0px",
    threshold: 0,
  },
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

animatedItems.forEach((item) => {
  item.classList.add("reveal");
  revealObserver.observe(item);
});

setNavbarState();
window.addEventListener("scroll", setNavbarState, { passive: true });
