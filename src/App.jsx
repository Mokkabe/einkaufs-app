import { useEffect, useState } from 'react'
import './App.css'

const GESCHAEFTE = ['Penny', 'Hofer', 'Spar', 'Billa', 'Bipa', 'DM']
const SPEICHER_SCHLUESSEL = 'einkaufs-app-daten'

function leereDaten() {
  return {
    listen: Object.fromEntries(GESCHAEFTE.map((g) => [g, []])),
    aktionen: [],
  }
}

function ladeDaten() {
  try {
    const gespeichert = localStorage.getItem(SPEICHER_SCHLUESSEL)
    if (!gespeichert) return leereDaten()
    return { ...leereDaten(), ...JSON.parse(gespeichert) }
  } catch {
    return leereDaten()
  }
}

function neueId() {
  return String(Date.now()) + Math.random().toString(36).slice(2)
}

function datumHeute() {
  return new Date().toISOString().slice(0, 10)
}

function datumPlusTage(datum, tage) {
  const d = new Date(datum + 'T00:00:00Z')
  d.setUTCDate(d.getUTCDate() + tage)
  return d.toISOString().slice(0, 10)
}

function App() {
  const [daten, setDaten] = useState(ladeDaten)
  const [geschaeft, setGeschaeft] = useState(GESCHAEFTE[0])
  const [neuerArtikel, setNeuerArtikel] = useState('')
  const [aktionForm, setAktionForm] = useState({
    geschaeft: GESCHAEFTE[0],
    text: '',
    von: '',
    bis: '',
  })

  useEffect(() => {
    localStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify(daten))
  }, [daten])

  // Erinnerung: Aktionen, die heute oder morgen beginnen und noch laufen
  const heute = datumHeute()
  const morgen = datumPlusTage(heute, 1)
  const erinnerungen = daten.aktionen.filter(
    (a) => a.von >= heute && a.von <= morgen && a.bis >= heute
  )

  function artikelHinzufuegen(e) {
    e.preventDefault()
    const text = neuerArtikel.trim()
    if (!text) return
    setDaten((d) => ({
      ...d,
      listen: {
        ...d.listen,
        [geschaeft]: [...d.listen[geschaeft], { id: neueId(), text, erledigt: false }],
      },
    }))
    setNeuerArtikel('')
  }

  function artikelUmschalten(id) {
    setDaten((d) => ({
      ...d,
      listen: {
        ...d.listen,
        [geschaeft]: d.listen[geschaeft].map((a) =>
          a.id === id ? { ...a, erledigt: !a.erledigt } : a
        ),
      },
    }))
  }

  function artikelLoeschen(id) {
    setDaten((d) => ({
      ...d,
      listen: {
        ...d.listen,
        [geschaeft]: d.listen[geschaeft].filter((a) => a.id !== id),
      },
    }))
  }

<<<<<<< HEAD
  function erledigteEntfernen() {
    setDaten((d) => ({
      ...d,
      listen: {
        ...d.listen,
        [geschaeft]: d.listen[geschaeft].filter((a) => !a.erledigt),
      },
    }))
  }

=======
>>>>>>> origin/1-einkaufsliste-pro-geschäft-umsetzten
  function aktionHinzufuegen(e) {
    e.preventDefault()
    const { text, von, bis } = aktionForm
    if (!text.trim() || !von || !bis || bis < von) return
    setDaten((d) => ({
      ...d,
      aktionen: [...d.aktionen, { id: neueId(), ...aktionForm, text: text.trim() }],
    }))
    setAktionForm({ ...aktionForm, text: '', von: '', bis: '' })
  }

  function aktionLoeschen(id) {
    setDaten((d) => ({ ...d, aktionen: d.aktionen.filter((a) => a.id !== id) }))
  }

  const aktuelleListe = daten.listen[geschaeft]
<<<<<<< HEAD
  const hatErledigte = aktuelleListe.some((a) => a.erledigt)
=======
>>>>>>> origin/1-einkaufsliste-pro-geschäft-umsetzten
  const sortierteAktionen = [...daten.aktionen].sort((a, b) => a.von.localeCompare(b.von))

  return (
    <div className="app">
      <h1>Einkaufs-App</h1>

      {erinnerungen.length > 0 && (
        <div className="erinnerung">
          <strong>Erinnerung:</strong>
          <ul>
            {erinnerungen.map((a) => (
              <li key={a.id}>
                {a.von === heute ? 'Heute' : 'Morgen'} startet bei {a.geschaeft}: {a.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <section className="karte">
        <label>
          Geschäft:
          <select value={geschaeft} onChange={(e) => setGeschaeft(e.target.value)}>
            {GESCHAEFTE.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>

        <form onSubmit={artikelHinzufuegen} className="zeile">
          <input
            value={neuerArtikel}
            onChange={(e) => setNeuerArtikel(e.target.value)}
            placeholder="Was brauchst du?"
          />
          <button type="submit">Hinzufügen</button>
        </form>

        {aktuelleListe.length === 0 && <p className="leer">Noch nichts eingetragen.</p>}
        <ul className="liste">
          {aktuelleListe.map((a) => (
            <li key={a.id}>
              <label className={a.erledigt ? 'erledigt' : ''}>
                <input
                  type="checkbox"
                  checked={a.erledigt}
                  onChange={() => artikelUmschalten(a.id)}
                />
                {a.text}
              </label>
              <button className="loeschen" onClick={() => artikelLoeschen(a.id)}>✕</button>
            </li>
          ))}
        </ul>
<<<<<<< HEAD

        <button
          className="erledigt-button"
          onClick={erledigteEntfernen}
          disabled={!hatErledigte}
        >
          Erledigte entfernen
        </button>
=======
>>>>>>> origin/1-einkaufsliste-pro-geschäft-umsetzten
      </section>

      <section className="karte">
        <h2>Aktionen speichern</h2>
        <form onSubmit={aktionHinzufuegen} className="aktion-form">
          <select
            value={aktionForm.geschaeft}
            onChange={(e) => setAktionForm({ ...aktionForm, geschaeft: e.target.value })}
          >
            {GESCHAEFTE.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <input
            value={aktionForm.text}
            onChange={(e) => setAktionForm({ ...aktionForm, text: e.target.value })}
            placeholder="Was ist im Angebot?"
          />
          <label>
            von
            <input
              type="date"
              value={aktionForm.von}
              onChange={(e) => setAktionForm({ ...aktionForm, von: e.target.value })}
            />
          </label>
          <label>
            bis
            <input
              type="date"
              value={aktionForm.bis}
              onChange={(e) => setAktionForm({ ...aktionForm, bis: e.target.value })}
            />
          </label>
          <button type="submit">Speichern</button>
        </form>

        {sortierteAktionen.length === 0 && <p className="leer">Noch keine Aktionen.</p>}
        <ul className="liste">
          {sortierteAktionen.map((a) => (
            <li key={a.id}>
              <span>
                <strong>{a.geschaeft}:</strong> {a.text}
                <br />
                <small>{a.von} bis {a.bis}</small>
              </span>
              <button className="loeschen" onClick={() => aktionLoeschen(a.id)}>✕</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App