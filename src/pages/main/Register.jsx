// import loginImg from '../assets/others/authentication1.png';
import { useNavigate } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import auth from '../../firebase/firebase.init';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAuth from '@/hooks/useAuth';
import SocialSignIn from '@/components/shared/SocialSignIn';

const Register = () => {
    const axiosPublic = useAxiosPublic;
    const { createUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoUrl = e.target.photo.value;

        // Password validation: must be at least 6 characters long and include at least one uppercase and one lowercase letter.
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Password must be at least 6 characters long and include at least one uppercase and one lowercase letter.',
            });
            return;
        }

        try {
            // Create user
            const userCredential = await createUser(email, password);
            const user = userCredential.user;

            // Update user profile
            await updateProfile(user, {
                displayName: name,
                photoURL: photoUrl,
            });

            // Save user info to the database
            const userInfo = {
                name: name,
                email: email,
            };

            const response = await axiosPublic.post('/users', userInfo);

            if (response.data.insertedId) {
                // Log the user out after successful registration
                await signOut(auth);

                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'Your account has been created successfully! Please log in.',
                });

                // Reset the form fields and navigate to the login page
                e.target.reset();
                navigate('/');
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.message || 'An error occurred while registering your account.',
            });
        }
    };


    return (
        <div className="px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-white items-center">
                {/* Image Section */}
                <div className="hidden md:block order-2">
                    {/* <img src={loginImg} alt="login" className="w-full" /> */}
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center my-4">Register</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="name" className="text-dark-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
                                autoComplete="on"
                                required
                            />
                        </div>

                        {/* Photo URL */}
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="photo" className="text-dark-2">Photo</label>
                            <input
                                type="url"
                                id="photo"
                                name="photo"
                                placeholder="Enter your photo URL"
                                className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
                                autoComplete="on"
                                required
                            />
                        </div>

                        {/* Email */}
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

                        {/* Password */}
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

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="block text-center py-3 px-4 text-white font-semibold w-full rounded-lg my-4 bg-beige"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="text-beige text-center my-4">
                        Already registered?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="font-semibold cursor-pointer"
                        >
                            Login Now
                        </span>
                    </p>

                    <div className="flex items-center flex-col justify-center gap-4">
                        <p>Or sign up with</p>
                        <SocialSignIn/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
