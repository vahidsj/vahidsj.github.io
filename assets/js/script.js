'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Global variables to prevent duplicate event listeners
let modalEventListenersAdded = false;

// Initialize event listeners function
function initializeEventListeners() {
  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebarBtn && !sidebarBtn.hasAttribute('data-listener-added')) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
    sidebarBtn.setAttribute('data-listener-added', 'true');
  }

  // mobile menu toggle functionality
  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const navbarList = document.querySelector(".navbar-list");

  if (navToggleBtn && !navToggleBtn.hasAttribute('data-listener-added')) {
    navToggleBtn.addEventListener("click", function () {
      elementToggleFunc(navbarList);
      elementToggleFunc(navToggleBtn);
    });
    navToggleBtn.setAttribute('data-listener-added', 'true');
  }

  // testimonials variables
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    if (modalContainer && overlay) {
      modalContainer.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  }

  // add click event to all modal items (only if not already added)
  for (let i = 0; i < testimonialsItem.length; i++) {
    if (!testimonialsItem[i].hasAttribute('data-listener-added')) {
      testimonialsItem[i].addEventListener("click", function () {
        if (modalImg && modalTitle && modalText) {
          modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
          modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
          modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
          modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
        }
        testimonialsModalFunc();
      });
      testimonialsItem[i].setAttribute('data-listener-added', 'true');
    }
  }

  // add click event to modal close button (only once)
  if (modalCloseBtn && !modalCloseBtn.hasAttribute('data-listener-added')) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
    modalCloseBtn.setAttribute('data-listener-added', 'true');
  }
  
  // add click event to overlay (only once)
  if (overlay && !overlay.hasAttribute('data-listener-added')) {
    overlay.addEventListener("click", testimonialsModalFunc);
    overlay.setAttribute('data-listener-added', 'true');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeEventListeners);


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}