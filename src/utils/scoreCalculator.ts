import { ScanResult } from '../types/scan';

export function calculatePrivacyScore(scan: ScanResult | null): number {
  if (!scan) return 0;

  // Base score starts at 100
  let score = 100;

  // Deduct points based on issue severity
  scan.issues.forEach(issue => {
    switch (issue.severity) {
      case 'high':
        score -= 25;
        break;
      case 'medium':
        score -= 15;
        break;
      case 'low':
        score -= 5;
        break;
    }
  });

  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, score));
}