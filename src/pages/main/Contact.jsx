import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending message
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thank you for reaching out. We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" }); // Reset form
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Helmet>
                <title>Contact Us</title>
            </Helmet>
            <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-beige mb-6">
                    Contact Us
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Have questions or concerns? Fill out the form below and we’ll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-beige"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-beige"
                        />
                    </div>

                    {/* Message Input */}
                    <div>
                        <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Write your message here..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-beige"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-beige text-white font-semibold py-3 rounded-lg hover:bg-dark-beige focus:outline-none focus:ring-2 focus:ring-beige"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
