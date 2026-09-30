import { useState } from "react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import Reveal from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const channels = [
    { icon: Mail, title: "Email", value: "hello@soulmatch.com", href: "mailto:hello@soulmatch.com" },
    { icon: Phone, title: "Phone", value: "+880 1700-000000", href: "tel:+8801700000000" },
    { icon: MapPin, title: "Office", value: "Gulshan Avenue, Dhaka" },
    { icon: Clock, title: "Hours", value: "Sat–Thu, 9am – 8pm" },
];

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent!", { description: "Thank you for reaching out. We'll get back to you within a day." });
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="pb-24">
            <Helmet>
                <title>Contact | SoulMatch</title>
            </Helmet>
            <PageHeader
                eyebrow="Contact"
                title={<>We&apos;d love to <em className="text-primary">hear from you</em></>}
                lead="Questions about your profile, premium membership or a success story to share? Our team usually replies within a day."
            />

            <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.4fr]">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {channels.map((c, i) => {
                        const content = (
                            <>
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary">
                                    <c.icon className="h-5 w-5 text-primary" />
                                </span>
                                <span>
                                    <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">{c.title}</span>
                                    <span className="mt-0.5 block font-medium">{c.value}</span>
                                </span>
                            </>
                        );
                        return (
                            <Reveal key={c.title} delay={i * 0.06}>
                                {c.href ? (
                                    <a href={c.href} className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-soft transition hover:shadow-lift">{content}</a>
                                ) : (
                                    <div className="flex items-center gap-4 rounded-3xl bg-card p-5 shadow-soft">{content}</div>
                                )}
                            </Reveal>
                        );
                    })}
                </div>

                <Reveal>
                    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-card p-6 shadow-soft md:p-10">
                        <h2 className="text-2xl font-medium">Send us a message</h2>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full name</Label>
                                <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" rows={6} placeholder="How can we help?" value={formData.message} onChange={handleChange} required />
                        </div>
                        <Button type="submit" size="lg" className="w-full sm:w-auto">
                            <Send /> Send message
                        </Button>
                    </form>
                </Reveal>
            </div>
        </div>
    );
};

export default Contact;
