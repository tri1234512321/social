import "./header.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import  { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useContext } from "react";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Logo from "../../assets/logo.png"

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState(false)

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("s");
    navigate("/search/"+desc, { replace: true });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate("/login")
  };
  return (
        <div className='navbar'>
          <div className='left'>
            <Link className="flex gap-2" to="/" style={{ textDecoration: "none" }}>
              <img className="w-[30px] h-[30px]" src={Logo} alt=""/>
              <span>FFOOD</span>
            </Link>
            <Link to="/">
              <HomeOutlinedIcon className="icon-bars-header"/>
            </Link>
          </div>
          <div className='mid'>
            <div className="search">
              <form onSubmit={handleClick}>
                <input type="text" placeholder="Tìm kiếm người dùng ..." 
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
                <SearchOutlinedIcon onClick={handleClick}/>
              </form>
            </div>
          </div>
          <div className='right'>
              <div className="right">
                <WidgetsOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsActiveOutlinedIcon />
                <div className="user">
                  <img onClick={()=>setIsLogout(!isLogout)}
                    src={"/upload/" + currentUser.profilePic}
                    alt=""
                  />
                  <span>{currentUser.name}</span>
                  {isLogout && (<button onClick={handleLogout} className="fixed right-[12px] top-[50px] bg-red-400 py-[5px] px-[10px] ">Logout</button>)}
                </div>
              </div>
          </div>
        </div>
  )
}

export default Header;