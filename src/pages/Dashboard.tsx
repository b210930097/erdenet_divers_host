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
    <div className="flex flex-col gap-4 p-5 bg-blue-100">
      <div className="flex gap-4 h-[400px]">
        <div className="flex flex-col w-1/2 rounded-xl p-4 bg-white">
          <span className=" font-medium"> Жолоочийн төлөв / цагаар</span>
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
                name="Нойрмог"
              />
              <Line
                type="monotone"
                dataKey={(d) => (d.distract / d.total) * 100}
                stroke="#ff7300"
                name="Анхаарал сарнисан"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 rounded-xl p-4 bg-white flex flex-col">
          <span className="font-medium"> Жолоочдын дундаж мэдээлэл</span>
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
      <div className="flex gap-4 h-[400px]">
        <div className="flex flex-col w-1/2 rounded-xl p-4 bg-white">
          <span className="font-medium">
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
        <div className="flex flex-col w-1/2 rounded-xl p-4 bg-white">
          <span className=" font-medium">Жолоочийн ядралтын түвшин (1-10)</span>
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
