document.addEventListener("DOMContentLoaded", () => {
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSRjwOYie3B5Jf4ETxcM0Ts48P1i4txaA14IUNNVlW3Ej8Wy7_KmogWpeUTpMnRKi1l-50v2QOiX4jg/pub?output=csv';

  fetch(CSV_URL)
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.text();
    })
    .then(csv => {
      const rows = csv.trim().split('\n').map(line => line.split(','));
      const credentials = rows.slice(1).map(([id, pass]) => ({ id: id.trim(), password: pass.trim() })); // perhatikan: 'password'

// Prompt login yang tidak bisa di-cancel
      let inputId = "", inputPass = "";
      while (!inputId) {
        inputId = prompt("Masukkan ID:");
        if (inputId === null) inputId = "";
      }
      while (!inputPass) {
        inputPass = prompt("Masukkan Password:");
        if (inputPass === null) inputPass = "";
      }

      const validUser = credentials.find(cred =>
        cred.id === inputId && cred.password === inputPass
      );

      if (validUser) {
        console.log("Login berhasil:", inputId);
        tampilkanBuku();
      } else {
        alert("ID atau Password salah.");
        location.reload();
      }
    })
    .catch(error => {
      alert("Gagal memuat data autentikasi.");
      console.error("Gagal memuat data autentikasi:", error);
    });
});
