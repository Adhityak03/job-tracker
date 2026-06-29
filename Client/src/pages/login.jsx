import { RiHandbagFill } from "react-icons/ri";
const Login = () => {
  return (

   <div className="min-h-screen flex flex-col items-center justify-center gap-8">
        <div className="flex items-center gap-3 text-blue-600 ">
            <RiHandbagFill  className="text-3xl "/>
            <h1 className="font-bold text-3xl">Job Tracker</h1>
        </div>
        <div className=" h-fit w-90 px-8 py-5  rounded-xl flex flex-col gap-6 shadow-2xl">
            <div>
                <h1 className="text-3xl font-semibold">Welcome back</h1>
                <p className="font-medium text-black/50">Login to your account</p>
            </div>
            <form className="flex flex-col gap-4 ">
                <div className="flex flex-col">
                <label > Email <span className="text-red-500">*</span></label>
                <input type="text" placeholder=" Enter your email" className="rounded h-9 border p-2"/>

                </div>
                <div className="flex flex-col w-full">
                    <label > Password <span className="text-red-500">*</span></label>
                    <input type="password" placeholder=" ********" className="rounded h-9 border p-2" />

                </div>
                    <div className="flex justify-end w- full ">
                        <p className="text-blue-500">Forgot password ?</p>
                    </div>
                 
                <div>
                    <button className="w-full bg-blue-600 font-semibold p-2 rounded-xl text-white">Login</button>
                </div>
                
            </form>
            
        </div>
    </div>
  );
};

export default Login;