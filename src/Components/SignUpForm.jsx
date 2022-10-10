import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function SignUpForm({ onLogin, onSubmit, error, register, firebaseError }) {
  const nav = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user, googleSignIn } = useAuth();
  const inputClasses = "mt-3.5 mb-3 py-2 px-2 rounded-md outline-none";
  const errorInput = "border-2 border-red-600";
  const googleClickHandler = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        console.log(user);
        const name = result.user.displayName;
        const email = result.user.email;
        const profilePic = result.user.photoURL;
        nav("/user");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const signUpClickHandler = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <div className="flex flex-col  shadow-lg p-7 w-96 py-2 bg-neutral-300 rounded-lg scale-75">
      <h3 className="font-bold mx-auto my-2 text-stone-700 text-xl">
        Register an account
      </h3>
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-items-streatch"
      >
        <label className="font-bold">Full name:</label>
        <input
          placeholder="Surname First:"
          name="name"
          type="text"
          onChange={handleChange}
          className={`${inputClasses} ${error.name && errorInput}`}
          {...register("name", { required: true })}
        />

        <p className="text-center text-red-700 my-1 text-bold">
          {error.name && "Your full name is required"}
        </p>

        <label className="font-bold">Email:</label>
        <input
          placeholder="Valid email:"
          type="email"
          name="email"
          onChange={handleChange}
          className={`${inputClasses} ${error.email && errorInput}`}
          {...register("email", { required: true })}
        />
        <p className="text-center text-red-700 my-1 text-bold">
          {error.email && "The email must be a valid email."}
        </p>
        <label className="font-bold">Create password:</label>
        <input
          placeholder="Password:"
          onChange={handleChange}
          name="password"
          className={`${inputClasses} ${error.password && errorInput}`}
          type="password"
          {...register("password", { required: true })}
        />

        <p className="text-center text-red-700 my-1 text-bold">
          {" "}
          {error.password && "Password must be at least 8 characters"}
        </p>
        <label className="font-bold">Confirm password:</label>
        <input
          name="confirmPassword"
          placeholder="Confirm password:"
          onChange={handleChange}
          className={`${inputClasses} ${error.confirmPassword && errorInput}`}
          type="password"
          {...register("confirmPassword", { required: true })}
        />

        <p className="text-center text-red-700 my-1 text-bold">
          {error.confirmPassword && "Passwords Should Match"}
        </p>

        <p className="text-center text-red-700 my-1 text-bold">
          {firebaseError}
        </p>
        <button
          onClick={signUpClickHandler}
          class="hover:-translate-y-0.5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none ... bg-slate-800 rounded-md py-2 text-slate-50"
        >
          Sign Up
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
        Already have an account?{" "}
        <Link to="login">
          <span className="text-blue-600 font-bold">Login</span>
        </Link>{" "}
        instead{" "}
      </p>
    </div>
  );
}

export default SignUpForm;
