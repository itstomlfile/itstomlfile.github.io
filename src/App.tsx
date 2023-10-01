import { useForm, ValidationError } from '@formspree/react';
import { SubmissionError } from '@formspree/core';
import { useState, ChangeEvent } from 'react';
import WorkQueueButton from './components/WQM';

function ContactForm() {
  const FORMSPREE_ID: string | undefined = import.meta.env.VITE_FORMSPREE_ID || "mbjvpdkr";
  const [name, setName] = useState<string>('');
  const [state, handleSubmit] = useForm(FORMSPREE_ID as string);

  if (state.succeeded) {
    return (
      <div className="text-center mt-10 bg-gray-200 p-8 rounded-md shadow-md">
        <p className="text-gray-700 font-semibold">Thank you for your message, {name}. I will be in touch ASAP.</p>
      </div>
    );
  }

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-8 rounded-md shadow-md w-full max-w-lg mx-auto">
     <label htmlFor="fullname" className="block text-gray-600 font-medium mb-2">
        Full Name
      </label>
      <input
        id="fullname"
        type="text"
        name="fullname"
        value={name}
        onChange={handleNameChange}
        className="w-full p-2 border border-gray-400 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <ValidationError 
        prefix="Full Name" 
        field="fullname"
        errors={state.errors}
        className="text-red-600"
      />

      <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        className="w-full p-2 border border-gray-400 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
        className="text-red-600"
      />

      <label htmlFor="message" className="block text-gray-600 font-medium mb-2">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        className="w-full p-2 border border-gray-400 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
        rows={4}
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors as SubmissionError<any> | null}
        className="text-red-600"
      />

      <button type="submit" disabled={state.submitting} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700">
        Submit
      </button>
    </form>
  );

}

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-gray-100">
      <ContactForm />
      <WorkQueueButton />
    </div>
  );
}

export default App;
