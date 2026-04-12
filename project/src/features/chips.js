import { renderVideos } from "../components/renderVideos.js";

export function initChips(chips, data, container) {
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const cat = chip.dataset.category;
      const filtered = cat === "All"
        ? data
        : data.filter(v => v.category === cat);

      renderVideos(container, filtered);
    });
  });
}