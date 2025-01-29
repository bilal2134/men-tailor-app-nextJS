// src/app/view-measurements/[filename]/page.js
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function MeasurementDetail() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [measurement, setMeasurement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      const filename = pathname.split('/').pop();
      fetchMeasurement(filename);
    }
  }, [isAuthenticated, router, pathname]);

  const fetchMeasurement = async (filename) => {
    try {
      const response = await fetch(`/api/measurements/${filename}`);
      if (response.ok) {
        const data = await response.json();
        setMeasurement(data);
      } else {
        alert(t('measurementNotFound'));
        router.push('/view-measurements');
      }
    } catch (error) {
      console.error('Error fetching measurement:', error);
      alert(t('failedToFetch'));
      router.push('/view-measurements');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-8">{t('loading')}...</p>;
  }

  if (!measurement) {
    return <p className="p-8">{t('noMeasurements')}</p>;
  }

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl">{t('viewMeasurementsTitle')}</h1>
      <div className="mb-6">
        <Link href="/view-measurements">
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            {t('backToList')}
          </button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Serial Number */}
          <div>
            <strong>{t('serialNumber')}:</strong> {measurement.serialNumber}
          </div>

          {/* Date */}
          <div>
            <strong>{t('date')}:</strong> {formatDate(measurement.date)}
          </div>

          {/* Name */}
          <div>
            <strong>{t('name')}:</strong> {measurement.name}
          </div>

          {/* Measurement Type */}
          <div>
            <strong>{t('measurementType')}:</strong> {measurement.measurementType}
          </div>

          {/* Arm Length */}
          <div>
            <strong>{t('armLength')}:</strong> {measurement.armLength} cm
          </div>

          {/* Neck Length */}
          <div>
            <strong>{t('neckLength')}:</strong> {measurement.neckLength} cm
          </div>

          {/* General Length */}
          <div>
            <strong>{t('generalLength')}:</strong> {measurement.generalLength} cm
          </div>

          {/* Back Length */}
          <div>
            <strong>{t('backLength')}:</strong> {measurement.backLength} cm
          </div>

          {/* Chest Length */}
          <div>
            <strong>{t('chestLength')}:</strong> {measurement.chestLength} cm
          </div>

          {/* Around Length (Ghera) */}
          <div>
            <strong>{t('aroundLength')}:</strong> {measurement.aroundLength} cm
          </div>

          {/* Pockets */}
          <div>
            <strong>{t('pockets')}:</strong> {measurement.pockets}
          </div>

          {/* Shalwar Length */}
          <div>
            <strong>{t('shalwarLength')}:</strong> {measurement.shalwarLength} cm
          </div>

          {/* Shalwar Panchay */}
          <div>
            <strong>{t('shalwarPanchay')}:</strong> {measurement.shalwarPanchay}
          </div>

          {/* Front Side Length */}
          <div>
            <strong>{t('frontSideLength')}:</strong> {measurement.frontSideLength} cm
          </div>

          {/* Side Length */}
          <div>
            <strong>{t('sideLength')}:</strong> {measurement.sideLength} cm
          </div>

          {/* Hip Length */}
          <div>
            <strong>{t('hipLength')}:</strong> {measurement.hipLength} cm
          </div>

          {/* Cuff Length */}
          <div>
            <strong>{t('cuffLength')}:</strong> {measurement.cuffLength} cm
          </div>

          {/* Plate Length */}
          <div>
            <strong>{t('plateLength')}:</strong> {measurement.plateLength} cm
          </div>

          {/* Other Length (Teera) */}
          <div>
            <strong>{t('otherLengthTeera')}:</strong> {measurement.otherLengthTeera} cm
          </div>

          {/* Second Other Length (Ben) */}
          <div>
            <strong>{t('otherLengthBen')}:</strong> {measurement.otherLengthBen} cm
          </div>

          {/* Extra Details */}
          <div className="col-span-2">
            <strong>{t('extraDetails')}:</strong> {measurement.extraDetails}
          </div>

          {/* Advance Paid */}
          <div>
            <strong>{t('advancePaid')}:</strong> {measurement.advancePaid} PKR
          </div>

          {/* Total Bill */}
          <div>
            <strong>{t('totalBill')}:</strong> {measurement.totalBill} PKR
          </div>
        </div>

        <div className="mt-6">
          <Link href={`/edit-measurements/${`measurement_${measurement.serialNumber || 'unknown'}.json`}`}>
            <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
              {t('editMeasurement')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}