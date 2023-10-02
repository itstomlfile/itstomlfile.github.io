import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import WorkQueueManagement from './components/WQM';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* Rest of your application */}
      <main className="container mx-auto p-5">
        <Routes>
          <Route path="/about" element={<h1>Coming Soon!</h1>} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/" element={<WorkQueueManagement />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;