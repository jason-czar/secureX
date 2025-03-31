import React, { useState, useCallback } from 'react';
import { AlertTriangle, Image } from 'lucide-react';
import { Card } from './Card';
import { PrivacyScore } from './PrivacyScore';
import { XAccountCard } from './XAccountCard';
import { RecentScans } from './RecentScans';
import { ScanResult, ConnectedAccount } from '../types/scan';
import { useAutoScan } from '../hooks/useAutoScan';
import { calculatePrivacyScore } from '../utils/scoreCalculator';

export function Dashboard() {
  const [connectedAccount, setConnectedAccount] = useState<ConnectedAccount | null>(null);
  const [scans, setScans] = useState<ScanResult[]>([]);
  const latestScan = scans[0] || null;
  const privacyScore = calculatePrivacyScore(latestScan);

  const handleAccountConnect = useCallback((account: ConnectedAccount) => {
    setConnectedAccount(account);
  }, []);

  const handleAccountDisconnect = useCallback(() => {
    setConnectedAccount(null);
    setScans([]);
  }, []);

  const handleNewScan = useCallback((scan: ScanResult) => {
    setScans(prev => [scan, ...prev]);
  }, []);

  // Set up automatic scanning
  useAutoScan(connectedAccount, handleNewScan);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Privacy Score</h2>
          </div>
          <PrivacyScore 
            score={privacyScore} 
            loading={!connectedAccount}
          />
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Image className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold">Connected Account</h2>
          </div>
          <div className="space-y-4">
            <XAccountCard
              connected={!!connectedAccount}
              account={connectedAccount}
              onConnect={handleAccountConnect}
              onDisconnect={handleAccountDisconnect}
            />
          </div>
        </Card>

        <RecentScans 
          scans={scans}
          onScan={handleNewScan}
          connectedAccount={connectedAccount}
        />
      </div>
    </main>
  );
}