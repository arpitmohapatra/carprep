import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Guide } from './pages/Guide';
import { Flashcards } from './pages/Flashcards';
import { Practice } from './pages/Practice';
import { TestGenerator } from './pages/TestGenerator';

function App() {
  // Get the base path from the environment
  const basename = import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/test-generator" element={<TestGenerator />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
