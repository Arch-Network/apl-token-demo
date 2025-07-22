import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  BookOpen, 
  Terminal, 
  Shield, 
  Zap,
  ArrowRight
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About APL Token Demo</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          An interactive web application demonstrating the powerful APL token features 
          available through the arch-cli command-line interface.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <Terminal className="h-8 w-8 text-primary-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Command-Line Interface</h3>
          <p className="text-gray-600">
            Powerful CLI tool for managing APL tokens with comprehensive command coverage.
          </p>
        </div>

        <div className="card">
          <Shield className="h-8 w-8 text-primary-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Security</h3>
          <p className="text-gray-600">
            Built-in security features including checked operations and multisignature support.
          </p>
        </div>

        <div className="card">
          <Zap className="h-8 w-8 text-primary-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Batch Operations</h3>
          <p className="text-gray-600">
            Efficiently handle multiple operations with batch mint and transfer capabilities.
          </p>
        </div>
      </div>

      {/* What is APL Tokens */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What are APL Tokens?</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            APL (Arch Program Library) tokens are the native token standard on the Arch Network, 
            a Bitcoin-native smart contract platform. These tokens provide a secure and efficient 
            way to create, manage, and transfer digital assets while maintaining compatibility 
            with Bitcoin's security model.
          </p>
          <p className="text-gray-600">
            The arch-cli provides a comprehensive set of commands for token management, 
            from basic operations like minting and transferring to advanced features like 
            multisignature authorities and batch operations.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Operations</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Create and manage token mints</li>
              <li>• Create token accounts for users</li>
              <li>• Mint tokens to accounts</li>
              <li>• Transfer tokens between accounts</li>
              <li>• Burn tokens from accounts</li>
              <li>• Approve and revoke delegates</li>
              <li>• Freeze and thaw accounts</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Checked operations with decimal verification</li>
              <li>• Authority management and transfer</li>
              <li>• Account closure and rent recovery</li>
              <li>• Multisignature authority support</li>
              <li>• Batch operations for efficiency</li>
              <li>• Utility commands for querying</li>
              <li>• Amount conversion utilities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">Getting Started</h2>
        <div className="space-y-4">
          <p className="text-primary-800">
            Ready to start using APL tokens? Follow these steps:
          </p>
          <ol className="space-y-2 text-primary-700">
            <li className="flex items-start">
              <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
              <span>Install arch-cli and set up your development environment</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
              <span>Create your first token mint with desired decimals and authorities</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
              <span>Create token accounts for users to hold your tokens</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
              <span>Start minting and transferring tokens between accounts</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Resources */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
            <div className="space-y-3">
              <a
                href="https://docs.arch.network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Arch Network Documentation
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <a
                href="https://github.com/arch-network/arch-network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub Repository
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Try It Out</h3>
            <div className="space-y-3">
              <Link
                to="/"
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <Terminal className="h-4 w-4 mr-2" />
                Explore Token Operations
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <a
                href="https://github.com/arch-network/arch-network/tree/main/arch-cli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <Github className="h-4 w-4 mr-2" />
                View CLI Source Code
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500">
        <p>
          This demo application showcases the APL token features available in arch-cli. 
          For production use, please refer to the official documentation and ensure proper 
          security practices.
        </p>
      </div>
    </div>
  );
}; 