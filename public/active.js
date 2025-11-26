let currentUser = null;

async function loadUsers() {
  const res = await fetch("/api/active");
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.users.forEach(u => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${u.name}</td><td>${u.phone}</td>`;
    row.onclick = () => openDetails(u);
    list.appendChild(row);
  });
}

function openDetails(u) {
  currentUser = u;
  document.getElementById("dName").innerHTML = "Jina: " + u.name;
  document.getElementById("dPhone").innerHTML = "Simu: " + u.phone;
  document.getElementById("dUser").innerHTML = "Username: " + u.username;
  document.getElementById("dPass").innerHTML = "Password: " + u.password;
  document.getElementById("dStart").innerHTML = "Anza: " + new Date(u.created).toLocaleString();
  document.getElementById("dEnd").innerHTML = "Inaisha: " + new Date(u.endTime).toLocaleString();

  document.getElementById("popup").style.display = "flex";
}

function closeDetails() {
  document.getElementById("popup").style.display = "none";
}

function copyDetails() {
  const u = currentUser;
  const msg = `
WivoZone
Jina: ${u.name}
Username: ${u.username}
Password: ${u.password}
Muda wa kifurushi: ${u.duration}
Inaisha: ${new Date(u.endTime).toLocaleString()}
`;
  navigator.clipboard.writeText(msg);
  alert("Nakala imefanikiwa!");
}

function sendUserSMS() {
  const u = currentUser;
  const msg = encodeURIComponent(
`WivoZone
Jina: ${u.name}
Username: ${u.username}
Password: ${u.password}
Muda wa kifurushi: ${u.duration}
Inaisha: ${new Date(u.endTime).toLocaleString()}
`);
  window.location.href = `sms:${u.phone}?body=${msg}`;
}

function pauseUser() {
  alert("Pause itakuja soon.");
}

function deleteUser() {
  alert("Delete itakuja soon.");
}

loadUsers();
setInterval(loadUsers, 5000);
