import React, { useState } from 'react'
import * as I from './icons.jsx'
import OrderDetail from './OrderDetail.jsx'

const ORDERS = []

const STATUSES = ['All', 'Paid', 'Cancelled']

export default function MyOrders({ onHome }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sort, setSort] = useState('date')
  const [viewing, setViewing] = useState(null)

  if (viewing) {
    return <OrderDetail order={viewing} onBack={() => setViewing(null)} onHome={onHome} />
  }

  const visible = ORDERS.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.product.includes(search)
    const matchStatus = statusFilter === 'All' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>My Orders</h2>
        <button className="btn-grad small"><I.Plus width={16} height={16} /> Place new order</button>
      </div>

      <div className="orders-toolbar">
        <div className="d-search">
          <I.Globe width={16} height={16} />
          <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="orders-filters">
          {STATUSES.map((s) => (
            <button key={s} className={'df-btn ' + (statusFilter === s ? 'on' : '')} onClick={() => setStatusFilter(s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="d-sort">
          <I.ChevUp width={14} height={14} />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="date">Date created</option>
            <option value="id">Order #</option>
            <option value="amount">Total Amount</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <div className="orders-table">
        <div className="ot-head">
          <span>Order #</span>
          <span>Product</span>
          <span>Date Created</span>
          <span>Status</span>
          <span></span>
        </div>
        {visible.length === 0 && <p className="muted" style={{ padding: '24px' }}>No orders found.</p>}
        {visible.map((o) => (
          <div className="ot-row" key={o.id}>
            <span className="ot-id">{o.id}</span>
            <span className="ot-product">{o.product}</span>
            <span className="ot-date">{o.date}</span>
            <span className={'ot-status ' + o.status.toLowerCase()}>{o.status}</span>
            <div className="ot-actions">
              <button className="btn-manage" onClick={() => setViewing(o)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
