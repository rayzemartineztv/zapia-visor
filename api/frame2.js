// api/frame2.js — Sirve el frame guardado en memoria (sin tocar GitHub)
// Latencia: ~50-200ms desde que Zapia hace push hasta que el browser lo recibe

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');

  if (!global._zapiaFrame) {
    return res.status(404).json({ error: 'No frame yet' });
  }

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('X-Zapia-Sha', global._zapiaFrameSha || '');
  res.setHeader('X-Zapia-Ts', String(global._zapiaFrameTs || 0));
  return res.end(global._zapiaFrame);
}
