import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  MapPin,
  Compass,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { AgentTerminal } from '../components/AgentTerminal';
import { 
  PixelDialog, 
  PixelButton, 
  PixelInput
} from '../components/PixelComponents';

/**
 * 认证页面组件（登录/注册）- 支持多主题
 * 实现用户认证和账户创建功能
 * 支持复古探险家、神秘特工档案、像素游戏RPG三种主题
 * 支持响应式设计
 */
export default function Auth() {
  const { currentTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  /**
   * 处理表单输入变化
   */
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误信息
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * 验证表单数据
   */
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // 邮箱验证
    if (!formData.email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    // 密码验证
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    }

    // 注册时的额外验证
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = '请输入探险者昵称';
      } else if (formData.name.length < 2) {
        newErrors.name = '昵称至少需要2个字符';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = '请确认密码';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 这里应该调用实际的认证API
      console.log(isLogin ? '登录' : '注册', formData);
      
      // 成功后跳转到首页或用户中心
      window.location.href = '/';
    } catch (error) {
      console.error('认证失败:', error);
      setErrors({ general: '认证失败，请稍后重试' });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 切换登录/注册模式
   */
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  /**
   * 渲染输入字段
   */
  const renderInput = (
    field: string,
    label: string,
    type: string = 'text',
    icon: React.ComponentType<any>,
    placeholder: string
  ) => {
    const IconComponent = icon;
    const isPasswordField = type === 'password';
    const showPasswordToggle = field === 'password' ? showPassword : showConfirmPassword;
    const actualType = isPasswordField && showPasswordToggle ? 'text' : type;

    return (
      <div className="space-y-2">
        <label className="block text-amber-800 font-medium">{label}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconComponent className="h-5 w-5 text-amber-600" />
          </div>
          <input
            type={actualType}
            value={formData[field as keyof typeof formData]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg bg-amber-50/50 focus:bg-white transition-colors ${
              errors[field] 
                ? 'border-red-400 focus:border-red-500' 
                : 'border-amber-300 focus:border-amber-500'
            } focus:outline-none`}
            placeholder={placeholder}
            disabled={isLoading}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => {
                if (field === 'password') {
                  setShowPassword(!showPassword);
                } else {
                  setShowConfirmPassword(!showConfirmPassword);
                }
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              disabled={isLoading}
            >
              {showPasswordToggle ? (
                <EyeOff className="h-5 w-5 text-amber-600" />
              ) : (
                <Eye className="h-5 w-5 text-amber-600" />
              )}
            </button>
          )}
        </div>
        {errors[field] && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center text-red-600 text-sm"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors[field]}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* 页面标题 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center"
            >
              <Compass className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <h1 className="handwriting text-4xl md:text-5xl text-amber-800 mb-2">
            {isLogin ? '探险者归来' : '成为探险者'}
          </h1>
          <p className="text-amber-700">
            {isLogin 
              ? '欢迎回到你的城市探索之旅' 
              : '开启你的城市探索冒险之旅'
            }
          </p>
        </motion.div>

        {/* 认证表单 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="parchment-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderInput(
                    'name',
                    '探险者昵称',
                    'text',
                    User,
                    '输入你的探险者昵称'
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {renderInput(
              'email',
              '邮箱地址',
              'email',
              Mail,
              '输入你的邮箱地址'
            )}

            {renderInput(
              'password',
              '密码',
              'password',
              Lock,
              '输入你的密码'
            )}

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderInput(
                    'confirmPassword',
                    '确认密码',
                    'password',
                    Lock,
                    '再次输入密码'
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 通用错误信息 */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center text-red-600 text-sm bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                {errors.general}
              </motion.div>
            )}

            {/* 提交按钮 */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full py-4 rounded-full font-medium transition-all duration-300 ${
                isLoading
                  ? 'bg-amber-300 cursor-not-allowed'
                  : 'wax-seal-btn'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  {isLogin ? '登录中...' : '注册中...'}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  {isLogin ? '开始探险' : '加入探险'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              )}
            </motion.button>

            {/* 忘记密码链接（仅登录时显示） */}
            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-amber-600 hover:text-amber-800 transition-colors text-sm"
                  onClick={() => alert('密码重置功能开发中...')}
                >
                  忘记密码？
                </button>
              </div>
            )}
          </form>

          {/* 模式切换 */}
          <div className="mt-8 pt-6 border-t border-amber-200 text-center">
            <p className="text-amber-700 mb-4">
              {isLogin ? '还不是探险者？' : '已经是探险者了？'}
            </p>
            <button
              onClick={toggleMode}
              disabled={isLoading}
              className="text-amber-600 hover:text-amber-800 transition-colors font-medium underline"
            >
              {isLogin ? '立即注册' : '立即登录'}
            </button>
          </div>

          {/* 功能预览（仅注册时显示） */}
          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-6 border-t border-amber-200"
            >
              <h3 className="handwriting text-lg text-amber-800 mb-4 text-center">
                成为探险者后你可以：
              </h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: '探索城市中的隐藏宝藏' },
                  { icon: Star, text: '完成任务获得积分和成就' },
                  { icon: Compass, text: '记录你的探险足迹' }
                ].map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center text-amber-700"
                    >
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                        <IconComponent className="w-4 h-4 text-amber-600" />
                      </div>
                      <span className="text-sm">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 返回首页链接 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <Link 
            to="/" 
            className="text-amber-600 hover:text-amber-800 transition-colors text-sm"
          >
            ← 返回首页
          </Link>
        </motion.div>
      </div>
    </div>
  );
}