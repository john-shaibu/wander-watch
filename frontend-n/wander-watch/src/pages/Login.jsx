import { FullLogo, MailIcon, PasscodeIcon } from "../assets";
import { Link } from "react-router-dom";
import '../styles/auth.css'
import { useNavigate } from "react-router-dom";
import { useMutation } from "../hooks/useMutation";
import { useForm } from 'react-hook-form'
import { LoginUser } from "../request";

import PageHelmet from "../components/Helmet";
import ErrorMessage from "../components/ErrorMessage";
import { useEffect, useState } from "react";


import { LoginInfoHOC } from "../components/HOCs/loginInfoHOC";

const Login = () => {

  let [error_message, setError] = useState('');
  const { register, handleSubmit, watch, formState } = useForm();
  const { errors } = formState
  const loginMutation = useMutation((params, config) => LoginUser(params, config))
  // console.log(watch());
  const navigate = useNavigate()
  const onSubmit = (data) => {
    loginMutation.mutate({ email: data.email, password: data.password }, {
      onSuccess(successData) {
        navigate('/')
      },
      onError(ErrorMessage) {
        setError(error_message = ErrorMessage.message)
      },
      onSettled({ value, error, retries }) {

      }
    })
  }
  return (
    <>
      <div className="container">
        <PageHelmet title='Login' keywords='location tracker, wander watch, location monitor' description='Wander watch login page' />

        <div className="login">
          <a href="#" className="logoLink">
            <FullLogo />
          </a>
          <div className="formContainer">
            <h2>Login to your account</h2>
            {!error_message ? '' : <ErrorMessage message={error_message} />}
            <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
              <div>
                <label htmlFor="user_email">Email Address</label>
                <div>
                  <MailIcon />
                  <input type="email"
                    {...register('email', { required: true })}
                    id="user_email"
                    placeholder="Ex: johndoe@domain.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="user_password">Password</label>
                <div>
                  <PasscodeIcon className='passcodeIcons' />
                  <input type='password'
                    {...register('password', { required: true })}
                    id="user_password"
                    placeholder="Password"
                  />
                </div>
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

const LoginRedirect = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    navigate('/')
  }, [])
}


const LoginPage = () => {
 
  return <LoginInfoHOC fallback={<Login />} errorElement={<Login />}>{(data) => {
     return <LoginRedirect />
  }}</LoginInfoHOC>
}

export default LoginPage;
