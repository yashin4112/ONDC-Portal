import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("seller");

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signup = async () => {
        setLoading(true)
        if (firstName === "" || lastName === "" || email === "" || password === "" || mobileNumber === "" || address === "") {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);

            const user = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                mobile_number: mobileNumber,
                address: address,
                type: type,
                uid: users.user.uid,
                time: Timestamp.now()
            }

            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            toast.success("Signup Successfully")
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setMobileNumber("");
            setAddress("");
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        name='firstName'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='First Name'
                    />
                </div>
                <div>
                    <input type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        name='lastName'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Last Name'
                    />
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div>
                    <input type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        name='mobileNumber'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Mobile Number'
                    />
                </div>
                <div>
                    <input type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        name='address'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Address'
                    />
                </div>
                <div>
                    <select 
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white outline-none'>
                        <option value="seller">Seller</option>
                        <option value="buyer">Buyer</option>
                    </select>
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup
