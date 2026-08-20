import { RiHandbagFill } from "react-icons/ri";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authslice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    const result = await dispatch(registerUser(formData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-3 text-blue-600 ">
        <RiHandbagFill className="text-3xl" />
        <h1 className="font-bold text-3xl">JobTracker</h1>
      </div>

      <div className="h-fit w-95 px-10 py-5 rounded-xl flex flex-col gap-6 shadow-2xl">
        <div>
          <h1 className="text-xl font-semibold">
            New to <span className="text-blue-600 font-bold">JobTracker</span>
          </h1>
          <p className="font-medium text-black/50">Create your account</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label>
              Enter your name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="rounded h-9 border p-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label>
              Enter your email <span className="text-red-500">*</span>
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
              Create your password <span className="text-red-500">*</span>
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
            <p className="text-blue-500">Already have an account ?</p>
          </div>

          <div>
            <button className="w-full bg-blue-600 font-semibold p-2 rounded-xl text-white">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;