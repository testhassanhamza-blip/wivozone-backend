async function generateUser() {
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

  const u = data.user;

  document.getElementById("resultBox").style.display = "block";
  document.getElementById("rName").innerHTML = "Nom : <b>" + u.name + "</b>";
  document.getElementById("rUser").innerHTML = "Username : <b>" + u.username + "</b>";
  document.getElementById("rPass").innerHTML = "Password : <b>" + u.password + "</b>";
  document.getElementById("rStart").innerHTML = "Début : <b>" + new Date(u.created).toLocaleString() + "</b>";
  document.getElementById("rEnd").innerHTML = "Fin : <b>" + new Date(u.endTime).toLocaleString() + "</b>";

  window.generatedUser = u;
}

function copyUser() {
  const u = window.generatedUser;

  const message = `
WivoZone Wi-Fi Access
Name: ${u.name}
Username: ${u.username}
Password: ${u.password}
Start: ${new Date(u.created).toLocaleString()}
End: ${new Date(u.endTime).toLocaleString()}
`;

  navigator.clipboard.writeText(message);
  alert("Identifiants copiés !");
}
