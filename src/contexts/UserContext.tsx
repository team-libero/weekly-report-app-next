'use client';

import { createContext, useContext, useState } from 'react';

type UserContextType = {
  employeeId: string;
  setEmployeeId: (id: string) => void;
  role: string;
  setRole: (role: string) => void;
};

// 初期値を設定
const initialContext: UserContextType = {
  employeeId: '',
  setEmployeeId: () => {},
  role: '',
  setRole: () => {},
};

const UserContext = createContext<UserContextType>(initialContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [employeeId, setEmployeeId] = useState('');
  const [role, setRole] = useState('');

  return (
    <UserContext.Provider value={{ employeeId, setEmployeeId, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export { UserContext };
