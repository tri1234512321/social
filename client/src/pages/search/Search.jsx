import "./search.scss"
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Person from "../../assets/person.png"

const Search = () => {
  const name = useLocation().pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)

  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest.get("/users?name="+name).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const followMutation = useMutation(
    (user) => {
      return makeRequest.post("/relationships", { followedUserId: user.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const makeFriendMutation = useMutation(
    (user) => {
      return makeRequest.post("/requests" , {userId:currentUser.id, requesterUserId: user.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["users"]);
      },
    }
  );

  const handleFollow = (request) => {
    followMutation.mutate(request);
  };

  const handleMakeFriend = (request) => {
    makeFriendMutation.mutate(request);
  };

  return (
    <div className="home">
      <div className="pt-[10px]">
        <p className="font-bold mb-[15px]">Bạn bè tìm kiếm</p>
        <div className="flex flex-wrap gap-4 mb-[25px]">
          {error
            ? ""
            : isLoading
            ? "loading"
            : data.map((user,index) => (
                <div className="friendRequest" key={index}>
                  { user.img
                    ? <img className="w-[170px] h-[170px]" src={"/upload/" + user.img} alt="" />
                    : <img className="w-[170px] h-[170px]" src={Person} alt="" />
                  }
                  <div className="px-[8px] py-[5px]">
                    <p className="text-slate-950 font-[600] py-[8px]">{user.name}</p>
                    <button onClick={()=>handleFollow(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-4 rounded w-full mb-[5px]">Theo dõi</button>
                    <button onClick={()=>handleMakeFriend(user)} className="bg-[#d9d9d9] hover:bg-[#d0d0d0] text-black font-semibold py-1 px-4 rounded w-full">Kết bạn</button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}

export default Search