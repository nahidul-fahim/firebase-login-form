import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <ul className="text-base font-semibold space-x-5">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </ul>
        </div>
    );
};

export default Header;