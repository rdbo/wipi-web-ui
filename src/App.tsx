import { Navigate, Route, Router } from '@solidjs/router';
import type { Component, ParentProps } from 'solid-js';
import HomePage from './pages/HomePage';
import { AuthProvider } from './providers/auth';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './ProtectedRoute';
import Footer from './components/Footer';
import { ThemeProvider } from './providers/theme';
import SettingsPage from './pages/SettingsPage';

const App: Component = () => {
  // TODO: Consider protecting routes on this Layout component
  //       and removing the ProtectedRoute wrapper
  const Layout = (props: ParentProps) => {
    return (<>
      <div class="min-h-screen bg-gray-50 text-slate-900 dark:bg-gray-900 dark:text-slate-100 transition-colors duration-200">
        <NavBar />
        <main class="container mx-auto px-4 py-6">
          {props.children}
        </main>
      </div>
      <Footer />
    </>);
  }

  return (
    <main>
      <AuthProvider>
        <ThemeProvider>
          <Router root={Layout}>
            <ProtectedRoute path="/" component={HomePage} />
            <ProtectedRoute path="/settings" component={SettingsPage} />
            <ProtectedRoute protection="Unauthenticated" path="/login" component={LoginPage} />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </main>
  );
};

export default App;
