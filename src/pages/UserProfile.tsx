import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Trophy, 
  Clock, 
  Star,
  Settings,
  History,
  Crown,
  Medal,
  Target,
  Calendar,
  ArrowRight,
  Edit3,
  Camera,
  Bell,
  Shield,
  Palette,
  Globe,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { AgentTerminal } from '../components/AgentTerminal';
import { 
  PixelDialog, 
  PixelButton, 
  PixelStatusBar,
  PixelScroll
} from '../components/PixelComponents';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

/**
 * 用户中心页面组件 - 支持多主题
 * 包含个人信息、历史记录、设置选项
 * 支持复古探险家、神秘特工档案、像素游戏RPG三种主题
 * 支持响应式设计
 */
export default function UserProfile() {
  const { currentTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);

  // 模拟用户数据
  const userData = {
    name: '城市探险家',
    avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20explorer%20portrait%20illustration%20sepia%20tone%20adventurer%20hat&image_size=square',
    level: 15,
    totalPoints: 2850,
    completedTasks: 47,
    citiesExplored: 8,
    joinDate: '2024年1月',
    currentTitle: '资深探险家',
    nextLevelPoints: 3000
  };

  // 模拟历史任务数据
  const historyTasks = [
    {
      id: '1',
      title: '三里屯文化探索',
      location: '北京三里屯',
      completedDate: '2024-01-20',
      points: 150,
      tasksCompleted: 5,
      totalTasks: 5,
      rating: 5
    },
    {
      id: '2',
      title: '南锣鼓巷美食之旅',
      location: '北京南锣鼓巷',
      completedDate: '2024-01-18',
      points: 120,
      tasksCompleted: 4,
      totalTasks: 6,
      rating: 4
    },
    {
      id: '3',
      title: '798艺术区创意探索',
      location: '北京798艺术区',
      completedDate: '2024-01-15',
      points: 200,
      tasksCompleted: 6,
      totalTasks: 6,
      rating: 5
    }
  ];

  // 模拟成就数据
  const achievements = [
    {
      id: '1',
      title: '初出茅庐',
      description: '完成第一个探索任务',
      icon: Target,
      unlocked: true,
      date: '2024-01-10'
    },
    {
      id: '2',
      title: '美食达人',
      description: '完成10个美食相关任务',
      icon: Trophy,
      unlocked: true,
      date: '2024-01-15'
    },
    {
      id: '3',
      title: '摄影师',
      description: '拍摄100张探索照片',
      icon: Camera,
      unlocked: true,
      date: '2024-01-18'
    },
    {
      id: '4',
      title: '城市专家',
      description: '探索5个不同城市',
      icon: Globe,
      unlocked: false,
      progress: 3,
      total: 5
    }
  ];

  /**
   * 计算等级进度百分比
   */
  const levelProgress = ((userData.totalPoints % 200) / 200) * 100;

  /**
   * 渲染概览标签页
   */
  const renderOverview = () => (
    <div className="space-y-6">
      {/* 用户统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="parchment-card p-4 text-center"
        >
          <Trophy className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-800">{userData.totalPoints}</div>
          <div className="text-sm text-amber-600">总积分</div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="parchment-card p-4 text-center"
        >
          <Target className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-800">{userData.completedTasks}</div>
          <div className="text-sm text-amber-600">完成任务</div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="parchment-card p-4 text-center"
        >
          <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-800">{userData.citiesExplored}</div>
          <div className="text-sm text-amber-600">探索城市</div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="parchment-card p-4 text-center"
        >
          <Star className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-800">{userData.level}</div>
          <div className="text-sm text-amber-600">等级</div>
        </motion.div>
      </div>

      {/* 等级进度 */}
      <div className="parchment-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="handwriting text-xl text-amber-800">探险等级</h3>
          <div className="flex items-center text-amber-600">
            <Crown className="w-5 h-5 mr-1" />
            <span>{userData.currentTitle}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-lg font-bold text-amber-800">Lv.{userData.level}</div>
          <div className="flex-1">
            <div className="w-full bg-amber-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full"
              />
            </div>
            <div className="text-sm text-amber-600 mt-1">
              {userData.totalPoints} / {userData.nextLevelPoints} 积分
            </div>
          </div>
          <div className="text-lg font-bold text-amber-800">Lv.{userData.level + 1}</div>
        </div>
      </div>

      {/* 最近成就 */}
      <div className="parchment-card p-6">
        <h3 className="handwriting text-xl text-amber-800 mb-4">最新成就</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.filter(a => a.unlocked).slice(0, 4).map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-amber-800">{achievement.title}</h4>
                  <p className="text-sm text-amber-600">{achievement.description}</p>
                  <p className="text-xs text-amber-500">{achievement.date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  /**
   * 渲染历史记录标签页
   */
  const renderHistory = () => (
    <div className="space-y-4">
      {historyTasks.map((task, index) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="parchment-card p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1">
              <h3 className="handwriting text-xl text-amber-800 mb-2">{task.title}</h3>
              <div className="flex items-center text-amber-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="mr-4">{task.location}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span>{task.completedDate}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center text-amber-600">
                  <Trophy className="w-4 h-4 mr-1" />
                  {task.points} 积分
                </div>
                <div className="flex items-center text-amber-600">
                  <Target className="w-4 h-4 mr-1" />
                  {task.tasksCompleted}/{task.totalTasks} 任务
                </div>
                <div className="flex items-center text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < task.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to={`/tasks/${task.id}`}
                className="inline-flex items-center px-4 py-2 text-amber-800 border border-amber-600 rounded-full hover:bg-amber-50 transition-colors"
              >
                查看详情
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  /**
   * 渲染设置标签页
   */
  const renderSettings = () => (
    <div className="space-y-6">
      {/* 个人信息设置 */}
      <div className="parchment-card p-6">
        <h3 className="handwriting text-xl text-amber-800 mb-4">个人信息</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-amber-700">头像</span>
            <button className="flex items-center text-amber-600 hover:text-amber-800 transition-colors">
              <Camera className="w-4 h-4 mr-1" />
              更换头像
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-amber-700">昵称</span>
            <button className="flex items-center text-amber-600 hover:text-amber-800 transition-colors">
              <Edit3 className="w-4 h-4 mr-1" />
              编辑昵称
            </button>
          </div>
        </div>
      </div>

      {/* 通知设置 */}
      <div className="parchment-card p-6">
        <h3 className="handwriting text-xl text-amber-800 mb-4">通知设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-amber-600 mr-2" />
              <span className="text-amber-700">任务提醒</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* 隐私设置 */}
      <div className="parchment-card p-6">
        <h3 className="handwriting text-xl text-amber-800 mb-4">隐私设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-amber-600 mr-2" />
              <span className="text-amber-700">公开探索记录</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* 主题设置 */}
      <div className="parchment-card p-6">
        <h3 className="handwriting text-xl text-amber-800 mb-4">主题设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Palette className="w-5 h-5 text-amber-600 mr-2" />
              <span className="text-amber-700">选择主题风格</span>
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* 账户操作 */}
      <div className="parchment-card p-6">
        <h3 className="handwriting text-xl text-amber-800 mb-4">账户</h3>
        <div className="space-y-4">
          <button className="flex items-center text-red-600 hover:text-red-800 transition-colors">
            <LogOut className="w-5 h-5 mr-2" />
            退出登录
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 用户信息头部 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="parchment-card p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* 头像 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <img 
                src={userData.avatar} 
                alt="用户头像" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-amber-400 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            
            {/* 用户信息 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="handwriting text-3xl md:text-4xl text-amber-800 mb-2">
                {userData.name}
              </h1>
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6 text-amber-600">
                <div className="flex items-center">
                  <Medal className="w-5 h-5 mr-1" />
                  <span>{userData.currentTitle}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-1" />
                  <span>加入于 {userData.joinDate}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <Link to="/generate" className="wax-seal-btn">
                  开始新探索
                </Link>
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="px-6 py-3 border-2 border-amber-600 text-amber-800 rounded-full hover:bg-amber-50 transition-colors font-medium"
                >
                  <Settings className="w-5 h-5 mr-2 inline" />
                  设置
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 标签页导航 */}
        <div className="mb-8">
          <div className="flex flex-wrap border-b border-amber-200">
            {[
              { id: 'overview', label: '概览', icon: User },
              { id: 'history', label: '探索历史', icon: History },
              { id: 'achievements', label: '成就', icon: Trophy }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-amber-800 border-b-2 border-amber-600'
                      : 'text-amber-600 hover:text-amber-800'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 标签页内容 */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'history' && renderHistory()}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`parchment-card p-6 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-amber-50 to-yellow-50' 
                        : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600' 
                          : 'bg-gray-300'
                      }`}>
                        <IconComponent className={`w-8 h-8 ${
                          achievement.unlocked ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="handwriting text-xl text-amber-800 mb-2">
                          {achievement.title}
                        </h3>
                        <p className="text-amber-700 mb-2">{achievement.description}</p>
                        {achievement.unlocked ? (
                          <p className="text-sm text-amber-600">解锁于 {achievement.date}</p>
                        ) : (
                          <div className="text-sm text-amber-600">
                            进度: {achievement.progress || 0}/{achievement.total || 1}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}