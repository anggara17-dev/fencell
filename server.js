import express from 'express'
const app = express()

// Inject environment Supabase dari Render ke browser (aman: hanya URL + anon key)
app.get('/env.js', (_req, res) => {
  res.type('application/javascript').send(
    `window.__ENV__={SUPABASE_URL:${JSON.stringify(process.env.SUPABASE_URL ?? '')},` +
    `SUPABASE_ANON_KEY:${JSON.stringify(process.env.SUPABASE_ANON_KEY ?? '')}}`
  )
})

app.use(express.static('public'))

// SPA fallback — semua rute selain /env.js → index.html
app.get(/^\/(?!env\.js).*/, (_req, res) => res.sendFile('index.html', { root: 'public' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('FENCELL POS running on :' + PORT))
