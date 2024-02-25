import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <main>
      <h1>Oops! Page Not Found!</h1>
      <Link className="btn btn-success btn-lg" to="/login">
        Go Back
      </Link>
    </main>
  );
};

export default ErrorPage;
