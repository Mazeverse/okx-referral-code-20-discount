(() => {
  const code = "FULLCODE";
  const joinUrl = "https://www.okx.com/join/fullcode";

  const refCodeEl = document.getElementById("refCode");
  const copyBtn = document.getElementById("copyBtn");
  const copyHint = document.getElementById("copyHint");
  const shareBtn = document.getElementById("shareBtn");
  const updatedAt = document.getElementById("updatedAt");

  // Set updated date (client-side)
  const now = new Date();
  updatedAt.textContent = now.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });

  function setHint(msg, ok = true){
    copyHint.textContent = msg;
    copyHint.style.color = ok ? "var(--ok)" : "var(--muted)";
    window.setTimeout(() => { copyHint.style.color = "var(--muted)"; }, 1600);
  }

  async function copyText(text){
    try{
      await navigator.clipboard.writeText(text);
      setHint("Copied! Paste it during sign-up.", true);
    }catch(e){
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setHint("Copied! Paste it during sign-up.", true);
    }
  }

  copyBtn?.addEventListener("click", () => copyText(code));

  shareBtn?.addEventListener("click", async () => {
    const data = { title: document.title, text: "OKX referral code: " + code, url: window.location.href };
    try{
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await copyText(window.location.href);
        setHint("Link copied (share is not supported on this device).", true);
      }
    }catch(_) {}
  });

  // Make the code clickable for convenience
  refCodeEl?.addEventListener("click", () => copyText(code));

  // Basic console info (optional)
  console.log("OKX referral landing ready:", { code, joinUrl });
})();
