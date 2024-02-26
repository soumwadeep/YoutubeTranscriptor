import { auth, db } from "../components/FirebaseConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    const scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"];
    provider.addScope(...scopes);

    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const userRef = doc(db, "Users", user.email);
        setDoc(
          userRef,
          {
            UserId: user.uid,
            Name: user.displayName,
            Email: user.email,
            Photo: user.photoURL,
            RegisteredOn: user.metadata.creationTime.toString(),
            LastSignedInOn: serverTimestamp(),
          },
          { merge: true }
        );
        Swal.fire(
          "Logged In Successfully!",
          `Welcome To Youtube Transcriptor ${user.displayName} !`,
          "success"
        );
        navigate(`/home/${token}`);
      })
      .catch((error) => {
        console.log("Failed:", error);
        const errorMessage = error.message;
        Swal.fire("Login Failed!", errorMessage, "error");
      });
  };
  return (
    <main className="rounded shadow-lg mt-5 p-3">
      <h1 className="text-center">Welcome To Offcial Youtube Transcriptor!</h1>
      <p className="text-center">Login To Continue Using Our Services.</p>
      <button className="btn btn-info btn-lg shadow-lg" onClick={handleSignIn}>
        <img src="/googlelogo.png" className="logo" alt="google" />
        &nbsp; Sign in With Google
      </button>
      <br />
      <br />
      <Link className="btn btn-success btn-lg" to="/search">
        Try The Unofficial Youtube Transcriptor
      </Link>
    </main>
  );
};

export default Login;
