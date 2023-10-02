import { NavLink, useMatch } from 'react-router-dom';

const Header: React.FC = () => {
  const aboutMatch = useMatch("/about");
  const projectsMatch = useMatch("/projects");
  const contactMatch = useMatch("/contact");

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto p-5 flex justify-between items-center">
        <div className="text-xl font-bold">
          <NavLink to="/" className="hover:text-gray-400 transition ease-in-out duration-200">
            Your Name
          </NavLink>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink to="/about" className={`hover:text-gray-400 transition ease-in-out duration-200 ${aboutMatch ? 'text-gray-400' : ''}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects" className={`hover:text-gray-400 transition ease-in-out duration-200 ${projectsMatch ? 'text-gray-400' : ''}`}>
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={`hover:text-gray-400 transition ease-in-out duration-200 ${contactMatch ? 'text-gray-400' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
