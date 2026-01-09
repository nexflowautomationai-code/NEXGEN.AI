/* ===================================================
   NexGen AI – Advanced Currency & Region Controller
   SaaS / Enterprise Grade
=================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "nxg_currency";
  const VISIT_KEY = "nxg_region_selected";
  const DEFAULT_CURRENCY = "USD";

  const modal = document.getElementById("nxgRegionModal");
  const buttons = document.querySelectorAll(".nxg-region-btn");

  /* ================= UTILITIES ================= */
  function getStoredCurrency() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function setCurrency(currency) {
    localStorage.setItem(STORAGE_KEY, currency);
    localStorage.setItem(VISIT_KEY, "true");
  }

  function isFirstVisit() {
    return !localStorage.getItem(VISIT_KEY);
  }

  function showModal() {
    if (!modal) return;
    modal.classList.remove("nxg-hidden");
    document.body.style.overflow = "hidden";
  }

  function hideModal() {
    if (!modal) return;
    modal.classList.add("nxg-hidden");
    document.body.style.overflow = "";
  }

  /* ================= GEO FALLBACK ================= */
  function inferCurrencyByLocale() {
    const lang = navigator.language || "";
    if (lang.includes("en-IN") || lang.includes("hi")) {
      return "INR";
    }
    return DEFAULT_CURRENCY;
  }

  /* ================= INITIALIZATION ================= */
  document.addEventListener("DOMContentLoaded", () => {
    let currency = getStoredCurrency();

    if (!currency && isFirstVisit()) {
      currency = inferCurrencyByLocale();
      showModal();
    }

    if (!currency) {
      currency = DEFAULT_CURRENCY;
      setCurrency(currency);
    }

    document.documentElement.setAttribute("data-currency", currency);
  });

  /* ================= BUTTON HANDLER ================= */
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.currency;
      if (!selected) return;

      setCurrency(selected);
      document.documentElement.setAttribute("data-currency", selected);
      hideModal();

      // Smooth refresh for pricing recalculation
      setTimeout(() => location.reload(), 150);
    });
  });

})();
