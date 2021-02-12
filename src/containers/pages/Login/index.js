import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";
import "./Login.scss";

function Login(props) {
  const [log, setlog] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setlog((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  };

  const handleSubmit = async () => {
    const { email, password } = log;
    const { history } = props;
    const res = await props.loginAPI({ email, password }).catch((err) => err);
    if (res) {
      console.log("success", res);
      localStorage.setItem("userData", JSON.stringify(res));
      setlog({ email: "", password: "" });
      history.push("/");
    } else {
      console.log("login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <p className="auth-title">Login Page</p>
        <input
          className="input"
          name="email"
          type="email"
          value={log.email}
          onChange={handleChange}
        />
        <input
          className="input"
          name="password"
          type="password"
          value={log.password}
          onChange={handleChange}
        />
        <Button
          title="Login"
          onClick={handleSubmit}
          loading={props.isLoading}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { isLogin: state.isLogin, isLoading: state.isLoading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAPI: (data) => dispatch(loginUserAPI(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
