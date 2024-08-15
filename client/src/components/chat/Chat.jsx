import { useState } from "react";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Close from "../../assets/close-blue.png";
import Send from "../../assets/send.png";
import Person from "../../assets/person.png"

const Chat = ({ chat, setChat, user , index}) => {
	const [desc, setDesc] = useState("");
	const { currentUser } = useContext(AuthContext);
	const senderUserId = currentUser.id;
	const receiverUserId = user.id;
	const { isLoading, error, data } = useQuery(["chats"], () =>
    makeRequest.get("/chats?userId="+currentUser.id+"&friendUserId="+user.id).then((res) => {
      return res.data;
    })
  );
	// console.log(user)
	// console.log(data)

	const queryClient = useQueryClient();

  const mutation = useMutation(
    (newChat) => {
      return makeRequest.post("/chats", newChat);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["chats"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, senderUserId, receiverUserId });
    setDesc("");
  };

	return (
		<div className=" w-[258px] h-[355px] z-[100] bg-[#f9f9f9] 
									rounded-[3%] shadow-[0px_0px_25px_-10px_rgba(0,0,0,0.38)] border-[#e7e7e7] border-solid border">
			<div className="h-[40px] border-b-[#e7e7e7] border-b-solid border-b">
				<div className="user">
					{user.profilePic
						? <img src={"/upload/" + user.profilePic} alt=""/>
						: <img src={Person} alt=""/>
					}
					<span>{user.name}</span>
					<button className="ml-auto mr-[5px] rounded-[50%] hover:bg-[#ededed]" onClick={() => setChat(chat.slice(0,index).concat(chat.slice(index+1,chat.length)))}>
						<img  src={Close} alt="" />
					</button>
					
				</div>
			</div>
			<hr/>
			<div className="overflow-scroll w-full h-[285px] text-[12px] relative py-[10px] px-[5px]">
				{error
					? ""
					: isLoading
					? "loading"
					: data.map((chat,i) => (
							<div key={index*1000+i}>
								{
									chat.senderUserId===user.id
										? <div className="bg-[#e0e0e0] rounded-[15px] w-fit py-[5px] px-[8px] relative left-[5px] max-w-[70%] mb-[5px]">
												<p> {chat.desc} </p>
											</div>
										: <div className="flex w-full justify-end">
												<div className="bg-[#4f87ff] rounded-[15px] text-white w-fit py-[5px] px-[8px] max-w-[70%] mb-[5px]">
													<p> {chat.desc} </p>
												</div>
											</div>
								}
							</div>
						))}
			</div>
			<form onSubmit={handleClick} className="bg-[#f1f1f1] h-[45px] w-full absolute bottom-0 flex pl-[10px] mr-[5px]">
				<input className="w-[85%] h-[30px] self-center rounded-[10px] bg-[#e4e4e4] shadow py-2 px-3 text-black text-[12px] focus:outline-none"
					type="text"
					placeholder={"Aa"}
					onChange={(e) => setDesc(e.target.value)}
					value={desc}
				/>
				<button type="submit" className="ml-auto mr-[5px] rounded-[50%] hover:bg-[#e9e9e9] w-[30px] h-[30px] self-center" >
					<img src={Send} alt=""  className="w-[20px] h-[20px] mx-auto"/>
				</button>
			</form>

		</div>
	);
};

export default Chat;