import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function ProgressChart({ data }) {
  if (!data || data.length < 2) {
    return (
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-500">
        <TrendingUp className="h-10 w-10 mx-auto text-gray-300 mb-3" />
        <p>Dados insuficientes para gerar o gráfico de evolução (mínimo de 2 registos).</p>
      </div>
    );
  }

  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const weights = sortedData.map(d => d.weight);
  const minWeight = Math.min(...weights) - 2; 
  const maxWeight = Math.max(...weights) + 2;
  const range = maxWeight - minWeight;

  const width = 800;
  const height = 300;
  const paddingX = 40;
  const paddingY = 40;

  const points = sortedData.map((d, i) => {
    const x = paddingX + (i * (width - 2 * paddingX) / (sortedData.length - 1));
    const y = height - paddingY - (((d.weight - minWeight) / range) * (height - 2 * paddingY));
    return { x, y, value: d.weight, date: d.date };
  });

  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="w-full overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-sm p-4">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[500px] h-auto text-xs">
        <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#f3f4f6" strokeWidth="1" />
        <line x1={paddingX} y1={height/2} x2={width - paddingX} y2={height/2} stroke="#f3f4f6" strokeWidth="1" />
        <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#f3f4f6" strokeWidth="1" />
        
        <text x={paddingX - 10} y={paddingY + 4} textAnchor="end" fill="#9ca3af">{maxWeight.toFixed(1)}</text>
        <text x={paddingX - 10} y={height/2 + 4} textAnchor="end" fill="#9ca3af">{((maxWeight + minWeight) / 2).toFixed(1)}</text>
        <text x={paddingX - 10} y={height - paddingY + 4} textAnchor="end" fill="#9ca3af">{minWeight.toFixed(1)}</text>

        <polyline fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={polylinePoints} />
        
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
            <text x={p.x} y={p.y - 15} textAnchor="middle" fill="#374151" fontWeight="bold">{p.value}kg</text>
            <text x={p.x} y={height - paddingY + 20} textAnchor="middle" fill="#9ca3af">
              {new Date(p.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
