import React, { useEffect, useState } from 'react'
import "./header.css";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NetflixLogo from "../../assets/images/NetflixLogo.png"
const Header = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else setShow(false);
        })
    }, []);
    return (
        <div className={`header_outer_container ${show && "nav__black"}`}>
            <div className='header_container'>
                <div className='header_left'>
                    <ul>
                        <li><img src={NetflixLogo} alt="Netflix Logo" width="100"/></li>
                        <li>Home</li>
                        <li>TVShows</li>
                        <li>Movies</li>
                        <li>Latest</li>
                        <li>MyList</li>
                        <li>Browse by Languages</li>
                    </ul>
                </div>
                <div className='header_right'>
                    <ul>
                        <li><SearchIcon/></li>
                        <li><NotificationsNoneIcon /></li>
                        <li><AccountBoxIcon/></li>
                        <li><ArrowDropDownIcon/></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header