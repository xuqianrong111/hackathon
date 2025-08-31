import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 主题类型定义
export type ThemeType = 'vintage' | 'agent' | 'pixel';

// 主题配置接口
interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  effects: {
    blur: string;
    shadow: string;
    glow: string;
  };
}

// 主题配置数据
const themeConfigs: Record<ThemeType, ThemeConfig> = {
  vintage: {
    name: 'vintage',
    displayName: '复古探险家',
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      accent: '#CD853F',
      background: '#F5E6D3',
      surface: '#FFF8DC',
      text: '#2F1B14',
      textSecondary: '#8B4513',
      border: '#D2691E',
      success: '#228B22',
      warning: '#FF8C00',
      error: '#DC143C'
    },
    fonts: {
      primary: '"Crimson Text", serif',
      secondary: '"Playfair Display", serif',
      mono: '"Courier New", monospace'
    },
    effects: {
      blur: 'blur(2px)',
      shadow: '0 4px 8px rgba(139, 69, 19, 0.3)',
      glow: '0 0 10px rgba(205, 133, 63, 0.5)'
    }
  },
  agent: {
    name: 'agent',
    displayName: '神秘特工档案',
    colors: {
      primary: '#00FF00',
      secondary: '#FFFFFF',
      accent: '#FF0000',
      background: '#000000',
      surface: '#1a1a1a',
      text: '#00FF00',
      textSecondary: '#FFFFFF',
      border: '#00FF00',
      success: '#00FF00',
      warning: '#FFFF00',
      error: '#FF0000'
    },
    fonts: {
      primary: '"Source Code Pro", monospace',
      secondary: '"Inconsolata", monospace',
      mono: '"Source Code Pro", monospace'
    },
    effects: {
      blur: 'blur(1px)',
      shadow: '0 0 10px rgba(0, 255, 0, 0.5)',
      glow: '0 0 20px rgba(0, 255, 0, 0.8)'
    }
  },
  pixel: {
    name: 'pixel',
    displayName: '像素游戏RPG',
    colors: {
      primary: '#FF6B35',
      secondary: '#F7931E',
      accent: '#FFD23F',
      background: '#2E86AB',
      surface: '#A23B72',
      text: '#FFFFFF',
      textSecondary: '#FFD23F',
      border: '#FFFFFF',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336'
    },
    fonts: {
      primary: '"Press Start 2P", cursive',
      secondary: '"Press Start 2P", cursive',
      mono: '"Press Start 2P", cursive'
    },
    effects: {
      blur: 'none',
      shadow: '4px 4px 0px rgba(0, 0, 0, 0.8)',
      glow: '0 0 8px rgba(255, 210, 63, 0.6)'
    }
  }
};

// 主题上下文接口
interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  availableThemes: { value: ThemeType; label: string }[];
}

// 创建主题上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题提供者组件
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('vintage');

  // 从本地存储加载主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeType;
    if (savedTheme && themeConfigs[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // 应用CSS变量到根元素
  useEffect(() => {
    const root = document.documentElement;
    const config = themeConfigs[currentTheme];
    
    // 设置颜色变量
    Object.entries(config.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // 设置字体变量
    Object.entries(config.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
    
    // 设置效果变量
    Object.entries(config.effects).forEach(([key, value]) => {
      root.style.setProperty(`--effect-${key}`, value);
    });
    
    // 设置主题数据属性
    root.setAttribute('data-theme', currentTheme);
    // 同时设置类名以兼容现有样式
    root.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  // 设置主题并保存到本地存储
  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
  };

  // 可用主题列表
  const availableThemes = Object.entries(themeConfigs).map(([key, config]) => ({
    value: key as ThemeType,
    label: config.displayName
  }));

  const value: ThemeContextType = {
    currentTheme,
    themeConfig: themeConfigs[currentTheme],
    setTheme,
    availableThemes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用主题的Hook
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 导出主题配置供其他组件使用
export { themeConfigs };
export type { ThemeConfig };