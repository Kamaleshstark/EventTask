import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Toast from './components/Toast';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </main>
      </div>
    </TaskProvider>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
        <Toast />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;