import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import Send from "../../assets/send.png";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <hr className="mt-[20px]"/>
      <div className="scroll">
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment">
              <img className="img" src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <p className="font-bold">{comment.name}</p>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
      </div>
      <hr/>
      <div className="write">
        <img className="img" src={"/upload/" + currentUser.profilePic} alt="" />
        
          <input
            type="text"
            placeholder="Viết bình luận ..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <form onSubmit={handleClick}>
          <button type="submit" className="ml-auto mr-[5px] rounded-[50%] hover:bg-[#e9e9e9] w-[30px] h-[30px] self-center" >
            <img src={Send} alt=""  className="w-[20px] h-[20px] mx-auto"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
