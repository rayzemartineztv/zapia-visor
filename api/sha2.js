// api/sha2.js — Devuelve el SHA del frame en memoria (para polling rápido)
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Content-Type', 'text/plain');
  return res.end(global._zapiaFrameSha || 'none');
}
