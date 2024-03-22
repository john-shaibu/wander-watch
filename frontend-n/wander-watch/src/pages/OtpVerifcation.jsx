import React, { useEffect, useState } from 'react'
import PageHelmet from '../components/Helmet'
import { FullLogo } from '../assets'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '../hooks/useMutation'
import { MailIcon, PasscodeIcon } from '../assets'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'

import { resendVerifyOTP, verifyOTP } from '../request'



const OtpVerifcation = () => {
  let [error_message, setError] = useState('');

  const { register, handleSubmit, watch, formState : {errors} } = useForm();
  const [params] = useSearchParams()
  const email = params.get('email')

  const resendOTPMutation = useMutation((params, config) => resendVerifyOTP({ email }, config), {
    onSuccess: (data) => {
      alert(`Resent to ${data.data.email}`)
    },
    onError(err){
      setError(error_message = err.message)   
    }
  })

  const verifyOTPMutation = useMutation((params, config) => verifyOTP(params, config))
  const navigate = useNavigate()
  const onSubmit = (data) => {
    verifyOTPMutation.mutate({email, verificationCode: data.code}, {
      onSuccess(successData){
        navigate('/')
      },
      onError(err){
        setError(error_message = err.message)   
      },
      onSettled({value, error, retries}){
      }
    })
    
    
  }

  return (
    <>
      <div className="container">
        <PageHelmet title='OTP verification' keywords='location tracker, wander watch, location monitor' description='Wander watch OTP verification' />

        <div className="login">
          <a href="#" className="logoLink">
            <FullLogo />
          </a>
          <div className="otpFormContainer">
            <b>Almost There! Verify Your Email Address</b>
            {!error_message ? '' : <ErrorMessage message= {error_message} />}
            <p>
              We've sent a verification code to <span>{email}</span>.
              Please enter the code below to complete your account setup.
            </p>
            <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
              <div className='otp_input'>
                  <input type= 'text'
                    {...register('code', {required : true})} 
                    id="otp" 
                    placeholder="------" 
                    minLength={6}
                    maxLength={6}
                    autoFocus
                    />
                    {errors.exampleRequired && <span>This field is required</span>}
                    <p>Didn't receive a code? <span onClick={resendOTPMutation.mutate}>Resend</span></p>
              </div>
              <button type="submit" className="primary-btn" disabled={verifyOTPMutation.isMutating}>Verify account</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtpVerifcation