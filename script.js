const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const introScreen = document.querySelector(".intro-screen");
const topbar = document.querySelector(".topbar");
const productModal = document.querySelector("#product-modal");
const modalViews = document.querySelectorAll(".modal-view");
const modalTitle = document.querySelector("#modal-title");
const modalPrice = document.querySelector("#modal-price");
const modalDescription = document.querySelector("#modal-description");
const modalFabric = document.querySelector("#modal-fabric");
const modalColor = document.querySelector("#modal-color");
const modalSizes = document.querySelector("#modal-sizes");
const modalDelivery = document.querySelector("#modal-delivery");
const modalVisual = document.querySelector("#modal-visual");
const modalThumbnails = document.querySelector("#modal-thumbnails");
const orderProductName = document.querySelector("#order-product-name");
const orderSummaryProduct = document.querySelector("#order-summary-product");
const orderSummaryPrice = document.querySelector("#order-summary-price");
const orderSize = document.querySelector("#order-size");
const startOrderButton = document.querySelector("#start-order");
const backToDetailsButton = document.querySelector("#back-to-details");
const orderForm = document.querySelector("#order-form");
const confirmationText = document.querySelector("#confirmation-text");

const products = {
  "crimson-veil": {
    name: "Embroidered Abaya",
    price: "Rs 2499",
    description:
      "A premium embroidered abaya with floral detailing, soft elegant fall, and statement scalloped sleeves for a graceful luxury look.",
    fabric: "Premium flowy fabric with embroidery",
    color: "Dusty rose with burgundy embroidery accents",
    sizes: ["52", "54", "56", "58"],
    delivery: "Around 7-14 days",
    visualClass: "product-photo-card",
    images: [
      "/embroidered-abaya-1.png",
      "/embroidered-abaya-2.png",
    ],
  },
  "golden-hour": {
    name: "The Golden Hour",
    price: "AED 740",
    description:
      "A luminous modern silhouette with minimal lines, elegant fall, and soft contrast details for clients who want understated luxury.",
    fabric: "Premium crepe satin",
    color: "Warm beige gold with wine-toned accents",
    sizes: ["52", "54", "56", "58"],
    delivery: "3-5 days in UAE, gift wrapping available",
    visualClass: "product-visual-two",
    images: [],
  },
  "noir-silk": {
    name: "The Noir Silk Edit",
    price: "AED 820",
    description:
      "A couture-inspired statement abaya with timeless sophistication, elegant structure, and a richer finish for formal moments.",
    fabric: "Luxury matte silk",
    color: "Midnight noir with subtle gloss texture",
    sizes: ["54", "56", "58", "60"],
    delivery: "5-7 days, custom tailoring available",
    visualClass: "product-visual-three",
    images: [],
  },
};

let activeProductKey = "crimson-veil";

document.body.classList.add("is-intro-active");

if (introScreen) {
  window.addEventListener("load", () => {
    window.setTimeout(() => {
      introScreen.classList.add("is-hidden");
      document.body.classList.remove("is-intro-active");
      document.body.classList.add("hero-logo-ready");
    }, 1200);
  });
} else {
  window.addEventListener("load", () => {
    document.body.classList.add("hero-logo-ready");
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (topbar) {
  const syncTopbarState = () => {
    const scrolled = window.scrollY;
    topbar.classList.toggle("is-compact", scrolled > 80);
    topbar.classList.toggle("is-ultra-compact", scrolled > 220);
  };

  syncTopbarState();
  window.addEventListener("scroll", syncTopbarState, { passive: true });
}

const showModalView = (viewClassName) => {
  modalViews.forEach((view) => {
    view.classList.toggle("is-active", view.classList.contains(viewClassName));
  });
};

const populateProductModal = (productKey) => {
  const product = products[productKey];
  if (!product) {
    return;
  }

  activeProductKey = productKey;
  modalTitle.textContent = product.name;
  modalPrice.textContent = product.price;
  modalDescription.textContent = product.description;
  modalFabric.textContent = product.fabric;
  modalColor.textContent = product.color;
  modalSizes.textContent = product.sizes.join(" / ");
  modalDelivery.textContent = product.delivery;
  modalVisual.className = `modal-product-visual ${product.visualClass}`;
  modalVisual.style.backgroundImage = product.images?.length
    ? `url("${product.images[0]}")`
    : "";
  orderProductName.textContent = `Ordering: ${product.name}`;
  orderSummaryProduct.textContent = product.name;
  orderSummaryPrice.textContent = product.price;

  if (modalThumbnails) {
    modalThumbnails.innerHTML = "";

    if (product.images?.length) {
      product.images.forEach((imagePath, index) => {
        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = `modal-thumb${index === 0 ? " is-active" : ""}`;
        thumb.style.backgroundImage = `url("${imagePath}")`;
        thumb.setAttribute("aria-label", `${product.name} image ${index + 1}`);
        thumb.addEventListener("click", () => {
          modalVisual.style.backgroundImage = `url("${imagePath}")`;
          modalThumbnails.querySelectorAll(".modal-thumb").forEach((item, itemIndex) => {
            item.classList.toggle("is-active", itemIndex === index);
          });
        });
        modalThumbnails.appendChild(thumb);
      });
    }
  }

  if (orderSize) {
    orderSize.innerHTML = product.sizes
      .map((size) => `<option value="${size}">${size}</option>`)
      .join("");
  }
};

const openProductModal = (productKey) => {
  populateProductModal(productKey);
  showModalView("modal-product-view");
  productModal.classList.add("is-open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-intro-active");
};

const closeProductModal = () => {
  productModal.classList.remove("is-open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-intro-active");
  showModalView("modal-product-view");
  if (orderForm) {
    orderForm.reset();
  }
};

document.querySelectorAll(".product-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    openProductModal(button.dataset.product);
  });
});

document.querySelectorAll("[data-close-modal='true']").forEach((element) => {
  element.addEventListener("click", closeProductModal);
});

if (startOrderButton) {
  startOrderButton.addEventListener("click", () => {
    showModalView("modal-order-view");
  });
}

if (backToDetailsButton) {
  backToDetailsButton.addEventListener("click", () => {
    showModalView("modal-product-view");
  });
}

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(orderForm);
    const paymentMethod = formData.get("payment_method");
    const product = products[activeProductKey];

    confirmationText.textContent = `Your request for ${product.name} (${product.price}) has been prepared. Preferred payment method: ${paymentMethod}. Replace this demo step with your WhatsApp, email, or real checkout integration when ready.`;
    showModalView("modal-confirmation-view");
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productModal.classList.contains("is-open")) {
    closeProductModal();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
