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

  let mobileMenuInitialized = false;

function initMobileMenu() {
  if (!hamburger || !navMenu || mobileMenuInitialized) return;
  mobileMenuInitialized = true;

  const openMenu = () => {
    navMenu.classList.add("nav-active");
    hamburger.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    navMenu.classList.remove("nav-active");
    hamburger.classList.remove("open");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();

    navMenu.classList.contains("nav-active")
      ? closeMenu()
      : openMenu();
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (isMobile()) closeMenu();
    });
  });

  document.addEventListener("click", e => {
    if (!isMobile()) return;
    if (!navMenu.classList.contains("nav-active")) return;

    if (
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) closeMenu();
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
===================================================== */

(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  const automationSelect = document.getElementById("automationType");
  const videoWrapper = document.getElementById("videoWrapper");
  const demoVideo = document.getElementById("demoVideo");

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

  function initStickyNavbar() {
    if (!navbar) return;

    const onScroll = debounce(() => {
      navbar.classList.toggle("navbar-sticky", window.scrollY > 40);
    }, 40);

    window.addEventListener("scroll", onScroll);
  }

  function initMobileMenu() {
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", e => {
      e.stopPropagation();
      navMenu.classList.toggle("nav-active");
      hamburger.classList.toggle("open");
      document.body.style.overflow =
        navMenu.classList.contains("nav-active") ? "hidden" : "";
    });

    document.addEventListener("click", () => {
      if (isMobile()) {
        navMenu.classList.remove("nav-active");
        hamburger.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

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
      if (!demoVideos[selected]) {
        demoVideo.src = "";
        videoWrapper.style.display = "none";
        return;
      }

      demoVideo.src = demoVideos[selected];
      videoWrapper.style.display = "block";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initStickyNavbar();
    initMobileMenu();
    initDemoAutomation();
  });

})();

