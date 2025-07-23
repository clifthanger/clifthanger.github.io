document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRjwOYie3B5Jf4ETxcM0Ts48P1i4txaA14IUNNVlW3Ej8Wy7_KmogWpeUTpMnRKi1l-50v2QOiX4jg/pub?output=csv'; 

  async function fetchCSV() {
    const res = await fetch(CSV_URL);
    const text = await res.text();
    return text.split("\n").map(row => row.split(","));
  }

  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputId = document.getElementById("id").value.trim();
    const inputPw = document.getElementById("password").value.trim();
    const errorBox = document.getElementById("errorMsg");

    try {
      const credentials = await fetchCSV();
      const user = credentials.find(row => row[0] === inputId && row[1] === inputPw);

      if (user) {
        if (inputId.toLowerCase() === "single") {
          window.location.href = "/FlipBook/";
        } else if (inputId.toLowerCase() === "bundling") {
          window.location.href = "/bukucerita/";
        } else {
          errorBox.textContent = "ID valid tapi tidak dikenali arahannya.";
        }
      } else {
        errorBox.textContent = "ID atau password salah.";
      }
    } catch (err) {
      errorBox.textContent = "Gagal mengakses data login.";
    }
  });
});
