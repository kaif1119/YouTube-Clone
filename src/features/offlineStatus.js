export function initOfflineStatus(banner) {
  function show(msg, cls) {
    banner.textContent = msg;
    banner.className = `show ${cls}`;
  }

  window.addEventListener("offline", () =>
    show("⚠️ Offline", "offline")
  );

  window.addEventListener("online", () =>
    show("✅ Online", "online")
  );
}