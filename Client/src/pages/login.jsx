import { RiHandbagFill } from "react-icons/ri";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-3 text-blue-600 ">
        <RiHandbagFill className="text-3xl " />
        <h1 className="font-bold text-3xl">Job Tracker</h1>
      </div>

      <div className="h-fit w-90 px-8 py-5 rounded-xl flex flex-col gap-6 shadow-2xl">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="font-medium text-black/50">Login to your account</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label>
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="rounded h-9 border p-2"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="rounded h-9 border p-2"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end w-full">
            <p className="text-blue-500">Forgot password ?</p>
          </div>

          <div>
            <button className="w-full bg-blue-600 font-semibold p-2 rounded-xl text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;