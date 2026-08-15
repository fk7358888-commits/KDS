document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
    });
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isOpen) {
        item.classList.add("active");
      }
    });
  });

  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const status = form.querySelector(".form-status");
      const inputs = form.querySelectorAll("input, select, textarea");
      let allValid = true;

      inputs.forEach((field) => {
        if (!field.checkValidity()) {
          allValid = false;
          field.reportValidity();
        }
      });

      if (!allValid) {
        if (status) {
          status.textContent = "Please complete all required fields.";
          status.className = "form-status error";
        }
        return;
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        const existing = JSON.parse(localStorage.getItem("kdsLeads") || "[]");
        existing.push({ ...payload, date: new Date().toISOString() });
        localStorage.setItem("kdsLeads", JSON.stringify(existing));
      } catch (error) {
        console.error("Could not save form data locally:", error);
      }

      if (status) {
        status.textContent = "Thanks! Your details have been recorded successfully.";
        status.className = "form-status success";
      }

      form.reset();
    });
  });
});
