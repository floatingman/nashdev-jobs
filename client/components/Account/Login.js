import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { githubLogin } from "../../actions/oauth";
import Messages from "../Messages";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
  }

  handleGithub() {
    this.props.dispatch(githubLogin());
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="masthead">Log In</h1>
        <Messages messages={this.props.messages} />
        <div className="row">
          <div className="col-lg-8 col-sm-12">
            <form onSubmit={this.handleLogin.bind(this)}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
                autoFocus
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
              />
              <p>
                <Link to="/forgot">Forgot your password?</Link>
              </p>
              <button type="submit" className="btn">
                Log in
              </button>
            </form>
          </div>
          <aside className="col-lg-4 col-sm-12">
            <button onClick={this.handleGithub.bind(this)} className="btn">
              Sign in with Github
            </button>
            <br />
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="btn">
                Sign up
              </Link>
            </p>
          </aside>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Login);
