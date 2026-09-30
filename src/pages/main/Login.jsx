import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import SocialSignIn from '@/components/shared/SocialSignIn';
import AuthLayout from '@/components/shared/AuthLayout';
import PasswordInput from '@/components/shared/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import loginImg from '../../assets/couple2.jpg';

const friendlyError = (code) => {
    switch (code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
            return 'That email and password don’t match. Please try again.';
        case 'auth/too-many-requests':
            return 'Too many attempts. Please wait a moment and try again.';
        default:
            return 'We couldn’t sign you in. Please try again.';
    }
};

const Login = () => {
    const navigate = useNavigate();
    const { loginUser } = useAuth();
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
            const { user } = await loginUser(email, password);
            toast.success(`Welcome back, ${user?.displayName?.split(' ')[0] || 'friend'}!`);
            navigate(from, { replace: true });
        } catch (err) {
            setError(friendlyError(err.code));
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Sign in"
            image={loginImg}
            eyebrow="Welcome back"
            heading="Sign in to SoulMatch"
            subheading={<>New here? <Link to="/register" state={location.state} className="font-semibold text-primary hover:underline">Create a free account</Link></>}
            quote={{ text: 'We matched on a Tuesday and were engaged by spring. SoulMatch made the first hello easy.', author: 'Nadia & Arif' }}
        >
            <SocialSignIn />

            <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="you@example.com" autoComplete="email" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput id="password" name="password" placeholder="Your password" autoComplete="current-password" required />
                </div>

                {error && (
                    <p role="alert" className="rounded-xl bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="animate-spin" />}
                    {loading ? 'Signing in…' : 'Sign in'}
                </Button>
            </form>
        </AuthLayout>
    );
};

export default Login;
