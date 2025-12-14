import { useRef } from 'react';
import Hero from './components/Hero';

import Evidence from './components/Evidence';
import Footer from './components/Footer';

function App() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
      <Hero />

      <Evidence />
      <Footer />
    </main>
  );
}

export default App;
