import { highlightText } from "../utils/highlight.js";

export function renderVideos(container, data, searchText = "") {
  if (data.length === 0) {
    container.innerHTML = `<p class="not-found">🔍 No results found</p>`;
    return;
  }

  container.innerHTML = data.map(video => `
    <div class="video-card">
      <div class="thumb-wrap">
        <img src="${video.thumbnail}" class="thumbnail"/>
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-info">
        <img src="${video.channelAvatar}" class="channel-avatar"/>
        <div>
          <h4>
            ${highlightText(video.title, searchText)}
            ${video.verified ? "✔️" : ""}
          </h4>
          <p>${highlightText(video.channel, searchText)}</p>
          <p>${video.views} • ${video.time}</p>
        </div>
      </div>
    </div>
  `).join("");
}