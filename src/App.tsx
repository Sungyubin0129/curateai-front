import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Recommendation from './components/Recommendation';
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return(
    <div className="min-h-screen bg-gray-50">
     {/* 네비게이션 바 */}
         <nav className="bg-white shadow-md py-4 px-6 flex justify-center space-x-8">
           <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
             Login
           </Link>
           <Link to="/signup" className="text-gray-700 hover:text-green-600 transition">
             Signup
           </Link>
           <Link to="/recommend" className="text-gray-700 hover:text-purple-600 transition">
             Recommend
           </Link>
         </nav>

         {/* 라우팅 영역 */}
         <main className="p-6">
           <Routes>
             <Route path="/" element={<Navigate to="/login" replace />} />
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route
               path="/recommend"
               element={
                 <ProtectedRoute>
                   <Recommendation />
                 </ProtectedRoute>
               }
           />
             <Route path="*" element={<p className="text-center text-red-500">404: 페이지를 찾을 수 없습니다.</p>} />
           </Routes>
         </main>
       </div>
  );
}
export default App;