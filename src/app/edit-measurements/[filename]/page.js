"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditMeasurement() {
  const { t } = useTranslation();
  const router = useRouter();
  const { filename } = useParams(); // Get the filename from the URL
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    serialNumber: "",
    phoneNumber: "",
    date: new Date(),
    name: "",
    measurementType: "",
    bazoo: "",
    teera: "",
    gala: "",
    lambai: "",
    chaati: "",
    kamar: "",
    ghera: "",
    pockets: "",
    shalwar: "",
    paincha: "",
    frontPocket: false,
    sidePocket: false,
    hip: false,
    collar: false,
    ben: false,
    cuff: false,
    plait: false,
    extraDetails: "",
    address: "",
    advancePaid: "",
    totalBill: "",
  });

  // Fetch existing measurement data
  useEffect(() => {
    async function fetchMeasurement() {
      try {
        const response = await fetch(`/api/measurements/${filename}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({ ...data, date: new Date(data.date) });
        } else {
          alert("Failed to fetch measurement data.");
        }
      } catch (error) {
        console.error("Error fetching measurement:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMeasurement();
  }, [filename]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/measurements/${filename}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Measurement updated successfully!");
        router.push("/view-measurements");
      } else {
        alert("Failed to update measurement.");
      }
    } catch (error) {
      console.error("Error updating measurement:", error);
      alert("An error occurred while updating the measurement.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h1 className="mb-6 text-3xl font-semibold text-gray-700 text-center">
        {t("editMeasurement")}
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Serial Number */}
        <div>
          <label className="block mb-1 font-bold">{t("serialNumber")}</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            readOnly
            className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-500"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-bold">{t("date")}</label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full px-3 py-2 border rounded bg-gray-100 text-gray-500"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-bold">{t("phoneNumber")}</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");
              if (value.length > 11) value = value.slice(0, 11);
              if (value.length > 4) value = value.slice(0, 4) + "-" + value.slice(4);
              handleChange({ target: { name: "phoneNumber", value } });
            }}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-bold">{t("name")}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Measurement Type */}
        <div>
          <label className="block mb-1 font-bold">{t("measurementType")}</label>
          <select
            name="measurementType"
            value={formData.measurementType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">{t("selectType")}</option>
            <option value="Shalwar Kameez">Shalwar Kameez</option>
            <option value="Shirt">Shirt</option>
            <option value="Waist Coat">Waist Coat</option>
          </select>
        </div>

        {/* Measurement Inputs */}
        {[
          "bazoo",
          "teera",
          "gala",
          "lambai",
          "chaati",
          "kamar",
          "ghera",
          "pockets",
          "shalwar",
          "paincha",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-bold">{t(field)}</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}

        {/* CheckBox Fields */}
        <div className="col-span-2 grid grid-cols-3 gap-4">
          {["frontPocket", "sidePocket", "hip", "collar", "ben", "cuff", "plait"].map((field) => (
            <label key={field} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
                className="w-5 h-5"
              />
              {t(field)}
            </label>
          ))}
        </div>

        {/* Extra Details & Address */}
        <div className="col-span-2">
          <label className="block mb-1 font-bold">{t("extraDetails")}</label>
          <textarea
            name="extraDetails"
            value={formData.extraDetails}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded resize-none"
            rows={4}
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-bold">{t("address")}</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded resize-none"
            rows={4}
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-bold">{t("advancePaid")}</label>
          <input
            type="text"
            name="advancePaid"
            value={formData.advancePaid}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-1 font-bold">{t("totalBill")}</label>
          <input
            type="text"
            name="totalBill"
            value={formData.totalBill}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 text-white bg-gray-500 rounded"
          >
            {t("back")}
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded"
          >
            {t("Update")}
          </button>
        </div>
      </form>
    </div>
  );
}
