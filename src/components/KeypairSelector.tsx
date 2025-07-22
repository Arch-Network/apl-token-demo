import React, { useState } from 'react';
import { ChevronDown, Plus, Key, Copy, Download } from 'lucide-react';
import { useKeypairs, Keypair } from '../contexts/KeypairContext';
import { useSettings } from '../contexts/SettingsContext';
import { copyToClipboard, generateId } from '../utils';

interface KeypairSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const KeypairSelector: React.FC<KeypairSelectorProps> = ({
  value,
  onChange,
  placeholder = "Select or create a keypair",
  label,
  required = false,
  className = ""
}) => {
  const { keypairs, addKeypair } = useKeypairs();
  const { getKeypairPath, settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeypairName, setNewKeypairName] = useState('');
  const [newKeypairDescription, setNewKeypairDescription] = useState('');

  const selectedKeypair = keypairs.find(kp => kp.name === value);

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
    onChange(newKeypair.name);
    setNewKeypairName('');
    setNewKeypairDescription('');
    setShowCreateForm(false);
    setIsOpen(false);
  };

  const handleCopyPath = async () => {
    if (selectedKeypair) {
      const path = getKeypairPath(selectedKeypair.name);
      await copyToClipboard(path);
    }
  };

  const handleDownload = (keypair: Keypair) => {
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

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-error-600 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
        >
          <div className="flex items-center">
            {selectedKeypair ? (
              <>
                <Key className="h-4 w-4 text-primary-600 mr-2" />
                <span className="text-gray-900">{selectedKeypair.name}</span>
                {selectedKeypair.description && (
                  <span className="text-gray-500 ml-2">({selectedKeypair.description})</span>
                )}
              </>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {/* Create New Keypair Button */}
            <div className="p-2 border-b border-gray-200">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="w-full flex items-center justify-center px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Keypair
              </button>
            </div>

            {/* Create Form */}
            {showCreateForm && (
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Keypair Name *
                    </label>
                    <input
                      type="text"
                      value={newKeypairName}
                      onChange={(e) => setNewKeypairName(e.target.value)}
                      placeholder="e.g., mint-authority"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Description (optional)
                    </label>
                    <input
                      type="text"
                      value={newKeypairDescription}
                      onChange={(e) => setNewKeypairDescription(e.target.value)}
                      placeholder="e.g., Used for minting tokens"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={generateKeypair}
                      disabled={!newKeypairName.trim()}
                      className="flex-1 px-3 py-1 text-xs bg-primary-600 text-white rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate
                    </button>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="px-3 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Keypairs */}
            <div className="py-1">
              {keypairs.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500 text-center">
                  No keypairs created yet
                </div>
              ) : (
                keypairs.map((keypair) => (
                  <div
                    key={keypair.id}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => {
                          onChange(keypair.name);
                          setIsOpen(false);
                        }}
                        className="flex-1 text-left"
                      >
                        <div className="flex items-center">
                          <Key className="h-4 w-4 text-primary-600 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{keypair.name}</div>
                            {keypair.description && (
                              <div className="text-xs text-gray-500">{keypair.description}</div>
                            )}
                          </div>
                        </div>
                      </button>
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPath();
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="Copy file path"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(keypair);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="Download keypair"
                        >
                          <Download className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected Keypair Info */}
      {selectedKeypair && (
        <div className="mt-2 p-2 bg-gray-50 rounded border">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-xs text-gray-600">File path:</div>
              <code className="text-xs bg-white px-1 rounded">{getKeypairPath(selectedKeypair.name)}</code>
            </div>
            <button
              onClick={handleCopyPath}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600"
              title="Copy file path"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 