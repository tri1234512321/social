import Friends from "../../components/friends/Friends"
import FriendRequests from "../../components/friendRequests/FriendRequests"
import "./friend.scss"

const Home = () => {
  return (
    <div className="home">
      <FriendRequests/>
      <Friends/>
    </div>
  )
}

export default Home