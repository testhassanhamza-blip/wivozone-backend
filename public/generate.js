async function generate() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const duration = document.getElementById("duration").value;

  if (!name || !phone || !duration) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, duration })
  });

  const data = await res.json();

  if (!data.success) {
    alert("Erreur serveur.");
    return;
  }

  document.getElementById("resultBox").style.display = "block";
  document.getElementById("rUser").innerHTML = "Nom d'utilisateur : <b>" + data.user.username + "</b>";
  document.getElementById("rPass").innerHTML = "Mot de passe : <b>" + data.user.password + "</b>";

  window.generatedUser = data.user; // pour copie
}

function copy() {
  const text = 
    `WivoZone ID\nUsername: ${window.generatedUser.username}\nPassword: ${window.generatedUser.password}`;
  
  navigator.clipboard.writeText(text);
  alert("Copié !");
}
