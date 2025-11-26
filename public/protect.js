// public/protect.js

const token = localStorage.getItem("token");

// Si pas de token = pas connecté → on renvoie vers le login
if (!token) {
  window.location.href = "/login.html";
}
