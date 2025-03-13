"use client"

import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

interface PieChartDataItem {
  name: string;
  value: number;
  color: string;
  shortValue?: string;
}

export function PieChart({ data }: { data: PieChartDataItem[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPie data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }: { name: string; percent: number }) => 
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => `${value.toLocaleString()} tons`} 
          labelFormatter={(index: number) => data[index].name} 
        />
      </RechartsPie>
    </ResponsiveContainer>
  )
}

export function ValuePieChart() {
  const data: PieChartDataItem[] = [
    { name: "Neodymium oxide", value: 972673143, color: "#a855f7", shortValue: "$972.7M" },
    { name: "Praseodymium oxide", value: 288572127, color: "#d946ef", shortValue: "$288.6M" },
    { name: "Dysprosium oxide", value: 262407660, color: "#06b6d4", shortValue: "$262.4M" },
    { name: "Terbium oxide", value: 203632110, color: "#14b8a6", shortValue: "$203.6M" },
    { name: "Other REEs", value: 271502733, color: "#64748b", shortValue: "$271.5M" },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPie data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          paddingAngle={2}
          dataKey="value"
          label={({ name, shortValue }: { name: string; shortValue?: string }) => 
            `${name}: ${shortValue || ''}`
          }
          labelLine={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => `$${(value / 1000000).toFixed(1)} million USD`}
          labelFormatter={(index: number) => data[index].name}
        />
        <Legend formatter={(value: string, entry: any, index: number) => 
          `${value}: ${data[index].shortValue}` 
        } />
      </RechartsPie>
    </ResponsiveContainer>
  )
}

interface BarChartDataItem {
  name: string;
  monazite: number;
  xenotime: number;
}

export function BarChart() {
  const data: BarChartDataItem[] = [
    { name: "Cerium", monazite: 47800, xenotime: 0 },
    { name: "Lanthanum", monazite: 24640, xenotime: 0 },
    { name: "Neodymium", monazite: 17453, xenotime: 0 },
    { name: "Yttrium", monazite: 0, xenotime: 9300 },
    { name: "Dysprosium", monazite: 0, xenotime: 1262 },
    { name: "Erbium", monazite: 0, xenotime: 1005 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBar data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: number) => `${value.toLocaleString()} tons`} />
        <Legend />
        <Bar dataKey="monazite" name="From Monazite" fill="#8b5cf6" />
        <Bar dataKey="xenotime" name="From Xenotime" fill="#0ea5e9" />
      </RechartsBar>
    </ResponsiveContainer>
  )
}