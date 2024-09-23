import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const initialData = [
  { date: '2024-09-01', difficulty: 'Distraction' },
  { date: '2024-09-02', difficulty: 'Awake' },
  { date: '2024-09-03', difficulty: 'Drowsy' },
  { date: '2024-09-04', difficulty: 'Awake' },
  { date: '2024-09-05', difficulty: 'Distraction' },
]

const difficultyToYValue = (difficulty: string) => {
  switch (difficulty) {
    case 'Distraction':
      return 1
    case 'Awake':
      return 2
    case 'Drowsy':
      return 3
    default:
      return 0
  }
}

const keyToDifficulty = (key: string) => {
  switch (key) {
    case '1':
      return 'Distraction'
    case '2':
      return 'Awake'
    case '3':
      return 'Drowsy'
    default:
      return null
  }
}

const getCurrentFormattedDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const Graphic: React.FC = () => {
  const { email } = useParams<{ email: string }>()

  const [data, setData] = useState(initialData)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const difficulty = keyToDifficulty(event.key)
      if (difficulty) {
        const newEntry = {
          date: getCurrentFormattedDate(),
          difficulty,
        }
        setData((prevData) => [...prevData, newEntry])
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const transformedData = data.map((item) => ({
    ...item,
    difficulty: difficultyToYValue(item.difficulty),
  }))

  return (
    <div style={{ padding: '20px' }}>
      <p>Жолооч: {email}</p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={transformedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[1, 3]}
            tickFormatter={(value) => {
              switch (value) {
                case 1:
                  return 'Distraction'
                case 2:
                  return 'Awake'
                case 3:
                  return 'Drowsy'
                default:
                  return ''
              }
            }}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="difficulty" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
