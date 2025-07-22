import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Settings {
  projectDirectory: string;
  defaultNetwork: string;
  autoDownloadKeypairs: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  getKeypairPath: (keypairName: string) => string;
}

const defaultSettings: Settings = {
  projectDirectory: '/tmp',
  defaultNetwork: 'devnet',
  autoDownloadKeypairs: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  console.log('SettingsProvider initializing');
  const [settings, setSettings] = useState<Settings>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('apl-token-demo-settings');
    console.log('Loading settings from localStorage:', saved);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log('Parsed settings:', parsed);
        return { ...defaultSettings, ...parsed };
      } catch (e) {
        console.warn('Failed to parse saved settings:', e);
      }
    }
    console.log('Using default settings:', defaultSettings);
    return defaultSettings;
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('apl-token-demo-settings', JSON.stringify(updated));
  };

  const getKeypairPath = (keypairName: string): string => {
    // Use the project directory if set, otherwise use current directory
    const baseDir = settings.projectDirectory || '.';
    return `${baseDir}/${keypairName}-keypair.json`;
  };

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('apl-token-demo-settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      getKeypairPath,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}; 