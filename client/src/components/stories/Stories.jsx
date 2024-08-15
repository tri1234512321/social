import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AddStory from "../../components/addStory/AddStory";
import { useState } from "react";

const Stories = () => {
  const [openAddStory, setOpenAddStory] = useState(false);
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)

  const { isLoading, error, data } = useQuery(["stories"], () =>
    makeRequest.get("/stories").then((res) => {
      return res.data;
    })
  );

  //TODO Add story using react-query mutations and use upload function.

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <button onClick={() => setOpenAddStory(true)}>+</button>
      </div>
      {error
        ? ""
        : isLoading
        ? "loading"
        : data.slice(undefined,3).map((story) => (
            <div className="story" key={story.id}>
              <img src={"/upload/" + story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
      
      {openAddStory && <AddStory setOpenAddStory={setOpenAddStory} user={data} />}
    </div>
  );
};

export default Stories;
