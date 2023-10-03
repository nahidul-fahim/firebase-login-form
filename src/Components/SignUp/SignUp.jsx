import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase.init";
import { useState } from "react";
import { Link } from "react-router-dom";


const SignUp = () => {

    const auth = getAuth(app);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleFormSubmission = e => {
        e.preventDefault();
        // const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const termsChecked = e.target.terms.checked;

        setErrorMessage();
        setSuccessMessage();

        if (password.length < 6) {
            setErrorMessage("Password should be 6 or more characters long");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorMessage("Your password should have at least one uppercase");
            return;
        }
        else if (!termsChecked) {
            setErrorMessage("Please accept terms & conditions first");
            return;
        }

        // Create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(userDetails => {
                console.log(userDetails);
                setSuccessMessage(userDetails)
            })
            .catch(error => {
                console.error(error.message);
                setErrorMessage(error.message)
            })
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }



    return (
        <div className="bg-[lightgray] p-10 rounded-md my-[100px] w-full lg:w-2/3 mx-auto flex flex-col justify-center items-center gap-y-10 relative">
            <div className="absolute top-3 right-4 flex justify-center items-center gap-3">
                <p className="font-medium text-[gray]">Already have an account?</p>
                <Link className="font-semibold text-[#d12a2a] underline" to="/login">Login</Link>
            </div>
            <h2 className="text-3xl text-[#414141] font-bold">Signup form</h2>
            <form onSubmit={handleFormSubmission} className="w-full md:w-2/3 lg:w-[45%] space-y-8">
                <input className="px-5 py-2 rounded-md border-[1px] border-[#ffffff00] focus:outline-none w-full focus:border-[1px] focus:border-[#acacac]" type="text" name="name" placeholder="Your name" id="name" />
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
                <div className="flex justify-start items-center gap-x-2 font-medium">
                    <input type="checkbox" name="terms" id="terms" /><span>I agree to terms & conditions</span>
                </div>
                <input type="submit" value="Signup" className="bg-[#2b2b2b] cursor-pointer text-white px-4 py-2 rounded-md font-semibold hover:bg-[gray] duration-300" />
            </form>
            {
                errorMessage ? <p className="text-base font-semibold text-[red]">{errorMessage}</p> : ''
            }
            {
                successMessage ? <p className="text-base font-semibold text-[#138f24]">Congratualtions! You have successfully created an account.</p> : ''
            }
        </div>
    );
};

export default SignUp;