import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Compass, 
  Camera, 
  Coffee, 
  Palette, 
  Users, 
  Star,
  Menu,
  X
} from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

/**
 * 首页组件 - 城市漫游任务生成器
 * 包含英雄区块、导航菜单、功能介绍等模块
 * 采用复古探险家日志风格设计
 */
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * 切换移动端菜单显示状态
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* 导航栏 */}
      <nav className="relative z-50 px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center shadow-lg">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h1 className="handwriting text-2xl md:text-3xl text-amber-800 font-bold">城市漫游者</h1>
          </motion.div>

          {/* 桌面端导航菜单 */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link to="/" className="text-amber-800 hover:text-amber-600 transition-colors font-medium">
              首页
            </Link>
            <Link to="/generate" className="text-amber-800 hover:text-amber-600 transition-colors font-medium">
              生成任务
            </Link>
            <Link to="/profile" className="text-amber-800 hover:text-amber-600 transition-colors font-medium">
              我的探索
            </Link>
            <ThemeSwitcher />
            <Link to="/login" className="wax-seal-btn">
              开始探索
            </Link>
          </motion.div>

          {/* 移动端菜单按钮 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={toggleMenu}
            className="md:hidden p-2 text-amber-800 hover:text-amber-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-amber-200 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="block text-amber-800 hover:text-amber-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                to="/generate" 
                className="block text-amber-800 hover:text-amber-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                生成任务
              </Link>
              <Link 
                to="/profile" 
                className="block text-amber-800 hover:text-amber-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                我的探索
              </Link>
              <div className="py-2">
                <ThemeSwitcher />
              </div>
              <Link 
                to="/login" 
                className="block wax-seal-btn text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                开始探索
              </Link>
            </div>
          </motion.div>
        )}
      </nav>

      {/* 英雄区块 */}
      <section className="px-4 py-12 md:py-20 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧内容 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="handwriting text-4xl md:text-6xl lg:text-7xl text-amber-800 leading-tight">
                  重新发现
                  <br />
                  <span className="text-amber-600">你的城市</span>
                </h2>
                <p className="text-lg md:text-xl text-amber-700 leading-relaxed max-w-lg">
                  AI驱动的城市探索任务生成器，让你像玩RPG游戏一样重新发现熟悉的街区，
                  体验独一无二的城市冒险之旅。
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/generate" className="wax-seal-btn text-lg px-8 py-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  开始探索
                </Link>
                <button className="px-8 py-4 border-2 border-amber-600 text-amber-800 rounded-full hover:bg-amber-50 transition-colors font-medium">
                  观看演示
                </button>
              </div>
            </motion.div>

            {/* 右侧插图 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="parchment-card p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <span className="handwriting text-xl text-amber-800">选择探索地点</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <span className="handwriting text-xl text-amber-800">AI生成任务清单</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <span className="handwriting text-xl text-amber-800">开始城市冒险</span>
                  </div>
                </div>
              </div>
              
              {/* 装饰性元素 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center shadow-lg"
              >
                <Compass className="w-8 h-8 text-amber-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 功能介绍 */}
      <section className="px-4 py-16 md:px-8" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="handwriting text-3xl md:text-5xl text-amber-800 mb-4">
              探索主题
            </h3>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              选择你的探索风格，AI将为你量身定制独特的城市任务
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 文艺青年 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="parchment-card text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h4 className="handwriting text-2xl text-amber-800 mb-4">文艺青年</h4>
              <p className="text-amber-700 leading-relaxed">
                寻找隐藏的艺术角落、独立书店、咖啡馆，发现城市的文艺气息
              </p>
            </motion.div>

            {/* 美食探索者 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="parchment-card text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-8 h-8 text-white" />
              </div>
              <h4 className="handwriting text-2xl text-amber-800 mb-4">美食探索者</h4>
              <p className="text-amber-700 leading-relaxed">
                品尝地道小吃、探访老字号、发现隐藏美食，用味蕾记录城市
              </p>
            </motion.div>

            {/* 摄影师 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="parchment-card text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h4 className="handwriting text-2xl text-amber-800 mb-4">摄影师</h4>
              <p className="text-amber-700 leading-relaxed">
                捕捉独特视角、寻找光影瞬间、记录城市变迁，用镜头讲述故事
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 用户评价 */}
      <section className="px-4 py-16 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="handwriting text-3xl md:text-5xl text-amber-800 mb-4">
              探索者的声音
            </h3>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              听听其他城市探索者的真实体验
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "小李",
                location: "北京",
                content: "通过这个工具，我在住了5年的胡同里发现了从未注意过的小细节，感觉重新认识了这个地方。",
                rating: 5
              },
              {
                name: "张小姐",
                location: "上海",
                content: "AI生成的任务很有趣，每次都能带给我惊喜。现在周末探索城市成了我最期待的事情。",
                rating: 5
              },
              {
                name: "王先生",
                location: "广州",
                content: "作为摄影爱好者，这个工具帮我找到了很多独特的拍摄角度，作品质量提升了不少。",
                rating: 5
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="parchment-card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-amber-700 mb-4 italic">"{review.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800">{review.name}</p>
                    <p className="text-sm text-amber-600">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA区块 */}
      <section className="px-4 py-16 md:px-8" style={{ backgroundColor: 'var(--color-surface-elevated)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="handwriting text-3xl md:text-5xl text-amber-800">
              准备好开始你的城市冒险了吗？
            </h3>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              加入数千名城市探索者的行列，用全新的视角重新发现你的城市
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generate" className="wax-seal-btn text-lg px-8 py-4">
                <MapPin className="w-5 h-5 mr-2" />
                立即开始探索
              </Link>
              <Link to="/register" className="px-8 py-4 border-2 border-amber-600 text-amber-800 rounded-full hover:bg-amber-50 transition-colors font-medium">
                免费注册账户
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="px-4 py-12 md:px-8" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <h4 className="handwriting text-xl font-bold">城市漫游者</h4>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                重新发现你的城市，体验独一无二的探索之旅
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">产品</h5>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li><Link to="/generate" className="hover:text-white transition-colors">任务生成</Link></li>
                <li><Link to="/profile" className="hover:text-white transition-colors">我的探索</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">高级功能</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">支持</h5>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">反馈建议</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">关于</h5>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
            <p>&copy; 2024 城市漫游任务生成器. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}