"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export default function ViewMeasurements() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const [measurements, setMeasurements] = useState([]);
  const [filteredMeasurements, setFilteredMeasurements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [tooltipIndex, setTooltipIndex] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      fetchMeasurements();
    }
  }, [isAuthenticated, router]);

  const fetchMeasurements = async () => {
    try {
      const response = await fetch("/api/measurements");
      if (response.ok) {
        const data = await response.json();
        setMeasurements(data);
        setFilteredMeasurements(data);
      } else {
        console.error("Failed to fetch measurements");
      }
    } catch (error) {
      console.error("Error fetching measurements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!confirm(t("confirmDelete"))) return;

    try {
      const response = await fetch(`/api/measurements/${filename}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert(t("delete") + " " + t("measurement") + " " + t("successfully"));
        fetchMeasurements();
      } else {
        const errorData = await response.json();
        alert(errorData.message || t("failedToDelete"));
      }
    } catch (error) {
      console.error("Error deleting measurement:", error);
      alert(t("failedToDelete"));
    }
  };

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length >= 3) {
      const filtered = measurements.filter(
        
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.phoneNumber.toString().includes(query.toLowerCase()) ||
          m.address.toLowerCase().includes(query.toLowerCase()) ||
          m.measurementType.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMeasurements(filtered);
    } else {
      setFilteredMeasurements(measurements);
    }
  };

  if (loading) {
    return <p className="p-8">{t("loading")}...</p>;
  }
  

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">{t("viewMeasurementsTitle")}</h1>
        <input
          type="text"
          placeholder={t("Search")}
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredMeasurements.length === 0 ? (
        <p>{t("noMeasurements")}</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">{t("serialNumber")}</th>
              <th className="px-4 py-2 border">{t("date")}</th>
              <th className="px-4 py-2 border">{t("name")}</th>
              <th className="px-4 py-2 border">{t("phoneNumber")}</th>
              <th className="px-4 py-2 border">{t("address")}</th>
              <th className="px-4 py-2 border">{t("measurementType")}</th>
              <th className="px-4 py-2 border">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeasurements.map((measurement, index) => {
              const filename = `measurement_${
                measurement.serialNumber || index
              }.json`;
              return (
                <tr key={index}>
                  <td className="px-4 py-2 border">
                    {measurement.serialNumber}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(measurement.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2 border">{measurement.name}</td>
                  <td className="px-4 py-2 border">
                    {measurement.phoneNumber}
                  </td>
                  <td className="px-4 py-2 border" title={measurement.address}>
                    {measurement.address.length > 15
                      ? measurement.address.substring(0, 15) + "..."
                      : measurement.address}
                  </td>
                  <td className="px-4 py-2 border">
                    {measurement.measurementType}
                  </td>
                  <td className="px-4 py-2 border flex justify-center items-center">
                    <Link href={`/view-measurements/${filename}`}>
                      <button className="px-4 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600">
                        {t("view")}
                      </button>
                    </Link>
                    <Link href={`/edit-measurements/${filename}`}>
                      <button className="px-4 py-1 mr-2 text-white bg-green-500 rounded hover:bg-green-600">
                        {t("edit")}
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(filename)}
                      className="px-5 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      {t("delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Back Button */}
      <div className="flex justify-start mt-6">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 text-white bg-gray-500 rounded"
        >
          {t("back")}
        </button>
      </div>
    </div>
  );
}
