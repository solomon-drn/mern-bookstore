import { useState } from "react";

import axios from "axios";

import Button from "../components/Button";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const data = {
      email,
      password,
    };

    axios
      .post("http://localhost:4000/api/v1/auth/login", data)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(
          error.response?.data?.message ||
            "Failed to login. Please try again."
        );
      });
  };

  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Login</h1>

      {loading && <Spinner />}

      {error && (
        <p className="text-red-500 text-center my-4">
          {error}
        </p>
      )}

      <form
        onSubmit={handleLogin}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto"
      >
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;