import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { analyzeTwitterProfile } from '../utils/twitter';
import { ConnectedAccount } from '../types/scan';

interface TwitterConnectModalProps {
  onClose: () => void;
  onConnect: (account: ConnectedAccount) => void;
}

export function TwitterConnectModal({ onClose, onConnect }: TwitterConnectModalProps) {
  const [profileUrl, setProfileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const profileData = await analyzeTwitterProfile(profileUrl);
      const username = profileUrl.startsWith('@')
        ? profileUrl.slice(1)
        : profileUrl.match(/x\.com\/([^/]+)/)?.[1] || '';

      onConnect({
        username,
        profileData
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to connect X account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Connect X (Twitter) Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="profileUrl" className="block text-sm font-medium text-gray-300 mb-2">
              X Profile URL
            </label>
            <input
              type="text"
              id="profileUrl"
              placeholder="https://x.com/username or @username"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <p>{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}