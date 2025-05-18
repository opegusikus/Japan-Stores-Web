async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function login() {
    const mail = document.getElementById('user-email').value;
    const pwdRaw = document.getElementById('password').value;
    const pwd = await sha256(pwdRaw);

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // This ensures cookies are sent/stored
      body: JSON.stringify({ mail, pwd })
    });
    // console.log('mes');
    const result = await response.json();
    const statusMsg = document.getElementById('statusMsg');

    if (result.status === 0) {
      statusMsg.textContent = "✅ Login successful!";
      statusMsg.style.color = "green";
      // Redirect or load dashboard
    } else {
      statusMsg.textContent = "❌ Login failed. User not found or wrong password.";
      statusMsg.style.color = "red";
      // console.log(result);
    }
  }