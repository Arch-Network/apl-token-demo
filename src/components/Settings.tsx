import React, { useState } from 'react';
import { Settings as SettingsIcon, Folder, Network, Download } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [projectDirectory, setProjectDirectory] = useState(settings.projectDirectory);
  const [defaultNetwork, setDefaultNetwork] = useState(settings.defaultNetwork);
  const [autoDownloadKeypairs, setAutoDownloadKeypairs] = useState(settings.autoDownloadKeypairs);

  const handleSave = () => {
    updateSettings({
      projectDirectory,
      defaultNetwork,
      autoDownloadKeypairs,
    });
  };

  const handleReset = () => {
    setProjectDirectory(settings.projectDirectory);
    setDefaultNetwork(settings.defaultNetwork);
    setAutoDownloadKeypairs(settings.autoDownloadKeypairs);
  };

  const hasChanges = 
    projectDirectory !== settings.projectDirectory ||
    defaultNetwork !== settings.defaultNetwork ||
    autoDownloadKeypairs !== settings.autoDownloadKeypairs;

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <SettingsIcon className="h-6 w-6 text-primary-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Configuration</h2>
        
        <div className="space-y-6">
          {/* Project Directory */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Folder className="h-4 w-4 inline mr-2" />
              Project Directory
            </label>
            <div className="space-y-2">
              <input
                type="text"
                value={projectDirectory}
                onChange={(e) => setProjectDirectory(e.target.value)}
                placeholder="/path/to/your/project"
                className="input-field"
              />
              <p className="text-sm text-gray-500">
                This directory will be used for keypair file paths in generated commands.
                <br />
                <strong>Example:</strong> If set to <code className="bg-gray-100 px-1 rounded">/home/user/my-project</code>, 
                keypair paths will be <code className="bg-gray-100 px-1 rounded">/home/user/my-project/mint-authority-keypair.json</code>
              </p>
            </div>
          </div>

          {/* Default Network */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Network className="h-4 w-4 inline mr-2" />
              Default Network
            </label>
            <select
              value={defaultNetwork}
              onChange={(e) => setDefaultNetwork(e.target.value)}
              className="input-field"
            >
              <option value="devnet">Devnet</option>
              <option value="testnet">Testnet</option>
              <option value="mainnet">Mainnet</option>
              <option value="local">Local</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Default network to use when generating arch-cli commands.
            </p>
          </div>

          {/* Auto Download Keypairs */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={autoDownloadKeypairs}
                onChange={(e) => setAutoDownloadKeypairs(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <Download className="h-4 w-4 ml-2 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Auto-download keypairs when created
              </span>
            </label>
            <p className="text-sm text-gray-500 mt-1 ml-6">
              Automatically download keypair files when generating new keypairs.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Current Settings Summary */}
      <div className="card bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Settings</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Project Directory:</span>
            <code className="bg-white px-2 py-1 rounded">{settings.projectDirectory}</code>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Default Network:</span>
            <span className="font-medium">{settings.defaultNetwork}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Auto-download Keypairs:</span>
            <span className="font-medium">{settings.autoDownloadKeypairs ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Use</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <p>
            <strong>1. Set Project Directory:</strong> Configure the directory where you want your keypair files to be stored.
          </p>
          <p>
            <strong>2. Generate Commands:</strong> When you use the token operations, keypair paths will automatically use your project directory.
          </p>
          <p>
            <strong>3. Run Commands:</strong> Copy the generated commands and run them from your project directory.
          </p>
          <p>
            <strong>Example Command:</strong>
            <br />
            <code className="bg-blue-100 px-2 py-1 rounded block mt-1">
              arch-cli token create-mint --decimals 6 --mint-authority {settings.projectDirectory}/mint-authority-keypair.json --keypair-path {settings.projectDirectory}/payer-keypair.json
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}; 