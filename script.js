const form = document.getElementById("identity-form");
const successBox = document.getElementById("success-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nationalCodeInput = document.getElementById("national-code");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");

  const nationalCode = nationalCodeInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (!validateDOB()) {
    return;
  }

  if (!/^\d{10}$/.test(nationalCode)) {
    alert("شماره ملی باید دقیقا ۱۰ رقم باشد.");
    nationalCodeInput.focus();
    return;
  }

  if (!/^09\d{9}$/.test(phone)) {
    alert("شماره تلفن همراه باید با 09 شروع شود و ۱۱ رقم داشته باشد.");
    phoneInput.focus();
    return;
  }

  if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("فرمت ایمیل وارد شده صحیح نیست.");
    emailInput.focus();
    return;
  }

  if (isCanvasBlank()) {
    alert("لطفا امضای خود را وارد نمایید.");
    return;
  }

  // نمایش پیام موفقیت
  successBox.style.display = "block";

  successBox.scrollIntoView({ behavior: "smooth" });

  // پس از 3 ثانیه پیام موفقیت را مخفی کن
  setTimeout(() => {
    successBox.style.display = "none";
  }, 3000);

  // ریست فرم و پاک کردن امضا
  form.reset();
  clearSignature();
});

const canvas = document.getElementById("signature-pad");
const ctx = canvas.getContext("2d");
let drawing = false;

function isCanvasBlank() {
  const blank = document.createElement("canvas");
  blank.width = canvas.width;
  blank.height = canvas.height;
  return canvas.toDataURL() === blank.toDataURL();
}

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

function validateDOB() {
  const day = document.getElementById("birth-day").value.trim();
  const month = document.getElementById("birth-month").value.trim();
  const year = document.getElementById("birth-year").value.trim();
  const errorBox = document.getElementById("dob-error");

  const isValidDay = /^\d{1,2}$/.test(day) && parseInt(day) >= 1 && parseInt(day) <= 31;
  const isValidMonth = /^\d{1,2}$/.test(month) && parseInt(month) >= 1 && parseInt(month) <= 12;
  const isValidYear = /^\d{4}$/.test(year) && parseInt(year) >= 1300 && parseInt(year) <= 1500;

  if (!isValidDay || !isValidMonth || !isValidYear) {
    errorBox.style.display = "block";
    return false;
  }

  errorBox.style.display = "none";
  return true;
}
