"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Code, CheckCircle, AlertCircle } from "lucide-react";
import { Github, Linkedin } from "../UI/Icons";
import confetti from "canvas-confetti";
import { personalDetails } from "@/data/portfolioData";
import Card from "../UI/Card";
import Button from "../UI/Button";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please tell me your name.");
      setStatus("error");
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    if (!formData.message.trim()) {
      setErrorMessage("Please enter a message.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      
      // Trigger premium celebration confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#3b82f6", "#06b6d4", "#8b5cf6"],
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
      setErrorMessage(errorMessage);
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section id="contact" className="py-24 relative max-w-7xl mx-auto px-6">
      
      {/* Background glowing blob */}
      <div className="absolute w-[40rem] h-[40rem] rounded-full bg-cyan-500/5 filter blur-3xl -bottom-20 -left-20 -z-10" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase mb-2">
          Connect
        </h2>
        <h3 className="text-3xl sm:text-4xl font-display font-black text-white">
          Get In Touch
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-4 rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        {/* Left Side: Form */}
        <div className="lg:col-span-7">
          <Card glowColor="rgba(6, 182, 212, 0.15)" className="p-8 h-full">
            <h4 className="text-xl font-display font-black text-slate-100 mb-6">
              Send A Message
            </h4>

            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 px-4"
              >
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-4 animate-[bounce_1s_infinite]">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h5 className="text-lg font-bold text-slate-100 mb-2">
                  Message Sent Successfully!
                </h5>
                <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
                  Thank you for reaching out. I have received your message and will get back to you shortly.
                </p>
                <Button variant="secondary" onClick={() => setStatus("idle")}>
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Banner */}
                {status === "error" && errorMessage && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center gap-3 text-xs font-semibold">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:border-cyan-500/40 focus:bg-white/10 transition-all duration-200"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:border-cyan-500/40 focus:bg-white/10 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Inquiry regarding AI Project"
                    className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:border-cyan-500/40 focus:bg-white/10 transition-all duration-200"
                  />
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, timeline or query here..."
                    className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-slate-100 placeholder-slate-600 text-sm focus:border-cyan-500/40 focus:bg-white/10 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit button */}
                <Button 
                  type="submit" 
                  variant="primary" 
                  glow 
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Right Side: Contact info & Social grids */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Channel Detail Card */}
          <Card glowColor="rgba(139, 92, 246, 0.15)" className="p-8">
            <h4 className="text-xl font-display font-black text-slate-100 mb-6">
              Contact Details
            </h4>

            <div className="space-y-6">
              {[
                { icon: <Mail className="w-5 h-5 text-cyan-400" />, label: "Email Address", val: "saisudhanv2004@gmail.com", link: personalDetails.socials.email },
                { icon: <Phone className="w-5 h-5 text-blue-400" />, label: "Phone Number", val: personalDetails.socials.phone, link: `tel:${personalDetails.socials.phone}` },
                { icon: <MapPin className="w-5 h-5 text-purple-400" />, label: "Current Location", val: personalDetails.socials.location },
              ].map((channel, cIdx) => (
                <div key={cIdx} className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 shrink-0">
                    {channel.icon}
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {channel.label}
                    </h5>
                    {channel.link ? (
                      <a 
                        href={channel.link} 
                        className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors duration-200 mt-1 block cursor-pointer"
                      >
                        {channel.val}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-slate-200 mt-1 block">
                        {channel.val}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Social Profiles Grid */}
          <Card glowColor="rgba(59, 130, 246, 0.15)" className="p-8 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-display font-black text-slate-100 mb-2">
                Social Hubs
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-sans mb-6">
                Connect with me on other development channels, explore my contest statistics, or view code repositories.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Github className="w-5 h-5 text-slate-300" />, name: "GitHub", link: personalDetails.socials.github, bg: "hover:border-slate-500/20 hover:bg-slate-500/5" },
                { icon: <Linkedin className="w-5 h-5 text-blue-500" />, name: "LinkedIn", link: personalDetails.socials.linkedin, bg: "hover:border-blue-500/20 hover:bg-blue-500/5" },
                { icon: <Code className="w-5 h-5 text-yellow-500" />, name: "LeetCode", link: personalDetails.socials.leetcode, bg: "hover:border-yellow-500/20 hover:bg-yellow-500/5" }
              ].map((plat, pIdx) => (
                <a
                  key={pIdx}
                  href={plat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer ${plat.bg}`}
                >
                  {plat.icon}
                  <span className="text-[10px] font-bold text-slate-400 mt-2 block select-none">
                    {plat.name}
                  </span>
                </a>
              ))}
            </div>
          </Card>
        </div>

      </motion.div>
    </section>
  );
}
