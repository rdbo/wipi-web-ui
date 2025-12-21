import { Navigate, Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';
import HomePage from './pages/HomePage';
import { AuthProvider } from './providers/auth';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import AboutPage from './pages/AboutPage';

const App: Component = () => {
  return (
    <>
      <AuthProvider>
        <h1 class="text-2xl font-bold">WiPi Web UI</h1>
        <Router>
          <ProtectedRoute protection='Authenticated' path="/" component={HomePage}/>
          <ProtectedRoute protection='Unauthenticated' path="/login" component={LoginPage}/>
          <ProtectedRoute protection='Any' path='/about' component={AboutPage}/>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
