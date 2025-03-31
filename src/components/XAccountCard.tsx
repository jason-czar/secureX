import { Twitter } from 'lucide-react';
import { Button } from './Button';
import { useState } from 'react';
import { TwitterConnectModal } from './TwitterConnectModal';
import { ConnectedAccount } from '../types/scan';

interface XAccountCardProps {
  connected: boolean;
  account: ConnectedAccount | null;
  onConnect: (account: ConnectedAccount) => void;
  onDisconnect: () => void;
}

export function XAccountCard({ 
  connected, 
  account,
  onConnect, 
  onDisconnect 
}: XAccountCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConnect = () => {
    if (!connected) {
      setShowModal(true);
    } else {
      onDisconnect();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
        <div className="flex items-center gap-4">
          <Twitter className="w-6 h-6" />
          <div>
            <h3 className="text-lg font-semibold text-gray-200">
              X (Twitter)
            </h3>
            <p className="text-sm text-gray-400">
              {connected ? `Connected as @${account?.username}` : 'Not connected'}
            </p>
          </div>
        </div>
        <Button
          variant={connected ? 'outline' : 'primary'}
          onClick={handleConnect}
          type="button"
        >
          {connected ? 'Disconnect' : 'Connect'}
        </Button>
      </div>

      {showModal && (
        <TwitterConnectModal
          onClose={() => setShowModal(false)}
          onConnect={onConnect}
        />
      )}
    </>
  );
}