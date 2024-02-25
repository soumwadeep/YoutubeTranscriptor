import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../components/FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  const validateLogin = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
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
      <h1>Welcome To Youtube Transcriber</h1>
      <button className="btn btn-danger btn-lg" onClick={handleLogout}>
        Log Out
      </button>
    </main>
  );
};

export default Home;
