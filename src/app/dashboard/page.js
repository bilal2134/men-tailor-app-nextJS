// src/app/dashboard/page.js
'use client';

import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-4xl text-center">{t('dashboard')}</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Add Measurements Card */}
        <Link href="/add-measurements">
          <div className="flex items-center p-6 bg-white rounded shadow hover:bg-gray-100 cursor-pointer">
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{t('addMeasurements')}</h2>
              <p className="text-gray-600">{t('addMeasurementsDescription')}</p>
            </div>
          </div>
        </Link>

        {/* View Measurements Card */}
        <Link href="/view-measurements">
          <div className="flex items-center p-6 bg-white rounded shadow hover:bg-gray-100 cursor-pointer">
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{t('viewMeasurements')}</h2>
              <p className="text-gray-600">{t('viewMeasurementsDescription')}</p>
            </div>
          </div>
        </Link>

        {/* View Bookings Card */}
        <Link href="/view-bookings">
          <div className="flex items-center p-6 bg-white rounded shadow hover:bg-gray-100 cursor-pointer">
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{t('viewBookings')}</h2>
              <p className="text-gray-600">{t('viewBookingsDescription')}</p>
            </div>
          </div>
        </Link>

        {/* View Bills Card */}
        <Link href="/view-bills">
          <div className="flex items-center p-6 bg-white rounded shadow hover:bg-gray-100 cursor-pointer">
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">{t('viewBills')}</h2>
              <p className="text-gray-600">{t('viewBillsDescription')}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}