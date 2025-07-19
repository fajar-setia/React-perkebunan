import { useState } from "react";
import { Eye, EyeOff, Github, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      alert("Email dan password harus diisi");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5296/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Login gagal: " + errorText);
      }

      const data = await response.json();
      const pending = sessionStorage.getItem("pendingCartItem");
      const redirectTarget = sessionStorage.getItem("loginRedirect") || "HomePage";

      // Simpan token & user ID (in real app, you'd use proper storage)
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);


      // Handle pending cart item (demo purposes)

      if (pending) {
        const item = JSON.parse(pending);
        await fetch("http://localhost:5296/api/Cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify({
            productId: item.productId,
            quantity: item.quantity,
          }),
        });
        sessionStorage.removeItem("pendingCartItem");
        sessionStorage.removeItem("loginRedirect");
        if (redirectTarget === "Cart") {
          navigate("/Cart");
        } else {
          navigate("/");
          alert(`${item.nameProduct} berhasil ditambahkan ke keranjang setelah login!`);
        }
      } else {

        sessionStorage.removeItem("loginRedirect");

        if (redirectTarget === "Cart") {
          navigate("/Cart");
        } else {
          navigate("/");
        }
      }

    } catch (error) {
      alert("Login gagal: " + error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login akan diimplementasikan dengan OAuth");
  };

  const handleGithubLogin = () => {
    alert("GitHub login akan diimplementasikan dengan OAuth");
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const forgotPassword = () => {
    alert("lupa password akan segera dibuat......")
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div> */}

      <div className="relative w-full max-w-md">
        {/* Main login card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-black-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl border-2">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            <button
              onClick={handleGithubLogin}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200 hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-300">or continue with email</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white-200 focus:border-transparent transition-all duration-200"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300 cursor-pointer">
                <input type="checkbox" className="mr-2 rounded bg-slate-600" />
                Remember me
              </label>
              <button onClick={forgotPassword}
                className="text-orange-400 hover:text-orange-300 transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-orange-400 text-white py-3 px-4 rounded-xl font-semibold shadow-lg transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <button
                onClick={handleRegister}
                className="text-orange-400 hover:text-orange-300 font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>© 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Login;