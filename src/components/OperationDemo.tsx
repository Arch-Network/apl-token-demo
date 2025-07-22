import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Play, CheckCircle, XCircle, Clock } from 'lucide-react';
import { getOperationById } from '../data/tokenOperations';
import { formatCommand, validateParameters, copyToClipboard, getCategoryColor } from '../utils';
import { TokenOperation } from '../types';
import { KeypairSelector } from './KeypairSelector';
import { useSettings } from '../contexts/SettingsContext';

export const OperationDemo: React.FC = () => {
  const { operationId } = useParams<{ operationId: string }>();
  const { settings } = useSettings();
  const [operation, setOperation] = useState<TokenOperation | null>(null);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [generatedCommand, setGeneratedCommand] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<{ success: boolean; output?: string; error?: string } | null>(null);

  useEffect(() => {
    if (operationId) {
      const op = getOperationById(operationId);
      setOperation(op || null);
      
      // Initialize parameters with default values
      if (op) {
        const initialParams: Record<string, any> = {};
        op.parameters.forEach(param => {
          if (param.defaultValue !== undefined) {
            initialParams[param.name] = param.defaultValue;
          }
        });
        setParameters(initialParams);
      }
    }
  }, [operationId]);

  useEffect(() => {
    if (operation) {
      // Convert keypair names to full paths using settings
      const processedParams = { ...parameters };
      operation.parameters.forEach(param => {
        const isKeypairParam = param.name.includes('authority') || 
                             param.name.includes('owner') || 
                             param.name.includes('payer') || 
                             param.name.includes('keypair') ||
                             param.name.includes('signer');
        
        if (isKeypairParam && processedParams[param.name]) {
          // Convert keypair name to full path
          processedParams[param.name] = `${settings.projectDirectory}/${processedParams[param.name]}-keypair.json`;
        }
      });
      
      const command = formatCommand(operation, processedParams);
      setGeneratedCommand(command);
      
      const validationErrors = validateParameters(operation, parameters);
      setErrors(validationErrors);
    }
  }, [operation, parameters, settings.projectDirectory]);

  const handleParameterChange = (name: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCopyCommand = async () => {
    const success = await copyToClipboard(generatedCommand);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleExecuteCommand = async () => {
    if (!operation || errors.length > 0) return;

    setIsExecuting(true);
    setExecutionResult(null);

    // Simulate command execution
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      setExecutionResult({
        success,
        output: success ? `Successfully executed: ${operation.title}` : undefined,
        error: success ? undefined : 'Simulated error: Network timeout'
      });
      setIsExecuting(false);
    }, 2000);
  };

  if (!operation) {
    return (
      <div className="text-center py-12">
        <XCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Operation not found</h3>
        <p className="text-gray-600 mb-4">The requested operation could not be found.</p>
        <Link to="/" className="btn-primary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Operations
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{operation.title}</h1>
          <p className="text-gray-600 mt-2">{operation.description}</p>
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(operation.category)}`}>
          {operation.category}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parameters Form */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Parameters</h2>
            <Link to="/keypairs" className="text-sm text-primary-600 hover:text-primary-700">
              Need keypairs? →
            </Link>
          </div>
          <div className="space-y-4">
            {operation.parameters.map(param => {
              // Check if this is a keypair parameter
              const isKeypairParam = param.name.includes('authority') || 
                                   param.name.includes('owner') || 
                                   param.name.includes('payer') || 
                                   param.name.includes('keypair') ||
                                   param.name.includes('signer');

              return (
                <div key={param.name}>
                  {isKeypairParam ? (
                    <KeypairSelector
                      value={parameters[param.name] || ''}
                      onChange={(value) => handleParameterChange(param.name, value)}
                      label={param.name}
                      required={param.required}
                      placeholder={param.placeholder}
                    />
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {param.name}
                        {param.required && <span className="text-error-600 ml-1">*</span>}
                      </label>
                      <div className="space-y-1">
                        {param.type === 'string' && (
                          <input
                            type="text"
                            value={parameters[param.name] || ''}
                            onChange={(e) => handleParameterChange(param.name, e.target.value)}
                            placeholder={param.placeholder}
                            className="input-field"
                          />
                        )}
                        {param.type === 'number' && (
                          <input
                            type="number"
                            value={parameters[param.name] || ''}
                            onChange={(e) => handleParameterChange(param.name, Number(e.target.value))}
                            placeholder={param.placeholder}
                            min={param.validation?.min}
                            max={param.validation?.max}
                            className="input-field"
                          />
                        )}
                        {param.type === 'boolean' && (
                          <select
                            value={parameters[param.name] || ''}
                            onChange={(e) => handleParameterChange(param.name, e.target.value === 'true')}
                            className="input-field"
                          >
                            <option value="">Select...</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        )}
                        {param.type === 'file' && (
                          <input
                            type="file"
                            onChange={(e) => handleParameterChange(param.name, e.target.files?.[0]?.name || '')}
                            className="input-field"
                          />
                        )}
                        <p className="text-sm text-gray-500">{param.description}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {errors.length > 0 && (
            <div className="mt-4 p-4 bg-error-50 border border-error-200 rounded-lg">
              <h4 className="text-sm font-medium text-error-800 mb-2">Validation Errors:</h4>
              <ul className="text-sm text-error-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Generated Command */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Command</h2>
              <button
                onClick={handleCopyCommand}
                disabled={errors.length > 0}
                className="btn-secondary flex items-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="code-block">
              <pre className="whitespace-pre-wrap break-all">{generatedCommand}</pre>
            </div>
            <button
              onClick={handleExecuteCommand}
              disabled={errors.length > 0 || isExecuting}
              className="btn-primary mt-4 w-full flex items-center justify-center"
            >
              {isExecuting ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Execute Command
                </>
              )}
            </button>
          </div>

          {/* Example Command */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Example</h3>
            <div className="code-block">
              <pre>{operation.example}</pre>
            </div>
          </div>

          {/* Execution Result */}
          {executionResult && (
            <div className={`card ${executionResult.success ? 'bg-success-50 border-success-200' : 'bg-error-50 border-error-200'}`}>
              <div className="flex items-center mb-2">
                {executionResult.success ? (
                  <CheckCircle className="h-5 w-5 text-success-600 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-error-600 mr-2" />
                )}
                <h3 className="text-lg font-semibold text-gray-900">
                  {executionResult.success ? 'Success' : 'Error'}
                </h3>
              </div>
              {executionResult.output && (
                <p className="text-success-700 mb-2">{executionResult.output}</p>
              )}
              {executionResult.error && (
                <p className="text-error-700">{executionResult.error}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 