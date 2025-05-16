export const APP_VERSION = '1.0.0';

interface VersionInfo {
  version: string;
  required: boolean;
  features: string[];
}

export async function checkForUpdates(): Promise<VersionInfo | null> {
  try {
    const response = await fetch('/api/version');
    if (!response.ok) return null;
    
    const versionInfo: VersionInfo = await response.json();
    if (versionInfo.version !== APP_VERSION) {
      return versionInfo;
    }
    
    return null;
  } catch (error) {
    console.error('Error checking for updates:', error);
    return null;
  }
} 