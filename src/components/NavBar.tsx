import { Link } from "react-router-dom";

const NavBar = () => (
    <nav className="bg-blue-500 p-4 shadow-md">
      <div className="container mx-auto">
        <Link to="/" className="text-white font-bold hover:underline">Back to Inspections</Link>
      </div>
    </nav>
  );

export default NavBar