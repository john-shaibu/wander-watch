function Login() {
  return (
    <>
      <div class="login">
        <form>
          <h3>Login to your account</h3>
          {/* <label>Email or username</label> */}
          <p>Email Address</p>
          <input type="email" placeholder="Ex. kygiddy@example.com" />

          {/* <label>Password</label> */}
          <p>Password</p>
          <input type="text" placeholder="Password" />

          <div class="switch">
            {/* <input type="checkbox" id="switch" checked /> */}
            {/* <label for="switch" class="custom-checkbox"></label> */}
            <br /><br />
            <span>Remember me</span>{" "}
            <span>
              {" "}
              <a href="!#">Forgot your Password?</a>
            </span>
          </div>
          <div class="in">
            <br /><br />
            <button>
              <a href="!#">Log in to your account</a>
            </button>
          </div>
          <p>Don't have an account yet? <span><a href="!#">Sign up</a></span></p>
        </form>
      </div>
    </>
  );
}
export default Login;
