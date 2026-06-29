// api/push.js — Recibe frames directo desde Zapia y los guarda en memoria global
// Vercel mantiene instancias "warm" — el frame persiste entre requests del mismo pod

// Almacenamiento en memoria de la instancia
if (!global._zapiaFrame) {
  global._zapiaFrame = null;
  global._zapiaFrameSha = '0000000';
  global._zapiaFrameTs = 0;
}

export const config = { api: { bodyParser: { sizeLimit: '2mb' } } };

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Zapia-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth básica
  const key = req.headers['x-zapia-key'];
  if (key !== 'zapia2024live') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // El body viene como base64 en JSON: { "frame": "<base64>", "sha": "abc123" }
  const { frame, sha } = req.body;
  if (!frame) {
    return res.status(400).json({ error: 'No frame' });
  }

  global._zapiaFrame = Buffer.from(frame, 'base64');
  global._zapiaFrameSha = sha || String(Date.now());
  global._zapiaFrameTs = Date.now();

  return res.status(200).json({ ok: true, sha: global._zapiaFrameSha, ts: global._zapiaFrameTs });
}
