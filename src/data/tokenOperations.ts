import { TokenOperation } from '../types';

export const tokenOperations: TokenOperation[] = [
  // Basic Operations
  {
    id: 'create-mint',
    type: 'create-mint',
    title: 'Create Mint',
    description: 'Create a new token mint with specified decimals and authorities',
    command: 'arch-cli token create-mint --decimals {decimals} --mint-authority {mint-authority} --keypair-path {keypair-path}',
    category: 'basic',
    parameters: [
      {
        name: 'decimals',
        type: 'number',
        required: true,
        description: 'Number of decimal places (0-9)',
        defaultValue: 6,
        validation: { min: 0, max: 9 }
      },
      {
        name: 'mint-authority',
        type: 'string',
        required: true,
        description: 'Path to keypair file for mint authority',
        placeholder: './mint-authority.json'
      },
      {
        name: 'freeze-authority',
        type: 'string',
        required: false,
        description: 'Path to keypair file for freeze authority (optional)',
        placeholder: './freeze-authority.json'
      },
      {
        name: 'keypair-path',
        type: 'string',
        required: true,
        description: 'Path to keypair file for transaction signing',
        placeholder: './payer.json'
      }
    ],
    example: 'arch-cli token create-mint --decimals 6 --mint-authority ./mint-authority.json --keypair-path ./payer.json'
  },
  {
    id: 'show-mint',
    type: 'show-mint',
    title: 'Show Mint',
    description: 'Display information about a token mint',
    command: 'arch-cli token show-mint {mint-address}',
    category: 'basic',
    parameters: [
      {
        name: 'mint-address',
        type: 'string',
        required: true,
        description: 'Public key of the mint to display',
        placeholder: '11111111111111111111111111111111'
      }
    ],
    example: 'arch-cli token show-mint 11111111111111111111111111111111'
  },
  {
    id: 'create-account',
    type: 'create-account',
    title: 'Create Token Account',
    description: 'Create a new token account for a specific mint',
    command: 'arch-cli token create-account --mint {mint} --owner {owner} --keypair-path {keypair-path}',
    category: 'basic',
    parameters: [
      {
        name: 'mint',
        type: 'string',
        required: true,
        description: 'Public key of the mint',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      },
      {
        name: 'keypair-path',
        type: 'string',
        required: true,
        description: 'Path to keypair file for transaction signing',
        placeholder: './payer.json'
      }
    ],
    example: 'arch-cli token create-account --mint 11111111111111111111111111111111 --owner ./owner.json --keypair-path ./payer.json'
  },
  {
    id: 'show-account',
    type: 'show-account',
    title: 'Show Token Account',
    description: 'Display information about a token account',
    command: 'arch-cli token show-account {account-address}',
    category: 'basic',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the token account',
        placeholder: '11111111111111111111111111111111'
      }
    ],
    example: 'arch-cli token show-account 11111111111111111111111111111111'
  },
  {
    id: 'mint',
    type: 'mint',
    title: 'Mint Tokens',
    description: 'Mint tokens to a destination account',
    command: 'arch-cli token mint {mint-address} {account-address} {amount} --authority {authority}',
    category: 'basic',
    parameters: [
      {
        name: 'mint-address',
        type: 'string',
        required: true,
        description: 'Public key of the mint',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the destination account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Amount to mint (raw amount)',
        defaultValue: 1000000
      },
      {
        name: 'authority',
        type: 'string',
        required: true,
        description: 'Path to keypair file for mint authority',
        placeholder: './mint-authority.json'
      }
    ],
    example: 'arch-cli token mint 11111111111111111111111111111111 11111111111111111111111111111111 1000000 --authority ./mint-authority.json'
  },
  {
    id: 'transfer',
    type: 'transfer',
    title: 'Transfer Tokens',
    description: 'Transfer tokens between accounts',
    command: 'arch-cli token transfer {source-account} {destination-account} {amount} --owner {owner}',
    category: 'basic',
    parameters: [
      {
        name: 'source-account',
        type: 'string',
        required: true,
        description: 'Public key of source account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'destination-account',
        type: 'string',
        required: true,
        description: 'Public key of destination account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Amount to transfer (raw amount)',
        defaultValue: 100000
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      }
    ],
    example: 'arch-cli token transfer 11111111111111111111111111111111 11111111111111111111111111111111 100000 --owner ./owner.json'
  },
  {
    id: 'burn',
    type: 'burn',
    title: 'Burn Tokens',
    description: 'Burn tokens from an account',
    command: 'arch-cli token burn {account-address} {amount} --owner {owner}',
    category: 'basic',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the account to burn from',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Amount to burn (raw amount)',
        defaultValue: 10000
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      }
    ],
    example: 'arch-cli token burn 11111111111111111111111111111111 10000 --owner ./owner.json'
  },
  {
    id: 'approve',
    type: 'approve',
    title: 'Approve Delegate',
    description: 'Approve a delegate to spend tokens from an account',
    command: 'arch-cli token approve {account-address} {delegate-address} {amount} --owner {owner}',
    category: 'basic',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the account to approve',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'delegate-address',
        type: 'string',
        required: true,
        description: 'Public key of the delegate',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Amount to approve',
        defaultValue: 50000
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      }
    ],
    example: 'arch-cli token approve 11111111111111111111111111111111 11111111111111111111111111111111 50000 --owner ./owner.json'
  },
  {
    id: 'revoke',
    type: 'revoke',
    title: 'Revoke Delegate',
    description: 'Revoke delegate authority from an account',
    command: 'arch-cli token revoke {account-address} --owner {owner}',
    category: 'basic',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the account to revoke',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      }
    ],
    example: 'arch-cli token revoke 11111111111111111111111111111111 --owner ./owner.json'
  },
  {
    id: 'freeze-account',
    type: 'freeze-account',
    title: 'Freeze Account',
    description: 'Freeze a token account',
    command: 'arch-cli token freeze-account {account-address} --authority {authority}',
    category: 'basic',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the account to freeze',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'authority',
        type: 'string',
        required: true,
        description: 'Path to keypair file for freeze authority',
        placeholder: './freeze-authority.json'
      }
    ],
    example: 'arch-cli token freeze-account 11111111111111111111111111111111 --authority ./freeze-authority.json'
  },
  {
    id: 'thaw-account',
    type: 'thaw-account',
    title: 'Thaw Account',
    description: 'Thaw a frozen token account',
    command: 'arch-cli token thaw-account {account-address} --authority {authority}',
    category: 'basic',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the account to thaw',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'authority',
        type: 'string',
        required: true,
        description: 'Path to keypair file for freeze authority',
        placeholder: './freeze-authority.json'
      }
    ],
    example: 'arch-cli token thaw-account 11111111111111111111111111111111 --authority ./freeze-authority.json'
  },
  // Utility Operations
  {
    id: 'balance',
    type: 'balance',
    title: 'Check Balance',
    description: 'Display token balance for an account',
    command: 'arch-cli token balance {account-address}',
    category: 'utilities',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the token account',
        placeholder: '11111111111111111111111111111111'
      }
    ],
    example: 'arch-cli token balance 11111111111111111111111111111111'
  },
  {
    id: 'supply',
    type: 'supply',
    title: 'Check Supply',
    description: 'Display mint supply information',
    command: 'arch-cli token supply {mint-address}',
    category: 'utilities',
    parameters: [
      {
        name: 'mint-address',
        type: 'string',
        required: true,
        description: 'Public key of the mint',
        placeholder: '11111111111111111111111111111111'
      }
    ],
    example: 'arch-cli token supply 11111111111111111111111111111111'
  },
  {
    id: 'accounts',
    type: 'accounts',
    title: 'List Accounts',
    description: 'List token accounts for a mint',
    command: 'arch-cli token accounts {mint-address}',
    category: 'utilities',
    parameters: [
      {
        name: 'mint-address',
        type: 'string',
        required: true,
        description: 'Public key of the mint',
        placeholder: '11111111111111111111111111111111'
      }
    ],
    example: 'arch-cli token accounts 11111111111111111111111111111111'
  },
  {
    id: 'mints',
    type: 'mints',
    title: 'List Mints',
    description: 'List all token mints',
    command: 'arch-cli token mints',
    category: 'utilities',
    parameters: [],
    example: 'arch-cli token mints'
  },
  {
    id: 'amount-to-ui',
    type: 'amount-to-ui',
    title: 'Convert Amount to UI',
    description: 'Convert raw amount to UI format',
    command: 'arch-cli token amount-to-ui {mint-address} {amount}',
    category: 'utilities',
    parameters: [
      {
        name: 'mint-address',
        type: 'string',
        required: true,
        description: 'Public key of the mint',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Raw amount to convert',
        defaultValue: 1000000
      }
    ],
    example: 'arch-cli token amount-to-ui 11111111111111111111111111111111 1000000'
  },
  {
    id: 'ui-to-amount',
    type: 'ui-to-amount',
    title: 'Convert UI to Amount',
    description: 'Convert UI amount to raw format',
    command: 'arch-cli token ui-to-amount {mint-address} {ui-amount}',
    category: 'utilities',
    parameters: [
      {
        name: 'mint-address',
        type: 'string',
        required: true,
        description: 'Public key of the mint',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'ui-amount',
        type: 'string',
        required: true,
        description: 'UI amount to convert',
        placeholder: '1.5'
      }
    ],
    example: 'arch-cli token ui-to-amount 11111111111111111111111111111111 1.5'
  },
  // Advanced Operations
  {
    id: 'transfer-checked',
    type: 'transfer-checked',
    title: 'Transfer Checked',
    description: 'Transfer tokens with decimal verification',
    command: 'arch-cli token transfer-checked {source-account} {destination-account} {amount} {decimals} --owner {owner}',
    category: 'advanced',
    parameters: [
      {
        name: 'source-account',
        type: 'string',
        required: true,
        description: 'Public key of source account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'destination-account',
        type: 'string',
        required: true,
        description: 'Public key of destination account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Amount to transfer (raw amount)',
        defaultValue: 100000
      },
      {
        name: 'decimals',
        type: 'number',
        required: true,
        description: 'Expected decimals for verification',
        defaultValue: 6,
        validation: { min: 0, max: 9 }
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      }
    ],
    example: 'arch-cli token transfer-checked 11111111111111111111111111111111 11111111111111111111111111111111 100000 6 --owner ./owner.json'
  },
  {
    id: 'approve-checked',
    type: 'approve-checked',
    title: 'Approve Checked',
    description: 'Approve delegate with decimal verification',
    command: 'arch-cli token approve-checked {account-address} {delegate-address} {amount} {decimals} --owner {owner}',
    category: 'advanced',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the account to approve',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'delegate-address',
        type: 'string',
        required: true,
        description: 'Public key of the delegate',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Amount to approve',
        defaultValue: 50000
      },
      {
        name: 'decimals',
        type: 'number',
        required: true,
        description: 'Expected decimals for verification',
        defaultValue: 6,
        validation: { min: 0, max: 9 }
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      }
    ],
    example: 'arch-cli token approve-checked 11111111111111111111111111111111 11111111111111111111111111111111 50000 6 --owner ./owner.json'
  },
  {
    id: 'mint-to-checked',
    type: 'mint-to-checked',
    title: 'Mint To Checked',
    description: 'Mint tokens with decimal verification',
    command: 'arch-cli token mint-to-checked {mint-address} {account-address} {amount} {decimals} --authority {authority}',
    category: 'advanced',
    parameters: [
      {
        name: 'mint-address',
        type: 'string',
        required: true,
        description: 'Public key of the mint',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the destination account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Amount to mint (raw amount)',
        defaultValue: 1000000
      },
      {
        name: 'decimals',
        type: 'number',
        required: true,
        description: 'Expected decimals for verification',
        defaultValue: 6,
        validation: { min: 0, max: 9 }
      },
      {
        name: 'authority',
        type: 'string',
        required: true,
        description: 'Path to keypair file for mint authority',
        placeholder: './mint-authority.json'
      }
    ],
    example: 'arch-cli token mint-to-checked 11111111111111111111111111111111 11111111111111111111111111111111 1000000 6 --authority ./mint-authority.json'
  },
  {
    id: 'burn-checked',
    type: 'burn-checked',
    title: 'Burn Checked',
    description: 'Burn tokens with decimal verification',
    command: 'arch-cli token burn-checked {account-address} {amount} {decimals} --owner {owner}',
    category: 'advanced',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the account to burn from',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'amount',
        type: 'number',
        required: true,
        description: 'Amount to burn (raw amount)',
        defaultValue: 10000
      },
      {
        name: 'decimals',
        type: 'number',
        required: true,
        description: 'Expected decimals for verification',
        defaultValue: 6,
        validation: { min: 0, max: 9 }
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      }
    ],
    example: 'arch-cli token burn-checked 11111111111111111111111111111111 10000 6 --owner ./owner.json'
  },
  {
    id: 'set-authority',
    type: 'set-authority',
    title: 'Set Authority',
    description: 'Set authority on mint or account',
    command: 'arch-cli token set-authority {target-address} --authority-type {authority-type} --new-authority {new-authority} --current-authority {current-authority}',
    category: 'advanced',
    parameters: [
      {
        name: 'target-address',
        type: 'string',
        required: true,
        description: 'Public key of the mint or account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'authority-type',
        type: 'string',
        required: true,
        description: 'Type of authority to set (mint, freeze, account-owner)',
        placeholder: 'mint'
      },
      {
        name: 'new-authority',
        type: 'string',
        required: false,
        description: 'New authority address (use "none" to disable)',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'current-authority',
        type: 'string',
        required: true,
        description: 'Path to keypair file for current authority',
        placeholder: './current-authority.json'
      }
    ],
    example: 'arch-cli token set-authority 11111111111111111111111111111111 --authority-type mint --new-authority 11111111111111111111111111111111 --current-authority ./current-authority.json'
  },
  {
    id: 'close-account',
    type: 'close-account',
    title: 'Close Account',
    description: 'Close a token account and recover rent',
    command: 'arch-cli token close-account {account-address} {destination-address} --owner {owner}',
    category: 'advanced',
    parameters: [
      {
        name: 'account-address',
        type: 'string',
        required: true,
        description: 'Public key of the account to close',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'destination-address',
        type: 'string',
        required: true,
        description: 'Public key of the destination for remaining SOL',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'owner',
        type: 'string',
        required: true,
        description: 'Path to keypair file for account owner',
        placeholder: './owner.json'
      }
    ],
    example: 'arch-cli token close-account 11111111111111111111111111111111 11111111111111111111111111111111 --owner ./owner.json'
  },
  // Multisig Operations
  {
    id: 'create-multisig',
    type: 'create-multisig',
    title: 'Create Multisig',
    description: 'Create a multisignature authority',
    command: 'arch-cli token create-multisig {m} --signers {signers} --keypair-path {keypair-path}',
    category: 'multisig',
    parameters: [
      {
        name: 'm',
        type: 'number',
        required: true,
        description: 'Number of required signers (M)',
        defaultValue: 2,
        validation: { min: 1, max: 11 }
      },
      {
        name: 'signers',
        type: 'string',
        required: true,
        description: 'Comma-separated keypair paths for signers',
        placeholder: './signer1.json,./signer2.json,./signer3.json'
      },
      {
        name: 'keypair-path',
        type: 'string',
        required: true,
        description: 'Path to keypair file for transaction signing',
        placeholder: './payer.json'
      }
    ],
    example: 'arch-cli token create-multisig 2 --signers ./signer1.json,./signer2.json --keypair-path ./payer.json'
  },
  {
    id: 'multisig-sign',
    type: 'multisig-sign',
    title: 'Sign Multisig',
    description: 'Sign a transaction with multisig',
    command: 'arch-cli token multisig-sign {multisig-address} {transaction} --keypair-path {keypair-path}',
    category: 'multisig',
    parameters: [
      {
        name: 'multisig-address',
        type: 'string',
        required: true,
        description: 'Public key of the multisig account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'transaction',
        type: 'string',
        required: true,
        description: 'Transaction to sign (base64 encoded)',
        placeholder: 'base64-encoded-transaction'
      },
      {
        name: 'keypair-path',
        type: 'string',
        required: true,
        description: 'Path to keypair file for the signer',
        placeholder: './signer.json'
      }
    ],
    example: 'arch-cli token multisig-sign 11111111111111111111111111111111 base64-encoded-transaction --keypair-path ./signer.json'
  },
  {
    id: 'multisig-execute',
    type: 'multisig-execute',
    title: 'Execute Multisig',
    description: 'Execute a signed multisig transaction',
    command: 'arch-cli token multisig-execute {multisig-address} {transaction} --signers {signers} --keypair-path {keypair-path}',
    category: 'multisig',
    parameters: [
      {
        name: 'multisig-address',
        type: 'string',
        required: true,
        description: 'Public key of the multisig account',
        placeholder: '11111111111111111111111111111111'
      },
      {
        name: 'transaction',
        type: 'string',
        required: true,
        description: 'Transaction to execute (base64 encoded)',
        placeholder: 'base64-encoded-transaction'
      },
      {
        name: 'signers',
        type: 'string',
        required: true,
        description: 'Comma-separated keypair paths for signers',
        placeholder: './signer1.json,./signer2.json'
      },
      {
        name: 'keypair-path',
        type: 'string',
        required: true,
        description: 'Path to keypair file for transaction signing (fee payer)',
        placeholder: './payer.json'
      }
    ],
    example: 'arch-cli token multisig-execute 11111111111111111111111111111111 base64-encoded-transaction --signers ./signer1.json,./signer2.json --keypair-path ./payer.json'
  },
  {
    id: 'multisig-show',
    type: 'multisig-show',
    title: 'Show Multisig',
    description: 'Show multisig account information',
    command: 'arch-cli token multisig-show {multisig-address}',
    category: 'multisig',
    parameters: [
      {
        name: 'multisig-address',
        type: 'string',
        required: true,
        description: 'Public key of the multisig account',
        placeholder: '11111111111111111111111111111111'
      }
    ],
    example: 'arch-cli token multisig-show 11111111111111111111111111111111'
  },
  // Batch Operations
  {
    id: 'batch-transfer',
    type: 'batch-transfer',
    title: 'Batch Transfer',
    description: 'Batch transfer tokens to multiple accounts',
    command: 'arch-cli token batch-transfer {transfers-file} --keypair-path {keypair-path}',
    category: 'batch-operations',
    parameters: [
      {
        name: 'transfers-file',
        type: 'file',
        required: true,
        description: 'JSON file containing transfer operations',
        placeholder: './transfers.json'
      },
      {
        name: 'keypair-path',
        type: 'string',
        required: true,
        description: 'Path to keypair file for transaction signing',
        placeholder: './payer.json'
      }
    ],
    example: 'arch-cli token batch-transfer ./transfers.json --keypair-path ./payer.json'
  },
  {
    id: 'batch-mint',
    type: 'batch-mint',
    title: 'Batch Mint',
    description: 'Batch mint tokens to multiple accounts',
    command: 'arch-cli token batch-mint {mints-file} --keypair-path {keypair-path}',
    category: 'batch-operations',
    parameters: [
      {
        name: 'mints-file',
        type: 'file',
        required: true,
        description: 'JSON file containing mint operations',
        placeholder: './mints.json'
      },
      {
        name: 'keypair-path',
        type: 'string',
        required: true,
        description: 'Path to keypair file for transaction signing',
        placeholder: './payer.json'
      }
    ],
    example: 'arch-cli token batch-mint ./mints.json --keypair-path ./payer.json'
  }
];

export const getOperationsByCategory = (category: string): TokenOperation[] => {
  return tokenOperations.filter(op => op.category === category);
};

export const getOperationById = (id: string): TokenOperation | undefined => {
  return tokenOperations.find(op => op.id === id);
}; 