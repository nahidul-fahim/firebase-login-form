import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase.init";

const Login = () => {

    const auth = getAuth(app);

    const [showPassword, setShowPassword] = useState(false);
    const [userCheck, setUserCheck] = useState('');
    const [userCheckFailed, setUserCheckFailed] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        setUserCheck('');
        setUserCheckFailed('');

        signInWithEmailAndPassword(auth, email, password)
        .then(userDetails => {
            const user = userDetails.user;
            setUserCheck(user);
        })
        .catch(error => {
            console.log(error.code)
            console.log(error.message)
            setUserCheckFailed(error.message);
        })
    }


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <div className="bg-[lightgray] p-10 rounded-md my-[100px] w-full lg:w-2/3 mx-auto flex flex-col justify-center items-center gap-y-10">
            <h2 className="text-3xl text-[#414141] font-bold">Login form</h2>
            <form onSubmit={handleLogin} className="w-full md:w-2/3 lg:w-[45%] space-y-8">
                <input className="px-5 py-2 rounded-md border-[1px] border-[#ffffff00] focus:outline-none w-full focus:border-[1px] focus:border-[#acacac]" type="email" name="email" placeholder="Email address" id="email" required />
                <div className="flex items-center">
                    <input className="px-5 py-2 rounded-md border-[1px] border-[#ffffff00] focus:outline-none w-full focus:border-[1px] focus:border-[#acacac]"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        id="password"
                        required />
                    <span onClick={handleShowPassword} className="ml-[-50px] font-semibold text-[14px] cursor-pointer"><button>{showPassword ? 'hide' : 'show'}</button></span>
                </div>
                <input type="submit" value="Login" className="bg-[#2b2b2b] cursor-pointer text-white px-4 py-2 rounded-md font-semibold hover:bg-[gray] duration-300" />
            </form>
            {
                userCheckFailed ? <p className="text-base font-semibold text-[red]">Please check your email and password again</p> : ''
            }
            {
                userCheck ? <p className="text-base font-semibold text-[#138f24]">Congratualtions! You are logged in.</p> : ''
            }
        </div>
    );
};

export default Login;