import { Header, Footer } from './components';
import { Authorization } from './pages';
import './sass/index.scss';

export function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        {/* <div className="huge" /> */}
        <Authorization />
      </main>
      <Footer />
    </div>
  );
}

export default App;
