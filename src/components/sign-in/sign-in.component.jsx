import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { SignInContainer, SignInTitle, SignInButtons } from "./sign-in.styles";

const SignIn = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { email, password } = state;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setState({ ...state, email: "", password: "" });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <SignInContainer>
      <SignInTitle className="title">I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          label="email"
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          name="password"
          type="password"
          label="password"
          value={password}
          handleChange={handleChange}
          required
        />
        <SignInButtons>
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton isGoogleSignIn onClick={signInWithGoogle}>
            Sign In with Google
          </CustomButton>
        </SignInButtons>
      </form>
    </SignInContainer>
  );
};

export default SignIn;
