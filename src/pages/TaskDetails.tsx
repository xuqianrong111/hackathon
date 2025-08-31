import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Share2, 
  Camera, 
  Star,
  Trophy,
  ArrowLeft,
  Download,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { AgentTerminal } from '../components/AgentTerminal';
import { 
  PixelDialog, 
  PixelButton, 
  PixelTaskItem, 
  PixelStatusBar,
  PixelScroll
} from '../components/PixelComponents';

/**
 * 任务详情页面组件 - 支持多主题
 * 显示生成的任务列表，支持任务完成标记和分享功能
 * 支持复古探险家、神秘特工档案、像素游戏RPG三种主题
 */
export default function TaskDetails() {
  const { currentTheme } = useTheme();
  const [tasks, setTasks] = useState<any[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  // 模拟任务数据
  const mockTasks = [
    {
      id: '1',
      title: '寻找隐藏的咖啡角落',
      description: '在三里屯的小巷中找到一家只有本地人知道的咖啡店，品尝他们的招牌拿铁',
      location: '三里屯SOHO附近',
      estimatedTime: '30分钟',
      difficulty: 'easy',
      points: 50,
      tips: '询问当地居民或查看小巷深处的招牌',
      category: 'foodie'
    },
    {
      id: '2',
      title: '捕捉街头艺术瞬间',
      description: '拍摄三里屯街头的涂鸦艺术，记录城市文化的多样性',
      location: '三里屯酒吧街',
      estimatedTime: '45分钟',
      difficulty: 'medium',
      points: 75,
      tips: '最佳拍摄时间是下午4-6点，光线柔和',
      category: 'photographer'
    },
    {
      id: '3',
      title: '与街头音乐人互动',
      description: '找到在三里屯表演的街头音乐人，聆听他们的故事并合影留念',
      location: '三里屯太古里广场',
      estimatedTime: '20分钟',
      difficulty: 'easy',
      points: 60,
      tips: '通常在周末下午会有更多表演者',
      category: 'social'
    },
    {
      id: '4',
      title: '探索创意市集',
      description: '参观三里屯的创意市集，发现独特的手工艺品和设计师作品',
      location: '三里屯Village',
      estimatedTime: '60分钟',
      difficulty: 'medium',
      points: 80,
      tips: '周末市集商品更丰富，可以和摊主聊聊创作故事',
      category: 'artistic'
    },
    {
      id: '5',
      title: '品尝国际美食',
      description: '在三里屯尝试一种你从未品尝过的国际料理',
      location: '三里屯美食街',
      estimatedTime: '90分钟',
      difficulty: 'hard',
      points: 100,
      tips: '可以选择人气较高的餐厅，或者询问服务员推荐',
      category: 'foodie'
    }
  ];

  /**
   * 组件挂载时加载任务数据
   */
  useEffect(() => {
    // 模拟API加载延迟
    const timer = setTimeout(() => {
      setTasks(mockTasks);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /**
   * 切换任务完成状态
   */
  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  /**
   * 打开分享模态框
   */
  const openShareModal = (task: any) => {
    setSelectedTask(task);
    setShowShareModal(true);
  };

  /**
   * 关闭分享模态框
   */
  const closeShareModal = () => {
    setShowShareModal(false);
    setSelectedTask(null);
  };

  /**
   * 获取难度颜色
   */
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  /**
   * 获取难度文本
   */
  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '轻松';
      case 'medium': return '中等';
      case 'hard': return '挑战';
      default: return '未知';
    }
  };

  /**
   * 计算完成进度
   */
  const completionRate = tasks.length > 0 ? (completedTasks.size / tasks.length) * 100 : 0;
  const totalPoints = tasks.reduce((sum, task) => {
    return sum + (completedTasks.has(task.id) ? task.points : 0);
  }, 0);

  // 根据主题渲染不同界面
  if (currentTheme === 'agent' as any) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <AgentTerminal />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="terminal-window p-6 mb-8">
            <div className="terminal-header mb-4">
              <span className="text-red-500">[MISSION STATUS]</span> ACTIVE
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{tasks.length}</div>
                <div className="text-sm text-green-600">OBJECTIVES</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{completedTasks.size}</div>
                <div className="text-sm text-green-600">COMPLETED</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{Math.round(completionRate)}%</div>
                <div className="text-sm text-green-600">PROGRESS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{totalPoints}</div>
                <div className="text-sm text-green-600">POINTS</div>
              </div>
            </div>
            <div className="mt-4 bg-gray-800 rounded h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                className="bg-green-500 h-2 rounded"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {tasks.map((task, index) => {
              const isCompleted = completedTasks.has(task.id);
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`terminal-window p-4 ${isCompleted ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="text-2xl mt-1"
                    >
                      {isCompleted ? '✓' : '○'}
                    </button>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className={`text-lg ${isCompleted ? 'line-through text-gray-500' : 'text-green-400'}`}>
                          [OBJECTIVE {String(index + 1).padStart(2, '0')}] {task.title}
                        </h3>
                        <span className="text-red-500 text-sm">{getDifficultyText(task.difficulty)}</span>
                      </div>
                      <p className="text-green-300 mb-3">{task.description}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm text-green-600">
                        <div>📍 {task.location}</div>
                        <div>⏱️ {task.estimatedTime}</div>
                        <div>🏆 {task.points} PTS</div>
                      </div>
                      <div className="mt-3 p-2 bg-gray-900 border-l-2 border-yellow-500">
                        <span className="text-yellow-400">INTEL: </span>
                        <span className="text-green-300">{task.tips}</span>
                      </div>
                      {isCompleted && (
                        <div className="mt-2 text-green-400">
                          <span className="text-red-500">[ACCOMPLISHED]</span> +{task.points} POINTS
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {tasks.length > 0 && completedTasks.size === tasks.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 terminal-window p-6 text-center"
            >
              <div className="text-green-400 text-2xl mb-4">[MISSION COMPLETE]</div>
              <div className="text-green-300">All objectives accomplished. Total points: {totalPoints}</div>
              <div className="mt-4 space-x-4">
                <button className="agent-btn">DOWNLOAD REPORT</button>
                <button className="agent-btn" onClick={() => setShowShareModal(true)}>SHARE INTEL</button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }
  
  if ((currentTheme as any) === 'pixel') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-900 font-pixel">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <PixelStatusBar 
            level={Math.floor(completedTasks.size / 3) + 1}
            exp={completedTasks.size * 10}
            maxExp={100}
            coins={completedTasks.size * 5}
            health={100}
            maxHealth={100}
            className="mb-6"
          />
          
          <PixelScroll title="任务日志">
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <PixelTaskItem
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  completed={completedTasks.has(task.id)}
                  onComplete={() => toggleTaskCompletion(task.id)}
                />
              ))}
            </div>
          </PixelScroll>
          
          {tasks.length > 0 && completedTasks.size === tasks.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <PixelDialog title="🎉 任务完成！">
                <div className="text-center">
                  <div className="pixel-treasure mb-4"></div>
                  <p className="mb-4">恭喜勇士！你已完成所有任务！</p>
                  <p className="mb-6">获得金币: {totalPoints} 💰</p>
                  <div className="space-y-2">
                    <PixelButton onClick={() => {}}>下载证书</PixelButton>
                    <PixelButton onClick={() => setShowShareModal(true)}>分享成就</PixelButton>
                  </div>
                </div>
              </PixelDialog>
            </motion.div>
          )}
        </div>
      </div>
    );
  }
  
  // 默认复古探险家主题
  return (
    <div className="min-h-screen px-4 py-8 md:px-8" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      <div className="max-w-4xl mx-auto">
        {/* 页面头部 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center mb-6">
            <Link 
              to="/generate" 
              className="mr-4 p-2 transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="handwriting text-3xl md:text-5xl" style={{ color: 'var(--color-primary)' }}>
                三里屯探索任务
              </h1>
              <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                <MapPin className="inline w-4 h-4 mr-1" />
                北京市朝阳区三里屯
              </p>
            </div>
          </div>

          {/* 进度统计 */}
          <div className="parchment-card p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {completedTasks.size}/{tasks.length}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>已完成任务</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {Math.round(completionRate)}%
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>完成进度</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {totalPoints}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>获得积分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {tasks.reduce((sum, task) => sum + parseInt(task.estimatedTime), 0)}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>预计时长(分钟)</div>
              </div>
            </div>
            
            {/* 进度条 */}
            <div className="mt-4">
              <div className="w-full rounded-full h-3" style={{ backgroundColor: 'var(--color-surface)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-3 rounded-full"
                  style={{ background: `linear-gradient(to right, var(--color-primary), var(--color-secondary))` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 任务列表 */}
        <div className="space-y-6">
          <AnimatePresence>
            {tasks.map((task, index) => {
              const isCompleted = completedTasks.has(task.id);
              
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: 100, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: 15 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: (currentTheme as any) === 'pixel' ? 0 : 2,
                    transition: { duration: 0.2 }
                  }}
                  className={`cursor-pointer transition-all duration-300 ${
                    currentTheme === 'agent' ? (
                      `terminal-window p-6 ${
                        isCompleted 
                          ? 'border-green-400 bg-gray-900/90' 
                          : 'hover:border-green-300'
                      }`
                    ) : (currentTheme as any) === 'pixel' ? (
                      `pixel-dialog p-6 ${
                        isCompleted 
                          ? 'border-yellow-400 bg-gray-800/90' 
                          : 'hover:border-blue-400'
                      }`
                    ) : (
                      `parchment-card p-6 ${
                        isCompleted 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                          : 'hover:shadow-lg'
                      }`
                    )
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* 完成状态按钮 */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTaskCompletion(task.id)}
                      className="flex-shrink-0 mt-1"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      ) : (
                        <Circle className="w-8 h-8 text-amber-400 hover:text-amber-600 transition-colors" />
                      )}
                    </motion.button>

                    {/* 任务内容 */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`text-xl md:text-2xl ${
                          currentTheme === 'agent' ? (
                            `font-mono ${
                              isCompleted ? 'text-green-400 line-through' : 'text-green-400'
                            }`
                          ) : (currentTheme as any) === 'pixel' ? (
                            `font-pixel ${
                              isCompleted ? 'text-yellow-400 line-through' : 'text-white'
                            }`
                          ) : (
                            `handwriting ${
                              isCompleted ? 'text-green-800 line-through' : 'text-amber-800'
                            }`
                          )
                        }`}>
                          {(currentTheme as any) === 'agent' ? `[OBJECTIVE ${String(index + 1).padStart(2, '0')}] ${task.title}` :
             (currentTheme as any) === 'pixel' ? `🎯 ${task.title}` :
                           task.title}
                        </h3>
                        
                        {/* 任务操作按钮 */}
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openShareModal(task)}
                            className="p-2 text-amber-600 hover:text-amber-800 transition-colors"
                          >
                            <Share2 className="w-5 h-5" />
                          </motion.button>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            getDifficultyColor(task.difficulty)
                          }`}>
                            {getDifficultyText(task.difficulty)}
                          </div>
                        </div>
                      </div>

                      <p className={`mb-4 leading-relaxed ${
                        currentTheme === 'agent' ? (
                          `font-mono text-green-300 ${
                            isCompleted ? 'opacity-70' : ''
                          }`
                        ) : (currentTheme as any) === 'pixel' ? (
                          `font-pixel text-gray-300 text-sm ${
                            isCompleted ? 'opacity-70' : ''
                          }`
                        ) : (
                          `text-amber-700 ${
                            isCompleted ? 'opacity-70' : ''
                          }`
                        )
                      }`}>
                        {(currentTheme as any) === 'agent' ? `> ${task.description}` :
                         (currentTheme as any) === 'pixel' ? `📜 ${task.description}` :
                         task.description}
                      </p>

                      {/* 任务详情 */}
                      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm ${
                        (currentTheme as any) === 'agent' ? 'font-mono text-green-400' :
                        (currentTheme as any) === 'pixel' ? 'font-pixel text-gray-400' :
                        'text-amber-600'
                      }`}>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {(currentTheme as any) === 'agent' ? `LOCATION: ${task.location}` :
                           (currentTheme as any) === 'pixel' ? `📍 ${task.location}` :
                           task.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {(currentTheme as any) === 'agent' ? `ETA: ${task.estimatedTime}` :
                           (currentTheme as any) === 'pixel' ? `⏰ ${task.estimatedTime}` :
                           task.estimatedTime}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2" />
                          {(currentTheme as any) === 'agent' ? `POINTS: ${task.points}` :
                           (currentTheme as any) === 'pixel' ? `💰 ${task.points} 金币` :
                           `${task.points} 积分`}
                        </div>
                      </div>

                      {/* 提示信息 */}
                      <div className={`mt-4 p-3 rounded-lg ${
                        (currentTheme as any) === 'agent' ? 'bg-gray-800 border-l-4 border-yellow-400' :
                        (currentTheme as any) === 'pixel' ? 'bg-gray-700 border-2 border-blue-400 pixel-border' :
                        'bg-amber-50 border-l-4 border-amber-400'
                      }`}>
                        <p className={`text-sm ${
                          (currentTheme as any) === 'agent' ? 'text-yellow-400 font-mono' :
                          (currentTheme as any) === 'pixel' ? 'text-blue-300 font-pixel' :
                          'text-amber-800'
                        }`}>
                          {(currentTheme as any) === 'agent' ? (
                            <><strong>[INTEL]</strong> {task.tips}</>
                          ) : currentTheme === 'pixel' ? (
                            <><strong>💡 提示：</strong> {task.tips}</>
                          ) : (
                            <><strong>💡 探索提示：</strong> {task.tips}</>
                          )}
                        </p>
                      </div>

                      {/* 完成标记 */}
                      {isCompleted && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`mt-4 flex items-center ${
                            (currentTheme as any) === 'agent' ? 'text-green-400' :
                            (currentTheme as any) === 'pixel' ? 'text-yellow-400' :
                            'text-green-600'
                          }`}
                        >
                          {(currentTheme as any) === 'agent' ? (
                            <>
                              <CheckCircle2 className="w-5 h-5 mr-2" />
                              <span className="font-mono">[ACCOMPLISHED] +{task.points} POINTS</span>
                            </>
                          ) : (currentTheme as any) === 'pixel' ? (
                            <>
                              <div className="pixel-star w-5 h-5 mr-2" />
                              <span className="font-pixel">任务完成！+{task.points} 金币</span>
                            </>
                          ) : (
                            <>
                              <Star className="w-5 h-5 mr-2 fill-current" />
                              <span className="font-medium">任务已完成！获得 {task.points} 积分</span>
                            </>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 完成所有任务的庆祝 */}
        {tasks.length > 0 && completedTasks.size === tasks.length && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <div className="parchment-card p-8 bg-gradient-to-r from-yellow-50 to-amber-50">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>
              
              <h3 className="handwriting text-3xl text-amber-800 mb-4">
                🎉 恭喜完成所有任务！
              </h3>
              
              <p className="text-lg text-amber-700 mb-6">
                你已经成功完成了三里屯的探索之旅，获得了 {totalPoints} 积分！
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="wax-seal-btn">
                  <Download className="w-5 h-5 mr-2" />
                  下载探索证书
                </button>
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="px-6 py-3 border-2 border-amber-600 text-amber-800 rounded-full hover:bg-amber-50 transition-colors font-medium"
                >
                  <Share2 className="w-5 h-5 mr-2 inline" />
                  分享成就
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 分享模态框 */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={closeShareModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="handwriting text-2xl text-amber-800 mb-6 text-center">
                  分享你的探索
                </h3>
                
                {selectedTask && (
                  <div className="mb-6">
                    <div className="parchment-card p-4 mb-4">
                      <h4 className="font-medium text-amber-800 mb-2">
                        {selectedTask.title}
                      </h4>
                      <p className="text-sm text-amber-700">
                        {selectedTask.description}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button className="flex flex-col items-center p-4 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-amber-800">微信</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-4 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-2">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-amber-800">微博</span>
                  </button>
                  
                  <button className="flex flex-col items-center p-4 rounded-lg hover:bg-amber-50 transition-colors">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-amber-800">朋友圈</span>
                  </button>
                </div>
                
                <button
                  onClick={closeShareModal}
                  className="w-full py-3 bg-amber-100 text-amber-800 rounded-full hover:bg-amber-200 transition-colors font-medium"
                >
                  关闭
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}