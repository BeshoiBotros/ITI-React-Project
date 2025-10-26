import { useState } from "react";
import { Eye, EyeOff, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATIC_USERNAME = "admin";
const STATIC_PASSWORD = "admin123";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 800);
  };


  if (isLoggedIn) {
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h2 className="card-title text-3xl justify-center mb-2">Login</h2>
            <p className="text-base-content/60">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="alert alert-error mb-4">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {/* Username Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Username</span>
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                <User className="w-5 h-5 text-base-content/50" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="grow"
                  disabled={isLoading}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                <Lock className="w-5 h-5 text-base-content/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="grow"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-ghost btn-sm btn-circle"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-base-content/50" />
                  ) : (
                    <Eye className="w-5 h-5 text-base-content/50" />
                  )}
                </button>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="label cursor-pointer gap-2">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
                <span className="label-text">Remember me</span>
              </label>
              <a href="#" className="label-text-alt link link-primary">
                Forgot password?
              </a>
            </div>

            <div className="form-control mt-6">
              <button
                onClick={handleSubmit}
                className="btn btn-primary w-full"
                disabled={isLoading || !username || !password}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>

          <div className="divider">OR</div>


          <div className="text-center mt-4">
            <span className="text-base-content/60">Don't have an account? </span>
            <a href="#" className="link link-primary font-semibold">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}