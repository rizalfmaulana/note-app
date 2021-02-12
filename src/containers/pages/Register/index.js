import React, { useState } from "react";
import "./Register.scss";
import firebase from "../../../config/firebase";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

function Register(props) {
  const [regis, setRegis] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegis((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = async () => {
    const { email, password } = regis;
    const res = await props
      .registerAPI({ email, password })
      .catch((err) => err);
    if (res) {
      setRegis({ email: "", password: "" });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-title">Register Page</p>
        <input
          className="input"
          type="email"
          name="email"
          value={regis.email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="input"
          type="password"
          value={regis.password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          title="Register"
          loading={props.isLoading}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerAPI: (data) => dispatch(registerUserAPI(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
