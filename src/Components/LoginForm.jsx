import React, { useState, Fragment } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loading-icons";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { user, googleSignIn } = useAuth();
  const inputClasses = "mt-3.5 mb-3 py-2 px-2 rounded-md outline-none";
  const errorInput = "border-2 border-red-600";
  const nav = useNavigate();
  const googleClickHandler = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        console.log(user);
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const loginClickHandler = (e) => {
    e.preventDefault();

    if (input.password === "") {
      setError("Wrong password");
    }
    setIsLoading(true);

    login(input.email, input.password)
      .then((result) => {
        console.log(result);
        console.log(user);
        nav("/user");
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("Email already in use.");
        } else if (
          error.message === "Firebase: Error (auth/network-request-failed)."
        ) {
          setError("Please make sure you have internet connection.");
        } else if (error.message === "Firebase: Error (auth/invalid-email).") {
          setError("Invalid Email");
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          setError("This account does not exist");
        } else if (error.message === "Firebase: Error (auth/wrong-password).") {
          setError("Wrong password");
        } else {
        }
        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      <div className="flex flex-col  shadow-lg p-7 w-96 py-2 bg-neutral-300 rounded-lg scale-75">
        <h3 className="font-bold mx-auto my-2 text-stone-700 text-xl">
          Register an account
        </h3>

        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-items-streatch"
        >
          <label className="font-bold">Email:</label>
          <input
            placeholder="Valid email:"
            name="email"
            onChange={handleChange}
            value={input.email}
            className={`${inputClasses} ${
              error === "Invalid Email" && errorInput
            }`}
          />

          <p className="text-center text-red-700 my-1 text-bold"></p>

          <label className="font-bold">Create password:</label>
          <input
            placeholder="Password:"
            onChange={handleChange}
            name="password"
            type={"password"}
            className={`${inputClasses}  ${
              error === "Wrong password" && errorInput
            }`}
            value={input.password}
          />

          <p className="text-center text-red-700 my-1 text-bold">{error}</p>

          <button
            onClick={loginClickHandler}
            class="hover:-translate-y-0.5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none ... bg-slate-800 rounded-md py-2 text-slate-50"
          >
            login
          </button>
        </form>
        <hr></hr>
        <button
          onClick={googleClickHandler}
          class="mt-3 bg-cyan-900 hover:-translate-y-0.5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none ...  rounded-md py-2 text-slate-50"
        >
          Continue with google
        </button>

        <p className="mx-auto mt-2 text-center">
          Dont have an account?{" "}
          <Link to="/">
            <span className="text-blue-600 font-bold">Sign up</span>
          </Link>{" "}
          Instead.{" "}
        </p>
      </div>
      {isLoading && (
        <div className="h-screen w-screen flex absolute bg-black opacity-30 justify-center items-center">
          <Bars className="scale-50" />
        </div>
      )}
    </Fragment>
  );
}

export default LoginForm;
