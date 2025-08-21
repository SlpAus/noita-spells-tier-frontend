import React, { createContext, useState, useContext, ReactNode } from 'react';

// 定义模式的类型
export type Mode = 'spell' | 'perk';

// 定义 Context 的类型
interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

// 创建 Context
const ModeContext = createContext<ModeContextType | undefined>(undefined);

// 创建 Provider 组件
export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>('spell'); // 默认模式为 'spell'

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

// 创建一个自定义 Hook 以方便使用
export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};