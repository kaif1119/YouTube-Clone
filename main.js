import { youtubeVideos } from "./src/data/videos.js"
import { renderVideos } from "./src/components/renderVideos.js";
import { initSearch } from "./src/features/search.js";
import { initChips } from "./src/features/chips.js";
import { initTheme } from "./src/features/themeToggle.js";
import { initOfflineStatus } from "./src/features/offlineStatus.js";
import { initMobileSearch } from "./src/features/mobileSearch.js";

// DOM
const container = document.getElementById("videos");

renderVideos(container, youtubeVideos);

initSearch(
  document.getElementById("searchInput"),
  document.getElementById("searchBtn"),
  document.getElementById("clearBtn"),
  youtubeVideos,
  container
);

initChips(document.querySelectorAll(".chip"), youtubeVideos, container);

initTheme(
  document.getElementById("themeToggle"),
  document.getElementById("themeIcon")
);

initMobileSearch({
  openBtn: document.getElementById("mobileSearchOpen"),
  closeBtn: document.getElementById("mobileSearchClose"),
  overlay: document.getElementById("mobileSearchOverlay"),
  input: document.getElementById("mobileSearchInput"),
  clearBtn: document.getElementById("mobileSearchClear"),
  suggestionsBox: document.getElementById("msSuggestions"),
  micBtn: document.getElementById("msMic"),
  mainInput: document.getElementById("searchInput"),
  data: youtubeVideos,
  container: document.getElementById("videos")
});

initOfflineStatus(document.getElementById("offlineBanner"));