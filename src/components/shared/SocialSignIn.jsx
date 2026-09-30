import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import googleIcon from '../../assets/icons/icons8-google.svg';
import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Button } from '@/components/ui/button';

const SocialSignIn = ({ label = "Continue with Google" }) => {
    const { googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const [pending, setPending] = useState(false);

    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = async () => {
        setPending(true);
        try {
            const res = await googleSignIn();
            await axiosPublic.post('/users', {
                email: res.user?.email,
                name: res.user?.displayName,
            });
            toast.success(`Welcome, ${res.user?.displayName?.split(' ')[0] || 'friend'}!`);
            navigate(from, { replace: true });
        } catch (err) {
            if (err?.code !== 'auth/popup-closed-by-user') {
                toast.error(err.message || 'Google sign-in failed. Please try again.');
            }
        } finally {
            setPending(false);
        }
    };

    return (
        <Button type="button" variant="outline" size="lg" className="w-full" onClick={handleGoogleSignIn} disabled={pending}>
            {pending ? <Loader2 className="animate-spin" /> : <img src={googleIcon} alt="" className="h-5 w-5" />}
            {label}
        </Button>
    )
}

export default SocialSignIn
