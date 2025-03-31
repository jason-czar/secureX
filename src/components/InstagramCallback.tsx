import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForToken } from '../utils/instagram';

export function InstagramCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          await exchangeCodeForToken(code);
          // Update the connected state in the parent component
          navigate('/');
        } catch (error) {
          console.error('Authentication failed:', error);
          navigate('/?error=auth_failed');
        }
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          Connecting to Instagram...
        </h2>
        <p className="text-gray-400">Please wait while we complete the authentication.</p>
      </div>
    </div>
  );
}