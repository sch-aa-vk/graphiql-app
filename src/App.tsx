import { Header, Footer } from './components';
import './sass/index.scss';

export function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="huge" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
