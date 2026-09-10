async function post(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.error || `${path} failed with ${res.status}`);
  }
  return res.json();
}

export function fetchChat(turns, profile, lang) {
  return post('/api/chat', { turns, profile, lang });
}

export function fetchPanel(kind, scheme, profile, lang) {
  return post('/api/panel', { kind, scheme, profile, lang });
}
