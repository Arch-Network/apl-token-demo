import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Coins, 
  Shield, 
  Users, 
  Calculator, 
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { tokenOperations, getOperationsByCategory } from '../data/tokenOperations';
import { getCategoryColor } from '../utils';
import { TokenCategory } from '../types';
import { useKeypairs } from '../contexts/KeypairContext';

export const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TokenCategory | 'all'>('all');
  const { keypairs } = useKeypairs();

  const categories = [
    { id: 'basic', name: 'Basic Operations', icon: Coins, description: 'Core token operations like mint, transfer, and burn' },
    { id: 'advanced', name: 'Advanced Features', icon: Shield, description: 'Advanced operations with additional safety checks' },
    { id: 'multisig', name: 'Multisignature', icon: Users, description: 'Multi-signature authority management' },
    { id: 'utilities', name: 'Utilities', icon: Calculator, description: 'Helper commands for querying and conversion' },
    { id: 'batch-operations', name: 'Batch Operations', icon: Layers, description: 'Bulk operations for multiple accounts' },
  ];

  const filteredOperations = tokenOperations.filter(operation => {
    const matchesSearch = operation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         operation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || operation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || Coins;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          APL Token Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Interactive demonstration of APL token features using arch-cli. 
          Explore all available token operations and see how to use them.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search operations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as TokenCategory | 'all')}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => {
          const Icon = category.icon;
          const operations = getOperationsByCategory(category.id as TokenCategory);
          const isSelected = selectedCategory === category.id;
          
          return (
            <div
              key={category.id}
              className={`card cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary-500' : ''
              }`}
              onClick={() => setSelectedCategory(category.id as TokenCategory)}
            >
              <div className="flex items-center mb-4">
                <Icon className="h-8 w-8 text-primary-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{operations.length} operations</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(category.id)}`}>
                  {category.id}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Operations List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'All Operations' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <span className="text-sm text-gray-500">
            {filteredOperations.length} operation{filteredOperations.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredOperations.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No operations found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOperations.map(operation => {
              const Icon = getCategoryIcon(operation.category);
              
              return (
                <Link
                  key={operation.id}
                  to={`/operation/${operation.id}`}
                  className="card hover:shadow-md transition-shadow duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <Icon className="h-6 w-6 text-primary-600 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                        {operation.title}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(operation.category)}`}>
                      {operation.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{operation.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{operation.parameters.length} parameter{operation.parameters.length !== 1 ? 's' : ''}</span>
                    <span className="group-hover:text-primary-600">View details →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Start Guide */}
      <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <h3 className="text-xl font-semibold text-primary-900 mb-4">Quick Start Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-primary-800 mb-2">1. Create Keypairs</h4>
            <p className="text-primary-700">First, create keypairs for mint authority, owner, and payer accounts.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">2. Create a Mint</h4>
            <p className="text-primary-700">Create a token mint with your desired decimals and authorities.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">3. Create Accounts</h4>
            <p className="text-primary-700">Create token accounts for users to hold your tokens.</p>
          </div>
          <div>
            <h4 className="font-medium text-primary-800 mb-2">4. Mint & Transfer</h4>
            <p className="text-primary-700">Mint tokens to accounts and transfer them between users.</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-primary-200 flex items-center justify-between">
          <Link to="/keypairs" className="btn-primary text-sm">
            Get Started with Keypairs →
          </Link>
          <span className="text-sm text-primary-700">
            {keypairs.length} keypair{keypairs.length !== 1 ? 's' : ''} created
          </span>
        </div>
      </div>
    </div>
  );
}; 