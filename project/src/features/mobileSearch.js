import { renderVideos } from "../components/renderVideos.js";

export function initMobileSearch({
  openBtn,
  closeBtn,
  overlay,
  input,
  clearBtn,
  suggestionsBox,
  micBtn,
  mainInput,
  data,
  container
}) {

  /* ================= OPEN / CLOSE ================= */

  openBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    setTimeout(() => input.focus(), 150);
    renderSuggestions("");
  });

  closeBtn.addEventListener("click", closeOverlay);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOverlay();
  });

  function closeOverlay() {
    overlay.classList.remove("active");

    const text = input.value.toLowerCase().trim();

    if (text) {
      const filtered = filterVideos(text);
      renderVideos(container, filtered, text);
      mainInput.value = input.value;
    } else {
      renderVideos(container, data);
      mainInput.value = "";
    }
  }

  /* ================= INPUT ================= */

  input.addEventListener("input", () => {
    clearBtn.classList.toggle("visible", input.value.length > 0);
    renderSuggestions(input.value);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const text = input.value.toLowerCase().trim();

      if (text) {
        renderVideos(container, filterVideos(text), text);
        mainInput.value = input.value;
      } else {
        renderVideos(container, data);
        mainInput.value = "";
      }

      overlay.classList.remove("active");
      input.blur();
    }
  });

  /* ================= CLEAR ================= */

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.classList.remove("visible");
    input.focus();
    renderSuggestions("");
  });

  /* ================= MIC ================= */

  micBtn.addEventListener("click", () => {
    startVoice(input, (text) => renderSuggestions(text));
  });

  /* ================= SUGGESTIONS ================= */

  function renderSuggestions(query) {
    const text = query.toLowerCase().trim();

    const allItems = [
      ...data.map(v => v.title),
      ...data.map(v => v.channel)
    ];

    if (!text) {
      return renderList(data.slice(0, 5).map(v => v.title), "");
    }

    const seen = new Set();

    const matched = allItems.filter(item => {
      const lower = item.toLowerCase();
      if (lower.includes(text) && !seen.has(lower)) {
        seen.add(lower);
        return true;
      }
      return false;
    });

    if (matched.length === 0) {
      suggestionsBox.innerHTML = `<p>No suggestions</p>`;
      return;
    }

    renderList(matched, text);
  }

  function renderList(items, query) {
    suggestionsBox.innerHTML = "";

    items.forEach(item => {
      const li = document.createElement("li");

      let display = item;
      if (query) {
        const regex = new RegExp(`(${query})`, "gi");
        display = item.replace(regex, `<span class="match">$1</span>`);
      }

      li.innerHTML = `
        <span>${display}</span>
      `;

      li.addEventListener("click", () => {
        const filtered = filterVideos(item.toLowerCase());
        renderVideos(container, filtered, item);
        mainInput.value = item;
        closeOverlay();
      });

      suggestionsBox.appendChild(li);
    });
  }

  /* ================= HELPERS ================= */

  function filterVideos(text) {
    return data.filter(v =>
      v.title.toLowerCase().includes(text) ||
      v.channel.toLowerCase().includes(text)
    );
  }

  function startVoice(inputEl, callback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      inputEl.value = text;
      inputEl.dispatchEvent(new Event("input"));
      callback && callback(text);
    };
  }
}