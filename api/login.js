module.exports = (req, res) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Debug GET: tarkistetaan että ympäristömuuttujat näkyvät
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      envSeen: {
        emailSet: !!adminEmail,
        passwordSet: !!adminPassword
      },
      message: "GET toimii, POST on kirjautumista varten."
    });
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const body = req.body || {};
  const email = body.email || "";
  const password = body.password || "";

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({
      success: false,
      message: "Serverin ympäristömuuttujia ei ole asetettu.",
      envSeen: {
        emailSet: !!adminEmail,
        passwordSet: !!adminPassword
      }
    });
  }

  if (email === adminEmail && password === adminPassword) {
    return res.status(200).json({ success: true });
  }

  return res
    .status(401)
    .json({ success: false, message: "Väärä sähköposti tai salasana." });
};