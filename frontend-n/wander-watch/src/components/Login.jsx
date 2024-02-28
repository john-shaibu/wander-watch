function Login() {
  return (
    <>
      <div class="login">
        <form>
          <label>Email or username</label>
          <input type="text" placeholder="Email or Username" />

          <label>Password</label>
          <input type="text" placeholder="Password" />

          <div class="switch">
            <input type="checkbox" id="switch" checked />
            <label for="switch" class="custom-checkbox"></label>
            <span>Remember me</span>
          </div>
          <div class="in">
            <button>
              <a href="./index.html">Log in</a>
            </button>
          </div>
          <div id="forgot-password">
            <a href="!#">Forgot your Password?</a>
          </div>
        </form>
      </div>
    </>
  );
}
export default Login;
