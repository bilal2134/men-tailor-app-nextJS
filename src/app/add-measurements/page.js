"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AddMeasurements() {
  const { t } = useTranslation();
  const router = useRouter();

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
      const response = await fetch("/api/measurements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Measurement saved successfully!");
        setFormData({
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
      } else {
        alert("Failed to save measurement.");
        router.push("/view-measurements");
      }
    } catch (error) {
      console.error("Error saving measurement:", error);
      alert("An error occurred while saving the measurement.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-lg">
      <h1 className="mb-6 text-4xl font-semibold text-gray-800 text-center">
        {t("addMeasurements")}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >
        {/* Serial Number */}
        <div>
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("serialNumber")}
          </label>
          <input
            type="text"
            name="serialNumber"
            placeholder="Auto-Generated"
            value={formData.serialNumber}
            className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-600 text-lg"
            readOnly
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("date")}
          </label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full px-4 py-3 border rounded bg-gray-100 text-gray-600 text-lg"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("phoneNumber")}
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              if (value.length > 11) value = value.slice(0, 11); // Max length 11 digits
              if (value.length > 4)
                value = value.slice(0, 4) + "-" + value.slice(4); // Add dash after 4 digits
              handleChange({ target: { name: "phoneNumber", value } }); // Update state
            }}
            required
            className="w-full px-4 py-3 border rounded text-lg"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("name")}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded text-lg"
          />
        </div>

        {/* Measurement Type */}
        <div>
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("measurementType")}
          </label>
          <select
            name="measurementType"
            value={formData.measurementType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded text-lg"
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
            <label className="block mb-2 text-lg font-bold text-gray-800">
              {t(field)}
            </label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded text-lg"
            />
          </div>
        ))}

        {/* CheckBox Fields */}
        <div className="col-span-2 grid grid-cols-3 gap-4">
          {[
            "frontPocket",
            "sidePocket",
            "hip",
            "collar",
            "ben",
            "cuff",
            "plait",
          ].map((field) => (
            <label key={field} className="flex items-center gap-2 text-lg">
              <input
                type="checkbox"
                name={field}
                checked={formData[field]}
                onChange={handleChange}
                className="w-6 h-6"
              />
              {t(field)}
            </label>
          ))}
        </div>

        {/* Extra Details & Address */}
        <div className="col-span-2">
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("extraDetails")}
          </label>
          <textarea
            name="extraDetails"
            value={formData.extraDetails}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded text-lg resize-none"
            rows={4}
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("address")}
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded text-lg resize-none"
            rows={4}
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("advancePaid")}
          </label>
          <input
            type="text"
            name="advancePaid"
            value={formData.advancePaid}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded text-lg resize-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 text-lg font-bold text-gray-800">
            {t("totalBill")}
          </label>
          <input
            type="text"
            name="totalBill"
            value={formData.totalBill}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded text-lg resize-none"
          />
        </div>

        <div className="col-span-2 flex justify-between mt-8">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-5 py-3 text-white bg-gray-600 rounded-lg text-lg hover:bg-gray-700"
          >
            {t("back")}
          </button>
          <button
            type="submit"
            className="px-5 py-3 text-white bg-blue-700 rounded-lg text-lg hover:bg-blue-800"
          >
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
}
