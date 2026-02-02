const code="FULLCODE";
document.getElementById("copyBtn").onclick=async()=>{await navigator.clipboard.writeText(code);};