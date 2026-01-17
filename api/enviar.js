export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST permitido" });
  }

  try {
    const body = req.body;

    console.log("Datos recibidos:", body);

    const { pedido, imagen } = body || {};

    if (!pedido || !imagen) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const response = await fetch("https://hook.eu1.make.com/7foscbw5sabj76rgb4qy208236w", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pedido, imagen })
    });

    const text = await response.text();
    console.log("Respuesta de Make:", text);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({
      error: "Fallo interno",
      detalle: err.message
    });
  }
}
