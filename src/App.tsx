import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import WorkQueueManagement from './components/WQM';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 flex flex-col h-screen justify-between">
      <Header />
      <main className="flex-1 container mx-auto">
        <Routes>
          <Route path="/about" element={<h1>Coming Soon!</h1>} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/" element={<WorkQueueManagement />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;