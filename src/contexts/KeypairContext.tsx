import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Keypair {
  id: string;
  name: string;
  publicKey: string;
  privateKey: string;
  createdAt: Date;
  description?: string;
}

interface KeypairContextType {
  keypairs: Keypair[];
  addKeypair: (keypair: Keypair) => void;
  removeKeypair: (id: string) => void;
  getKeypairByName: (name: string) => Keypair | undefined;
  getKeypairById: (id: string) => Keypair | undefined;
}

const KeypairContext = createContext<KeypairContextType | undefined>(undefined);

export const useKeypairs = () => {
  const context = useContext(KeypairContext);
  if (!context) {
    throw new Error('useKeypairs must be used within a KeypairProvider');
  }
  return context;
};

interface KeypairProviderProps {
  children: ReactNode;
}

export const KeypairProvider: React.FC<KeypairProviderProps> = ({ children }) => {
  const [keypairs, setKeypairs] = useState<Keypair[]>([]);

  const addKeypair = (keypair: Keypair) => {
    setKeypairs(prev => [...prev, keypair]);
  };

  const removeKeypair = (id: string) => {
    setKeypairs(prev => prev.filter(kp => kp.id !== id));
  };

  const getKeypairByName = (name: string) => {
    return keypairs.find(kp => kp.name === name);
  };

  const getKeypairById = (id: string) => {
    return keypairs.find(kp => kp.id === id);
  };

  return (
    <KeypairContext.Provider value={{
      keypairs,
      addKeypair,
      removeKeypair,
      getKeypairByName,
      getKeypairById,
    }}>
      {children}
    </KeypairContext.Provider>
  );
}; 