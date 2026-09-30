import { Link, useNavigate } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { Check, Loader2 } from 'lucide-react';
import auth from '../../firebase/firebase.init';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAuth from '@/hooks/useAuth';
import SocialSignIn from '@/components/shared/SocialSignIn';
import AuthLayout from '@/components/shared/AuthLayout';
import PasswordInput from '@/components/shared/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import registerImg from '../../assets/couple1.jpg';

const passwordRules = [
    { test: (p) => p.length >= 6, label: 'At least 6 characters' },
    { test: (p) => /[A-Z]/.test(p), label: 'One uppercase letter' },
    { test: (p) => /[a-z]/.test(p), label: 'One lowercase letter' },
];

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { createUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const passwordValid = passwordRules.every((r) => r.test(password));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoUrl = form.photo.value;

        if (!passwordValid) {
            setError('Please choose a password that meets all the requirements.');
            return;
        }

        setError('');
        setLoading(true);
        try {
            const { user } = await createUser(email, password);
            await updateProfile(user, { displayName: name, photoURL: photoUrl });
            await axiosPublic.post('/users', { name, email });

            // Firebase signs new users in automatically; sign out so they log in with their new credentials.
            await signOut(auth);
            toast.success('Your account is ready! Please sign in.');
            navigate('/login');
        } catch (err) {
            setError(
                err.code === 'auth/email-already-in-use'
                    ? 'An account with this email already exists.'
                    : err.message || 'Something went wrong creating your account.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create account"
            image={registerImg}
            eyebrow="Start for free"
            heading="Create your account"
            subheading={<>Already a member? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></>}
            quote={{ text: 'Our families met within a month. It felt like the whole process was designed with care.', author: 'Tania & Rahim' }}
        >
            <SocialSignIn label="Sign up with Google" />

            <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" name="name" placeholder="Your name" autoComplete="name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" name="email" placeholder="you@example.com" autoComplete="email" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="photo">Photo URL</Label>
                    <Input type="url" id="photo" name="photo" placeholder="https://…" required />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-describedby="password-rules"
                        required
                    />
                    <ul id="password-rules" className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs">
                        {passwordRules.map((rule) => {
                            const ok = rule.test(password);
                            return (
                                <li key={rule.label} className={cn('flex items-center gap-1 transition-colors', ok ? 'text-emerald-600' : 'text-muted-foreground')}>
                                    <Check className={cn('h-3 w-3', !ok && 'opacity-30')} /> {rule.label}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {error && (
                    <p role="alert" className="rounded-xl bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="animate-spin" />}
                    {loading ? 'Creating account…' : 'Create account'}
                </Button>
            </form>
        </AuthLayout>
    );
};

export default Register;
