import { FullLogo, MailIcon, PasscodeIcon, Profile } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import '../styles/auth.css'
import PageHelmet from "../components/Helmet";
import { useForm } from "react-hook-form"
import { useMutation } from "../hooks/useMutation";
import { registerUser } from "../request";


const Register = () => {
  const { register, handleSubmit, watch, formState } = useForm();
  const { errors } = formState
  const registerMutation = useMutation((params, config) => registerUser(params, config))
  const navigate = useNavigate()
  const onSubmit = (data) => {
    registerMutation.mutate({
      fullname: data.fullname, email: data.user_email, password: data.password
    }, {
      onSuccess(successData) {
        console.log(successData);
        navigate('/otp-verification')
      },
      onError(err) {
        console.log(err);
      },
      onSettled({ value, error }) {
        
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
            <h2>Create a free account</h2>
            <form onSubmit={handleSubmit(onSubmit)} method="post">
              <div>
                <label htmlFor="fullname">Firstname and Lastname</label>
                <div>
                  <Profile />
                  <input type="text" {...register("fullname", { required: true })} placeholder="Ex: John Shaibu" id="fullname" />
                </div>
              </div>
              <div>
                <label htmlFor="user_email">Email Address</label>
                <div>
                  <MailIcon />
                  <input type="email" {...register("user_email", { required: true })} id="user_email" placeholder="Ex: johndoe@domain.com" />
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div>
                  <PasscodeIcon className='passcodeIcons' />
                  <input type='password'
                    {...register("password", { required: true }, { pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i })}
                    id="password"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirm_password">Confirm password</label>
                <div>
                  <PasscodeIcon className='passcodeIcons' />
                  <input type='password'
                    {...register("confirm_password", { required: true }, { pattern: /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i })}
                    id="confirm_password"
                    placeholder="Confirm password"
                  />
                </div>
              </div>
              <button type="submit" className="primary-btn">Create my account</button>
            </form>
            <p>Already have an account? <Link to='/login'>Login</Link> {registerMutation.isMutating}</p>
          </div>
        </div>
      </div>
    </>

  )
}

export default Register