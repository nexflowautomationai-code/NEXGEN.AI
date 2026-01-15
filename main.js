/* =====================================================
   NexGen AI – Core Application Controller
   Scope: Global (All Pages)
   Environment: Production / SaaS
===================================================== */

(function () {
  "use strict";

  /* =====================================================
     DOM REFERENCES
     (Fail-safe: all features guard against null)
  ===================================================== */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const regionModal = document.getElementById("nxgRegionModal");

  /* =====================================================
     LOCAL STORAGE KEYS
     (Centralized for maintainability)
  ===================================================== */
  const STORAGE = {
    currency: "nxg_currency",
    regionSelected: "nxg_region_selected"
  };

  /* =====================================================
     UTILITIES
  ===================================================== */

  /**
   * Debounce utility
   * Prevents excessive function calls (scroll / resize)
   */
  function debounce(fn, delay = 80) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /**
   * Mobile breakpoint check
   */
  function isMobile() {
    return window.innerWidth <= 900;
  }

  /* =====================================================
     NAVBAR: STICKY BEHAVIOR
  ===================================================== */
  function initStickyNavbar() {
    if (!navbar) return;

    const onScroll = debounce(() => {
      navbar.classList.toggle("navbar-sticky", window.scrollY > 40);
    }, 40);

    window.addEventListener("scroll", onScroll);
  }

  /* =====================================================
     MOBILE NAVIGATION
     - Single initialization guard
     - Prevents duplicate listeners
  ===================================================== */
  let mobileMenuInitialized = false;

  function initMobileMenu() {
    if (!hamburger || !navMenu || mobileMenuInitialized) return;
    mobileMenuInitialized = true;

    /**
     * Open mobile menu
     */
    const openMenu = () => {
      navMenu.classList.add("nav-active");
      hamburger.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    /**
     * Close mobile menu
     */
    const closeMenu = () => {
      navMenu.classList.remove("nav-active");
      hamburger.classList.remove("open");
      document.body.style.overflow = "";
    };

    /**
     * Hamburger toggle
     */
    hamburger.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      navMenu.classList.contains("nav-active")
        ? closeMenu()
        : openMenu();
    });

    /**
     * Close menu when clicking navigation links (mobile)
     */
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (isMobile()) closeMenu();
      });
    });

    /**
     * Close menu on outside click
     */
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

    /**
     * Close menu on ESC key
     */
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeMenu();
    });

    /**
     * Reset menu on desktop resize
     */
    window.addEventListener("resize", () => {
      if (!isMobile()) closeMenu();
    });
  }

  /* =====================================================
     REGION & CURRENCY ENFORCEMENT
     (Payment compliance & UX safety)
  ===================================================== */
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

  /**
   * Region selection handler
   */
  document.addEventListener("click", e => {
    const btn = e.target.closest(".nxg-region-btn");
    if (!btn) return;

    localStorage.setItem(STORAGE.currency, btn.dataset.currency);
    localStorage.setItem(STORAGE.regionSelected, "true");

    closeRegionModal();

    // Reload ensures currency-sensitive pricing refresh
    setTimeout(() => location.reload(), 150);
  });

  /* =====================================================
     INITIALIZATION
  ===================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initStickyNavbar();
    initMobileMenu();
    enforceRegionSelection();
  });

})();


/* =====================================================
   NexGen AI – Demo Page Controller (FINAL FIX)
===================================================== */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const automationSelect = document.getElementById("automationType");
    const demoVideo = document.getElementById("demoVideo");
    const demoImage = document.getElementById("demoImage");
    const mediaWrapper = document.getElementById("mediaWrapper");

    if (!automationSelect || !demoVideo || !demoImage || !mediaWrapper) {
      console.error("❌ Demo elements missing");
      return;
    }

    // Hide wrapper initially
    mediaWrapper.style.display = "none";

    const demoMedia = {
      whatsapp: {
        video: "https://www.youtube.com/embed/VIDEO_ID_1",
        image: "/whatsapp-flowchart.png"
      },
      website: {
        video: "https://www.youtube.com/embed/VIDEO_ID_2",
        image: "/website-flowchart.png"
      },
      crm: {
        video: "https://www.youtube.com/embed/VIDEO_ID_3",
        image: "/crm-flowchart.png"
      },
      sales: {
        video: "https://www.youtube.com/embed/VIDEO_ID_4",
        image: "/sales-flowchart.png"
      },
      marketing: {
        video: "https://www.youtube.com/embed/VIDEO_ID_5",
        image: "/marketing-flowchart.png"
      },
      ads: {
        video: "https://www.youtube.com/embed/VIDEO_ID_6",
        image: "/ads-flowchart.png"
      },
      support: {
        video: "https://www.youtube.com/embed/VIDEO_ID_7",
        image: "/support-flowchart.png"
      },
      orders: {
        video: "https://www.youtube.com/embed/VIDEO_ID_8",
        image: "/orders-flowchart.png"
      },
      payments: {
        video: "https://www.youtube.com/embed/VIDEO_ID_9",
        image: "/payments-flowchart.png"
      },
      custom: {
        video: "https://www.youtube.com/embed/VIDEO_ID_10",
        image: "/custom-flowchart.png"
      }
    };

    automationSelect.addEventListener("change", function () {
      const key = automationSelect.value;
      const media = demoMedia[key];

      // Reset state
      demoVideo.src = "";
      demoImage.src = "";
      demoImage.style.display = "none";

      if (!media) {
        mediaWrapper.style.display = "none";
        return;
      }

      // Show wrapper
      mediaWrapper.style.display = "grid";

      // Load video
      demoVideo.src = media.video;

      // Load image (force refresh)
      demoImage.src = media.image + "?v=" + Date.now();
      demoImage.style.display = "block";

      demoImage.onerror = function () {
        console.error("❌ Image failed:", demoImage.src);
      };
    });
  });
})();

window.addEventListener("load", () => {
  // show after 2 seconds
  setTimeout(() => {
    const notice = document.getElementById("consultNotice");

    if (!notice) return;

    // show only once per visitor
    if (!localStorage.getItem("consultNoticeSeen")) {
      notice.classList.remove("hidden");
    }
  }, 2000);
});

function closeConsultNotice() {
  document.getElementById("consultNotice").classList.add("hidden");
  localStorage.setItem("consultNoticeSeen", "true");
}

document.addEventListener("DOMContentLoaded", function () {

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (!hamburger || !navMenu) {
    console.warn("Hamburger or navMenu not found");
    return;
  }

  function openMenu() {
    hamburger.classList.add("open");
    navMenu.classList.add("nav-active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("open");
    navMenu.classList.remove("nav-active");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();

    if (navMenu.classList.contains("nav-active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking outside
  document.addEventListener("click", function (e) {
    if (
      navMenu.classList.contains("nav-active") &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

});
