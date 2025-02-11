// src/app/view-measurements/[filename]/page.js
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function MeasurementDetail() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const [measurement, setMeasurement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      const filename = pathname.split("/").pop();
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
        alert(t("measurementNotFound"));
        router.push("/view-measurements");
      }
    } catch (error) {
      console.error("Error fetching measurement:", error);
      alert(t("failedToFetch"));
      router.push("/view-measurements");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="p-8 text-center text-lg font-semibold">{t("loading")}...</p>
    );
  }

  if (!measurement) {
    return (
      <p className="p-8 text-center text-lg font-semibold">
        {t("noMeasurements")}
      </p>
    );
  }

  // Helper function to format values with a dash if null/undefined
  const formatValue = (value, prefix = "") => {
    if (!value || !value.trim()) return "-";
    return prefix === "Rs. " ? `${prefix}${value}` : `${value}${prefix}`;
  };
  

  return (
    <div dir="rtl" className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        {t("viewMeasurementsTitle")}
      </h1>

      {/* Back Button */}
      <div className="mb-6 text-end">
        <Link href="/view-measurements">
          <button className="px-5 py-2 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700">
            {t("backToList")}
          </button>
        </Link>
      </div>

      {/* Measurement Details Card */}
      <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          {/* General Information */}
          {[
            { key: "serialNumber", value: measurement.serialNumber },
            { key: "phoneNumber", value: measurement.phoneNumber },
            { key: "date", value: measurement.date },
            { key: "name", value: measurement.name },
            { key: "measurementType", value: measurement.measurementType },
          ].map(({ key, value }) => (
            <div key={key} className="flex justify-between">
              <strong className="text-right w-1/2">{t(key)}: </strong>
              <span className="w-1/2 text-left">
                {key === "date" ? formatValue(new Date(value).toLocaleDateString("en-GB")) : formatValue(value)}
              </span>
            </div>
          ))}

          {/* Measurements */}
          {[
            { key: "bazoo", value: measurement.bazoo },
            { key: "teera", value: measurement.teera },
            { key: "gala", value: measurement.gala },
            { key: "lambai", value: measurement.lambai },
            { key: "chaati", value: measurement.chaati },
            { key: "kamar", value: measurement.kamar },
            { key: "ghera", value: measurement.ghera },
            { key: "shalwar", value: measurement.shalwar },
            { key: "paincha", value: measurement.paincha },
          ].map(({ key, value }) => (
            <div key={key} className="flex justify-between">
              <strong className="text-right w-1/2">{t(key)}: </strong>
              <span className="w-1/2 text-left">{formatValue(value, ` ${t("inches")}`)}</span>
            </div>
          ))}

          {/* Boolean Fields as Checkboxes */}
          {[
            //{ key: "pockets", value: measurement.pockets },
            { key: "frontPocket", value: measurement.frontPocket },
            { key: "sidePocket", value: measurement.sidePocket },
            { key: "hip", value: measurement.hip },
            { key: "collar", value: measurement.collar },
            { key: "ben", value: measurement.ben },
            { key: "cuff", value: measurement.cuff },
            { key: "plait", value: measurement.plait },
          ].map(({ key, value }) => (
            <div key={key} className="flex justify-between items-center">
              <strong className="text-right w-1/2">{t(key)}: </strong>
              <input
                type="checkbox"
                checked={value ?? false}
                readOnly
                className="w-5 h-5 accent-blue-600"
              />
            </div>
          ))}

          {/* Extra Details */}
          <div className="col-span-2">
            <strong>{t("extraDetails")}: </strong> {formatValue(measurement.extraDetails)}
          </div>

          {/* Address */}
          <div className="col-span-2">
            <strong>{t("address")}: </strong> {formatValue(measurement.address)}
          </div>

          {/* Payment Information */}
          {[
            { key: "advancePaid", value: measurement.advancePaid, prefix: "Rs. " },
            { key: "totalBill", value: measurement.totalBill, prefix: "Rs. " },
          ].map(({ key, value, prefix }) => (
            <div key={key} className="flex justify-between">
              <strong className="text-right w-1/2">{t(key)}: </strong>
              <span className="w-1/2 text-left">{formatValue(value, prefix)}</span>
            </div>
          ))}
        </div>

        {/* Edit Button */}
        <div className="mt-6 text-center">
          <Link href={`/edit-measurements/measurement_${
            measurement.serialNumber || "unknown"
          }.json`}>
            <button className="px-5 py-2 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700">
              {t("editMeasurement")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
