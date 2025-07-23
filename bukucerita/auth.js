// auth.js
document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRjwOYie3B5Jf4ETxcM0Ts48P1i4txaA14IUNNVlW3Ej8Wy7_KmogWpeUTpMnRKi1l-50v2QOiX4jg/pub?output=csv';

  fetch(CSV_URL)
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.text();
    })
    .then(csv => {
      const rows = csv.trim().split('\n').map(line => line.split(','));
      const credentials = rows.slice(1).map(([id, pass]) => ({ id: id.trim(), pass: pass.trim() }));

      let inputId = prompt("Masukkan ID:");
      let inputPass = prompt("Masukkan Password:");

      const isValid = credentials.some(entry => entry.id === inputId && entry.pass === inputPass);

      if (isValid) {
        document.getElementById("mainContent").style.display = "block";
      } else {
        document.body.innerHTML = "<h2 style='text-align:center;margin-top:20%'>🚫 ID atau Password salah.</h2>";
      }
    })
    .catch(err => {
      console.error("Gagal memuat data autentikasi:", err);
      document.body.innerHTML = "<h2 style='text-align:center;margin-top:20%'>🔌 Gagal memuat data autentikasi.</h2>";
    });
});
