// src/app/view-bills/[filename]/page.js
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function BillDetail() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [bill, setBill] = useState(null);
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
        setBill(data);
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

  if (loading) {
    return <p className="p-8">{t('loading')}...</p>;
  }

  if (!bill) {
    return <p className="p-8">{t('noBills')}</p>;
  }

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl">{t('viewBillsTitle')}</h1>
      <div className="mb-6">
        <Link href="/view-bills">
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            {t('backToList')}
          </button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Bill Number */}
          <div>
            <strong>{t('billNumber')}:</strong> {bill.billNumber}
          </div>

          {/* Date */}
          <div>
            <strong>{t('date')}:</strong> {formatDate(bill.date)}
          </div>

          {/* Customer Name */}
          <div>
            <strong>{t('customerName')}:</strong> {bill.customerName}
          </div>

          {/* Amount */}
          <div>
            <strong>{t('amount')}:</strong> {bill.amount} PKR
          </div>

          {/* Status */}
          <div>
            <strong>{t('status')}:</strong> {bill.status}
          </div>

          {/* Additional Fields if any */}
          {/* Example: Payment Method */}
          {bill.paymentMethod && (
            <div>
              <strong>Payment Method:</strong> {bill.paymentMethod}
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link href={`/edit-bills/${`bill_${bill.billNumber || 'unknown'}.json`}`}>
            <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
              {t('edit')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}