import { TokenOperation } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Get keypair path from settings (fallback to relative path)
export const getKeypairPath = (keypairName: string, projectDirectory?: string): string => {
  if (projectDirectory) {
    return `${projectDirectory}/${keypairName}-keypair.json`;
  }
  return `./${keypairName}-keypair.json`;
};

// Format command with parameters
export const formatCommand = (operation: TokenOperation, parameters: Record<string, any>): string => {
  let command = operation.command;
  
  // Replace placeholders with actual values
  operation.parameters.forEach(param => {
    const value = parameters[param.name];
    if (value !== undefined && value !== null && value !== '') {
      if (param.type === 'string') {
        command = command.replace(`{${param.name}}`, value);
      } else if (param.type === 'number') {
        command = command.replace(`{${param.name}}`, value.toString());
      } else if (param.type === 'boolean') {
        command = command.replace(`{${param.name}}`, value ? 'true' : 'false');
      }
    }
  });
  
  return command;
};

// Validate parameters
export const validateParameters = (operation: TokenOperation, parameters: Record<string, any>): string[] => {
  const errors: string[] = [];
  
  operation.parameters.forEach(param => {
    const value = parameters[param.name];
    
    if (param.required && (value === undefined || value === null || value === '')) {
      errors.push(`${param.name} is required`);
      return;
    }
    
    if (value !== undefined && value !== null && value !== '') {
      if (param.type === 'number') {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          errors.push(`${param.name} must be a valid number`);
        } else if (param.validation?.min !== undefined && numValue < param.validation.min) {
          errors.push(`${param.name} must be at least ${param.validation.min}`);
        } else if (param.validation?.max !== undefined && numValue > param.validation.max) {
          errors.push(`${param.name} must be at most ${param.validation.max}`);
        }
      } else if (param.type === 'string' && param.validation?.pattern) {
        const regex = new RegExp(param.validation.pattern);
        if (!regex.test(value)) {
          errors.push(`${param.name} format is invalid`);
        }
      }
    }
  });
  
  return errors;
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

// Format timestamp
export const formatTimestamp = (date: Date): string => {
  return date.toLocaleString();
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate example keypair path
export const generateExampleKeypairPath = (name: string): string => {
  return `./${name}-keypair.json`;
};

// Generate example public key
export const generateExamplePublicKey = (): string => {
  // This is a mock example - in real usage, this would be an actual public key
  return '11111111111111111111111111111111';
};

// Format amount with decimals
export const formatAmount = (amount: number, decimals: number): string => {
  return (amount / Math.pow(10, decimals)).toFixed(decimals);
};

// Parse amount from UI format
export const parseAmount = (uiAmount: string, decimals: number): number => {
  return Math.floor(parseFloat(uiAmount) * Math.pow(10, decimals));
};

// Get operation category color
export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'basic':
      return 'bg-blue-100 text-blue-800';
    case 'advanced':
      return 'bg-purple-100 text-purple-800';
    case 'multisig':
      return 'bg-orange-100 text-orange-800';
    case 'utilities':
      return 'bg-green-100 text-green-800';
    case 'batch-operations':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get operation status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'success':
      return 'text-success-600';
    case 'error':
      return 'text-error-600';
    case 'pending':
      return 'text-warning-600';
    default:
      return 'text-gray-600';
  }
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}; 