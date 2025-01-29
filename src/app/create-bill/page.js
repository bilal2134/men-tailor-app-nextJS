// src/app/create-bill/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateBill() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    billNumber: '',
    date: new Date(),
    customerName: '',
    amount: '',
    status: 'unpaid', // default status
    paymentMethod: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(t('createBill') + ' ' + t('successfully'));
        router.push('/view-bills');
      } else {
        const errorData = await response.json();
        alert(errorData.message || t('failedToCreateBill'));
      }
    } catch (error) {
      console.error('Error creating bill:', error);
      alert(t('failedToCreateBill'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-8">{t('loading')}...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl">{t('createBill')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bill Number */}
        <div>
          <label className="block mb-1" htmlFor="billNumber">
            {t('billNumber')}
          </label>
          <input
            type="text"
            id="billNumber"
            name="billNumber"
            value={formData.billNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., BIL-001"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1" htmlFor="date">
            {t('date')}
          </label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Customer Name */}
        <div>
          <label className="block mb-1" htmlFor="customerName">
            {t('customerName')}
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., John Doe"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1" htmlFor="amount">
            {t('amount')}
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            min="0"
            placeholder="e.g., 5000"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1" htmlFor="status">
            {t('status')}
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="paid">{t('paid')}</option>
            <option value="unpaid">{t('unpaid')}</option>
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block mb-1" htmlFor="paymentMethod">
            Payment Method
          </label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g., Cash, Credit Card"
          />
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            {t('save')}
          </button>
        </div>
      </form>
    </div>
  );
}