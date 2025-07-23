document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRjwOYie3B5Jf4ETxcM0Ts48P1i4txaA14IUNNVlW3Ej8Wy7_KmogWpeUTpMnRKi1l-50v2QOiX4jg/pub?gid=0&single=true&output=csv';

  function clean(value) {
    return value.trim().replace(/^\uFEFF/, "");
  }

  async function fetchCSV() {
    const res = await fetch(CSV_URL);
    const text = await res.text();
    return text
      .split("\n")
      .map(row => row.split(",").map(cell => clean(cell)));
  }

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputId = clean(document.getElementById("id").value);
    const inputPw = clean(document.getElementById("password").value);
    const errorBox = document.getElementById("errorMsg");

    try {
      const credentials = await fetchCSV();
      const user = credentials.find(row => row[0] === inputId && row[1] === inputPw);

      if (user) {
        if (inputId === "single") {
          window.location.href = "/FlipBook/";
        } else if (inputId === "bundling") {
          window.location.href = "/bukucerita/";
        } else {
          errorBox.textContent = "Login berhasil tapi ID tidak dikenali.";
        }
      } else {
        errorBox.textContent = "ID atau password salah.";
      }
    } catch (err) {
      errorBox.textContent = "Gagal mengambil data login.";
    }
  });
});
