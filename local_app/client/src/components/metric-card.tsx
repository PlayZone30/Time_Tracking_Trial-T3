import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  chartData: number[];
}

export default function MetricCard({ title, value, change, trend, chartData }: MetricCardProps) {
  const isPositive = change >= 0;
  const trendColor = trend === "up" && isPositive ? "var(--success)" : "var(--danger)";
  const TrendIcon = trend === "up" && isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-gray-50">
      <div className="mb-4">
        <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
          {title}
        </h3>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {value}
          </div>
          <div className="flex items-center text-xs">
            <TrendIcon className="w-3 h-3 mr-1" style={{ color: trendColor }} />
            <span style={{ color: trendColor }}>
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
            <span className="ml-1" style={{ color: 'var(--text-secondary)' }}>
              last week
            </span>
          </div>
        </div>
        
        <div className="w-16 h-8">
          <svg width="64" height="32" className="sparkline">
            <polyline
              fill="none"
              stroke={trendColor}
              strokeWidth="2"
              points={chartData
                .map((value, index) => {
                  const x = (index / (chartData.length - 1)) * 64;
                  const y = 32 - ((value - Math.min(...chartData)) / (Math.max(...chartData) - Math.min(...chartData))) * 32;
                  return `${x},${y}`;
                })
                .join(' ')}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}