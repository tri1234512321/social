import { useContext } from "react";
import "./friends.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AddStory from "../../components/addStory/AddStory";
import { useState } from "react";
import Person from "../../assets/person.png"

const Friends = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)

  const { isLoading, error, data } = useQuery(["friends"], () =>
    makeRequest.get("/friends?userId="+currentUser.id).then((res) => {
      return res.data;
    })
  );
  
  const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (user) => {
  //     return makeRequest.post("/friends", { userId:currentUser.id,  friendUserId:user.id});
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["requests"]);
  //     },
  //   }
  // );

  const deleteMutation = useMutation(
    (user) => {
      return makeRequest.delete("/friends?id=" + user.friendId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["friends"]);
      },
    }
  );

  // const handleAccept = (request) => {
  //   mutation.mutate(request);
  // };

  const handleDelete = (friend) => {
    deleteMutation.mutate(friend);
  };

  return (
    <div className="pt-[10px]">
    <p className="font-bold mb-[15px]">Tất cả bạn bè</p>
    <div className="flex flex-wrap gap-4 mb-[25px]">
      {error
        ? ""
        : isLoading
        ? "loading"
        : data.map((friend,index) => (
            <div className="friend" key={100+index}>
              {friend.profilePic 
                ? <img className="w-[170px] h-[170px]" src={"/upload/" + friend.profilePic} alt="" />
                : <img className="w-[170px] h-[170px]" src={Person} alt="" />
              }
              <div className="px-[8px] py-[5px]">
                <p className="text-slate-950 font-[600] py-[8px]">{friend.name}</p>
                <button className="bg-[#d9d9d9] hover:bg-[#d0d0d0] text-black font-semibold py-1 px-4 rounded w-full mb-[5px]">Bỏ theo dõi</button>
                <button onClick={()=>handleDelete(friend)} className="bg-red-400 hover:bg-red-500 text-white font-medium py-1 px-4 rounded w-full">Hủy kết bạn</button>
              </div>
            </div>
          ))}
    </div>
    <hr className="border-[#cccccc]" />
    </div>
  );
};

export default Friends;
