/* =====================================================
   NexGen AI – Main Controller
   Premium SaaS / Production Version
===================================================== */

(function () {
  "use strict";

  /* ================= DOM ELEMENTS ================= */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const regionModal = document.getElementById("nxgRegionModal");

  /* ================= STORAGE KEYS ================= */
  const STORAGE = {
    currency: "nxg_currency",
    regionSelected: "nxg_region_selected"
  };

  /* ================= UTILITIES ================= */
  function debounce(fn, delay = 80) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function isMobile() {
    return window.innerWidth <= 900;
  }

  /* ================= NAVBAR STICKY ================= */
  function initStickyNavbar() {
    if (!navbar) return;

    const onScroll = debounce(() => {
      if (window.scrollY > 40) {
        navbar.classList.add("navbar-sticky");
      } else {
        navbar.classList.remove("navbar-sticky");
      }
    }, 40);

    window.addEventListener("scroll", onScroll);
  }

  /* ================= MOBILE MENU ================= */
  function initMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("nav-active");
      hamburger.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (isMobile()) {
          navMenu.classList.remove("nav-active");
          hamburger.classList.remove("open");
        }
      });
    });
  }

  /* ================= SMOOTH SCROLL ================= */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", e => {
        const targetId = anchor.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  }

  /* ================= SECTION REVEAL ================= */
  function initRevealAnimations() {
    const elements = document.querySelectorAll(
      ".service-card, .process-card, .contact-info, .contact-form, .consultation-form"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("nxg-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));
  }

  /* ================= FORM SUBMIT UX ================= */
  function initFormUX() {
    document.querySelectorAll("form").forEach(form => {
      form.addEventListener("submit", () => {
        const btn = form.querySelector("button[type='submit']");
        if (btn) {
          btn.disabled = true;
          btn.textContent = "Submitting…";
        }
      });
    });
  }

  /* ================= REGION SAFETY ================= */
  function enforceRegionSelection() {
    if (!regionModal) return;

    const currency = localStorage.getItem(STORAGE.currency);
    const selected = localStorage.getItem(STORAGE.regionSelected);

    if (!currency || !selected) {
      regionModal.classList.remove("nxg-hidden");
      document.body.style.overflow = "hidden";
    }
  }

  /* ================= GLOBAL SHORTCUT ================= */
  function closeRegionModal() {
    if (!regionModal) return;
    regionModal.classList.add("nxg-hidden");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest(".nxg-region-btn");
    if (!btn) return;

    localStorage.setItem(STORAGE.currency, btn.dataset.currency);
    localStorage.setItem(STORAGE.regionSelected, "true");
    closeRegionModal();

    setTimeout(() => location.reload(), 150);
  });

  /* ================= INIT ================= */
  document.addEventListener("DOMContentLoaded", () => {
    initStickyNavbar();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initFormUX();
    enforceRegionSelection();
  });

})();




/* =====================================================
   NexGen AI – Main JS (Demo Page + Global)
   Premium SaaS / Production Version
===================================================== */

(function () {
  "use strict";

  /* ================= DOM ================= */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  const automationSelect = document.getElementById("automationType");
  const videoWrapper = document.getElementById("videoWrapper");
  const demoVideo = document.getElementById("demoVideo");

  /* ================= UTILITIES ================= */
  function debounce(fn, delay = 80) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function isMobile() {
    return window.innerWidth <= 900;
  }

  /* ================= STICKY NAVBAR ================= */
  function initStickyNavbar() {
    if (!navbar) return;

    const onScroll = debounce(() => {
      if (window.scrollY > 40) {
        navbar.classList.add("navbar-sticky");
      } else {
        navbar.classList.remove("navbar-sticky");
      }
    }, 40);

    window.addEventListener("scroll", onScroll);
  }

  /* ================= MOBILE MENU ================= */
  function initMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("nav-active");
      hamburger.classList.toggle("open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (isMobile()) {
          navMenu.classList.remove("nav-active");
          hamburger.classList.remove("open");
        }
      });
    });
  }

  /* ================= DEMO VIDEO LOGIC ================= */
  function initDemoAutomation() {
    if (!automationSelect || !demoVideo || !videoWrapper) return;

    const demoVideos = {
      whatsapp: "https://www.youtube.com/embed/VIDEO_ID_1",
      website: "https://www.youtube.com/embed/VIDEO_ID_2",
      crm: "https://www.youtube.com/embed/VIDEO_ID_3",
      sales: "https://www.youtube.com/embed/VIDEO_ID_4",
      marketing: "https://www.youtube.com/embed/VIDEO_ID_5",
      ads: "https://www.youtube.com/embed/VIDEO_ID_6",
      support: "https://www.youtube.com/embed/VIDEO_ID_7",
      orders: "https://www.youtube.com/embed/VIDEO_ID_8",
      payments: "https://www.youtube.com/embed/VIDEO_ID_9",
      custom: "https://www.youtube.com/embed/VIDEO_ID_10"
    };

    automationSelect.addEventListener("change", () => {
      const selected = automationSelect.value;

      if (!selected || !demoVideos[selected]) {
        demoVideo.src = "";
        videoWrapper.style.display = "none";
        return;
      }

      demoVideo.src = demoVideos[selected];
      videoWrapper.style.display = "block";
    });
  }

  /* ================= PAGE LOAD ================= */
  document.addEventListener("DOMContentLoaded", () => {
    initStickyNavbar();
    initMobileMenu();
    initDemoAutomation();
  });

})();
