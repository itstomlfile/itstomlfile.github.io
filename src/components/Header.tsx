import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto p-5 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/" className="hover:text-gray-400 transition ease-in-out duration-200">
                        Tom Charlesworth
                    </Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink to="/about" className="hover:text-gray-400 transition ease-in-out duration-200" activeClassName="text-gray-400">
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects" className="hover:text-gray-400 transition ease-in-out duration-200" activeClassName="text-gray-400">
                                Projects
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className="hover:text-gray-400 transition ease-in-out duration-200" activeClassName="text-gray-400">
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