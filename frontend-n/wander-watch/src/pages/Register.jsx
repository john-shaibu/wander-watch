import { FullLogo, MailIcon, PasscodeIcon, Profile } from "../assets";
import { Link } from "react-router-dom";
import '../styles/auth.css'

import { useState } from "react";
import PageHelmet from "../components/Helmet";

const Register = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="container">
        <PageHelmet title='Login' keywords='location tracker, wander watch, location monitor' description='Wander watch login page' />

        <div className="login">
          <a href="#" className="logoLink">
            <FullLogo />
          </a>
          <div className="formContainer">
            <h2>Create a free account</h2>
            <form action="" method="post">
              <div>
                <label htmlFor="username">Firstname and Lastname</label>
                <div>
                  <Profile />
                  <input type="text" name="username" id="username" placeholder="Ex: John Shaibu" />
                </div>
              </div>
              <div>
                <label htmlFor="user_email">Email Address</label>
                <div>
                  <MailIcon />
                  <input type="email" name="user_email" id="user_email" placeholder="Ex: johndoe@domain.com" />
                </div>
              </div>
              <div>
                <label htmlFor="user_password">Password</label>
                <div>
                  <PasscodeIcon className='passcodeIcons' />
                  <input type= {
                      showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    name="user_password" 
                    id="user_password" 
                    placeholder="Password" 
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirm_password">Confirm Password</label>
                <div>
                  <PasscodeIcon />
                  <input type= {
                      showPassword ? "text" : "password"
                    }
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    name="confirm_password" 
                    id="confirm_password" 
                    placeholder="Confirm Password" 
                  />
                </div>
              </div>
              <button type="submit" className="primary-btn">Create my account</button>
            </form>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
    </>

)}

export default Register