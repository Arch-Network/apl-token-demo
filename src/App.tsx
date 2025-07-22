import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { OperationDemo } from './components/OperationDemo';
import { CommandHistory } from './components/CommandHistory';
import { About } from './components/About';
import { KeypairManager } from './components/KeypairManager';
import { Settings } from './components/Settings';
import { KeypairProvider } from './contexts/KeypairContext';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <KeypairProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/operation/:operationId" element={<OperationDemo />} />
            <Route path="/keypairs" element={<KeypairManager />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<CommandHistory />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </KeypairProvider>
    </SettingsProvider>
  );
}

export default App; 