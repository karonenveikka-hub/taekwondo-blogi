// Yksinkertainen "admin"-kirjautuminen frontissa (ei oikea tietoturva, vain demo/asiakkaalle)
// (Deleted these three lines)

// Inside if (loginToggle && loginPanel && loginForm) { ... } block:

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!resp.ok) {
      alert("Väärä sähköposti tai salasana.");
      return;
    }

    const data = await resp.json();

    if (data.success) {
      localStorage.setItem("tkdLoggedIn", "true");
      setLoggedInState(true);
      loginForm.reset();
    } else {
      alert("Väärä sähköposti tai salasana.");
    }

  } catch (err) {
    console.error(err);
    alert("Kirjautumisessa tapahtui virhe.");
  }
});
