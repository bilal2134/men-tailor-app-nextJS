// src/app/view-bills/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function ViewBills() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchBills();
    }
  }, [isAuthenticated, router]);

  const fetchBills = async () => {
    try {
      const response = await fetch('/api/bills');
      if (response.ok) {
        const data = await response.json();
        setBills(data);
      } else {
        console.error('Failed to fetch bills');
      }
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!confirm(t('confirmDelete'))) return;

    try {
      const response = await fetch(`/api/bills/${filename}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(t('delete') + ' ' + t('bill') + ' ' + t('successfully'));
        fetchBills();
      } else {
        const errorData = await response.json();
        alert(errorData.message || t('failedToDelete'));
      }
    } catch (error) {
      console.error('Error deleting bill:', error);
      alert(t('failedToDelete'));
    }
  };

  if (loading) {
    return <p className="p-8">{t('loading')}...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl">{t('View Bills')}</h1>
      {bills.length === 0 ? (
        <p>{t('No bills to show.')}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">{t('billNumber')}</th>
              <th className="px-4 py-2 border">{t('date')}</th>
              <th className="px-4 py-2 border">{t('customerName')}</th>
              <th className="px-4 py-2 border">{t('amount')}</th>
              <th className="px-4 py-2 border">{t('status')}</th>
              <th className="px-4 py-2 border">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => {
              const filename = `bill_${bill.billNumber || index}.json`;
              return (
                <tr key={index}>
                  <td className="px-4 py-2 border">{bill.billNumber}</td>
                  <td className="px-4 py-2 border">
                    {new Date(bill.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-2 border">{bill.customerName}</td>
                  <td className="px-4 py-2 border">{bill.amount} PKR</td>
                  <td className="px-4 py-2 border">{bill.status}</td>
                  <td className="px-4 py-2 border">
                    <Link href={`/view-bills/${filename}`}>
                      <button className="px-2 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        {t('view')}
                      </button>
                    </Link>
                    <Link href={`/edit-bills/${filename}`}>
                      <button className="px-2 py-1 mr-2 text-white bg-green-500 rounded hover:bg-green-600">
                        {t('edit')}
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(filename)}
                      className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      {t('delete')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}