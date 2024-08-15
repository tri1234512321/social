import "./rightBar.scss";
import Chat from "../chat/Chat";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Close from "../../assets/close-blue.png";
import Send from "../../assets/send.png";
import Person from "../../assets/person.png"

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [openChat, setOpenChat] = useState(false);
  const [chat, setChat] = useState([]);
  // console.log(chat)

  const { isLoading, error, data } = useQuery(["friends"], () =>
    makeRequest.get("/friends?userId="+currentUser.id).then((res) => {
      return res.data;
    })
  );
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
        <p className="px-[10px] mt-[10px] mb-[15px] font-semibold">Quán ăn nổi bật</p>
          <div className="user" onClick={() => setOpenChat(!openChat)}>
            <div className="userInfo">
              <img 
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded">Theo dõi</button>
            </div>
          </div>
          <div className="user" onClick={() => setOpenChat(!openChat)}>
            <div className="userInfo">
              <img 
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded">Theo dõi</button>
            </div>
          </div>
          <div className="user" onClick={() => setOpenChat(!openChat)}>
            <div className="userInfo">
              <img 
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="online" />
              <span>Jane Doe</span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-2 rounded">Theo dõi</button>
            </div>
          </div>
        </div>
        
        <hr/>
        <div className="item">
          <p className="px-[10px] mt-[10px] mb-[15px] font-semibold">Người liên hệ</p>
          {error
            ? ""
            : isLoading
            ? "loading"
            : data.map((friend) => (
                <div className="user" onClick={()=>setChat(chat.concat(friend))} key={friend.id}>
                  <div className="userInfo">
                    {friend.profilePic
                      ? <img src={"/upload/" + friend.profilePic} alt=""/>
                      : <img src={Person} alt=""/>
                    }
                    <div className="online" />
                    <span>{friend.name}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div className="fixed right-[60px] bottom-[0px]">
        <div className="flex flex-row-reverse">
        {chat.map((user,index) => <div key={index}><Chat chat={chat} setChat = {setChat} user = {user} index={index}/></div>)}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
