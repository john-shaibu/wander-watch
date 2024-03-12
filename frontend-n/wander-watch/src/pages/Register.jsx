import { FullLogo, MailIcon, PasscodeIcon, Profile } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import '../styles/auth.css'

import { useEffect, useState } from "react";
import PageHelmet from "../components/Helmet";
import { useForm } from "react-hook-form"


const Register = () => {
  const {register, handleSubmit, watch, formState} = useForm();
  const { errors } = formState
  const navigate = useNavigate()
  const onSubmit = () => navigate('/')

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
            <form onSubmit={handleSubmit(onSubmit)} method="post">
              <div>
                <label htmlFor="fullname">Firstname and Lastname</label>
                <div>
                  <Profile />
                  <input type="text" {...register("fullname", { required: true})} placeholder="Ex: John Shaibu" id="fullname" />
                </div>
              </div>
              <div>
                <label htmlFor="user_email">Email Address</label>
                <div>
                  <MailIcon />
                  <input type="email" {...register("user_email", { required: true})} id="user_email" placeholder="Ex: johndoe@domain.com" />
                </div>
              </div>
              <div>
                <label htmlFor="phone_number">Phone number</label>
                <div>
                  <PasscodeIcon className='passcodeIcons' />
                  <input type= 'text'
                    {...register("phone_number", { required: true}, {pattern : /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i })}
                    id="phone_number" 
                    // placeholder="Phone number" 
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