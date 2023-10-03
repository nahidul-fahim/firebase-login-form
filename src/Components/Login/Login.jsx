import { useRef, useState } from "react";
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase.init";
import { Link } from "react-router-dom";


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
    };


    const emailRef = useRef('');

    const handleForgetPassword = () => {
        console.log('forget password is working');
        console.log(emailRef.current.value);
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRef.current.value) {
            alert("please provide a valid email first");
            return;
        }
        else if (!emailPattern.test(emailRef.current.value)) {
            alert("Please provide a valid email");
            return;
        }


        sendPasswordResetEmail(auth, emailRef.current.value)
            .then(
                console.log("check your mail")
            )
            .catch(error => {
                console.log(error.code)
            })

    }


    return (
        <div className="bg-[lightgray] p-10 rounded-md my-[100px] w-full lg:w-2/3 mx-auto flex flex-col justify-center items-center gap-y-10 relative">
            <div className="absolute top-3 right-4 flex justify-center items-center gap-3">
                <p className="font-medium text-[gray]"> New here?</p>
                <Link className="font-semibold text-[#d12a2a] underline" to="/signup">Sign up</Link>
            </div>
            <h2 className="text-3xl text-[#414141] font-bold">Login form</h2>
            <form onSubmit={handleLogin} className="w-full md:w-2/3 lg:w-[45%] space-y-8">
                <input ref={emailRef} className="px-5 py-2 rounded-md border-[1px] border-[#ffffff00] focus:outline-none w-full focus:border-[1px] focus:border-[#acacac]" type="email" name="email" placeholder="Email address" id="email" required />
                <div className="flex items-center">
                    <input className="px-5 py-2 rounded-md border-[1px] border-[#ffffff00] focus:outline-none w-full focus:border-[1px] focus:border-[#acacac]"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        id="password"
                        required />
                    <span onClick={handleShowPassword} className="ml-[-50px] font-semibold text-[14px] cursor-pointer"><button>{showPassword ? 'hide' : 'show'}</button></span>
                </div>
                <input type="submit" value="Login" className="bg-[#2b2b2b] cursor-pointer text-white px-4 py-2 rounded-md font-semibold hover:bg-[gray] duration-300 w-full" />

                <input onClick={handleForgetPassword} type="submit" value="Forgot password?" className="bg-[#387add] cursor-pointer text-white px-4 py-2 rounded-md font-semibold hover:bg-[#20386b] duration-300 w-full" />
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