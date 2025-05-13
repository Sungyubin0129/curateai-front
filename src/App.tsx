import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Recommendation from './components/Recommendation';

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/recommend">Recommend</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recommend" element={<Recommendation />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;