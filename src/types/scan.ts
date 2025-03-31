export interface ScanResult {
  id: string;
  timestamp: string;
  username: string;
  riskLevel: 'low' | 'medium' | 'high';
  issues: ScanIssue[];
}

export interface ScanIssue {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface ConnectedAccount {
  username: string;
  profileData: {
    isProtected: boolean;
    followersCount: number;
    publicTweetsCount: number;
  };
}