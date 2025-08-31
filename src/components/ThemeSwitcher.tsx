import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown, Scroll, Terminal, Gamepad2, Sparkles } from 'lucide-react';
import { useTheme, themeConfigs, type ThemeType } from '../contexts/ThemeContext';

/**
 * 主题切换组件
 * 提供用户界面来切换不同的主题风格
 */
const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // 获取主题描述
  const getThemeDescription = (theme: ThemeType) => {
    switch (theme) {
      case 'vintage':
        return '经典复古风格，温暖的色调和优雅的字体';
      case 'agent':
        return '终端风格，灵光绿文字和命令行界面';
      case 'pixel':
        return '8-bit像素风格，下沉和像素字体';
      default:
        return '';
    }
  };

  const themeIcons = {
    vintage: Scroll,
    agent: Terminal,
    pixel: Gamepad2
  };

  const currentThemeData = themeConfigs[currentTheme];
  const CurrentIcon = themeIcons[currentTheme];

  const handleThemeChange = (theme: ThemeType) => {
    setTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* 主题切换按钮 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center space-x-2 px-4 py-2 border-2 rounded-lg shadow-lg transition-all duration-300
          ${currentTheme === 'agent' ? 'font-mono' : ''}
          ${currentTheme === 'pixel' ? 'font-pixel pixel-border' : ''}
          ${currentTheme === 'vintage' ? 'font-serif' : ''}
        `}
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text)'
        }}
      >
        <CurrentIcon className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
        <span className="font-medium">
          {currentThemeData.displayName}
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          style={{ color: 'var(--color-text)' }}
        />
        {currentTheme === 'agent' && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full terminal-blink" />
        )}
      </motion.button>

      {/* 主题选择下拉菜单 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute top-full mt-2 right-0 border-2 rounded-lg shadow-xl z-50 min-w-80
              ${currentTheme === 'pixel' ? 'pixel-border' : ''}
            `}
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)'
            }}
          >
            <div className="p-2">
              {/* 标题 */}
              <div className={`
                px-3 py-2 mb-2 border-b
                ${currentTheme === 'agent' ? 'font-mono' :
                  currentTheme === 'pixel' ? 'font-pixel' :
                  'font-serif'}
              `}
              style={{
                color: 'var(--color-primary)',
                borderColor: 'var(--color-border)'
              }}>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">选择主题风格</span>
                </div>
              </div>

              {availableThemes.map((theme) => {
                const Icon = themeIcons[theme.value as keyof typeof themeIcons];
                
                return (
                  <motion.button
                    key={theme.value}
                    onClick={() => handleThemeChange(theme.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full p-3 rounded-lg border-2 transition-all duration-300 text-left
                      ${theme.value === 'pixel' ? 'pixel-border' : ''}
                    `}
                    style={{
                      backgroundColor: theme.value === currentTheme ? 'var(--color-primary)' : 'var(--color-background)',
                      borderColor: theme.value === currentTheme ? 'var(--color-accent)' : 'var(--color-border)',
                      color: theme.value === currentTheme ? 'var(--color-background)' : 'var(--color-text)'
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded" style={{ backgroundColor: 'var(--color-accent)' }}>
                        <Icon className="w-5 h-5" style={{ color: 'var(--color-background)' }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium" style={{ color: 'inherit' }}>
                          {theme.label}
                        </div>
                        <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                           {getThemeDescription(theme.value)}
                         </div>
                      </div>
                      {theme.value === currentTheme && (
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
            
            {/* 底部提示 */}
            <div className={`
              px-3 py-2 border-t text-xs text-center
              ${currentTheme === 'agent' ? 'font-mono' :
                currentTheme === 'pixel' ? 'font-pixel' :
                ''}
            `}
            style={{
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-border)'
            }}>
              {currentTheme === 'agent' ? '> 主题已应用到全局界面' :
               currentTheme === 'pixel' ? '★ 主题切换完成！' :
               '主题将应用到所有页面'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ThemeSwitcher };
export default ThemeSwitcher;