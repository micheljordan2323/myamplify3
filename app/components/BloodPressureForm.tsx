import { useState } from 'react';
import { client } from '../lib/amplifyClient';
import type { Schema } from '@/amplify/data/resource';

type CreateBloodPressureInput = {
  measurementDateTime: string;
  systolicPressure: number;
  diastolicPressure: number;
};

export default function BloodPressureForm() {
  const [formData, setFormData] = useState({
    measurementDateTime: new Date().toISOString().slice(0, 16),
    systolicPressure: '',
    diastolicPressure: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const input: CreateBloodPressureInput = {
        measurementDateTime: new Date(formData.measurementDateTime).toISOString(),
        systolicPressure: parseInt(formData.systolicPressure),
        diastolicPressure: parseInt(formData.diastolicPressure)
      };
      
      await client.models.BloodPressure.create(input);
      
      setFormData({
        measurementDateTime: new Date().toISOString().slice(0, 16),
        systolicPressure: '',
        diastolicPressure: ''
      });
    } catch (error) {
      console.error('Error creating blood pressure record:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          測定日時
        </label>
        <input
          type="datetime-local"
          value={formData.measurementDateTime}
          onChange={(e) => setFormData({ ...formData, measurementDateTime: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          最高血圧 (mmHg)
        </label>
        <input
          type="number"
          min="0"
          max="200"
          value={formData.systolicPressure}
          onChange={(e) => setFormData({ ...formData, systolicPressure: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          最低血圧 (mmHg)
        </label>
        <input
          type="number"
          min="0"
          max="200"
          value={formData.diastolicPressure}
          onChange={(e) => setFormData({ ...formData, diastolicPressure: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        保存
      </button>
    </form>
  );
} 