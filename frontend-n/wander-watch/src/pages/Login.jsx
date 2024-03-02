import { FullLogo } from "../assets";
import { Link } from "react-router-dom";
import '../styles/login.css'

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="login">
          <a href="#" className="logoLink">
            <FullLogo />
          </a>
          <div className="formContainer">
            <h2>Login to your account</h2>
            <form action="" method="post">
              <div>
                <label htmlFor="user_email">Email Address</label>
                <input type="email" name="user_email" id="user_email" placeholder="Ex: johndoe@domain.com" />
              </div>
              <div>
                <label htmlFor="user_password">Password</label>
                <input type="password" name="user_password" id="user_password" placeholder="Password" />
              </div>
              <div className="other_login_form_actions">
                <div className="remember_me_checkbox">
                  <label htmlFor="remember_me">
                    <input type="checkbox" name="remember_me" id="remember_me" />
                    Remember me
                  </label>
                </div>
                <Link to='/register' className="forgot_password_link">Forgot password?</Link>
              </div>
              <button type="submit" className="primary-btn">Login to your account</button>
            </form>
            <p>Don't have an account yet? <Link to='/register'>Create account</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
