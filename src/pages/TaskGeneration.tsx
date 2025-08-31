import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Compass, 
  Camera, 
  Coffee, 
  Palette, 
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  Target,
  Star,
  ChevronDown,
  Terminal,
  Gamepad2
} from 'lucide-react';
import { useTheme, type ThemeType } from '../contexts/ThemeContext';
import { AgentTerminal } from '../components/AgentTerminal';
import { PixelDialog, PixelButton, PixelInput } from '../components/PixelComponents';

/**
 * 任务生成页面组件
 * 包含地点输入、主题选择、任务生成功能
 * 支持多主题切换：复古探险家、神秘特工档案、像素游戏RPG
 */
export default function TaskGeneration() {
  const { currentTheme, setTheme } = useTheme();
  const [location, setLocation] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [duration, setDuration] = useState('2');
  const [difficulty, setDifficulty] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // 探索主题选项
  const themes = [
    {
      id: 'artistic',
      name: '文艺青年',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      description: '寻找艺术角落、独立书店、咖啡馆'
    },
    {
      id: 'foodie',
      name: '美食探索者',
      icon: Coffee,
      color: 'from-orange-500 to-red-500',
      description: '品尝地道小吃、探访老字号'
    },
    {
      id: 'photographer',
      name: '摄影师',
      icon: Camera,
      color: 'from-blue-500 to-teal-500',
      description: '捕捉独特视角、记录城市变迁'
    },
    {
      id: 'social',
      name: '社交达人',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      description: '结识新朋友、参与社区活动'
    }
  ];

  // 难度选项
  const difficulties = [
    { id: 'easy', name: '轻松', description: '适合休闲漫步' },
    { id: 'medium', name: '中等', description: '平衡探索与挑战' },
    { id: 'hard', name: '挑战', description: '深度探索体验' }
  ];

  /**
   * 处理任务生成
   */
  const handleGenerateTask = async () => {
    if (!location || !selectedTheme) {
      alert('请填写完整信息');
      return;
    }

    setIsGenerating(true);
    
    // 模拟API调用
    setTimeout(() => {
      setIsGenerating(false);
      // 这里应该跳转到任务详情页面
      console.log('生成任务:', { location, selectedTheme, duration, difficulty });
    }, 3000);
  };

  /**
   * 切换高级选项显示
   */
  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  // 根据主题渲染不同的界面
  if ((currentTheme as any) === 'agent') {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono p-4">
        <div className="agent-terminal-container">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-controls">
                <div className="control-dot red"></div>
                <div className="control-dot yellow"></div>
                <div className="control-dot green"></div>
              </div>
              <div className="terminal-title">CLASSIFIED MISSION GENERATOR v2.1</div>
            </div>
            <div className="terminal-content">
              <div className="command-line">
                <span className="prompt">AGENT@HEADQUARTERS:~$</span>
                <span className="command">initialize_mission_parameters</span>
              </div>
              <div className="terminal-output">
                <div className="status-line">
                  <span className="status-indicator success">●</span>
                  <span>SECURE CONNECTION ESTABLISHED</span>
                </div>
                <div className="status-line">
                  <span className="status-indicator warning">●</span>
                  <span>CLEARANCE LEVEL: TOP SECRET</span>
                </div>
              </div>
              
              <div className="mission-form">
                <div className="form-section">
                  <div className="command-line">
                    <span className="prompt">LOCATION:</span>
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter target coordinates..."
                    className="terminal-input"
                  />
                </div>
                
                <div className="form-section">
                  <div className="command-line">
                    <span className="prompt">MISSION_TYPE:</span>
                  </div>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value)}
                    className="terminal-select"
                  >
                    <option value="">SELECT OPERATION TYPE</option>
                    <option value="infiltration">INFILTRATION</option>
                    <option value="surveillance">SURVEILLANCE</option>
                    <option value="extraction">EXTRACTION</option>
                    <option value="reconnaissance">RECONNAISSANCE</option>
                    <option value="sabotage">SABOTAGE</option>
                    <option value="intelligence">INTELLIGENCE GATHERING</option>
                  </select>
                </div>
                
                {showAdvanced && (
                  <div className="advanced-options">
                    <div className="form-section">
                      <div className="command-line">
                        <span className="prompt">DURATION:</span>
                      </div>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="terminal-select"
                      >
                        <option value="short">SHORT TERM (1-3 HOURS)</option>
                        <option value="medium">MEDIUM TERM (4-8 HOURS)</option>
                        <option value="long">LONG TERM (1+ DAYS)</option>
                      </select>
                    </div>
                    
                    <div className="form-section">
                      <div className="command-line">
                        <span className="prompt">THREAT_LEVEL:</span>
                      </div>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="terminal-select"
                      >
                        <option value="low">LOW RISK</option>
                        <option value="medium">MODERATE RISK</option>
                        <option value="high">HIGH RISK</option>
                        <option value="extreme">EXTREME RISK</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="form-section">
                    <button
                      type="button"
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="terminal-button secondary"
                    >
                      {showAdvanced ? '▼ HIDE ADVANCED OPTIONS' : '▶ SHOW ADVANCED OPTIONS'}
                    </button>
                  </div>
                  
                  <div className="form-section">
                    <button
                      onClick={handleGenerateTask}
                      disabled={!location || !selectedTheme || isGenerating}
                      className="terminal-button primary"
                    >
                      {isGenerating ? (
                        <>
                          <span className="loading-spinner">⟳</span>
                          EXECUTING MISSION...
                        </>
                      ) : (
                        'INITIATE MISSION'
                      )}
                    </button>
                  </div>
                </div>
                
                {isGenerating && (
                  <div className="mission-generation">
                    <div className="command-line">
                      <span className="prompt">STATUS:</span>
                      <span className="status-text">GENERATING CLASSIFIED MISSION...</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill"></div>
                    </div>
                    <div className="generation-steps">
                      <div className="step active">
                        <span className="step-indicator">●</span>
                        <span>ANALYZING TARGET LOCATION</span>
                      </div>
                      <div className="step">
                        <span className="step-indicator">○</span>
                        <span>ASSESSING THREAT LEVEL</span>
                      </div>
                      <div className="step">
                        <span className="step-indicator">○</span>
                        <span>COMPILING MISSION BRIEFING</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    );
  }

  if ((currentTheme as any) === 'pixel') {
    return (
      <div className="min-h-screen font-pixel bg-gradient-to-b from-blue-900 to-blue-800 p-4">
        <div className="max-w-4xl mx-auto">
          <PixelDialog
          title="任务生成器 v2.0"
          className="max-w-2xl mx-auto"
        >
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2 text-sm">
                  🗺️ 探索地点
                </label>
                <PixelInput
                  value={location}
                  onChange={(value) => setLocation(value)}
                  placeholder="输入城市名称..."
                />
              </div>
              
              <div>
                <label className="block text-white mb-2 text-sm">
                  🎯 选择任务类型
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <PixelButton
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      variant={selectedTheme === theme.id ? 'primary' : 'secondary'}
                      className="text-xs p-2"
                    >
                      {theme.name}
                    </PixelButton>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <PixelButton
                  onClick={handleGenerateTask}
                  disabled={isGenerating || !location || !selectedTheme}
                  variant="primary"
                  className="px-6 py-3"
                >
                  {isGenerating ? (
                    <>
                      <Gamepad2 className="w-4 h-4 mr-2 animate-pulse" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      开始冒险！
                    </>
                  )}
                </PixelButton>
              </div>
            </div>
          </PixelDialog>
        </div>
      </div>
    );
  }

  // 默认复古探险家主题
  return (
    <div className="min-h-screen px-4 py-8 md:px-8" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg mr-4" style={{ background: `linear-gradient(to bottom right, var(--color-primary), var(--color-secondary))` }}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="handwriting text-4xl md:text-6xl" style={{ color: 'var(--color-primary)' }}>
              创建你的探索任务
            </h1>
          </div>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            告诉我们你想探索的地方和风格，AI将为你量身定制独特的城市冒险任务
          </p>
        </motion.div>

        {/* 任务生成表单 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="parchment-card p-8 md:p-12"
        >
          {/* 地点输入 */}
          <div className="mb-8">
            <label className={`block text-2xl mb-4 ${
              (currentTheme as any) === 'agent' ? 'font-mono text-green-400' :
              (currentTheme as any) === 'pixel' ? 'font-pixel text-white' :
              'handwriting text-amber-800'
            }`}>
              <MapPin className="inline w-6 h-6 mr-2" />
              {(currentTheme as any) === 'agent' ? '[LOCATION INPUT]' :
               (currentTheme as any) === 'pixel' ? '选择地点' :
               '探索地点'}
            </label>
            <div className="relative">
              {(() => {
                switch (currentTheme) {
                  case 'agent':
                    return (
                      <div className="terminal-input">
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="> 输入目标坐标..."
                          className="w-full bg-transparent border border-green-400 text-green-400 font-mono px-4 py-3 focus:outline-none focus:border-green-300"
                        />
                      </div>
                    );
                  case 'pixel':
                    return (
                      <PixelInput
                        value={location}
                        onChange={(value) => setLocation(value)}
                        placeholder="输入探索地点..."
                        className="w-full pixel-input font-pixel px-4 py-3"
                      />
                    );
                  default:
                    return (
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="输入城市、街区或具体地址..."
                        className="w-full px-6 py-4 text-lg border-2 border-amber-300 rounded-full focus:border-amber-500 focus:outline-none bg-white/80 backdrop-blur-sm transition-colors"
                      />
                    );
                }
              })()}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Compass className={`w-6 h-6 ${
                  (currentTheme as any) === 'agent' ? 'text-green-400' :
                  (currentTheme as any) === 'pixel' ? 'text-white' :
                  'text-amber-500'
                }`} />
              </div>
            </div>
            <p className={`text-sm mt-2 ml-4 ${
              (currentTheme as any) === 'agent' ? 'text-green-300 font-mono' :
              (currentTheme as any) === 'pixel' ? 'text-gray-300 font-pixel text-xs' :
              'text-amber-600'
            }`}>
              {(currentTheme as any) === 'agent' ? '> 例如：TARGET_ZONE_001, SECTOR_7, CLASSIFIED_LOCATION' :
               (currentTheme as any) === 'pixel' ? '例如：魔法森林、龙之洞穴、精灵村庄' :
               '例如：北京三里屯、上海田子坊、广州沙面岛'}
            </p>
          </div>

          {/* 探索主题选择 */}
          <div className="mb-8">
            <label className="block handwriting text-2xl text-amber-800 mb-6">
              <Target className="inline w-6 h-6 mr-2" />
              探索主题
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              {themes.map((theme) => {
                const IconComponent = theme.icon;
                return (
                  <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      selectedTheme === theme.id
                        ? 'border-amber-500 bg-amber-50 shadow-lg'
                        : 'border-amber-200 bg-white/60 hover:border-amber-400 hover:bg-white/80'
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${theme.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="handwriting text-xl text-amber-800 mb-2">
                          {theme.name}
                        </h3>
                        <p className="text-amber-700 text-sm">
                          {theme.description}
                        </p>
                      </div>
                      {selectedTheme === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                        >
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 高级选项切换 */}
          <div className="mb-6">
            <button
              onClick={toggleAdvanced}
              className="flex items-center space-x-2 text-amber-700 hover:text-amber-800 transition-colors"
            >
              <span className="handwriting text-lg">高级选项</span>
              <motion.div
                animate={{ rotate: showAdvanced ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
          </div>

          {/* 高级选项 */}
          <motion.div
            initial={false}
            animate={{ height: showAdvanced ? 'auto' : 0, opacity: showAdvanced ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-8 pb-8">
              {/* 探索时长 */}
              <div>
                <label className="block handwriting text-xl text-amber-800 mb-4">
                  <Clock className="inline w-5 h-5 mr-2" />
                  探索时长
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-amber-300 rounded-full focus:border-amber-500 focus:outline-none bg-white/80 backdrop-blur-sm"
                >
                  <option value="1">1小时 - 快速体验</option>
                  <option value="2">2小时 - 标准探索</option>
                  <option value="3">3小时 - 深度体验</option>
                  <option value="4">半天 - 完整冒险</option>
                </select>
              </div>

              {/* 难度等级 */}
              <div>
                <label className="block handwriting text-xl text-amber-800 mb-4">
                  <Star className="inline w-5 h-5 mr-2" />
                  难度等级
                </label>
                <div className="space-y-2">
                  {difficulties.map((diff) => (
                    <label
                      key={diff.id}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="difficulty"
                        value={diff.id}
                        checked={difficulty === diff.id}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="ink-checkbox"
                      />
                      <div>
                        <span className="text-amber-800 font-medium">{diff.name}</span>
                        <span className="text-amber-600 text-sm ml-2">{diff.description}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 生成按钮 */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateTask}
              disabled={isGenerating || !location || !selectedTheme}
              className={`text-xl px-12 py-4 ${
                (() => {
                  switch (currentTheme) {
                    case 'agent':
                      return 'agent-button font-mono';
                    case 'pixel':
                      return 'pixel-button font-pixel';
                    default:
                      return 'wax-seal-btn';
                  }
                })()
              } ${
                isGenerating || !location || !selectedTheme
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {isGenerating ? (
                <>
                  {(() => {
                    switch (currentTheme) {
                      case 'agent':
                        return (
                          <>
                            <motion.div
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="inline-block mr-3"
                            >
                              <span className="terminal-blink">█</span>
                            </motion.div>
                            [PROCESSING...]
                          </>
                        );
                      case 'pixel':
                        return (
                          <>
                            <div className="inline-block w-6 h-6 mr-3 pixel-runner" />
                            生成任务中...
                          </>
                        );
                      default:
                        return (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="inline-block w-6 h-6 mr-3"
                            >
                              <Sparkles className="w-6 h-6" />
                            </motion.div>
                            AI正在为你定制任务...
                          </>
                        );
                    }
                  })()}
                </>
              ) : (
                <>
                  {(() => {
                    switch (currentTheme) {
                      case 'agent':
                        return (
                          <>
                            <span className="mr-3">▶</span>
                            [接收指令]
                            <span className="ml-3">◀</span>
                          </>
                        );
                      case 'pixel':
                        return (
                          <>
                            <span className="mr-3">⚔</span>
                            出发！
                            <span className="ml-3">⚔</span>
                          </>
                        );
                      default:
                        return (
                          <>
                            <Sparkles className="w-6 h-6 mr-3" />
                            生成我的探索任务
                            <ArrowRight className="w-6 h-6 ml-3" />
                          </>
                        );
                    }
                  })()}
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* 生成过程动画 */}
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <div className={`p-8 ${(() => {
              switch (currentTheme) {
                case 'agent': return 'terminal-window';
                case 'pixel': return 'pixel-dialog';
                default: return 'parchment-card';
              }
            })()}`}>
              {(() => {
                switch (currentTheme) {
                  case 'agent':
                    return (
                      <div className="space-y-4">
                        <div className="terminal-header">
                          <span className="text-green-400 font-mono text-sm">[CLASSIFIED OPERATION]</span>
                          <div className="flex space-x-2">
                            <div className="status-indicator status-online" />
                            <span className="text-green-400 text-xs">ONLINE</span>
                          </div>
                        </div>
                        <div className="space-y-2 text-left font-mono text-green-400">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="typewriter"
                          >
                            &gt; 正在连接卫星网络...
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="typewriter"
                          >
                            &gt; 分析地理数据...
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            className="typewriter"
                          >
                            &gt; 生成行动方案...
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 3.5 }}
                            className="text-red-400"
                          >
                            &gt; [CLASSIFIED] 任务即将下达...
                          </motion.div>
                        </div>
                      </div>
                    );
                  case 'pixel':
                    return (
                      <div className="space-y-6">
                        <h3 className="font-pixel text-white text-lg">任务生成中...</h3>
                        <div className="flex justify-center items-center space-x-4">
                          <div className="pixel-runner w-8 h-8 bg-blue-500" />
                          <div className="treasure-chest shaking w-12 h-9" />
                          <div className="pixel-runner w-8 h-8 bg-yellow-500" />
                        </div>
                        <div className="space-y-2 font-pixel text-xs text-gray-300">
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            ⚡ 召唤任务精灵...
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                          >
                            🗺️ 绘制冒险地图...
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5 }}
                          >
                            ⭐ 准备奖励宝箱...
                          </motion.div>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div>
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity 
                          }}
                          className="text-6xl mb-4"
                        >
                          🗺️
                        </motion.div>
                        <h3 className="handwriting text-2xl text-amber-800 mb-4">
                          正在绘制您的探险地图...
                        </h3>
                        <div className="flex justify-center space-x-2">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                              className="w-3 h-3 bg-amber-600 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    );
                }
              })()}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}