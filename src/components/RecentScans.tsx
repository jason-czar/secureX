import React from 'react';
import { Image, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';
import { ScanResult, ConnectedAccount } from '../types/scan';
import { analyzeScanResults } from '../utils/scanAnalyzer';

interface RecentScansProps {
  scans: ScanResult[];
  onScan: (scan: ScanResult) => void;
  connectedAccount: ConnectedAccount | null;
}

export function RecentScans({ scans, onScan, connectedAccount }: RecentScansProps) {
  const handleScan = () => {
    if (!connectedAccount) return;
    
    const scanResult = analyzeScanResults(connectedAccount);
    onScan(scanResult);
  };

  const getSeverityIcon = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'high':
        return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  return (
    <Card className="md:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Image className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold">Recent Scans</h2>
        </div>
        <div className="flex items-center gap-4">
          {connectedAccount && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Auto-scans hourly</span>
            </div>
          )}
          <Button onClick={handleScan} disabled={!connectedAccount}>
            Scan Now
          </Button>
        </div>
      </div>
      
      {!connectedAccount ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400">
            Connect your X account to start scanning for privacy risks
          </p>
        </div>
      ) : scans.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400">
            No scans yet. Click "Scan Now" to analyze your X account.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {scans.map((scan) => (
            <div key={scan.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {new Date(scan.timestamp).toLocaleString()}
                  </span>
                </div>
                <span className={`text-sm font-medium ${
                  scan.riskLevel === 'low' ? 'text-green-400' :
                  scan.riskLevel === 'medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {scan.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              <div className="space-y-2">
                {scan.issues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {getSeverityIcon(issue.severity)}
                    <p className="text-sm text-gray-300">{issue.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}