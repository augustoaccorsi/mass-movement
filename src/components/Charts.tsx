import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend, Sector, LabelList,
} from 'recharts';
import type { CrossItem } from '../types/data';


const COLORS = [
  '#5c6e2e', // olive green
  '#8a9a4b', // light olive
  '#3d4f1e', // dark forest green
  '#b5a96a', // warm tan
  '#7a6c3a', // brown olive
  '#4a5c28', // mid green
  '#c8b882', // pale tan
  '#2e3d18', // deep forest
  '#a0974e', // golden olive
  '#6b7d35', // sage green
  '#4f3d1a', // dark brown
  '#9aac58', // yellow-green
  '#d4c99a', // light sand
  '#324020', // very dark green
  '#c4a85a', // amber tan
];

// Earthy olive/green palette matching the presentation style
const DONUT_COLORS = COLORS;

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: Record<string, unknown> }[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const name = label ?? (payload[0]?.payload?.name as string) ?? payload[0]?.name;
  const value = payload[0]?.value;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs shadow-lg max-w-50">
      <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1 wrap-break-word">
        {name}
      </div>
      <div className="text-blue-500 dark:text-blue-400">
        Ocorrências: <strong>{typeof value === 'number' ? value.toLocaleString('pt-BR') : value}</strong>
      </div>
    </div>
  );
}

interface BarData { name: string; count: number; pct: number; area?: number; }

interface HBarProps {
  data: BarData[];
  dataKey?: 'count' | 'pct' | 'area';
  label?: string;
  maxItems?: number;
  colorOffset?: number;
}

export function HorizontalBarChart({ data, dataKey = 'count', label, maxItems = 10, colorOffset = 0 }: HBarProps) {
  const slice = data.slice(0, maxItems).reverse();
  const height = Math.max(200, slice.length * 40);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={slice} layout="vertical" margin={{ top: 0, right: 16, left: 4, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey="name"
          width={160}
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: string) => v.length > 22 ? v.slice(0, 21) + '…' : v}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
        <Bar dataKey={dataKey} name={label ?? dataKey} radius={[0, 4, 4, 0]}>
          {slice.map((_, i) => (
            <Cell key={i} fill={COLORS[(i + colorOffset) % COLORS.length]} />
          ))}
          <LabelList
            dataKey={dataKey}
            position="right"
            style={{ fontSize: 10, fill: 'var(--label-color, #64748b)' }}
            formatter={(v: number) => v.toLocaleString('pt-BR')}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

interface PieData { name: string; count: number; pct: number; }

export function DonutChart({ data, maxItems = 8 }: { data: PieData[]; maxItems?: number }) {
  const slice = data.slice(0, maxItems);
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={slice} dataKey="count" nameKey="name"
          cx="50%" cy="50%" innerRadius={55} outerRadius={90}
          paddingAngle={2} stroke="none"
          activeShape={(props: unknown) => {
            const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props as {
              cx: number; cy: number; innerRadius: number; outerRadius: number;
              startAngle: number; endAngle: number; fill: string;
            };
            return <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} />;
          }}
          label={({ pct }: { pct: number }) => `${pct.toFixed(1)}%`}
          labelLine={false}
        >
          {slice.map((_, i) => <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(v: string) => ((v.length > 28 ? v.slice(0, 27) + '…' : v) as string)}
          wrapperStyle={{ fontSize: 10 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface StackedBarProps {
  data: CrossItem[];
  keys: string[];
  label?: string;
}

export function StackedBarChart({ data, keys, label }: StackedBarProps) {
  const height = Math.max(220, data.length * 44);
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 16, left: 4, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
        <YAxis
          type="category"
          dataKey="name"
          width={160}
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: string) => v.length > 22 ? v.slice(0, 21) + '…' : v}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(148,163,184,0.08)' }}
        />
        <Legend
          formatter={(v: string) => ((v.length > 28 ? v.slice(0, 27) + '…' : v) as string)}
          wrapperStyle={{ fontSize: 10 }}
        />
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} name={label ? `${k}` : k} stackId="a"
            fill={COLORS[i % COLORS.length]}
            radius={i === keys.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
