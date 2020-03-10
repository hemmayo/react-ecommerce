import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import SignUpStyles from "./sign-up.styles";

const INITIAL_STATE = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

const SignUp = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const { displayName, email, password, confirmPassword } = state;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      createUserProfileDocument(user, { displayName });

      setState(INITIAL_STATE);
    } catch (error) {
      console.error("error creating user", error.message);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };
  return (
    <SignUpStyles.Container>
      <SignUpStyles.Title>I do not have an account</SignUpStyles.Title>
      <span>Sign up with your email and password</span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          handleChange={handleChange}
          label="display name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          handleChange={handleChange}
          label="confirm password"
          required
        />
        <CustomButton type="submit">Sign up</CustomButton>
      </form>
    </SignUpStyles.Container>
  );
};

export default SignUp;
