import React from "react";
import NavBarV from "./NavBarV";
import SideBarV from "./SideBarV";

const NavSide = () => {
  return (
    // <br/><br/>
    
    <div className="Nav-SideBar">
     
        <NavBarV />
       <div>
         <SideBarV />
       </div>
    </div>
   
  );
};

export default NavSide;