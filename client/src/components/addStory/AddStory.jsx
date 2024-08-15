import { useState } from "react";
import { makeRequest } from "../../axios";
import "./addStory.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Close from "../../assets/close-blue.png";

const AddStory = ({ setOpenAddStory, user }) => {
  const [cover, setCover] = useState(null);
  // const [texts, setTexts] = useState({
  //   email: user.email,
  // });

  const upload = async (file) => {
    console.log(file)
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // const handleChange = (e) => {
  //   setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  // };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (story) => {
      return makeRequest.post("/stories", story);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["stories"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    //TODO: find a better way to get image URL
    
    let coverUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    
    mutation.mutate({ img: coverUrl});
    setOpenAddStory(false);
    setCover(null);
  }
  
  return (
    <div className="update">
      <div className="wrapper">
        <p className="font-semibold text-black">Tải story của bạn</p>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span >Chọn ảnh</span>
              <div className="imgContainer">
                <img
                  src={
                    cover? URL.createObjectURL(cover): null
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          {/* <label>Email</label>
          <input
            type="text"
          /> */}
          <button onClick={handleClick}>Add story</button>
        </form>
        <button className="close rounded-[5px]" onClick={() => setOpenAddStory(false)}>
          <img src={Close} alt=""/>
        </button>
      </div>
    </div>
  );
};

export default AddStory;
