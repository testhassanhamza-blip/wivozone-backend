async function loadValidUsers() {
  const res = await fetch("/api/valid");
  const data = await res.json();

  const tbody = document.getElementById("userList");
  tbody.innerHTML = "";

  if (!data.success || data.users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Aucun utilisateur valide</td></tr>`;
    return;
  }

  data.users.forEach(u => {
    const row = `
      <tr>
        <td>${u.name}</td>
        <td>${u.phone}</td>
        <td><b>${u.username}</b></td>
        <td>${u.password}</td>
        <td>${u.created ? new Date(u.created).toLocaleString() : "-"}</td>
        <td>${u.endTime ? new Date(u.endTime).toLocaleString() : "-"}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

loadValidUsers();
setInterval(loadValidUsers, 5000);
