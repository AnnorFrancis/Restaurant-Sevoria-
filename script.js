// Hero slideshow
(() => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slideshow-nav .prev");
  const nextBtn = document.querySelector(".slideshow-nav .next");
  const slideshowEl = document.getElementById("heroSlideshow");
  let current = 0;
  let interval = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    current = index;
  }

  function next() {
    showSlide((current + 1) % slides.length);
  }
  function prev() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      next();
      resetAuto();
    });
  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      prev();
      resetAuto();
    });

  function startAuto() {
    interval = setInterval(next, 5000);
  }
  function stopAuto() {
    if (interval) clearInterval(interval);
  }
  function resetAuto() {
    stopAuto();
    startAuto();
  }

  if (slideshowEl) {
    slideshowEl.addEventListener("mouseenter", stopAuto);
    slideshowEl.addEventListener("mouseleave", startAuto);
  }

  if (slides.length) {
    showSlide(0);
    startAuto();
  }
})();

// Modal for menu items (wheel items and grid cards)
(() => {
  const modal = document.getElementById("menuModal");
  const modalName = document.getElementById("modalName");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrice = document.getElementById("modalPrice");
  const closeBtn = document.querySelector(".close-modal");
  const clickSound = document.getElementById("clickSound");

  function playClickSound() {
    if (!clickSound) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }

  const items = Array.from(document.querySelectorAll(".item")).concat(
    Array.from(document.querySelectorAll(".menu-card"))
  );

  items.forEach((item) => {
    // ensure clickable semantics
    item.setAttribute("role", "button");
    item.addEventListener("click", () => {
      const name =
        item.dataset.name || item.getAttribute("aria-label") || "Item";
      const desc = item.dataset.desc || "";
      const price = item.dataset.price || "";

      modalName.textContent = name;
      modalDesc.textContent = desc;
      modalPrice.textContent = price;

      modal.style.display = "flex";
      playClickSound();
    });
  });

  if (closeBtn)
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.style.display = "none";
  });

  // expose play for older inline code
  window.playClickSound = playClickSound;
})();

// Reveal on scroll for features and cards
(() => {
  const selectors = [".feature", ".menu-card", ".menu-wheel-section .item"];
  const elements = selectors.reduce(
    (acc, sel) => acc.concat(Array.from(document.querySelectorAll(sel))),
    []
  );

  elements.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => io.observe(el));
})();
