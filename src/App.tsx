import { Header, Footer } from './components';
import { Workspace } from './pages';
import './sass/index.scss';

export function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        {false && <Workspace />}
        <div className="huge" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
