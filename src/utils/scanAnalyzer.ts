import { ScanResult, ScanIssue, ConnectedAccount } from '../types/scan';

export function analyzeScanResults(account: ConnectedAccount): ScanResult {
  const issues: ScanIssue[] = [];
  
  // Check account privacy
  if (!account.profileData.isProtected) {
    issues.push({
      type: 'public_account',
      description: 'Your account is public. Consider making it private for better privacy.',
      severity: 'medium'
    });
  }

  // Check follower count
  if (account.profileData.followersCount > 1000) {
    issues.push({
      type: 'high_exposure',
      description: 'Large follower count increases visibility and potential privacy risks.',
      severity: 'medium'
    });
  }

  // Check tweet volume
  if (account.profileData.publicTweetsCount > 5000) {
    issues.push({
      type: 'high_activity',
      description: 'High tweet count increases digital footprint and exposure.',
      severity: 'low'
    });
  }

  const riskLevel = calculateOverallRisk(issues);

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    username: account.username,
    riskLevel,
    issues
  };
}

function calculateOverallRisk(issues: ScanIssue[]): 'low' | 'medium' | 'high' {
  const severityScores = {
    high: issues.filter(i => i.severity === 'high').length * 3,
    medium: issues.filter(i => i.severity === 'medium').length * 2,
    low: issues.filter(i => i.severity === 'low').length
  };

  const totalScore = severityScores.high + severityScores.medium + severityScores.low;

  if (totalScore >= 5) return 'high';
  if (totalScore >= 3) return 'medium';
  return 'low';
}