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
   NexGen AI – Pricing Engine (FIXED)
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

  /* =====================================================
     WHATSAPP AUTOMATION
  ===================================================== */
  whatsapp: {
    label: "WhatsApp Business Automation & Conversational AI",
    setup: {
      basic: {
        price: 999,
        features: [
          "Official WhatsApp Business API integration",
          "Enterprise WhatsApp number configuration",
          "Automated welcome & instant replies",
          "Lead capture from WhatsApp conversations",
          "FAQ-based rule automation",
          "Single core automation workflow",
          "Live testing & production deployment"
        ]
      },
      advanced: {
        price: 2499,
        features: [
          "Everything in Basic",
          "CRM integration (auto lead creation & updates)",
          "Automated follow-ups & reminders",
          "Order, inquiry & ticket status automation",
          "Multiple workflow automations",
          "Business-hour logic & routing rules",
          "Conversion-focused message optimization"
        ]
      },
      premium: {
        price: 4999,
        features: [
          "Everything in Advanced",
          "AI-powered conversational flows",
          "Customer intent detection (sales / support / billing)",
          "Multi-agent & department routing",
          "Advanced analytics & conversation insights",
          "Scalable enterprise automation architecture",
          "Priority engineering & performance tuning"
        ]
      }
    }
  },

  /* =====================================================
     WEBSITE AUTOMATION
  ===================================================== */
  website: {
    label: "Website Automation & Lead Intelligence",
    setup: {
      basic: {
        price: 999,
        features: [
          "Website form & inquiry automation",
          "Centralized lead storage system",
          "Instant user confirmation responses",
          "Spam filtering & validation logic",
          "Single form or funnel automation",
          "Live testing & deployment"
        ]
      },
      advanced: {
        price: 2299,
        features: [
          "Everything in Basic",
          "Instant WhatsApp & email lead alerts",
          "CRM integration for automatic lead creation",
          "Multi-form & landing page automation",
          "Lead routing by source & form type",
          "Response-time optimization"
        ]
      },
      premium: {
        price: 3999,
        features: [
          "Everything in Advanced",
          "AI-based lead qualification & scoring",
          "Smart routing to sales or support teams",
          "Behavior-based automation triggers",
          "Conversion optimization logic",
          "Scalable automation architecture",
          "Priority optimization & tuning"
        ]
      }
    }
  },

  /* =====================================================
     CRM AUTOMATION
  ===================================================== */
  crm: {
    label: "CRM Automation & Revenue Operations",
    setup: {
      basic: {
        price: 1299,
        features: [
          "Enterprise CRM setup & architecture",
          "Automated lead ingestion from all channels",
          "Sales pipeline & stage design",
          "Lead activity tracking automation",
          "Core CRM workflow automation",
          "Production deployment & validation"
        ]
      },
      advanced: {
        price: 2999,
        features: [
          "Everything in Basic",
          "Advanced automation rules & triggers",
          "Automated task & follow-up ownership",
          "Team workflow automation",
          "Deal stage movement logic",
          "Revenue process optimization"
        ]
      },
      premium: {
        price: 4999,
        features: [
          "Everything in Advanced",
          "AI-powered lead scoring",
          "Pipeline forecasting & intelligence",
          "Deal risk & bottleneck detection",
          "Executive dashboards & reports",
          "Scalable CRM automation system",
          "Priority engineering & tuning"
        ]
      }
    }
  },

  /* =====================================================
     SALES AUTOMATION
  ===================================================== */
  sales: {
    label: "Sales Automation & Deal Intelligence",
    setup: {
      basic: {
        price: 1499,
        features: [
          "Automated lead-to-rep assignment",
          "Sales task & reminder automation",
          "Deal tracking & activity logging",
          "Standard sales workflow automation",
          "Sales process stabilization"
        ]
      },
      advanced: {
        price: 3499,
        features: [
          "Everything in Basic",
          "Pipeline movement automation",
          "Conversion tracking & metrics",
          "Automated follow-up sequences",
          "Sales velocity optimization",
          "Multi-stage deal logic"
        ]
      },
      premium: {
        price: 5999,
        features: [
          "Everything in Advanced",
          "AI-driven deal intelligence",
          "Revenue forecasting & probability modeling",
          "High-intent deal prioritization",
          "Sales bottleneck analysis",
          "Executive sales dashboards"
        ]
      }
    }
  },

  /* =====================================================
     MARKETING AUTOMATION
  ===================================================== */
  marketing: {
    label: "Marketing Automation & Growth Intelligence",
    setup: {
      basic: {
        price: 999,
        features: [
          "Email & campaign automation infrastructure",
          "Lead nurturing workflow design",
          "Campaign scheduling & delivery logic",
          "Audience & subscriber management",
          "Core marketing automation framework"
        ]
      },
      advanced: {
        price: 2499,
        features: [
          "Everything in Basic",
          "Multi-channel automation (Email, WhatsApp, CRM)",
          "Advanced audience segmentation",
          "Behavior-based campaign triggers",
          "Campaign performance tracking"
        ]
      },
      premium: {
        price: 4999,
        features: [
          "Everything in Advanced",
          "AI-driven campaign optimization",
          "Advanced funnel & journey automation",
          "Customer lifecycle intelligence",
          "Conversion-focused growth automation",
          "Scalable marketing automation engine"
        ]
      }
    }
  },

  /* =====================================================
     ADS & LEAD ROUTING
  ===================================================== */
  ads: {
    label: "Ads, Leads & Revenue Routing",
    setup: {
      basic: {
        price: 999,
        features: [
          "Ad platform lead ingestion",
          "Automated lead capture & storage",
          "Basic lead routing logic",
          "Response-time optimization baseline"
        ]
      },
      advanced: {
        price: 2299,
        features: [
          "Everything in Basic",
          "Instant WhatsApp & email follow-ups",
          "CRM integration for paid leads",
          "Campaign-based routing logic",
          "Lead handling optimization"
        ]
      },
      premium: {
        price: 4999,
        features: [
          "Everything in Advanced",
          "AI-powered lead routing",
          "High-intent lead identification",
          "Advanced conversion optimization",
          "Attribution & performance intelligence",
          "Enterprise ad automation infrastructure"
        ]
      }
    }
  },

  /* =====================================================
     CUSTOMER SUPPORT AUTOMATION
  ===================================================== */
  support: {
    label: "Customer Support Automation & Intelligence",
    setup: {
      basic: {
        price: 1299,
        features: [
          "Automated FAQ & chatbot setup",
          "Ticket creation & logging",
          "Basic issue categorization",
          "Support workflow stabilization"
        ]
      },
      advanced: {
        price: 2999,
        features: [
          "Everything in Basic",
          "Intent detection (sales / support / billing)",
          "Automated routing & escalation",
          "Priority-based workflows",
          "Team workload automation"
        ]
      },
      premium: {
        price: 5999,
        features: [
          "Everything in Advanced",
          "AI-powered support intelligence",
          "Advanced SLA & analytics monitoring",
          "Customer sentiment insights",
          "Scalable enterprise support system",
          "Priority optimization & tuning"
        ]
      }
    }
  },

  /* =====================================================
     ORDER MANAGEMENT
  ===================================================== */
  orders: {
    label: "Order Lifecycle & Operations Automation",
    setup: {
      basic: {
        price: 1299,
        features: [
          "Automated order confirmations",
          "Order status notifications",
          "Basic order workflow automation",
          "Single system integration"
        ]
      },
      advanced: {
        price: 2799,
        features: [
          "Everything in Basic",
          "Returns & cancellation automation",
          "CRM & backend synchronization",
          "Customer communication automation",
          "Order lifecycle tracking"
        ]
      },
      premium: {
        price: 4999,
        features: [
          "Everything in Advanced",
          "Full order lifecycle orchestration",
          "Multi-system integration",
          "Operational performance analytics",
          "Scalable order automation engine"
        ]
      }
    }
  },

  /* =====================================================
     PAYMENT & BILLING AUTOMATION
  ===================================================== */
  payments: {
    label: "Payment & Billing Automation",
    setup: {
      basic: {
        price: 999,
        features: [
          "Automated payment verification",
          "Transaction status monitoring",
          "Basic reconciliation logic",
          "Billing workflow foundation"
        ]
      },
      advanced: {
        price: 2499,
        features: [
          "Everything in Basic",
          "Automated invoice generation",
          "Payment status synchronization",
          "Customer billing notifications",
          "Financial workflow automation"
        ]
      },
      premium: {
        price: 4999,
        features: [
          "Everything in Advanced",
          "AI-powered reconciliation",
          "Automated billing alerts",
          "Financial accuracy monitoring",
          "Enterprise-grade billing automation"
        ]
      }
    }
  },

/* =====================================================
   CUSTOM AI AUTOMATION (ENTERPRISE)
===================================================== */
custom: {
  label: "Custom AI & Enterprise Automation",

  setup: {
    basic: {
      price: 9999,
      displayPrice: "$9,999+",
      features: [
        "Custom automation strategy & AI architecture",
        "Single-system AI automation",
        "Business logic & decision flow implementation",
        "Secure production deployment",
        "Technical documentation & handover"
      ]
    },

    advanced: {
      price: 25000,
      displayPrice: "$25,000+",
      features: [
        "Everything in Basic",
        "Multi-system & data-source integration",
        "Advanced automation & orchestration logic",
        "Process optimization & scalability planning",
        "High-availability system design",
        "Performance tuning & reliability testing"
      ]
    },

    premium: {
      price: 50000,
      displayPrice: "$50,000+",
      features: [
        "Everything in Advanced",
        "Enterprise-grade AI system architecture",
        "Custom AI decision-making & intelligence layer",
        "Large-scale automation infrastructure",
        "Security, compliance & risk controls",
        "Executive dashboards & insights",
        "Priority engineering & long-term roadmap"
      ]
    }
  }
}
    };

    /* ================= MANAGEMENT PLANS ================= */
    const managementPlans = {
      monitor: 119,
      optimize: 259,
      managed: 499
    };

    /* ================= HELPERS ================= */
    const format = amt => `$${amt.toLocaleString()}`;

    const renderFeatures = (el, list = []) => {
      el.innerHTML = "";
      list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        el.appendChild(li);
      });
    };

    const updateBilling = (scroll = false) => {
      billAutomation.textContent = state.automationLabel || "—";
      billSetup.textContent = state.setupAmount
        ? format(state.setupAmount)
        : "Not selected";
      billManagement.textContent = state.managementAmount
        ? `${format(state.managementAmount)} / month`
        : "Not selected";
      billTotal.textContent = format(
        (state.setupAmount || 0) + (state.managementAmount || 0)
      );

      billingSection.classList.remove("hidden");
      if (scroll) billingSection.scrollIntoView({ behavior: "smooth" });
    };

    /* ================= AUTOMATION SELECT ================= */
    automationSelect.addEventListener("change", () => {
  const key = automationSelect.value;
  if (!pricing[key]) return;

  state.automationKey = key;
  state.automationLabel = pricing[key].label;
  state.setupPlan = null;
  state.setupAmount = 0;

  pricingCards.classList.remove("hidden");

  const cards = document.querySelectorAll(".pricing-card");
  const buttons = document.querySelectorAll(".select-setup");

  /* ================= CUSTOM AI ================= */
  if (key === "custom") {
    pricingCards.classList.add("single-card");

    // Show ONLY first card
    cards.forEach((card, index) => {
      card.style.display = index === 0 ? "flex" : "none";
    });

    basicPriceEl.textContent = "Custom AI System";
    renderFeatures(
      basicFeaturesEl,
      pricing.custom.setup.basic.features
    );

    buttons.forEach(btn => {
      btn.textContent = "Request Consultation";
      btn.dataset.setup = "consultation";
    });

    return; // ⛔ STOP NORMAL FLOW
  }

  /* ================= NORMAL AUTOMATIONS ================= */
  pricingCards.classList.remove("single-card");

  cards.forEach(card => (card.style.display = "flex"));

  const data = pricing[key].setup;

  basicPriceEl.textContent = format(data.basic.price);
  advancedPriceEl.textContent = format(data.advanced.price);
  premiumPriceEl.textContent = format(data.premium.price);

  renderFeatures(basicFeaturesEl, data.basic.features);
  renderFeatures(advancedFeaturesEl, data.advanced.features);
  renderFeatures(premiumFeaturesEl, data.premium.features);

  buttons.forEach(btn => {
    btn.textContent = "Select Setup Plan";
  });
});


    /* ================= SETUP PLAN ================= */
    document.querySelectorAll(".select-setup").forEach(btn => {
  btn.addEventListener("click", () => {

    if (!state.automationKey) {
      alert("Please select an automation first");
      return;
    }

    /* ===== CUSTOM AI → CONSULTATION ===== */
    if (state.automationKey === "custom") {

      // If already on index.html → scroll
      if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        const consultation = document.getElementById("consultation");
        if (consultation) {
          consultation.scrollIntoView({ behavior: "smooth" });
        }
      } 
      // If on pricing.html → redirect
      else {
        window.location.href = "index.html#consultation";
      }

      return;
    }

    /* ===== NORMAL SETUP FLOW ===== */
    const setupKey = btn.dataset.setup;
    const setupData = pricing[state.automationKey]?.setup?.[setupKey];

    if (!setupData || typeof setupData.price !== "number") {
      alert("Invalid setup plan");
      return;
    }

    state.setupPlan = setupKey;
    state.setupAmount = setupData.price;

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
      const amount =
        (state.setupAmount || 0) + (state.managementAmount || 0);

      if (amount <= 0) {
        alert("Select a valid plan");
        return;
      }

      const currency = localStorage.getItem("nxg_currency") || "USD";
      const base = window.location.origin;

      window.location.href =
        currency === "INR"
          ? `${base}/payment/razorpay.html?amount=${amount}`
          : `${base}/payment/stripe.html?amount=${amount}`;
    });

    /* ================= PAYPAL FORM ================= */
    const paypalForm = document.getElementById("paypalForm");
    if (paypalForm) {
      paypalForm.addEventListener("submit", () => {
        const automation = document.getElementById("billAutomation").innerText;
        const setup = document.getElementById("billSetup").innerText;
        const total = document.getElementById("billTotal").innerText.replace("$", "");

        // Safety check
        if (!automation || automation === "—") {
          alert("Please select an automation before proceeding.");
          event.preventDefault();
          return;
        }

        // Bind PayPal values
        document.getElementById("ppItemName").value =
          automation + " | " + setup;

        document.getElementById("ppAmount").value = total;

        document.getElementById("ppCustom").value =
          automation.toLowerCase().replace(/\s+/g, "_");
      });
    }

  });

})();

