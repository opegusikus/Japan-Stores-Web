async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

async function login(event) {
  event.preventDefault(); // ❗ зупиняє перезавантаження сторінки

  const mail = document.getElementById('user-email').value;
  const pwdRaw = document.getElementById('pass-word').value;

  const pwd = await sha256(pwdRaw);

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ mail, pwd })
  });

  const result = await response.json();
  const statusMsg = document.getElementById('statusMsg');

  if (result.status === 0) {
    statusMsg.textContent = "✅ Login successful!";
    statusMsg.style.color = "#01060d";
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1000);
  } else {
    statusMsg.style.display = "block";
    statusMsg.style.backgroundColor = "brown";
    statusMsg.textContent = "❌ Login failed: " + (result.error || "Unknown error");
    statusMsg.style.color = "#fff5e8";
  }

  return false; // зупиняє стандартне відправлення
}

