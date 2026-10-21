import React, { useState } from 'react'
import * as I from './icons.jsx'

const DEFAULT_FORM = {
  sld: '',
  registrantName: 'Mahindra Ginimav',
  registrantOrg: 'Pro Practical Tech Solutions',
  registrantEmail: 'hublibepractical@gmail.com',
  registrantPhone: '+917829815728',
  address1: 'Hubli',
  city: 'Hubli',
  state: 'Karnataka',
  postcode: '580023',
  country: 'India',
}

export default function DomainSetup({ domain, ext, onBack, onHome }) {
  const [form, setForm] = useState({ ...DEFAULT_FORM, sld: domain.replace(/\.[^.]+$/, '') })
  const [submitted, setSubmitted] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleConfirm = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="ds-page">
      <nav className="dm-breadcrumb">
        <button onClick={onHome}>Home</button>
        <span>›</span>
        <span>...</span>
        <span>›</span>
        <button onClick={onBack}>Domains</button>
        <span>›</span>
        <span>{domain} ({ext})</span>
        <span>›</span>
        <span>Setup</span>
      </nav>

      <div className="ds-header">
        <I.Globe width={22} height={22} />
        <div>
          <div className="ds-domain-label">Domains</div>
          <h2 className="ds-domain-name">{domain} ({ext})</h2>
        </div>
      </div>

      <div className="ds-tabs">
        <button className="ds-tab on">Setup</button>
      </div>

      <div className="ds-card">
        <h3 className="ds-card-title">Setup</h3>

        <div className="ds-pending-banner">
          <div className="ds-pending-dot" />
          <div>
            <strong>Product pending</strong>
            <p>This product is pending and will be activated once payment is received.</p>
          </div>
          <button className="btn-grad small">Pay now</button>
        </div>

        <p className="ds-subtitle">Your product is almost ready.<br />Fill in the required details and click Confirm to finish the setup.</p>

        {submitted ? (
          <div className="ds-success">
            <I.Check width={24} height={24} />
            <span>Setup submitted successfully!</span>
          </div>
        ) : (
          <form className="ds-form" onSubmit={handleConfirm}>
            <div className="ds-field">
              <label>Domain (SLD) <span className="req">*</span></label>
              <input value={form.sld} onChange={set('sld')} required />
            </div>
            <div className="ds-field">
              <label>Registrant Name</label>
              <input value={form.registrantName} onChange={set('registrantName')} />
            </div>
            <div className="ds-field">
              <label>Registrant Organisation</label>
              <input value={form.registrantOrg} onChange={set('registrantOrg')} />
            </div>
            <div className="ds-field">
              <label>Registrant Email <span className="req">*</span></label>
              <input type="email" value={form.registrantEmail} onChange={set('registrantEmail')} required />
            </div>
            <div className="ds-field">
              <label>Registrant Phone <span className="req">*</span></label>
              <input value={form.registrantPhone} onChange={set('registrantPhone')} required />
            </div>
            <div className="ds-field">
              <label>Registrant Address 1 <span className="req">*</span></label>
              <input value={form.address1} onChange={set('address1')} required />
            </div>
            <div className="ds-field">
              <label>Registrant City <span className="req">*</span></label>
              <input value={form.city} onChange={set('city')} required />
            </div>
            <div className="ds-field">
              <label>Registrant State</label>
              <input value={form.state} onChange={set('state')} />
            </div>
            <div className="ds-field">
              <label>Registrant Postcode <span className="req">*</span></label>
              <input value={form.postcode} onChange={set('postcode')} required />
            </div>
            <div className="ds-field">
              <label>Registrant Country <span className="req">*</span></label>
              <select value={form.country} onChange={set('country')} required>
                <option>India</option>
                <option>United States</option>
                <option>United Kingdom</option>
              </select>
            </div>
            <button type="submit" className="btn-grad ds-confirm">Confirm Setup</button>
          </form>
        )}
      </div>
    </div>
  )
}
