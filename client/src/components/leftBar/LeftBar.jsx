import "./leftBar.scss";
import Friends from "../../assets/friend.png";
import Groups from "../../assets/group.png";
import Memories from "../../assets/celebrate.png";
import Events from "../../assets/event.png";
import Games from "../../assets/game.png";
import Market from "../../assets/market.png";
import Save from "../../assets/save.png";
import Gallery from "../../assets/galary.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
        <Link to={"/profile/"+currentUser.id} style={{ textDecoration: "none" }}>
          <div className="user">
            <img
              src={"/upload/" +currentUser.profilePic}
              alt=""
            />
            <span>{currentUser.name}</span>
          </div>
        </Link>
          <Link to="/friends" style={{ textDecoration: "none" }}>
            <div className="item">
              <img src={Friends} alt="" />
              <span>Bạn bè</span>
            </div>
          </Link>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Kỷ niệm</span>
          </div>
          <div className="item">
            <img src={Save} alt="" />
            <span>Đã lưu</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Nhóm</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Games} alt="" />
            <span>Game</span>
          </div>
          
          <div className="item">
            <img src={Events} alt="" />
            <span>Sự kiện</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          
          
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
