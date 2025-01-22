import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import useAuth from '@/hooks/useAuth';
import SocialSignIn from '@/components/shared/SocialSignIn';
import loginImg from '../../assets/couple2.jpg';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser, logoutUser } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setLoading(true);
        setError('');
        try {
            await loginUser(email, password);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Logged in successfully!',
            }).then(() => {
                navigate(from);
            });
        } catch (err) {
            setError(err.message || 'Error logging in.');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message || 'Error logging in. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text: 'You have been logged out successfully.',
            }).then(() => {
                navigate('/');
            });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to log out. Please try again.',
            });
        }
    };

    const handleNewAccountClick = () => navigate('/register');

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-white items-center">
                {/* Image Section */}
                <div className="hidden md:block">
                    <img src={loginImg} alt="login" className="w-full" />
                </div>

                {/* Form Section */}
                <div className="p-8 max-w-md">
                    <Helmet>
                        <title>Login | SoulMatch</title>
                    </Helmet>
                    <p className=" uppercase text-me-brown font-medium">start for free</p>
                    <h2 className="text-3xl font-bold my-2 playfair">Sign in to SoulMatch</h2>
                    <p className=" capitalize text-me-brown font-medium mb-4">Not a member? <span
                     onClick={handleNewAccountClick}
                    className="text-blue-500 cursor-pointer"> Sign Up Now</span></p>

                    <hr className='my-4 md:my-6'></hr>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="email" className="text-dark-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
                                autoComplete="on"
                                required
                            />
                        </div>

                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="password" className="text-dark-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
                                autoComplete="on"
                                required
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`block text-center py-3 px-4 text-white font-semibold w-full rounded-lg my-4 ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-me-teal'}`}
                            >
                                {loading ? 'Loading...' : 'Login now'}
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center flex-col justify-center gap-4">
                        <p>Or sign in with</p>
                        <SocialSignIn />
                        <div className="">
                            <button
                                onClick={() => navigate('/forgot-password')}
                                className="text-me-teal font-semibold cursor-pointer"
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
