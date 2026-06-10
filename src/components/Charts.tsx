import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, PieChart, Pie, Legend,
} from 'recharts';

const COLORS = [
  '#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6',
  '#06b6d4','#d97706','#059669','#1d4ed8','#9333ea',
  '#0891b2','#b45309','#047857','#6d28d9','#b91c1c',
];

interface TooltipProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: Record<string, unknown> }[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs shadow-lg">
      <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {label ?? (payload[0]?.payload?.name as string)}
      </div>
      {payload.map(p => (
        <div key={p.name} className="text-blue-500 dark:text-blue-400">
          {p.name}:{' '}
          <strong>
            {typeof p.value === 'number'
              ? p.value.toLocaleString('pt-BR', { maximumFractionDigits: 1 })
              : p.value}
          </strong>
        </div>
      ))}
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
      <BarChart data={slice} layout="vertical" margin={{ top: 0, right: 24, left: 12, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="name" width={210} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={dataKey} name={label ?? dataKey} radius={[0, 4, 4, 0]}>
          {slice.map((_, i) => (
            <Cell key={i} fill={COLORS[(i + colorOffset) % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

interface PieData { name: string; count: number; pct: number; }

export function DonutChart({ data, maxItems = 8 }: { data: PieData[]; maxItems?: number }) {
  const slice = data.slice(0, maxItems);
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={slice} dataKey="count" nameKey="name"
          cx="50%" cy="50%" innerRadius={60} outerRadius={100}
          paddingAngle={2}
          label={({ pct }: { pct: number }) => `${pct.toFixed(1)}%`}
          labelLine={false}
        >
          {slice.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={(val: number, name: string) => [val.toLocaleString('pt-BR'), name]} />
        <Legend
          formatter={(v: string) => ((v.length > 30 ? v.slice(0, 28) + '…' : v) as string)}
          wrapperStyle={{ fontSize: 11 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
