/* =====================================================
   NexGen AI – Pricing Engine
   Premium SaaS / Correct UX Flow + Safe Redirect
===================================================== */

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", () => {

    /* ================= DOM ================= */
    const automationSelect = document.getElementById("automationType");
    const pricingCards = document.getElementById("pricingCards");
    const managementSection = document.getElementById("management");

    const basicPriceEl = document.getElementById("basicPrice");
    const advancedPriceEl = document.getElementById("advancedPrice");
    const premiumPriceEl = document.getElementById("premiumPrice");

    const basicFeaturesEl = document.getElementById("basicFeatures");
    const advancedFeaturesEl = document.getElementById("advancedFeatures");
    const premiumFeaturesEl = document.getElementById("premiumFeatures");

    const billAutomation = document.getElementById("billAutomation");
    const billSetup = document.getElementById("billSetup");
    const billManagement = document.getElementById("billManagement");
    const billTotal = document.getElementById("billTotal");

    const billingSection = document.getElementById("billingSection");
    const billingBtn = document.querySelector(".billing-btn");

    if (!automationSelect || !billingBtn) return;

    /* ================= STATE ================= */
    const state = {
      automationKey: null,
      automationLabel: null,
      setupPlan: null,
      setupAmount: 0,
      managementPlan: null,
      managementAmount: 0
    };

    /* ================= PRICING DATA ================= */
    const pricing = {
      whatsapp: {
        label: "WhatsApp Automation",
        setup: {
          basic: { price: 999, features: ["Auto replies", "Lead capture", "FAQ automation"] },
          advanced: { price: 2499, features: ["CRM sync", "Follow-ups", "Order updates"] },
          premium: { price: 4999, features: ["AI flows", "Multi-agent routing", "Advanced analytics"] }
        }
      },
      website: {
        label: "Website Automation",
        setup: {
          basic: { price: 799, features: ["Form automation", "Lead storage"] },
          advanced: { price: 1999, features: ["WhatsApp + Email triggers", "CRM sync"] },
          premium: { price: 3999, features: ["AI qualification", "Conversion optimization"] }
        }
      },
      crm: {
        label: "CRM Automation",
        setup: {
          basic: { price: 1299, features: ["Lead tracking", "Pipeline setup"] },
          advanced: { price: 2999, features: ["Automation rules", "Team workflows"] },
          premium: { price: 5999, features: ["AI scoring", "Advanced reporting"] }
        }
      },
      sales: {
        label: "Sales Automation",
        setup: {
          basic: { price: 1499, features: ["Lead assignment", "Task reminders"] },
          advanced: { price: 3499, features: ["Pipeline automation", "Conversion tracking"] },
          premium: { price: 6999, features: ["AI sales insights", "Forecasting"] }
        }
      },
      marketing: {
        label: "Marketing Automation",
        setup: {
          basic: { price: 999, features: ["Email automation", "Basic nurturing"] },
          advanced: { price: 2499, features: ["Multi-channel campaigns", "Segmentation"] },
          premium: { price: 5499, features: ["AI campaigns", "Advanced funnels"] }
        }
      },
      ads: {
        label: "Ads & Lead Routing",
        setup: {
          basic: { price: 999, features: ["Lead sync", "Basic routing"] },
          advanced: { price: 2299, features: ["Instant follow-ups", "CRM sync"] },
          premium: { price: 4999, features: ["AI routing", "Conversion optimization"] }
        }
      },
      support: {
        label: "Customer Support Automation",
        setup: {
          basic: { price: 1299, features: ["FAQ bot", "Ticket logging"] },
          advanced: { price: 2999, features: ["Intent detection", "Routing rules"] },
          premium: { price: 5999, features: ["AI support", "Analytics & SLA"] }
        }
      },
      orders: {
        label: "Order Management Automation",
        setup: {
          basic: { price: 1199, features: ["Order confirmation", "Status updates"] },
          advanced: { price: 2799, features: ["Returns & cancellations", "CRM sync"] },
          premium: { price: 5499, features: ["Full lifecycle automation"] }
        }
      },
      payments: {
        label: "Payment & Billing Automation",
        setup: {
          basic: { price: 999, features: ["Payment verification"] },
          advanced: { price: 2499, features: ["Invoice generation", "Status sync"] },
          premium: { price: 4999, features: ["AI reconciliation", "Alerts"] }
        }
      },
      custom: {
        label: "Custom AI & Business Automation",
        setup: {
          basic: { price: 2999, features: ["Custom workflow"] },
          advanced: { price: 6999, features: ["Multi-system integration"] },
          premium: { price: 14999, features: ["Enterprise-grade AI system"] }
        }
      }
    };

    const managementPlans = {
      monitor: 49,
      optimize: 99,
      managed: 199
    };

    /* ================= HELPERS ================= */
    const format = amt => `$${amt.toLocaleString()}`;

    const renderFeatures = (el, list) => {
      el.innerHTML = "";
      list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        el.appendChild(li);
      });
    };

    const updateBilling = (scroll = false) => {
      billAutomation.textContent = state.automationLabel || "—";
      billSetup.textContent = state.setupAmount ? format(state.setupAmount) : "Not selected";
      billManagement.textContent = state.managementAmount
        ? `${format(state.managementAmount)} / month`
        : "Not selected";
      billTotal.textContent = format(state.setupAmount + state.managementAmount);
      billingSection?.classList.remove("hidden");
      if (scroll) billingSection?.scrollIntoView({ behavior: "smooth" });
    };

    /* ================= AUTOMATION SELECT ================= */
    automationSelect.addEventListener("change", () => {
      const key = automationSelect.value;
      if (!pricing[key]) return;

      state.automationKey = key;
      state.automationLabel = pricing[key].label;

      const data = pricing[key].setup;
      basicPriceEl.textContent = format(data.basic.price);
      advancedPriceEl.textContent = format(data.advanced.price);
      premiumPriceEl.textContent = format(data.premium.price);

      renderFeatures(basicFeaturesEl, data.basic.features);
      renderFeatures(advancedFeaturesEl, data.advanced.features);
      renderFeatures(premiumFeaturesEl, data.premium.features);

      pricingCards?.classList.remove("hidden");
    });

    /* ================= SETUP PLAN ================= */
    document.querySelectorAll(".select-setup").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!state.automationKey) return alert("Select automation first");

        state.setupPlan = btn.dataset.setup;
        state.setupAmount =
          pricing[state.automationKey].setup[state.setupPlan].price;

        updateBilling(false);
        managementSection?.scrollIntoView({ behavior: "smooth" });
      });
    });

    /* ================= MANAGEMENT PLAN ================= */
    document.querySelectorAll(".management-card button").forEach(btn => {
      btn.addEventListener("click", () => {
        const plan = btn.dataset.plan;
        if (!managementPlans[plan]) return;

        state.managementPlan = plan;
        state.managementAmount = managementPlans[plan];
        updateBilling(true);
      });
    });

    /* ================= BILLING CTA ================= */
    billingBtn.addEventListener("click", () => {
      const amount = state.setupAmount + state.managementAmount;
      if (amount <= 0) return alert("Select a valid plan");

      const currency = localStorage.getItem("nxg_currency") || "USD";
      const base = window.location.origin;

      window.location.href =
        currency === "INR"
          ? `${base}/payment/razorpay.html?amount=${amount}`
          : `${base}/payment/stripe.html?amount=${amount}`;
    });

  });

})();
