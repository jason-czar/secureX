import { useEffect, useRef, useCallback } from 'react';
import { ConnectedAccount, ScanResult } from '../types/scan';
import { analyzeScanResults } from '../utils/scanAnalyzer';

const SCAN_INTERVAL = 60 * 60 * 1000; // 1 hour in milliseconds

export function useAutoScan(
  connectedAccount: ConnectedAccount | null,
  onScan: (scan: ScanResult) => void
) {
  const timerRef = useRef<number>();
  
  // Memoize the scan function to prevent recreation on every render
  const performScan = useCallback(() => {
    if (connectedAccount) {
      const scanResult = analyzeScanResults(connectedAccount);
      onScan(scanResult);
    }
  }, [connectedAccount, onScan]);

  useEffect(() => {
    // Clear existing timer if any
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    // Start new timer if account is connected
    if (connectedAccount) {
      performScan(); // Initial scan
      timerRef.current = window.setInterval(performScan, SCAN_INTERVAL);
    }

    // Cleanup on unmount or when account changes
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [connectedAccount, performScan]); // Use memoized performScan in dependencies
}