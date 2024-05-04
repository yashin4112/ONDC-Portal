import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";

function Login() {
    const context = useContext(myContext)
    const {loading, setLoading} = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState({});

    const navigate = useNavigate();
    const [navigateToHome, setNavigateToHome] = useState(false);
    const [userType, setUserType] = useState("buyer");

    const login = async () => {
        setLoading(true)
        try {
            const creden = {email, password}
            axios.post('http://localhost:4001/login', creden)
            .then(function (response) {
                console.log(response);
                localStorage.setItem('isAuthenticated', "true");
                localStorage.setItem('user', JSON.stringify(response.data));
                setNavigateToHome(true);
                setLoading(false);
                setUserType(response.data.type);
                return <Navigate to={'/'}/>
            })
            .catch(function (error) {
                console.log(error);
            });
            
        } catch (error) {
            console.log(error)
            setLoading(loading)
        }

    }
   
    return (
        <>
            {localStorage.getItem('isAuthenticated') == "true" ? userType == "buyer" ? <Navigate to="/" /> : <Navigate to="/SellerHome"/> : <Navigate to="/login"/>}

            <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={login}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login