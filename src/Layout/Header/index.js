import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../../Assets/Images/logo.png"; // Adjust the path as needed
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" variant="light" className="mb-4">
      <Navbar.Brand to="/">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "100px", width: "auto" }} // Adjust the size as needed
          />
        </Link>
      </Navbar.Brand>
    </Navbar>
  );
};

export default Header;
