import React from 'react'
import * as I from './icons.jsx'

const ORDER_DETAILS = {
  'HR2025-26-137533': {
    items: [
      {
        name: '.com',
        desc: 'Domain Names - .com',
        price: '₹1,050.00',
        qty: 1,
        total: '₹1,050.00',
        discount: { label: '.com Domain Registration', code: 'HRDOMINREG', amount: '-₹99.96' },
        discountedTotal: '₹950.04',
      },
    ],
    promotions: [
      { label: '.com, .net, .org, .ai promo', code: 'HRDOMINREG', amount: '-' },
    ],
    subtotal: '₹950.04',
    tax: '₹171.01',
    total: '₹1,121.05',
  },
}

const DEFAULT_DETAIL = (order) => ({
  items: [
    { name: order.product, desc: `Domain Names - ${order.product}`, price: '—', qty: 1, total: '—', discount: null, discountedTotal: '—' },
  ],
  promotions: [],
  subtotal: '—',
  tax: '—',
  total: '—',
})

export default function OrderDetail({ order, onBack, onHome }) {
  const detail = ORDER_DETAILS[order.id] || DEFAULT_DETAIL(order)

  return (
    <div className="od-page">
      <nav className="dm-breadcrumb">
        <button onClick={onHome}>Home</button>
        <span>›</span>
        <span>Billing</span>
        <span>›</span>
        <button onClick={onBack}>My Orders</button>
        <span>›</span>
        <span>{order.id}</span>
      </nav>

      <div className="od-card">
        <h3 className="od-title">Subscription breakdown</h3>

        <div className="od-table">
          <div className="od-head">
            <span>Items</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Total</span>
          </div>

          {detail.items.map((item, i) => (
            <div key={i}>
              <div className="od-row">
                <div className="od-item-name">
                  <strong>{item.name}</strong>
                  <small>{item.desc}</small>
                </div>
                <span>{item.price}</span>
                <span>{item.qty}</span>
                <span>{item.total}</span>
              </div>
              {item.discount && (
                <div className="od-row od-discount-row">
                  <div className="od-item-name">
                    <span>{item.discountedTotal}</span>
                    <small className="od-discount-label">
                      {item.discount.label}<br />
                      Code: {item.discount.code}
                      <span className="od-discount-amount"> {item.discount.amount}</span>
                    </small>
                  </div>
                  <span></span>
                  <span></span>
                  <span>{item.discountedTotal}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {detail.promotions.length > 0 && (
          <div className="od-promotions">
            <div className="od-promo-title">Promotions</div>
            {detail.promotions.map((p, i) => (
              <div key={i} className="od-promo-row">
                <div>
                  <span>{p.label}</span>
                  <small>{p.code}</small>
                </div>
                <span>{p.amount}</span>
              </div>
            ))}
          </div>
        )}

        <div className="od-totals">
          <div className="od-total-row"><span>Subtotal:</span><b>{detail.subtotal}</b></div>
          <div className="od-total-row"><span>Tax and Fees:</span><b>{detail.tax}</b></div>
          <div className="od-total-row od-total-final"><span>Total:</span><b>{detail.total}</b></div>
        </div>
      </div>

      <div className="od-card od-overview">
        <div className="od-overview-left">
          <span className="od-order-label">Order #{order.id}</span>
          <button className="btn-manage od-invoice-btn"><I.Arrow width={14} height={14} /> View invoice</button>
        </div>
        <div className="od-tabs">
          <button className="ds-tab on">Overview</button>
        </div>
      </div>
    </div>
  )
}
