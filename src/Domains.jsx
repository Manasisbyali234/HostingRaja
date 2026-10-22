import React, { useState } from 'react'
import * as I from './icons.jsx'
import DomainManage from './DomainManage.jsx'

const ALL_DOMAINS = []

const FILTERS = ['All', 'Active', 'Cancelled', 'Pending Cancellation']

export default function Domains({ onHome }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('renewal')
  const [managing, setManaging] = useState(null)

  if (managing) {
    return (
      <DomainManage
        domain={managing.name}
        ext={managing.ext}
        onBack={() => setManaging(null)}
        onHome={onHome}
      />
    )
  }

  const visible = ALL_DOMAINS.filter((d) => {
    const matchFilter =
      filter === 'All' ||
      (filter === 'Active' && d.status === 'Active') ||
      (filter === 'Cancelled' && d.status === 'Cancelled') ||
      (filter === 'Pending Cancellation' && d.status === 'Pending')
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  }).sort((a, b) => {
    if (sort === 'renewal') return a.renewal.split('/').reverse().join('').localeCompare(b.renewal.split('/').reverse().join(''))
    if (sort === 'name') return a.name.localeCompare(b.name)
    if (sort === 'status') return a.status.localeCompare(b.status)
    return 0
  })

  return (
    <div className="domains-page">
      <div className="domains-header">
        <h2>Domains</h2>
        <div className="domains-actions">
          <button className="btn-grad small"><I.Plus width={16} height={16} /> Register domain name</button>
          <button className="btn-dark domains-transfer"><I.Arrow width={16} height={16} /> Transfer domain name</button>
        </div>
      </div>

      <div className="domains-filters">
        {FILTERS.map((f) => (
          <button key={f} className={'df-btn ' + (filter === f ? 'on' : '')} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="domains-toolbar">
        <div className="d-search">
          <I.Globe width={16} height={16} />
          <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="d-sort">
          <I.ChevUp width={14} height={14} />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="renewal">Renewal date</option>
            <option value="name">Product name</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <div className="domains-table">
        <div className="dt-head">
          <span>Product name</span>
          <span>Renewal date</span>
          <span>Status</span>
          <span></span>
        </div>
        {visible.length === 0 && <p className="muted" style={{ padding: '24px' }}>No domains found.</p>}
        {visible.map((d, i) => (
          <div className="dt-row" key={i}>
            <div className="dt-name">
              <I.Globe width={18} height={18} />
              <div>
                <strong>{d.name}</strong>
                <small>{d.name} ({d.ext})</small>
              </div>
            </div>
            <span className="dt-date">{d.renewal}</span>
            <span className={'dt-status ' + d.status.toLowerCase()}>{d.status}</span>
            <div className="dt-btns">
              {d.status === 'Active'
                ? <button className="btn-manage" onClick={() => setManaging(d)}>Manage</button>
                : <button className="btn-setup">Setup</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
