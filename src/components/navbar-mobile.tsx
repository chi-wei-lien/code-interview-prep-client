import { useState } from "react";
import "../style/navbar-mobile.css"

const NavbarMobile = () => {
    const [opened, setOpened] = useState(false);
    return (
        <div>
            <div className="navbar-mobile">
                <div className="navbar-mobile-content">
                    <div className="three-lines-container">
                        <img className="three-lines" src="/icons/three-lines.svg"
                            onClick={() => {
                                setOpened(!opened);
                            }}></img>
                    </div>
                </div>
            </div>
            { opened ? 
                <div className="navbar-mobile-collapse-content">
                    <h1>Problem Log</h1>
                    <h1>Study Group</h1>
                    <h1>Account</h1>
                </div> : null}
        </div>
        
    )
}

export default NavbarMobile;