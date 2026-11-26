// Vinivex Studio — vanilla JavaScript interactions
// Replace the placeholder email below before publishing.
const BUSINESS_EMAIL = "vineetkrishnaswain@gmail.com";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.classList.toggle("open", !isOpen);
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

document.querySelector("#year").textContent = new Date().getFullYear();

const emailDisplay = document.querySelector("#email-display");
if (emailDisplay) {
  emailDisplay.textContent = BUSINESS_EMAIL;
  emailDisplay.href = `mailto:${BUSINESS_EMAIL}`;
}

const toast = document.querySelector("#toast");
let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelector("#copy-email")?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(BUSINESS_EMAIL);
    showToast("Email address copied.");
  } catch {
    showToast(`Email: ${BUSINESS_EMAIL}`);
  }
});

const fileInput = document.querySelector("#reference-files");
const fileNote = document.querySelector("#file-note");
fileInput?.addEventListener("change", () => {
  const count = fileInput.files.length;
  fileNote.textContent = count
    ? `${count} file(s) selected. Your email app may not attach them automatically; attach them manually before sending.`
    : "You can select reference files. Your email app may not attach them automatically; attach them manually before sending.";
});

document.querySelector("#enquiry-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  if (BUSINESS_EMAIL === "YOUR_EMAIL_HERE") {
    showToast("Please set your business email in script.js first.");
    document.querySelector("#form-status").textContent =
      "Setup required: replace YOUR_EMAIL_HERE in script.js with your real business email before using enquiries.";
    return;
  }

  const data = new FormData(form);
  const subject = `Project enquiry — ${data.get("service")}`;
  const body = [
    "Hello Vinivex Studio,",
    "",
    "I'd like to enquire about a project.",
    "",
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Service: ${data.get("service")}`,
    `Phone: ${data.get("phone") || "Not provided"}`,
    "",
    "Project description:",
    data.get("description"),
    "",
    "I understand that reference files may need to be attached manually.",
  ].join("\n");

  const mailto = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector("#form-status").textContent =
    "Your email app should open with the enquiry details. Review the message, attach any reference files, then send it.";
  window.location.href = mailto;
});

// Smooth reveal on scroll, with a reduced-motion fallback.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}
