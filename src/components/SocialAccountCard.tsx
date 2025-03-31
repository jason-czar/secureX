import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from './Button';
import { SocialPlatform } from './Dashboard';
import { initiateInstagramAuth } from '../utils/instagram';

interface SocialAccountCardProps {
  platform: SocialPlatform;
  connected: boolean;
  onConnect: () => void;
  onShowTwitterModal: () => void;
}

export function SocialAccountCard({ 
  platform, 
  connected, 
  onConnect,
  onShowTwitterModal
}: SocialAccountCardProps) {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-6 h-6" />;
      case 'instagram':
        return <Instagram className="w-6 h-6" />;
      case 'twitter':
        return <Twitter className="w-6 h-6" />;
    }
  };

  const getPlatformName = (platform: SocialPlatform) => {
    return platform === 'twitter' ? 'X (Twitter)' : platform;
  };

  const handleConnect = () => {
    if (platform === 'instagram' && !connected) {
      initiateInstagramAuth();
    } else if (platform === 'twitter' && !connected) {
      onShowTwitterModal();
    } else {
      onConnect();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-center gap-4">
        {getPlatformIcon()}
        <div>
          <h3 className="text-lg font-semibold capitalize text-gray-200">
            {getPlatformName(platform)}
          </h3>
          <p className="text-sm text-gray-400">
            {connected ? 'Connected' : 'Not connected'}
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
  );
}