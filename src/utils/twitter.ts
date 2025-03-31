import api from './api';

export interface TwitterProfileData {
  username: string;
  isProtected: boolean;
  followersCount: number;
  publicTweetsCount: number;
}

export const analyzeTwitterProfile = async (profileUrl: string): Promise<TwitterProfileData> => {
  // Extract username from URL (handles both formats: x.com/username and @username)
  const username = profileUrl.startsWith('@')
    ? profileUrl.slice(1)
    : profileUrl.match(/x\.com\/([^/]+)/)?.[1] || '';
  
  if (!username) {
    throw new Error('Invalid X profile URL. Please use format: https://x.com/username or @username');
  }

  try {
    const { data } = await api.get<TwitterProfileData>(`/twitter/analyze/${username}`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('X profile not found');
    }
    throw new Error('Failed to analyze X profile');
  }
};