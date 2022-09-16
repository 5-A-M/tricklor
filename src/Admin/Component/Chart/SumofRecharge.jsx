import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tổng tiền mà các thành viên đã nạp trogn 7 ngày qua',
      color: "#fff",
      fontSize: 20
    },
  },
  
  scales: {
    y: {
      beginAtZero: true,
      borderColor: "#fff",
      color: "#fff",
      grid: {
        color: "#fff"
      },
      ticks: {
          color: "#fff",
      }
    },
    x: {
        borderColor: "#fff",
        color: "#fff",
        grid: {
        color: "#fff"
        },
        ticks: {
            color: "#fff",
        },
    }
  },
  
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Số tiền',
      data: [1, 2, 3, 4 ,5],
      borderColor: '#fff',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      color: "#fff"
    },
  ],
};

export default function SumofRecharge() {
  return <Line options={options} data={data} />;
}
