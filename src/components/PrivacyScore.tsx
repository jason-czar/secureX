import { Circle } from 'lucide-react';

interface PrivacyScoreProps {
  score: number;
  loading?: boolean;
}

export function PrivacyScore({ score, loading = false }: PrivacyScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return '#4ade80';
    if (score >= 60) return '#facc15';
    return '#f87171';
  };

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 opacity-50">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#374151"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-500">--</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-gray-500">
          <p className="text-sm">Connect your X account</p>
          <p className="text-sm">to view your privacy score</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#374151"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={getStrokeColor(score)}
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 text-gray-300">
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 fill-green-400 text-green-400" />
          <span>80-100: Excellent</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>60-79: Needs Improvement</span>
        </div>
        <div className="flex items-center gap-2">
          <Circle className="w-3 h-3 fill-red-400 text-red-400" />
          <span>0-59: High Risk</span>
        </div>
      </div>
    </div>
  );
}