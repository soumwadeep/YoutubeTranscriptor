import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../components/FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { getCaption, getCaptionId } from "../components/GlobalFunctions";

const Home = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [result, setResult] = useState([]);
  const [captionId, setCaptionId] = useState("");
  const [userData, setUserData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const params = useParams();
  const accessKey = params.accessToken;

  const validateLogin = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        Swal.fire(
          "You Are Not Signed In!",
          "Please Sign In To Use Our Service...",
          "error"
        );
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    validateLogin();
  }, []);

  const youtube_parser = (url) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const videoId = youtube_parser(url);
      const captionData = await getCaptionId(videoId, accessKey);
      const captionId = captionData.data.items[0].id;
      console.log("CaptionId:", captionId);
      const captionContent = await getCaption(captionId, accessKey);
      const caption = captionContent.data;
      console.log("Caption:", caption);
    } catch (err) {
      console.log("Error", err);
      Swal.fire("Failed To Get Caption!", "Please Try Again...", "error");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        Swal.fire(
          "Logged Out Successfully!",
          "Please Visit Again Soon...",
          "success"
        );
        navigate("/login");
      })
      .catch((error) => {
        console.log("Log Out Failed!", error);
        Swal.fire("Log Out Failed!", error.message, "error");
      });
  };
  return (
    <main>
      <h1>Welcome To Youtube Transcriber {userData.displayName}</h1>
      <button className="btn btn-danger" onClick={handleLogout}>
        Log Out
      </button>
      <form className="row g-3 sticky-top mt-1" onSubmit={handleSearch}>
        <div className="col-md-11">
          <label htmlFor="Url" className="visually-hidden">
            Youtube Video URL
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Youtube Video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="col-md-1">
          <button
            type="submit"
            className="btn btn-success mb-3"
            disabled={isSearching}
          >
            {isSearching ? "Loading..." : "Search"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Home;
