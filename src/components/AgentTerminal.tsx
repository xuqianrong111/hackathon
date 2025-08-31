import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Zap, Radar } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * 神秘特工档案主题专用终端组件
 * 提供命令行风格的界面和动画效果
 */
interface AgentTerminalProps {
  children?: React.ReactNode;
  showHeader?: boolean;
  className?: string;
}

const AgentTerminal: React.FC<AgentTerminalProps> = ({ 
  children, 
  showHeader = true, 
  className = '' 
}) => {
  const { currentTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(false);

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 模拟连接过程
  useEffect(() => {
    if (currentTheme === 'agent') {
      const timer = setTimeout(() => {
        setIsConnected(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentTheme]);

  if (currentTheme !== 'agent') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-black border border-green-500 font-mono text-green-500 ${className}`}
    >
      {showHeader && (
        <div className="border-b border-green-500 p-3 bg-gray-900">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4" />
                <span>SECURE TERMINAL v2.1.7</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                } terminal-blink`} />
                <span>{isConnected ? 'CONNECTED' : 'CONNECTING...'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>{currentTime.toLocaleTimeString()}</span>
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span className="text-xs">ENCRYPTED</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 screen-flicker">
        {children}
      </div>
    </motion.div>
  );
};

/**
 * 终端输入框组件
 */
interface TerminalInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({
  placeholder = 'Enter command...',
  value = '',
  onChange,
  onSubmit,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showCursor, setShowCursor] = useState(true);

  // 光标闪烁效果
  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit?.(inputValue);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center text-green-500 font-mono">
        <span className="mr-2 text-green-400">&gt;</span>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-green-500 font-mono flex-1 placeholder-green-700"
        />
        <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
      </div>
    </div>
  );
};

/**
 * 终端按钮组件
 */
interface TerminalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger' | 'warning';
  className?: string;
  disabled?: boolean;
}

export const TerminalButton: React.FC<TerminalButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 border-red-500 hover:bg-red-700';
      case 'warning':
        return 'bg-yellow-600 border-yellow-500 hover:bg-yellow-700';
      default:
        return 'bg-green-600 border-green-500 hover:bg-green-700';
    }
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        px-4 py-2 border-2 font-mono text-sm uppercase tracking-wider
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantStyles()}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

/**
 * 雷达扫描组件
 */
export const RadarScan: React.FC<{ size?: number; className?: string }> = ({ 
  size = 100, 
  className = '' 
}) => {
  return (
    <div 
      className={`radar-scan ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Radar className="w-6 h-6 text-green-500" />
      </div>
    </div>
  );
};

/**
 * 加载动画组件
 */
interface LoadingSequenceProps {
  messages?: string[];
  onComplete?: () => void;
  className?: string;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({
  messages = [
    '正在连接卫星...',
    '分析地理数据...',
    '生成行动方案...',
    '任务准备完成'
  ],
  onComplete,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < messages.length) {
      const currentMessage = messages[currentIndex];
      
      if (charIndex < currentMessage.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentIndex(currentIndex + 1);
          setCharIndex(0);
          setDisplayText('');
        }, 1000);
        return () => clearTimeout(timer);
      }
    } else {
      onComplete?.();
    }
  }, [currentIndex, charIndex, messages, onComplete]);

  return (
    <div className={`font-mono text-green-500 ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        <span className="typewriter">{displayText}</span>
      </div>
      <div className="mt-2 text-xs text-green-700">
        [{currentIndex + 1}/{messages.length}] 进度: {Math.round(((currentIndex + 1) / messages.length) * 100)}%
      </div>
    </div>
  );
};

export { AgentTerminal };
export default AgentTerminal;