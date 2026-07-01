// arXiv Classic Red - toggle logic.
// Event-driven MV3 service worker: runs only on install, browser start,
// and toolbar-icon clicks. No code ever runs inside arXiv pages.

const CSS_ID = "arxiv-classic-red-css";
const MATCHES = [
  "https://arxiv.org/*",
  "https://www.arxiv.org/*",
  "https://info.arxiv.org/*"
];

async function getEnabled() {
  const { enabled = true } = await chrome.storage.local.get("enabled");
  return enabled;
}

async function syncRegistration(enabled) {
  const regs = await chrome.scripting.getRegisteredContentScripts({ ids: [CSS_ID] });
  if (enabled && regs.length === 0) {
    await chrome.scripting.registerContentScripts([{
      id: CSS_ID,
      matches: MATCHES,
      css: ["classic-red.css"],
      runAt: "document_start",
      persistAcrossSessions: true
    }]);
  } else if (!enabled && regs.length > 0) {
    await chrome.scripting.unregisterContentScripts({ ids: [CSS_ID] });
  }
}

async function updateBadge(enabled) {
  await chrome.action.setBadgeText({ text: enabled ? "" : "OFF" });
  await chrome.action.setBadgeBackgroundColor({ color: "#6b6459" });
  await chrome.action.setTitle({
    title: `arXiv Classic Red: ${enabled ? "on" : "off"} (click to toggle)`
  });
}

async function setState(enabled) {
  await chrome.storage.local.set({ enabled });
  await syncRegistration(enabled);
  await updateBadge(enabled);
  // Apply to already-open arXiv tabs. CSS injected by the registered
  // content script cannot be removed in place, so reload those tabs.
  const tabs = await chrome.tabs.query({ url: MATCHES });
  await Promise.allSettled(tabs.map((tab) => chrome.tabs.reload(tab.id)));
}

chrome.runtime.onInstalled.addListener(async () => {
  const enabled = await getEnabled();
  await syncRegistration(enabled);
  await updateBadge(enabled);
});

chrome.runtime.onStartup.addListener(async () => {
  // Registration persists across sessions; only the badge needs restoring.
  await updateBadge(await getEnabled());
});

chrome.action.onClicked.addListener(async () => {
  await setState(!(await getEnabled()));
});
