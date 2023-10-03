const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white shadow-lg mt-10">
        <div className="container mx-auto p-5 flex items-center justify-center">
            © {(new Date()).getFullYear()} Tom Charlesworth. All rights reserved.
        </div>
        </footer>
    );
}

export default Footer;
