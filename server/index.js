import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { chatTurn, panelJSON } from './lib/gemini.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, hasKey: !!process.env.GEMINI_API_KEY });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { turns, profile, lang } = req.body || {};
    if (!Array.isArray(turns) || turns.length === 0) {
      return res.status(400).json({ error: 'turns is required' });
    }
    const result = await chatTurn({ turns: turns.slice(-14), profile: profile || {}, lang: lang === 'hi' ? 'hi' : 'en' });
    res.json(result);
  } catch (err) {
    console.error('[/api/chat]', err.message);
    res.status(502).json({ error: err.message || 'chat failed' });
  }
});

app.post('/api/panel', async (req, res) => {
  try {
    const { kind, scheme, profile, lang } = req.body || {};
    if (!['detail', 'draft', 'docs'].includes(kind)) {
      return res.status(400).json({ error: 'invalid kind' });
    }
    if (!scheme || !scheme.name) {
      return res.status(400).json({ error: 'scheme is required' });
    }
    const data = await panelJSON({ kind, scheme, profile: profile || {}, lang: lang === 'hi' ? 'hi' : 'en' });
    res.json(data);
  } catch (err) {
    console.error('[/api/panel]', err.message);
    res.status(502).json({ error: err.message || 'panel failed' });
  }
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`Setu server listening on http://localhost:${port}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is not set — /api/chat and /api/panel will fail and the client will use its offline fallback.');
  }
});
