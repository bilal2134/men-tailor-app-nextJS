// src/app/edit-bills/[filename]/page.js
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EditBill() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    billNumber: '',
    date: new Date(),
    customerName: '',
    amount: '',
    status: 'unpaid', // default status
    paymentMethod: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const filename = pathname.split('/').pop();
      fetchBill(filename);
    }
  }, [isAuthenticated, router, pathname]);

  const fetchBill = async (filename) => {
    try {
      const response = await fetch(`/api/bills/${filename}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          ...data,
          date: new Date(data.date),
        });
      } else {
        alert(t('billNotFound'));
        router.push('/view-bills');
      }
    } catch (error) {
      console.error('Error fetching bill:', error);
      alert(t('failedToFetchBill'));
      router.push('/view-bills');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const filename = pathname.split('/').pop();
      const response = await fetch(`/api/bills/${filename}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(t('billUpdated'));
        router.push('/view-bills');
      } else {
        const errorData = await response.json();
        alert(errorData.message || t('updateFailed'));
      }
    } catch (error) {
      console.error('Error updating bill:', error);
      alert(t('updateFailed'));
    }
  };

  if (loading) {
    return <p className="p-8">{t('loading')}...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl">{t('editBill')}</h1>
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