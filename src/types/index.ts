// Token operation types
export interface TokenOperation {
  id: string;
  type: TokenOperationType;
  title: string;
  description: string;
  command: string;
  parameters: TokenParameter[];
  example: string;
  category: TokenCategory;
}

export type TokenOperationType = 
  | 'create-mint'
  | 'show-mint'
  | 'create-account'
  | 'show-account'
  | 'mint'
  | 'transfer'
  | 'burn'
  | 'approve'
  | 'revoke'
  | 'freeze-account'
  | 'thaw-account'
  | 'balance'
  | 'supply'
  | 'accounts'
  | 'mints'
  | 'amount-to-ui'
  | 'ui-to-amount'
  | 'create-multisig'
  | 'multisig-sign'
  | 'multisig-execute'
  | 'multisig-show'
  | 'transfer-checked'
  | 'approve-checked'
  | 'mint-to-checked'
  | 'burn-checked'
  | 'set-authority'
  | 'close-account'
  | 'batch-transfer'
  | 'batch-mint';

export type TokenCategory = 
  | 'basic'
  | 'advanced'
  | 'multisig'
  | 'utilities'
  | 'batch-operations';

export interface TokenParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'file';
  required: boolean;
  description: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

// Demo state types
export interface DemoState {
  currentOperation: TokenOperation | null;
  parameters: Record<string, any>;
  commandHistory: CommandHistory[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

export interface CommandHistory {
  id: string;
  command: string;
  timestamp: Date;
  status: 'success' | 'error' | 'pending';
  output?: string;
  error?: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  category: TokenCategory;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'file' | 'select' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Token account types
export interface TokenAccount {
  address: string;
  mint: string;
  owner: string;
  balance: string;
  decimals: number;
  isFrozen: boolean;
  delegate?: string;
  delegatedAmount?: string;
}

export interface TokenMint {
  address: string;
  decimals: number;
  supply: string;
  mintAuthority?: string;
  freezeAuthority?: string;
  isInitialized: boolean;
}

// Multisig types
export interface MultisigAccount {
  address: string;
  m: number;
  n: number;
  signers: string[];
  pendingTransactions: string[];
} 