// App.tsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import OperationForm from './pages/OperationForm';
import CategoryForm from './pages/CategoryForm';
import Header from './components/organisms/Header';
import Categories from './pages/Categories';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { login as loginAction } from './store/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from './types/user';

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        dispatch(
          loginAction({
            user: { id: decoded.id, email: decoded.email, name: decoded.name },
            token,
          })
        );
      } catch {
        // token invalide: on l'ignore
        console.warn('Invalid token in storage, ignoring.');
      }
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/operation/new" element={<OperationForm />} />
            <Route path="/operation/edit/:id" element={<OperationForm />} />
            <Route
              path="/category/new"
              element={
                <ProtectedRoute>
                  <CategoryForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
