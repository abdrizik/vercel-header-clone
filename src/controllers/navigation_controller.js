import { Controller } from "@hotwired/stimulus";
import { interpolateByScroll } from "../utils/interpolate";
import { NAVIGATION_ITEMS } from "../constants/navigation";

export default class extends Controller {
  static targets = ["nav", "hoverBg", "activeBar", "container"];

  initialize() {
    this.activeIndex = 0;
    this.hoveredIndex = null;
  }

  connect() {
    this.generateButtons();
    this.showActiveButton();
    window.addEventListener("scroll", this.updateScrollPosition.bind(this), {
      passive: true,
    });
  }

  disconnect() {
    window.removeEventListener("scroll", this.updateScrollPosition);
  }

  generateButtons() {
    NAVIGATION_ITEMS.forEach((label, index) => {
      const button = document.createElement("button");
      button.className = `text-sm font-medium px-3 py-4 cursor-pointer relative z-10 transition-colors duration-200 ${
        index === 0 ? "text-gray-900" : "text-gray-600"
      }`;
      button.textContent = label;
      button.dataset.action =
        "click->navigation#selectButton mouseenter->navigation#hoverButton";
      button.dataset.index = index;
      this.navTarget.appendChild(button);
    });
  }

  updateScrollPosition() {
    const navX = interpolateByScroll(window.scrollY, 50, 0, 42);
    this.containerTarget.style.transform = `translateX(${navX}px)`;
  }

  selectButton(event) {
    this.activeIndex = parseInt(event.currentTarget.dataset.index);
    this.showActiveButton();
    this.updateButtonColors();
  }

  hoverButton(event) {
    this.hoveredIndex = parseInt(event.currentTarget.dataset.index);
    this.showHoverBackground();
  }

  leave() {
    this.hoveredIndex = null;
    this.hoverBgTarget.style.display = "none";
  }

  showActiveButton() {
    const buttons = this.getButtons();
    const activeButton = buttons[this.activeIndex];
    if (activeButton) {
      this.activeBarTarget.style.transform = `translateX(${activeButton.offsetLeft}px)`;
      this.activeBarTarget.style.width = `${activeButton.offsetWidth}px`;
    }
  }

  showHoverBackground() {
    const buttons = this.getButtons();
    const hoveredButton = buttons[this.hoveredIndex];
    if (hoveredButton) {
      this.hoverBgTarget.style.display = "block";
      this.hoverBgTarget.style.transform = `translateX(${hoveredButton.offsetLeft}px)`;
      this.hoverBgTarget.style.width = `${hoveredButton.offsetWidth}px`;
    }
  }

  updateButtonColors() {
    const buttons = this.getButtons();
    buttons.forEach((button, index) => {
      if (index === this.activeIndex) {
        button.classList.remove("text-gray-600");
        button.classList.add("text-gray-900");
      } else {
        button.classList.remove("text-gray-900");
        button.classList.add("text-gray-600");
      }
    });
  }

  getButtons() {
    return this.navTarget.querySelectorAll("button");
  }
}
