import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Gamepad2, Zap, Heart, Coins } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * 像素游戏RPG主题专用组件集合
 */

/**
 * 像素风格对话框组件
 */
interface PixelDialogProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  showBorder?: boolean;
}

export const PixelDialog: React.FC<PixelDialogProps> = ({
  children,
  title,
  className = '',
  showBorder = true
}) => {
  const { currentTheme } = useTheme();

  if (currentTheme !== 'pixel') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`
        pixel-border bg-blue-900 text-white font-pixel
        ${showBorder ? 'border-4 border-white' : ''}
        ${className}
      `}
    >
      {title && (
        <div className="bg-blue-800 px-4 py-2 border-b-2 border-white">
          <h3 className="text-yellow-300 text-sm uppercase tracking-wider">
            {title}
          </h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};

/**
 * 像素风格按钮组件
 */
interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gray-600 border-gray-400 text-white hover:bg-gray-500';
      case 'success':
        return 'bg-green-600 border-green-400 text-white hover:bg-green-500';
      case 'danger':
        return 'bg-red-600 border-red-400 text-white hover:bg-red-500';
      default:
        return 'bg-blue-600 border-blue-400 text-white hover:bg-blue-500';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1 text-xs';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        pixel-border border-2 font-pixel uppercase tracking-wider
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};

/**
 * 像素风格输入框组件
 */
interface PixelInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: string;
}

export const PixelInput: React.FC<PixelInputProps> = ({
  placeholder,
  value,
  onChange,
  className = '',
  type = 'text'
}) => {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`pixel-border border-2 border-gray-400 bg-white ${className}`}>
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-transparent font-pixel text-black placeholder-gray-500 outline-none"
      />
    </div>
  );
};

/**
 * 8-bit小人跑步动画组件
 */
export const PixelRunner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`pixel-runner ${className}`}>
      <div className="relative w-8 h-8 bg-blue-500 pixel-border">
        {/* 简化的像素小人 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Gamepad2 
            className={`w-6 h-6 text-white transform ${
              frame % 2 === 0 ? 'translate-x-0' : 'translate-x-0.5'
            }`} 
          />
        </div>
        {/* 跑步效果 */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 ${
          frame < 2 ? 'opacity-100' : 'opacity-50'
        }`} />
      </div>
    </div>
  );
};

/**
 * 像素宝箱动画组件
 */
export const PixelTreasure: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      animate={isShaking ? { x: [-2, 2, -2, 2, 0] } : {}}
      transition={{ duration: 0.5 }}
      className={`pixel-treasure ${className}`}
    >
      <div className="w-12 h-10 bg-yellow-600 pixel-border border-2 border-yellow-400 relative">
        <div className="absolute top-1 left-1 right-1 h-2 bg-yellow-500" />
        <div className="absolute top-3 left-2 right-2 bottom-1 bg-yellow-700" />
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black" />
      </div>
    </motion.div>
  );
};

/**
 * 像素风格任务卷轴组件
 */
interface PixelScrollProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const PixelScroll: React.FC<PixelScrollProps> = ({
  children,
  title = '任务卷轴',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`pixel-scroll bg-yellow-100 text-black ${className}`}
    >
      {/* 卷轴顶部 */}
      <div className="h-4 bg-yellow-800 pixel-border border-b-2 border-yellow-600 relative">
        <div className="absolute left-2 top-1 w-2 h-2 bg-yellow-600 rounded-full" />
        <div className="absolute right-2 top-1 w-2 h-2 bg-yellow-600 rounded-full" />
      </div>
      
      {/* 卷轴内容 */}
      <div className="p-6 bg-yellow-50">
        <h3 className="font-pixel text-lg text-center mb-4 text-yellow-800">
          {title}
        </h3>
        {children}
      </div>
      
      {/* 卷轴底部 */}
      <div className="h-4 bg-yellow-800 pixel-border border-t-2 border-yellow-600 relative">
        <div className="absolute left-2 top-1 w-2 h-2 bg-yellow-600 rounded-full" />
        <div className="absolute right-2 top-1 w-2 h-2 bg-yellow-600 rounded-full" />
      </div>
    </motion.div>
  );
};

/**
 * 像素风格任务项组件
 */
interface PixelTaskItemProps {
  title: string;
  description?: string;
  completed?: boolean;
  icon?: React.ReactNode;
  onComplete?: () => void;
  className?: string;
}

export const PixelTaskItem: React.FC<PixelTaskItemProps> = ({
  title,
  description,
  completed = false,
  icon,
  onComplete,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`
        flex items-center space-x-3 p-3 mb-2 
        ${completed ? 'bg-green-100 border-green-400' : 'bg-white border-gray-400'}
        pixel-border border-2 ${className}
      `}
    >
      {/* 任务图标 */}
      <div className="flex-shrink-0">
        {completed ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-yellow-500 pixel-border border-2 border-yellow-400 flex items-center justify-center"
          >
            <Star className="w-4 h-4 text-white" />
          </motion.div>
        ) : (
          <div className="w-6 h-6 bg-gray-300 pixel-border border-2 border-gray-400 flex items-center justify-center">
            {icon || <div className="w-2 h-2 bg-gray-600" />}
          </div>
        )}
      </div>
      
      {/* 任务内容 */}
      <div className="flex-1">
        <h4 className={`font-pixel text-sm ${
          completed ? 'text-green-800 line-through' : 'text-black'
        }`}>
          {title}
        </h4>
        {description && (
          <p className={`text-xs mt-1 ${
            completed ? 'text-green-600' : 'text-gray-600'
          }`}>
            {description}
          </p>
        )}
      </div>
      
      {/* 完成按钮 */}
      {!completed && onComplete && (
        <PixelButton
          size="sm"
          variant="success"
          onClick={onComplete}
        >
          完成
        </PixelButton>
      )}
    </motion.div>
  );
};

/**
 * 像素风格状态栏组件
 */
interface PixelStatusBarProps {
  level?: number;
  exp?: number;
  maxExp?: number;
  coins?: number;
  health?: number;
  maxHealth?: number;
  className?: string;
}

export const PixelStatusBar: React.FC<PixelStatusBarProps> = ({
  level = 1,
  exp = 0,
  maxExp = 100,
  coins = 0,
  health = 100,
  maxHealth = 100,
  className = ''
}) => {
  return (
    <div className={`pixel-status-bar bg-blue-900 text-white p-3 ${className}`}>
      <div className="flex items-center justify-between font-pixel text-xs">
        {/* 等级 */}
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>LV.{level}</span>
        </div>
        
        {/* 经验值 */}
        <div className="flex items-center space-x-2">
          <span>EXP</span>
          <div className="w-20 h-2 bg-gray-700 pixel-border">
            <div 
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{ width: `${(exp / maxExp) * 100}%` }}
            />
          </div>
          <span>{exp}/{maxExp}</span>
        </div>
        
        {/* 金币 */}
        <div className="flex items-center space-x-1">
          <Coins className="w-4 h-4 text-yellow-400" />
          <span>{coins}</span>
        </div>
        
        {/* 生命值 */}
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-red-400" />
          <div className="w-16 h-2 bg-gray-700 pixel-border">
            <div 
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${(health / maxHealth) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 像素风格加载动画组件
 */
export const PixelLoading: React.FC<{ 
  message?: string; 
  className?: string;
}> = ({ 
  message = '加载中...', 
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <PixelRunner />
      <div className="font-pixel text-sm text-center">
        {message}
      </div>
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.2, 1],
              backgroundColor: ['#3B82F6', '#EF4444', '#10B981', '#3B82F6']
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
            className="w-2 h-2 pixel-border"
          />
        ))}
      </div>
    </div>
  );
};