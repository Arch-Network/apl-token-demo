import React, { useState } from 'react';
import { Download, Copy, Plus, Key, Eye, EyeOff } from 'lucide-react';
import { copyToClipboard, generateId } from '../utils';
import { useKeypairs, Keypair } from '../contexts/KeypairContext';

export const KeypairManager: React.FC = () => {
  const { keypairs, addKeypair, removeKeypair } = useKeypairs();
  const [showPrivateKeys, setShowPrivateKeys] = useState(false);
  const [newKeypairName, setNewKeypairName] = useState('');
  const [newKeypairDescription, setNewKeypairDescription] = useState('');

  const generateKeypair = () => {
    if (!newKeypairName.trim()) return;

    // Generate a mock keypair (in real implementation, this would use actual crypto)
    const mockPublicKey = Array.from({ length: 32 }, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('');
    
    const mockPrivateKey = Array.from({ length: 64 }, () => 
      Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
    ).join('');

    const newKeypair: Keypair = {
      id: generateId(),
      name: newKeypairName.trim(),
      publicKey: mockPublicKey,
      privateKey: mockPrivateKey,
      createdAt: new Date(),
      description: newKeypairDescription.trim() || undefined,
    };

    addKeypair(newKeypair);
    setNewKeypairName('');
    setNewKeypairDescription('');
  };

  const deleteKeypair = (id: string) => {
    removeKeypair(id);
  };

  const downloadKeypair = (keypair: Keypair) => {
    const keypairData = {
      name: keypair.name,
      publicKey: keypair.publicKey,
      privateKey: keypair.privateKey,
      description: keypair.description,
      createdAt: keypair.createdAt.toISOString(),
    };

    const blob = new Blob([JSON.stringify(keypairData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${keypair.name}-keypair.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyPublicKey = async (publicKey: string) => {
    await copyToClipboard(publicKey);
  };

  const copyPrivateKey = async (privateKey: string) => {
    await copyToClipboard(privateKey);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Keypair Manager</h2>
        <button
          onClick={() => setShowPrivateKeys(!showPrivateKeys)}
          className="btn-secondary flex items-center"
        >
          {showPrivateKeys ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showPrivateKeys ? 'Hide' : 'Show'} Private Keys
        </button>
      </div>

      {/* Create New Keypair */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Keypair</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keypair Name *
            </label>
            <input
              type="text"
              value={newKeypairName}
              onChange={(e) => setNewKeypairName(e.target.value)}
              placeholder="e.g., mint-authority, owner, payer"
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <input
              type="text"
              value={newKeypairDescription}
              onChange={(e) => setNewKeypairDescription(e.target.value)}
              placeholder="e.g., Used for minting tokens"
              className="input-field"
            />
          </div>
        </div>
        <button
          onClick={generateKeypair}
          disabled={!newKeypairName.trim()}
          className="btn-primary mt-4 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate Keypair
        </button>
      </div>

      {/* Keypairs List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Keypairs</h3>
        
        {keypairs.length === 0 ? (
          <div className="card text-center py-8">
            <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No keypairs created</h4>
            <p className="text-gray-600">Create your first keypair to get started with token operations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {keypairs.map((keypair) => (
              <div key={keypair.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{keypair.name}</h4>
                    {keypair.description && (
                      <p className="text-sm text-gray-600 mt-1">{keypair.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Created: {keypair.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => downloadKeypair(keypair)}
                      className="text-gray-400 hover:text-gray-600"
                      title="Download keypair"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteKeypair(keypair.id)}
                      className="text-gray-400 hover:text-error-600"
                      title="Delete keypair"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Public Key
                    </label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800 truncate">
                        {keypair.publicKey}
                      </code>
                      <button
                        onClick={() => copyPublicKey(keypair.publicKey)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy public key"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {showPrivateKeys && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Private Key
                      </label>
                      <div className="flex items-center space-x-2">
                        <code className="flex-1 bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800 truncate">
                          {keypair.privateKey}
                        </code>
                        <button
                          onClick={() => copyPrivateKey(keypair.privateKey)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Copy private key"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      File path: <code className="bg-gray-100 px-1 rounded">./{keypair.name}-keypair.json</code>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Usage Instructions */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Use Keypairs</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <p>
            <strong>1. Generate Keypairs:</strong> Create keypairs for different purposes (mint authority, owner, payer, etc.)
          </p>
          <p>
            <strong>2. Download Files:</strong> Download the JSON files and save them in your project directory
          </p>
          <p>
            <strong>3. Use in Commands:</strong> Reference the keypair files in arch-cli commands using the <code className="bg-blue-100 px-1 rounded">--keypair-path</code> parameter
          </p>
          <p>
            <strong>Example:</strong> <code className="bg-blue-100 px-1 rounded">arch-cli token create-mint --decimals 6 --mint-authority ./mint-authority-keypair.json --keypair-path ./payer-keypair.json</code>
          </p>
        </div>
      </div>
    </div>
  );
}; 