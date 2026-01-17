import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Configurar CORS para permitir conexiones desde tu app web
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight request (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se acepta POST' });
  }

  const { pedido, imagen } = req.body;

  // Validar datos
  if (!pedido || !imagen) {
    return res.status(400).json({ error: 'Falta pedido o imagen' });
  }

  try {
    // Enviar los datos al webhook de Make
    const respuesta = await fetch('https://hook.eu1.make.com/7foscbw5sabj76rgb4qy208236w', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pedido, imagen })
    });

    if (!respuesta.ok) {
      throw new Error('Error al enviar a Make');
    }

    return res.status(200).json({ ok: true, mensaje: 'Enviado a Make con éxito' });
  } catch (error) {
    return res.status(500).json({
      error: 'Error interno al reenviar datos a Make',
      detalle: error.message
    });
  }
}
