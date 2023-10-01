import { Link } from 'react-router-dom';

function WorkQueueButton() {
  return (
    <Link to="/work-queue-management-ui">
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700">
        Work Queue Management
      </button>
    </Link>
  );
}

export default WorkQueueButton;
