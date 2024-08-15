import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading:loadingLike, error:errorLike, data:dataLike } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const { isLoading:loadingUnLike, error:errorUnLike, data:dataUnLike } = useQuery(["unlikes", post.id], () =>
    makeRequest.get("/unlikes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const umutation = useMutation(
    (unliked) => {
      if (unliked) return makeRequest.delete("/unlikes?postId=" + post.id);
      return makeRequest.post("/unlikes", { postId: post.id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["unlikes"]);
      },
    }
  );
  
  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(dataLike.includes(currentUser.id));
    if(dataUnLike.includes(currentUser.id)) {
      umutation.mutate(dataUnLike.includes(currentUser.id));
    }
  };

  const uhandleLike = () => {
    umutation.mutate(dataUnLike.includes(currentUser.id));
    if(dataLike.includes(currentUser.id)) {
      mutation.mutate(dataLike.includes(currentUser.id));
    }
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/"+post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p className="mx-[15px]">{post.desc}</p>
          <img src={"/upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="flex items-center gap-[7px] rounded-[999px] bg-[#e4ebf7]">
            {loadingLike ? (
              "loading"
            ) : dataLike.includes(currentUser.id) ? (
              <div onClick={handleLike} className="hover:bg-[#d8e0ee] rounded-full w-[38px] h-[38px] p-[7px]">
                <ThumbUpIcon style={{ color: "blue", fontSize: "large"}}/>
              </div>
            ) :  (
              <div onClick={handleLike} className="hover:bg-[#d8e0ee] rounded-full w-[38px] h-[38px] p-[7px]">
                <ThumbUpOutlinedIcon style={{fontSize: "large"}}/>
              </div>
            )}
            {dataLike?.length-dataUnLike?.length}
            {loadingUnLike ? (
              "loading"
            ) : dataUnLike.includes(currentUser.id) ? (
              <div onClick={uhandleLike} className="hover:bg-[#d8e0ee] rounded-full w-[38px] h-[38px] p-[7px]">
                <ThumbDownIcon style={{ color: "red", fontSize: "large"}}/>
              </div>
            ) :  (
              <div onClick={uhandleLike} className="hover:bg-[#d8e0ee] rounded-full w-[38px] h-[38px] p-[7px]">
                <ThumbDownOutlinedIcon style={{fontSize: "large"}}/>
              </div>
            )}
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            <p >Bình luận</p>
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
