import { Controller } from "@hotwired/stimulus";
import { interpolateByScroll } from "../utils/interpolate";

export default class extends Controller {
  static targets = ["logo"];

  connect() {
    window.addEventListener("scroll", this.updateLogoPosition.bind(this), {
      passive: true,
    });
    this.updateLogoPosition();
  }

  disconnect() {
    window.removeEventListener("scroll", this.updateLogoPosition);
  }

  updateLogoPosition() {
    const scrollY = window.scrollY;

    if (this.hasLogoTarget) {
      const scale = interpolateByScroll(scrollY, 50, 1, 0.8);
      const translateY = interpolateByScroll(scrollY, 50, 0, -12);

      this.logoTarget.style.transform = `translateY(${translateY}px) scale(${scale})`;
    }
  }
}
