import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Copy, Trash2 } from 'lucide-react';
import { CommandHistory as CommandHistoryType } from '../types';
import { formatTimestamp, copyToClipboard, getStatusColor } from '../utils';

export const CommandHistory: React.FC = () => {
  const [history, setHistory] = useState<CommandHistoryType[]>([
    {
      id: '1',
      command: 'arch-cli token create-mint --decimals 6 --mint-authority ./mint-authority.json --keypair-path ./payer.json',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: 'success',
      output: 'Mint created successfully: 11111111111111111111111111111111'
    },
    {
      id: '2',
      command: 'arch-cli token create-account --mint 11111111111111111111111111111111 --owner ./owner.json --keypair-path ./payer.json',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      status: 'success',
      output: 'Token account created: 22222222222222222222222222222222'
    },
    {
      id: '3',
      command: 'arch-cli token mint 11111111111111111111111111111111 22222222222222222222222222222222 1000000 --authority ./mint-authority.json',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      status: 'error',
      error: 'Insufficient funds for transaction'
    }
  ]);

  const handleCopyCommand = async (command: string) => {
    await copyToClipboard(command);
  };

  const handleDeleteHistory = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-error-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning-600 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Command History</h1>
        <button
          onClick={() => setHistory([])}
          className="btn-error flex items-center"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear History
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No commands executed</h3>
          <p className="text-gray-600">Execute some token operations to see them here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {getStatusIcon(item.status)}
                  <span className={`ml-2 text-sm font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyCommand(item.command)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Copy command"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteHistory(item.id)}
                    className="text-gray-400 hover:text-error-600"
                    title="Delete from history"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Command</h4>
                  <div className="code-block text-sm">
                    <pre className="whitespace-pre-wrap break-all">{item.command}</pre>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatTimestamp(item.timestamp)}
                </div>

                {item.output && (
                  <div>
                    <h4 className="text-sm font-medium text-success-700 mb-1">Output</h4>
                    <p className="text-sm text-success-600 bg-success-50 p-2 rounded">{item.output}</p>
                  </div>
                )}

                {item.error && (
                  <div>
                    <h4 className="text-sm font-medium text-error-700 mb-1">Error</h4>
                    <p className="text-sm text-error-600 bg-error-50 p-2 rounded">{item.error}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 