import { useState } from "react";

import Button from "../components/Button";
import BackButton from "../components/BackButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Login</h1>

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
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;