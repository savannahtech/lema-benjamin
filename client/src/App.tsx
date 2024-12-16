import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import { UserPosts, Users } from './pages';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' reverseOrder={false} />
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='users' />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/posts' element={<UserPosts />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
