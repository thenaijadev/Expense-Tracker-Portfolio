import React from "react";
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Bars } from "react-loading-icons";
import SignUpForm from "../Components/SignUpForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpSchema } from "../Schema/InputSchema";
import { authActions } from "../Store/authSlice";
import { useDispatch } from "react-redux";
function Signup() {
  const dispatch = useDispatch();
  const { signup, updateName, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = (input) => {
    setIsLoading(true);

    if (
      !errors.name ||
      !errors.email ||
      !errors.password ||
      !errors.confirmPassword
    ) {
      signup(input.email, input.password)
        .then((result) => {
          updateName(input.name);
          console.log(result);
          console.log(user);
          dispatch(authActions.login({ user: user }));
          nav("/user");
        })
        .catch((error) => {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            setError("Email already in use.");
          } else if (
            error.message === "Firebase: Error (auth/network-request-failed)."
          ) {
            setError("Please make sure you have internet connection.");
          } else if (error.message) {
            console.log(error.message);
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="w-screen flex justify-center flex-col items-center">
      <SignUpForm
        onSubmit={handleSubmit(onSubmit)}
        error={errors}
        register={register}
        firebaseError={error}
      />

      {isLoading && (
        <div className="h-screen w-screen flex absolute bg-black opacity-30 justify-center items-center">
          <Bars className="scale-50" />
        </div>
      )}
    </div>
  );
}

export default Signup;
