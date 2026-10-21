import React, { useState } from 'react'
import * as I from './icons.jsx'

const DETAILS = {
  'karibasaveshwaragriindia.com': {
    expiry: '2027-08-21 05:23:28',
    ns1: 'jake.ns.cloudflare.com',
    ns2: 'shubhi.ns.cloudflare.com',
    registrantName: 'Mahindra Ginimav',
    registrantOrg: 'Pro Practical Tech Solutions',
    registrantEmail: 'hublibepractical@gmail.com',
    registrantPhone: '+91.7829815728',
    registrantAddress: 'Hubli',
    registrantCity: 'Hubli',
    registrantState: 'KA',
    registrantPostcode: '580023',
    registrantCountry: 'IN',
  },
}

const DEFAULT_DETAIL = {
  expiry: '—',
  ns1: '—',
  ns2: '—',
  registrantName: '—',
  registrantOrg: '—',
  registrantEmail: '—',
  registrantPhone: '—',
  registrantAddress: '—',
  registrantCity: '—',
  registrantState: '—',
  registrantPostcode: '—',
  registrantCountry: '—',
}

const ACTIONS = [
  'Lock/Unlock',
  'Update Nameservers',
  'Update Registrant',
  'Get EPP Code (Non-UK Domains)',
  'Update IPS Tag (UK Domain Release)',
]

export default function DomainManage({ domain, ext, onBack, onHome }) {
  const d = DETAILS[domain] || DEFAULT_DETAIL
  const sld = domain.replace(/\.[^.]+$/, '')
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState([])
  const [secretText, setSecretText] = useState('')
  const [secrets, setSecrets] = useState([])
  const [addingNote, setAddingNote] = useState(false)
  const [addingSecret, setAddingSecret] = useState(false)

  return (
    <div className="dm-page">
      {/* Breadcrumb */}
      <nav className="dm-breadcrumb">
        <button onClick={onHome}>Home</button>
        <span>›</span>
        <span>...</span>
        <span>›</span>
        <button onClick={onBack}>Domains</button>
        <span>›</span>
        <span>{domain} ({ext})</span>
      </nav>

      <h2 className="dm-title">General</h2>

      {/* Domain Names card */}
      <div className="dm-card">
        <div className="dm-card-header">
          <I.Globe width={20} height={20} />
          <span>Domain Names</span>
        </div>
        <div className="dm-domain-name">{domain}</div>

        <div className="dm-section-title">Manage {ext}</div>
        <p className="muted" style={{ margin: '0 0 16px', fontSize: 14 }}>Easily control your {ext} settings.</p>

        <div className="dm-actions">
          {ACTIONS.map((a) => (
            <button key={a} className="dm-action-btn">
              <I.Arrow width={16} height={16} /> {a}
            </button>
          ))}
        </div>
      </div>

      {/* Domain name details */}
      <div className="dm-card">
        <h3 className="dm-section-title">domain name details</h3>
        <div className="dm-details-grid">
          <div className="dm-detail-row"><span>Expiry Date</span><b>{d.expiry}</b></div>
          <div className="dm-detail-row"><span>Nameserver 1</span><b>{d.ns1}</b></div>
          <div className="dm-detail-row"><span>Nameserver 2</span><b>{d.ns2}</b></div>
          <div className="dm-detail-row"><span>Registrant Name</span><b>{d.registrantName}</b></div>
          <div className="dm-detail-row"><span>Registrant Organisation</span><b>{d.registrantOrg}</b></div>
          <div className="dm-detail-row"><span>Registrant Email</span><b>{d.registrantEmail}</b></div>
          <div className="dm-detail-row"><span>Registrant Phone</span><b>{d.registrantPhone}</b></div>
          <div className="dm-detail-row"><span>Registrant Address 1</span><b>{d.registrantAddress}</b></div>
          <div className="dm-detail-row"><span>Registrant City</span><b>{d.registrantCity}</b></div>
          <div className="dm-detail-row"><span>Registrant State</span><b>{d.registrantState}</b></div>
          <div className="dm-detail-row"><span>Registrant Postcode</span><b>{d.registrantPostcode}</b></div>
          <div className="dm-detail-row"><span>Registrant Country Code</span><b>{d.registrantCountry}</b></div>
          <div className="dm-detail-row"><span>Domain (SLD)</span><b>{sld}</b></div>
        </div>
      </div>

      {/* Product notes */}
      <div className="dm-card">
        <div className="dm-card-top">
          <h3 className="dm-section-title" style={{ margin: 0 }}>Product notes</h3>
          <button className="btn-grad small" onClick={() => setAddingNote(true)}>Add note</button>
        </div>
        <p className="muted" style={{ margin: '6px 0 16px', fontSize: 13 }}>
          Notes allow you to share non-sensitive information with the HostingRaja team.
        </p>
        {addingNote && (
          <div className="dm-add-box">
            <textarea placeholder="Write your note…" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
            <div className="dm-add-actions">
              <button className="btn-grad small" onClick={() => { if (noteText.trim()) { setNotes([...notes, noteText.trim()]); setNoteText(''); setAddingNote(false) } }}>Save</button>
              <button className="dm-cancel" onClick={() => { setAddingNote(false); setNoteText('') }}>Cancel</button>
            </div>
          </div>
        )}
        {notes.length === 0 && !addingNote ? (
          <div className="dm-empty">
            <I.Layers width={28} height={28} />
            <strong>No notes available</strong>
            <span>It looks like no note was added yet.</span>
          </div>
        ) : (
          <ul className="dm-list">
            {notes.map((n, i) => <li key={i}><I.Check width={16} height={16} /> {n}</li>)}
          </ul>
        )}
      </div>

      {/* Product secrets */}
      <div className="dm-card">
        <div className="dm-card-top">
          <h3 className="dm-section-title" style={{ margin: 0 }}>Product secrets</h3>
          <button className="btn-grad small" onClick={() => setAddingSecret(true)}>Add secret</button>
        </div>
        <p className="muted" style={{ margin: '6px 0 16px', fontSize: 13 }}>
          Secrets are for sharing sensitive information, stored securely in a digital vault with AES-256 encryption to ensure your data is safe.
        </p>
        {addingSecret && (
          <div className="dm-add-box">
            <textarea placeholder="Write your secret…" value={secretText} onChange={(e) => setSecretText(e.target.value)} />
            <div className="dm-add-actions">
              <button className="btn-grad small" onClick={() => { if (secretText.trim()) { setSecrets([...secrets, secretText.trim()]); setSecretText(''); setAddingSecret(false) } }}>Save</button>
              <button className="dm-cancel" onClick={() => { setAddingSecret(false); setSecretText('') }}>Cancel</button>
            </div>
          </div>
        )}
        {secrets.length === 0 && !addingSecret ? (
          <div className="dm-empty">
            <I.Lock width={28} height={28} />
            <strong>No secrets available</strong>
            <span>It looks like no secret was added yet.</span>
          </div>
        ) : (
          <ul className="dm-list">
            {secrets.map((s, i) => <li key={i}><I.Lock width={16} height={16} /> {'•'.repeat(s.length)}</li>)}
          </ul>
        )}
      </div>
    </div>
  )
}
