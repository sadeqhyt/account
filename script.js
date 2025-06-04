const form = document.getElementById("identity-form");
const successBox = document.getElementById("success-message");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // جلوگیری از ارسال واقعی فرم
  successBox.style.display = "block";
  successBox.scrollIntoView({ behavior: "smooth" });
  form.reset();
  clearSignature();
});

// امضای با ماوس/قلم
const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener("mousemove", (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
});

canvas.addEventListener("mouseleave", () => {
  drawing = false;
});

function clearSignature() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
