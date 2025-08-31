import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import TaskGeneration from "@/pages/TaskGeneration";
import TaskDetails from "@/pages/TaskDetails";
import UserProfile from "@/pages/UserProfile";
import Auth from "@/pages/Auth";
import { ThemeProvider } from "@/contexts/ThemeContext";

/**
 * 主应用组件
 * 配置路由系统，实现页面间导航
 */
export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
        {/* 首页 */}
        <Route path="/" element={<Home />} />
        
        {/* 任务生成页面 */}
        <Route path="/generate" element={<TaskGeneration />} />
        
        {/* 任务详情页面 */}
        <Route path="/tasks/:sessionId?" element={<TaskDetails />} />
        
        {/* 用户中心页面 */}
        <Route path="/profile" element={<UserProfile />} />
        
        {/* 登录页面 */}
        <Route path="/login" element={<Auth />} />
        
        {/* 注册页面 */}
        <Route path="/register" element={<Auth />} />
        
        {/* 404页面 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="parchment-card p-8 text-center">
              <h2 className="handwriting text-4xl text-amber-800 mb-4">迷路了？</h2>
              <p className="text-amber-700 mb-6">看起来你走错了路，让我们回到探险的起点吧！</p>
              <a 
                href="/" 
                className="wax-seal-btn inline-block"
              >
                返回首页
              </a>
            </div>
          </div>
        } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
