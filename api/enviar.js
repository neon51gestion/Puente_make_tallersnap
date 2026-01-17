export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Solo se acepta POST' });
  }

  const { pedido, imagen } = req.body;

  if (!pedido || !imagen) {
    return res.status(400).json({ error: 'Falta pedido o imagen' });
  }

  try {
    const respuesta = await fetch('https://hook.eu1.make.com/7foscbw5sabj76rgb4qy208236w', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ pedido, imagen })
    });

    if (!r
