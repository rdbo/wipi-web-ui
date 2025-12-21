import { Navigate, Route, Router } from '@solidjs/router';
import type { Component, ParentProps } from 'solid-js';
import HomePage from './pages/HomePage';
import { AuthProvider } from './providers/auth';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import NavBar from './components/NavBar';
import ProtectedRoute from './ProtectedRoute';

const App: Component = () => {
  // TODO: Consider protecting routes on this Layout component
  //       and removing the ProtectedRoute wrapper
  const Layout = (props: ParentProps) => {
    return (<>
      <NavBar/>
      <main>
        {props.children}
      </main>
    </>);
  }

  return (
    <main>
      <AuthProvider>
        <Router root={Layout}>
          <ProtectedRoute path="/" component={HomePage}/>
          <ProtectedRoute protection="Unauthenticated" path="/login" component={LoginPage}/>
          <ProtectedRoute protection="Any" path='/about' component={AboutPage}/>
        </Router>
      </AuthProvider>
    </main>
  );
};

export default App;
