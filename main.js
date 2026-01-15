/* =====================================================
   NexGen AI – Core Application Controller
   Scope: Global (All Pages)
   Environment: Production / SaaS
===================================================== */

(function () {
  "use strict";

  /* =====================================================
     DOM REFERENCES
  ===================================================== */
  const navbar = document.getElementById("navbar");
  const regionModal = document.getElementById("nxgRegionModal");

  /* =====================================================
     LOCAL STORAGE KEYS
  ===================================================== */
  const STORAGE = {
    currency: "nxg_currency",
    regionSelected: "nxg_region_selected"
  };

  /* =====================================================
     UTILITIES
  ===================================================== */
  function debounce(fn, delay = 80) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /* =====================================================
     STICKY NAVBAR
  ===================================================== */
  function initStickyNavbar() {
    if (!navbar) return;

    const onScroll = debounce(() => {
      navbar.classList.toggle("navbar-sticky", window.scrollY > 40);
    }, 40);

    window.addEventListener("scroll", onScroll);
  }

  /* =====================================================
     REGION & CURRENCY ENFORCEMENT
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

  document.addEventListener("click", e => {
    const btn = e.target.closest(".nxg-region-btn");
    if (!btn) return;

    localStorage.setItem(STORAGE.currency, btn.dataset.currency);
    localStorage.setItem(STORAGE.regionSelected, "true");

    closeRegionModal();
    setTimeout(() => location.reload(), 150);
  });

  /* =====================================================
     INITIALIZATION
  ===================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initStickyNavbar();
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
