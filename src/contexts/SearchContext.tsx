import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IUser {
  id: number;
  login: string;
}

interface SearchContextType {
  lastSearchedUser: IUser | null;
  setLastSearchedUser: (user: IUser) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [lastSearchedUser, setLastSearchedUser] = useState<IUser | null>(null);

  return (
    <SearchContext.Provider value={{ lastSearchedUser, setLastSearchedUser }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
