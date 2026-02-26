const btn = document.getElementById("toggleBtn");
const columns = Array.from(document.querySelectorAll(".col-md-4"));

const MAX_LIFT_PX = 14;
const MAX_GREEN_ALPHA = 0.34;
const FUNNY_LINES = [
  "Calm down, this is definitely production.",
  "Button says: I am doing triple shift.",
  "Secret mode: very important face enabled.",
  "Not a bug, just a dramatic feature.",
  "Click confirmed. Mild panic is allowed.",
];

columns.forEach((col) => {
  col.style.transition = "transform 120ms linear, background-color 120ms linear";
  col.style.transformOrigin = "center bottom";
  col.style.backgroundColor = "rgba(25, 135, 84, 0)";
  col.style.borderRadius = "10px";
});

function showFunnyToast() {
  const oldToast = document.getElementById("funnyToast");
  if (oldToast) oldToast.remove();

  const toast = document.createElement("div");
  toast.id = "funnyToast";
  toast.textContent = FUNNY_LINES[Math.floor(Math.random() * FUNNY_LINES.length)];
  toast.style.position = "fixed";
  toast.style.right = "20px";
  toast.style.bottom = "90px";
  toast.style.zIndex = "9999";
  toast.style.padding = "10px 14px";
  toast.style.borderRadius = "10px";
  toast.style.background = "rgba(33, 37, 41, 0.92)";
  toast.style.color = "#fff";
  toast.style.fontWeight = "600";
  toast.style.boxShadow = "0 8px 20px rgba(0,0,0,0.28)";
  toast.style.opacity = "0";
  toast.style.transform = "translateY(8px)";
  toast.style.transition = "opacity 180ms ease, transform 180ms ease";

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 180);
  }, 1500);
}

if (btn) {
  btn.addEventListener("click", () => {
    btn.style.transition = "transform 120ms ease";
    btn.style.transform = "rotate(-2deg) scale(1.08)";
    setTimeout(() => {
      btn.style.transform = "rotate(2deg) scale(0.98)";
    }, 80);
    setTimeout(() => {
      btn.style.transform = "";
    }, 170);

    showFunnyToast();
  });
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function updateColumnScale() {
  if (!btn || columns.length === 0) return;

  const btnRect = btn.getBoundingClientRect();
  const btnCenterX = btnRect.left + btnRect.width / 2;

  columns.forEach((col) => {
    const rect = col.getBoundingClientRect();
    const colCenterX = rect.left + rect.width / 2;

    const distance = Math.abs(btnCenterX - colCenterX);
    const influenceRange = rect.width / 2 + btnRect.width / 2;
    const proximity = clamp(1 - distance / influenceRange, 0, 1);

    const lift = MAX_LIFT_PX * proximity;
    const greenAlpha = MAX_GREEN_ALPHA * proximity;

    col.style.transform = `translateY(${-lift.toFixed(2)}px)`;
    col.style.backgroundColor = `rgba(25, 135, 84, ${greenAlpha.toFixed(3)})`;
    col.style.zIndex = `${1 + Math.round(proximity * 10)}`;
  });

  requestAnimationFrame(updateColumnScale);
}

requestAnimationFrame(updateColumnScale);
