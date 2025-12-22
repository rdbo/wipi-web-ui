import { Navigate, Route, Router } from '@solidjs/router';
import type { Component, ParentProps } from 'solid-js';
import HomePage from './pages/HomePage';
import { AuthProvider } from './providers/auth';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './ProtectedRoute';
import Footer from './components/Footer';
import { ThemeProvider, Theme, useTheme } from './providers/theme';

const App: Component = () => {
  // TODO: Consider protecting routes on this Layout component
  //       and removing the ProtectedRoute wrapper
  const Layout = (props: ParentProps) => {
    const { theme } = useTheme();
    return (<>
      <div class="min-h-[100vh] bg-gray-50 text-slate-900" classList={{"!bg-gray-800 !text-slate-100": theme() == "dark"}}>
        <NavBar/>
        <main>
          {props.children}
        </main>
      </div>
      <Footer/>
    </>);
  }

  return (
    <main>
      <AuthProvider>
      <ThemeProvider>
        <Router root={Layout}>
          <ProtectedRoute path="/" component={HomePage}/>
          <ProtectedRoute protection="Unauthenticated" path="/login" component={LoginPage}/>
        </Router>
      </ThemeProvider>
      </AuthProvider>
    </main>
  );
};

export default App;
