// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking a link (mobile)
  navMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Contact form: front-end validation + "mailto:" fallback
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function setStatus(msg) {
  if (statusEl) statusEl.textContent = msg;
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      setStatus("Please fill in all fields.");
      return;
    }

    // Basic email pattern
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setStatus("Please enter a valid email address.");
      return;
    }

    // Default: open user's email client
    const subject = encodeURIComponent("Portfolio Contact — Sakar Subedi");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
    );

    window.location.href = `mailto:subedi111@gmail.com?subject=${subject}&body=${body}`;
    setStatus("Opening your email client… If it doesn't open, please email directly: subedi111@gmail.com");
    form.reset();
  });
}

// Gallery lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCap = document.getElementById("lightboxCap");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(imgSrc, caption) {
  if (!lightbox || !lightboxImg || !lightboxCap) return;
  lightboxImg.src = imgSrc;
  lightboxImg.alt = caption || "Render preview";
  lightboxCap.textContent = caption || "";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    const cap = item.querySelector("figcaption");
    if (img) openLightbox(img.src, cap?.textContent || "");
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
