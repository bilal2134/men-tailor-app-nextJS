// src/app/view-measurements/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function ViewMeasurements() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      fetchMeasurements();
    }
  }, [isAuthenticated, router]);

  const fetchMeasurements = async () => {
    try {
      const response = await fetch('/api/measurements');
      if (response.ok) {
        const data = await response.json();
        setMeasurements(data);
      } else {
        console.error('Failed to fetch measurements');
      }
    } catch (error) {
      console.error('Error fetching measurements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!confirm(t('confirmDelete'))) return;

    try {
      const response = await fetch(`/api/measurements/${filename}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(t('delete') + ' ' + t('measurement') + ' ' + t('successfully'));
        fetchMeasurements();
      } else {
        const errorData = await response.json();
        alert(errorData.message || t('failedToDelete'));
      }
    } catch (error) {
      console.error('Error deleting measurement:', error);
      alert(t('failedToDelete'));
    }
  };

  if (loading) {
    return <p className="p-8">{t('loading')}...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl">{t('viewMeasurementsTitle')}</h1>
      {measurements.length === 0 ? (
        <p>{t('noMeasurements')}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">{t('serialNumber')}</th>
              <th className="px-4 py-2 border">{t('date')}</th>
              <th className="px-4 py-2 border">{t('name')}</th>
              <th className="px-4 py-2 border">{t('measurementType')}</th>
              <th className="px-4 py-2 border">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {measurements.map((measurement, index) => {
              const filename = `measurement_${measurement.serialNumber || index}.json`;
              return (
                <tr key={index}>
                  <td className="px-4 py-2 border">{measurement.serialNumber}</td>
                  <td className="px-4 py-2 border">
                    {new Date(measurement.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-2 border">{measurement.name}</td>
                  <td className="px-4 py-2 border">{measurement.measurementType}</td>
                  <td className="px-4 py-2 border">
                    <Link href={`/view-measurements/${filename}`}>
                      <button className="px-2 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        {t('view')}
                      </button>
                    </Link>
                    <Link href={`/edit-measurements/${filename}`}>
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