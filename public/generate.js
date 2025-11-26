async function generateUser() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const duration = document.getElementById("duration").value;

  if (!name || !phone || !duration) {
    alert("Tafadhali jaza sehemu zote.");
    return;
  }

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, duration })
  });

  const data = await res.json();

  if (!data.success) {
    alert("Hitilafu imetokea.");
    return;
  }

  window.generatedUser = data.user;

  document.getElementById("pName").innerHTML = "Jina: <b>" + data.user.name + "</b>";
  document.getElementById("pUser").innerHTML = "Username: <b>" + data.user.username + "</b>";
  document.getElementById("pPass").innerHTML = "Password: <b>" + data.user.password + "</b>";
  document.getElementById("pStart").innerHTML = "Anza: <b>" + new Date(data.user.created).toLocaleString() + "</b>";
  document.getElementById("pEnd").innerHTML = "Inaisha: <b>" + new Date(data.user.endTime).toLocaleString() + "</b>";

  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function copyUser() {
  const u = window.generatedUser;

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

function sendSMS() {
  const u = window.generatedUser;

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
