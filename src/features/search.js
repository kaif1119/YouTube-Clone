import { renderVideos } from "../components/renderVideos.js";

export function initSearch(input, button, clearBtn, data, container) {
  
  function filter(text) {
    return data.filter(v =>
      v.title.toLowerCase().includes(text) ||
      v.channel.toLowerCase().includes(text)
    );
  }

  input.addEventListener("input", () => {
    const text = input.value.toLowerCase();
    renderVideos(container, filter(text), text);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const text = input.value.toLowerCase();
      renderVideos(container, filter(text), text);
    }
  });

  button.addEventListener("click", () => {
    const text = input.value.toLowerCase();
    renderVideos(container, filter(text), text);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    renderVideos(container, data);
  });
}