console.log("🔥 Nexgen JS Loaded – Production Stable");

/* ===============================
   MOBILE MENU
================================ */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.style.display =
      navMenu.style.display === "flex" ? "none" : "flex";
  });
}

/* ===============================
   SCROLL REVEAL ANIMATION
================================ */
const reveals = document.querySelectorAll(".reveal");

if (reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );

  reveals.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
  });
}

/* ===============================
   COUNTER ANIMATION
================================ */
const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = Number(el.dataset.target || 0);
        let count = 0;

        const interval = setInterval(() => {
          count++;
          el.textContent = count;
          if (count >= target) clearInterval(interval);
        }, 20);

        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

/* ===============================
   IMPORTANT NOTE
================================
   🚫 NO FORM SUBMISSION CODE HERE

   Contact & Consultation forms
   are handled by Formspree via
   pure HTML action="" attribute.

   This ensures:
   ✔ Mobile compatibility
   ✔ No CORS issues
   ✔ No double submission
   ✔ Works on Netlify/GitHub Pages
================================ */
