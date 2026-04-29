# eGov Foundation Landing Page

A responsive static landing page for the eGov Foundation, built with HTML, CSS, and Bootstrap. This project showcases the foundation's mission, impact, approach, products, and latest news, providing a clean and engaging user experience.

## Features

- **Responsive Design:** Optimized for various screen sizes using Bootstrap 5, ensuring a consistent experience across desktops, tablets, and mobile devices.
- **Dynamic Navigation:**
  - The navigation bar (`#mainNavbar`) dynamically changes its appearance (e.g., background color) as the user scrolls down the page.
  - Smooth scrolling is implemented for all internal navigation links, providing a fluid user experience when jumping between sections.
  - Active navigation links are highlighted in the navbar based on the currently visible section in the viewport, using an `IntersectionObserver`.
- **Key Sections:**
  - **Hero Section:** An engaging introduction to the eGov Foundation with a clear call to action.
  - **Impact Metrics:** Highlights the foundation's significant achievements and reach.
  - **Approach & Solutions:** Details the foundation's areas of work and specific digital public service solutions, with a pill-based navigation for different categories.
  - **Stories & Insights:** Features leadership and citizen stories, presented as video placeholders.
  - **DIGIT Platform:** Introduces DIGIT, eGov's open-source technology-for-good platform.
  - **News & Resources:** Displays the latest updates, articles, whitepapers, and media from eGov, with filter buttons (though filtering logic is not implemented in the provided JS).
  - **Supporters:** Acknowledges key partners and funding organizations.
- **Footer:** Contains useful links, social media connections, and a newsletter subscription form.
- **Automated Deployment:** Integrated with GitHub Actions for continuous deployment to GitHub Pages, ensuring that every push to the `main` branch automatically updates the live site.

## Technologies Used

- **HTML5:** For structuring the web content.
- **CSS3:** For styling and layout (via `styles.css` and Bootstrap).
- **Bootstrap 5:** A powerful front-end framework for responsive design and UI components.
- **Font Awesome:** For scalable vector icons.
- **Google Fonts (DM Sans):** For custom typography.
- **JavaScript:** For interactive elements and dynamic behaviors.

## Code Flow and Structure

### `egov-landing.html`

This is the main HTML file that defines the structure and content of the landing page.

- **Head Section:** Links to external resources like Google Fonts, Bootstrap CSS, Font Awesome, and the local `styles.css` file. It also sets up meta tags for responsiveness and character encoding.
- **Header (`.site-header`):** Contains a top bar for events, contact, and language selection, followed by the main navigation bar (`#mainNavbar`). The navbar is a Bootstrap component, made sticky (`fixed-top`) and responsive with a toggler for mobile views.
- **Main Content (`<main>`):** Divided into several `<section>` elements, each representing a distinct part of the landing page (e.g., `hero-section`, `impact-hero`, `approach-section`, `news-section`). Each section has a unique `id` which is used for navigation and scroll-spy functionality.
- **Footer (`.site-footer`):** Includes useful links, social media icons, a newsletter subscription form, and copyright information.
- **Scripts:** Links to Bootstrap's JavaScript bundle and the local `script.js` file at the end of the `<body>` for performance.

### `styles.css` (Implied)

While not provided, this file is expected to contain custom CSS rules that:

- Override or extend Bootstrap's default styles to match the eGov branding.
- Define specific layouts, colors, typography, and responsive adjustments for various components and sections.
- Implement styles for the dynamic navbar states (e.g., `.navbar-scrolled`).
- Provide styles for the scroll-reveal animations (e.g., `.reveal` and `.reveal.is-visible`).

### `script.js`

This JavaScript file handles the interactive and dynamic aspects of the landing page.

- **Navbar Behavior:**
  - `setNavbarState()`: An event listener on `window.scroll` triggers this function, which adds or removes the `navbar-scrolled` class to the `#mainNavbar` based on the vertical scroll position (`window.scrollY > 24`). This allows for visual changes to the navbar (e.g., a solid background) after scrolling a short distance.
  - `closeMobileMenu()`: Utilizes Bootstrap's `Collapse` component to programmatically hide the mobile navigation menu (`#navbarMenu`) if it's open. This is called after a navigation link is clicked to ensure the menu closes.
- **Smooth Scrolling and URL Hashing:**
  - It iterates through all navigation links (`a[href^='#']`) and attaches a click event listener.
  - When a link is clicked, it prevents the default jump, smoothly scrolls the target section into view using `scrollIntoView({ behavior: "smooth" })`, and updates the browser's URL hash (`history.pushState`) to reflect the current section.
- **Active Navigation Link Highlighting (`sectionObserver`):**
  - An `IntersectionObserver` is used to monitor when `main section[id]` elements enter or exit the viewport.
  - When a section becomes sufficiently visible (defined by `rootMargin` and `threshold`), the corresponding navigation link in the navbar is given the `active` class, and the `active` class is removed from other links.
  - The browser's URL hash is also updated using `history.replaceState` to match the active section, without adding entries to the browser history.
- **Scroll-Reveal Animations (`revealObserver`):**
  - Another `IntersectionObserver` is set up to create scroll-reveal effects.
  - Elements specified in the `animatedItems` array (e.g., `.feature-card`, `.impact-card`, etc.) are initially given a `reveal` class.
  - When these elements enter the viewport, the `is-visible` class is added to them. This `is-visible` class, in conjunction with CSS transitions/animations defined in `styles.css`, would trigger a visual animation (e.g., fade-in, slide-up). Once revealed, the observer stops watching that element.

### `deploy.yml` (GitHub Actions Workflow)

This YAML file defines the CI/CD pipeline for deploying the static site to GitHub Pages.

- **`name`:** "Deploy Static Site" - A descriptive name for the workflow.
- **`on`:**
  - `push.branches: ["main"]`: The workflow triggers automatically whenever changes are pushed to the `main` branch.
  - `workflow_dispatch`: Allows manual triggering of the workflow from the GitHub Actions tab.
- **`permissions`:** Configures necessary permissions for the workflow to read repository content, write to GitHub Pages, and use an `id-token`.
- **`concurrency`:** Ensures that only one deployment job runs at a time for the "pages" group, preventing conflicting deployments.
- **`jobs.deploy`:**
  - `environment`: Specifies the GitHub Pages environment for deployment, linking to the URL of the deployed site.
  - `runs-on: ubuntu-latest`: The job will execute on the latest Ubuntu runner.
  - **`steps`:**
    - `Checkout`: Uses `actions/checkout@v4` to fetch the repository's code.
    - `Setup Pages`: Uses `actions/configure-pages@v4` to set up the GitHub Pages environment.
    - `Upload artifact`: Uses `actions/upload-pages-artifact@v3` to upload the entire project directory (`.`) as a build artifact. This artifact will be served by GitHub Pages.
    - `Deploy to GitHub Pages`: Uses `actions/deploy-pages@v4` to deploy the uploaded artifact to GitHub Pages.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME
    ```
2.  **Open `egov-landing.html`** in your web browser to view the site locally.
3.  **Deployment:** The site is automatically deployed to GitHub Pages via GitHub Actions upon pushes to the `main` branch. Ensure GitHub Pages is enabled in your repository settings, pointing to the `gh-pages` branch or GitHub Actions.

---

**Note:** For optimal GitHub Pages deployment, it is recommended to rename `egov-landing.html` to `index.html` so it serves as the default page at the root URL.
