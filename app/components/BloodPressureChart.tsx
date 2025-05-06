import { useEffect, useState } from 'react';
import { client } from '../lib/amplifyClient';
import type { Schema } from '@/amplify/data/resource';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type BloodPressureRecord = {
  measurementDateTime: string | null;
  systolicPressure: number | null;
  diastolicPressure: number | null;
  id: string;
};

export default function BloodPressureChart() {
  const [bloodPressureData, setBloodPressureData] = useState<BloodPressureRecord[]>([]);

  useEffect(() => {
    fetchBloodPressureData();
  }, []);

  const fetchBloodPressureData = async () => {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const { data } = await client.models.BloodPressure.list({
        filter: {
          measurementDateTime: {
            ge: oneWeekAgo.toISOString()
          }
        }
      });

      const sortedData = data.sort(
        (a, b) => {
          const dateA = a.measurementDateTime ? new Date(a.measurementDateTime).getTime() : 0;
          const dateB = b.measurementDateTime ? new Date(b.measurementDateTime).getTime() : 0;
          return dateA - dateB;
        }
      );
      
      setBloodPressureData(sortedData);
    } catch (error) {
      console.error('Error fetching blood pressure data:', error);
    }
  };

  const chartData = {
    labels: bloodPressureData.map((data) => 
      data.measurementDateTime ? new Date(data.measurementDateTime).toLocaleString('ja-JP') : '未設定'
    ),
    datasets: [
      {
        label: '最高血圧',
        data: bloodPressureData.map((data) => data.systolicPressure),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '最低血圧',
        data: bloodPressureData.map((data) => data.diastolicPressure),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '過去1週間の血圧推移',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 200,
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line options={options} data={chartData} />
    </div>
  );
} 