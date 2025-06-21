// Elements
const codeEl   = document.getElementById("code");
const runBtn   = document.getElementById("run");
const saveBtn  = document.getElementById("save");
const fileBox  = document.getElementById("filename");
const preview  = document.getElementById("preview");

// ----- Run (preview) -----
function runCode() {
  preview.srcdoc = codeEl.value;
  localStorage.setItem("onlineCodeEditor:lastCode", codeEl.value);
}

// ----- Save As -----
function saveAs() {
  // If no filename typed, ask the user:
  let filename = fileBox.value.trim();
  if (!filename) {
    filename = prompt("Enter a file name (with extension)", "index.html") || "index.html";
    fileBox.value = filename;            // remember it for next time
  }

  // Create & download the file
  const blob = new Blob([codeEl.value], { type: "text/html" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ----- Listeners -----
runBtn.addEventListener("click", runCode);
saveBtn.addEventListener("click", saveAs);

// Shortcuts
window.addEventListener("keydown", e => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runCode(); }
  if (e.key.toLowerCase() === "s" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); saveAs(); }
});

// Load last code if present
const previous = localStorage.getItem("onlineCodeEditor:lastCode");
if (previous) codeEl.value = previous;
runCode();
