// src/app/add-measurements/page.js
'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LanguageToggle from '../../components/LanguageToggle';
import UrduKeyboard from '../../components/UrduKeyboard';

export default function AddMeasurements() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    serialNumber: '',
    date: new Date(),
    name: '',
    measurementType: '',
    armLength: '',
    neckLength: '',
    generalLength: '',
    backLength: '',
    chestLength: '',
    aroundLength: '',
    pockets: '',
    shalwarLength: '',
    shalwarPanchay: '',
    frontSideLength: '',
    sideLength: '',
    hipLength: '',
    cuffLength: '',
    plateLength: '',
    otherLengthTeera: '',
    otherLengthBen: '',
    extraDetails: '',
    advancePaid: '',
    totalBill: ''
  });

  const [urduInput, setUrduInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleExtraDetailsChange = (e) => {
    setFormData({ ...formData, extraDetails: e.target.value });
    setUrduInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Calculate total bill if not provided
    // setFormData({ ...formData, totalBill: /* calculation */ });

    try {
      const response = await fetch('/api/measurements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Measurement saved successfully!');
        // Reset form
        setFormData({
          serialNumber: '',
          date: new Date(),
          name: '',
          measurementType: '',
          armLength: '',
          neckLength: '',
          generalLength: '',
          backLength: '',
          chestLength: '',
          aroundLength: '',
          pockets: '',
          shalwarLength: '',
          shalwarPanchay: '',
          frontSideLength: '',
          sideLength: '',
          hipLength: '',
          cuffLength: '',
          plateLength: '',
          otherLengthTeera: '',
          otherLengthBen: '',
          extraDetails: '',
          advancePaid: '',
          totalBill: ''
        });
        setUrduInput('');
      } else {
        alert('Failed to save measurement.');
      }
    } catch (error) {
      console.error('Error saving measurement:', error);
      alert('An error occurred while saving the measurement.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl">{t('addMeasurements')}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Serial Number */}
        <div>
          <label className="block mb-1" htmlFor="serialNumber">
            {t('serialNumber')}
          </label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            value={formData.serialNumber}
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

        {/* Name */}
        <div>
          <label className="block mb-1" htmlFor="name">
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Measurement Type */}
        <div>
          <label className="block mb-1" htmlFor="measurementType">
            {t('measurementType')}
          </label>
          <select
            id="measurementType"
            name="measurementType"
            value={formData.measurementType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">{t('selectType')}</option>
            <option value="Shalwar Kameez">Shalwar Kameez</option>
            <option value="Shirt">Shirt</option>
            <option value="Waist Coat">Waist Coat</option>
          </select>
        </div>

        {/* Arm Length */}
        <div>
          <label className="block mb-1" htmlFor="armLength">
            {t('armLength')}
          </label>
          <input
            type="number"
            id="armLength"
            name="armLength"
            value={formData.armLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Neck Length */}
        <div>
          <label className="block mb-1" htmlFor="neckLength">
            {t('neckLength')}
          </label>
          <input
            type="number"
            id="neckLength"
            name="neckLength"
            value={formData.neckLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* General Length */}
        <div>
          <label className="block mb-1" htmlFor="generalLength">
            {t('generalLength')}
          </label>
          <input
            type="number"
            id="generalLength"
            name="generalLength"
            value={formData.generalLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Back Length */}
        <div>
          <label className="block mb-1" htmlFor="backLength">
            {t('backLength')}
          </label>
          <input
            type="number"
            id="backLength"
            name="backLength"
            value={formData.backLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Chest Length */}
        <div>
          <label className="block mb-1" htmlFor="chestLength">
            {t('chestLength')}
          </label>
          <input
            type="number"
            id="chestLength"
            name="chestLength"
            value={formData.chestLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Around Length (Ghera) */}
        <div>
          <label className="block mb-1" htmlFor="aroundLength">
            {t('aroundLength')}
          </label>
          <input
            type="number"
            id="aroundLength"
            name="aroundLength"
            value={formData.aroundLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Pockets */}
        <div>
          <label className="block mb-1" htmlFor="pockets">
            {t('pockets')}
          </label>
          <input
            type="text"
            id="pockets"
            name="pockets"
            value={formData.pockets}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Shalwar Length */}
        <div>
          <label className="block mb-1" htmlFor="shalwarLength">
            {t('shalwarLength')}
          </label>
          <input
            type="number"
            id="shalwarLength"
            name="shalwarLength"
            value={formData.shalwarLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Shalwar Panchay */}
        <div>
          <label className="block mb-1" htmlFor="shalwarPanchay">
            {t('shalwarPanchay')}
          </label>
          <input
            type="number"
            id="shalwarPanchay"
            name="shalwarPanchay"
            value={formData.shalwarPanchay}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Front Side Length */}
        <div>
          <label className="block mb-1" htmlFor="frontSideLength">
            {t('frontSideLength')}
          </label>
          <input
            type="number"
            id="frontSideLength"
            name="frontSideLength"
            value={formData.frontSideLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Side Length */}
        <div>
          <label className="block mb-1" htmlFor="sideLength">
            {t('sideLength')}
          </label>
          <input
            type="number"
            id="sideLength"
            name="sideLength"
            value={formData.sideLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Hip Length */}
        <div>
          <label className="block mb-1" htmlFor="hipLength">
            {t('hipLength')}
          </label>
          <input
            type="number"
            id="hipLength"
            name="hipLength"
            value={formData.hipLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Cuff Length */}
        <div>
          <label className="block mb-1" htmlFor="cuffLength">
            {t('cuffLength')}
          </label>
          <input
            type="number"
            id="cuffLength"
            name="cuffLength"
            value={formData.cuffLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Plate Length */}
        <div>
          <label className="block mb-1" htmlFor="plateLength">
            {t('plateLength')}
          </label>
          <input
            type="number"
            id="plateLength"
            name="plateLength"
            value={formData.plateLength}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Other Length (Teera) */}
        <div>
          <label className="block mb-1" htmlFor="otherLengthTeera">
            {t('otherLengthTeera')}
          </label>
          <input
            type="number"
            id="otherLengthTeera"
            name="otherLengthTeera"
            value={formData.otherLengthTeera}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Second Other Length (Ben) */}
        <div>
          <label className="block mb-1" htmlFor="otherLengthBen">
            {t('otherLengthBen')}
          </label>
          <input
            type="number"
            id="otherLengthBen"
            name="otherLengthBen"
            value={formData.otherLengthBen}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Extra Details with Urdu Keyboard */}
        <div>
          <label className="block mb-1" htmlFor="extraDetails">
            {t('extraDetails')}
          </label>
          <textarea
            id="extraDetails"
            name="extraDetails"
            value={formData.extraDetails}
            onChange={handleExtraDetailsChange}
            required
            className="w-full px-3 py-2 border rounded"
            rows="4"
          ></textarea>
          <UrduKeyboard
            value={urduInput}
            onChange={handleExtraDetailsChange}
            label={t('urduKeyboard')}
          />
        </div>

        {/* Advance Paid */}
        <div>
          <label className="block mb-1" htmlFor="advancePaid">
            {t('advancePaid')}
          </label>
          <input
            type="number"
            id="advancePaid"
            name="advancePaid"
            value={formData.advancePaid}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Total Bill */}
        <div>
          <label className="block mb-1" htmlFor="totalBill">
            {t('totalBill')}
          </label>
          <input
            type="number"
            id="totalBill"
            name="totalBill"
            value={formData.totalBill}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {t('save')}
          </button>
        </div>
      </form>
    </div>
  );
}