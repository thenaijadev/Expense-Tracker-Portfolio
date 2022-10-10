import React, { useState, useEffect } from "react";

function useValidator() {
  let isValid = true;
  const [validationError, setError] = useState(false);
  const validateFields = (email, password, confirmPassword, name) => {
    if (password !== confirmPassword) {
      setError({
        errorType: "Mismatch",
        errorMessage: "Password mismatch.",
      });
    } else {
      setError(false);
    }
    if (email.includes("@") === false) {
      setError({
        errorType: "Invalid Email",
        errorMessage: "A valid email is required",
      });
    } else {
      if (password.length < 8) {
        setError({
          errorType: "Too Short",
          errorMessage: "Your password is too short",
        });
      }
    }
  };
  useEffect(() => {}, [validationError]);
  return { isValid, validationError, validateFields };
}

export default useValidator;
