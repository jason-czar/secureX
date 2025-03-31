import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Card } from './Card';
import { SocialAccountCard } from './SocialAccountCard';
import { TwitterConnectModal } from './TwitterConnectModal';
import { AccountState, SocialPlatform } from './Dashboard';

interface ConnectedAccountsProps {
  accounts: AccountState;
  onToggleAccount: (platform: SocialPlatform) => void;
}

export function ConnectedAccounts({ accounts, onToggleAccount }: ConnectedAccountsProps) {
  const [showTwitterModal, setShowTwitterModal] = useState(false);
  const platforms: SocialPlatform[] = ['facebook', 'instagram', 'twitter'];

  return (
    <>
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold">Connected Accounts</h2>
        </div>
        <div className="space-y-4">
          {platforms.map((platform) => (
            <SocialAccountCard
              key={platform}
              platform={platform}
              connected={accounts[platform]}
              onConnect={() => onToggleAccount(platform)}
              onShowTwitterModal={() => setShowTwitterModal(true)}
            />
          ))}
        </div>
      </Card>

      {showTwitterModal && (
        <TwitterConnectModal
          onClose={() => setShowTwitterModal(false)}
          onConnect={() => onToggleAccount('twitter')}
        />
      )}
    </>
  );
}