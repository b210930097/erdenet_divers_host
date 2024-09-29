import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import {
  driverStateData,
  fatigueData,
  sleepData,
  totalDriversData,
} from '../constants/mockdata'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

export const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#ebf8ff',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', height: '400px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            borderRadius: '16px',
            padding: '16px',
            backgroundColor: '#fff',
          }}
        >
          <span style={{ fontWeight: '500' }}> Жолоочийн төлөв / цагаар</span>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={driverStateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Line
                type="monotone"
                dataKey={(d) => (d.awake / d.total) * 100}
                stroke="#8884d8"
                name="Сэрүүн"
              />
              <Line
                type="monotone"
                dataKey={(d) => (d.drowsy / d.total) * 100}
                stroke="#33d6ff"
                name="Зүүрмэглэсэн"
              />
              <Line
                type="monotone"
                dataKey={(d) => (d.distract / d.total) * 100}
                stroke="#ff7300"
                name="Сатаарсан"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            width: '50%',
            borderRadius: '16px',
            padding: '16px',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span style={{ fontWeight: '500' }}> Жолоочдын дундаж мэдээлэл</span>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={totalDriversData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {totalDriversData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', height: '400px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            borderRadius: '16px',
            padding: '16px',
            backgroundColor: '#fff',
          }}
        >
          <span style={{ fontWeight: '500' }}>
            Сүүлийн 48 цагт жолоочийн унтсан цаг
          </span>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="driver" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="hoursSlept"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            borderRadius: '16px',
            padding: '16px',
            backgroundColor: '#fff',
          }}
        >
          <span style={{ fontWeight: '500' }}>
            Жолоочийн ядралтын түвшин (1-10)
          </span>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fatigueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fatigue" fill="#8e66fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
