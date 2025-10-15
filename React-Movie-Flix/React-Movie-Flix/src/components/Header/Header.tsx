import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      🎬 Movie Flex 🎥
    </span>
  );
};

export default Header;
