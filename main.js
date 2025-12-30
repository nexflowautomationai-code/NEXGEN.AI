/* =====================================================
   NexGen Automation – Production JavaScript
   Stable | Mobile-Friendly | Formspree Compatible
===================================================== */

console.log("🔥 NexGen JS Loaded – Production Stable");

/* =====================================================
   MOBILE NAVIGATION TOGGLE
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close menu when link is clicked (mobile UX)
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
});

/* =====================================================
   SMOOTH SCROLL FOR NAV BUTTONS
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach(el => observer.observe(el));
});

/* =====================================================
   COUNTER ANIMATION
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseInt(el.dataset.target, 10) || 0;
        let current = 0;
        const speed = Math.max(20, Math.floor(2000 / target));

        const interval = setInterval(() => {
          current++;
          el.textContent = current;
          if (current >= target) {
            clearInterval(interval);
          }
        }, speed);

        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(counter => counterObserver.observe(counter));
});

/* =====================================================
   IMPORTANT NOTE
=====================================================

🚫 NO FORM SUBMISSION HANDLING HERE

✔ Contact Form
✔ Consultation Form

These are handled via Formspree using:
<form action="https://formspree.io/..." method="POST">

BENEFITS:
✔ No JS errors
✔ No double submission
✔ Mobile safe
✔ No CORS issues
✔ Works on Netlify / GitHub Pages

===================================================== */
