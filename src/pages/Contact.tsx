import { useState } from 'react';
import { AnimatedSection } from '../components/AnimatedSection';
import { useSettings } from '../hooks/useSettings';
import { supabase } from '../lib/supabase';
import { MessageCircle, Send, CheckCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const { settings } = useSettings();
  console.log(settings);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  <div
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "green",
    color: "white",
    padding: "15px",
    borderRadius: "50%",
    zIndex: 9999,
  }}
>
  WA
</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const { error: err } = await supabase.from('contact_enquiries').insert({
      name: form.name,
      phone: form.phone || null,
      email: form.email || null,
      message: form.message,
    });
    setSending(false);
    if (err) {
      setError('Something went wrong. Please try again.');
    } else {
      setSent(true);
      setForm({ name: '', phone: '', email: '', message: '' });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/50 text-sm max-w-lg mx-auto">
            Have a question or ready to start? Reach out and we will respond within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-10">
          <AnimatedSection>
            {sent ? (
              <div className="card-glass p-8 text-center">
                <CheckCircle size={40} className="text-mint mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-sm text-white/50">Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-glass p-8">
                <h3 className="text-base font-semibold text-white mb-5">Send a Message</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-1 block">Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint transition-colors placeholder-white/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-1 block">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint transition-colors placeholder-white/30"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-1 block">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint transition-colors placeholder-white/30"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-white/50 mb-1 block">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-white/10 text-sm text-white focus:outline-none focus:border-mint transition-colors resize-none placeholder-white/30"
                      placeholder="How can we help you?"
                    />
                  </div>
                  {error && <p className="text-xs text-red-400">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary justify-center"
                  >
                    <Send size={14} />
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection className="flex flex-col gap-6">
            <div className="card-glass p-8">
              <h3 className="text-base font-semibold text-white mb-5">Contact Information</h3>
              <div className="flex flex-col gap-4">
                {settings?.address && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Address</p>
                      <p className="text-sm text-white">{settings.address}</p>
                    </div>
                  </div>
                )}
                {settings?.phone && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-sm text-white">{settings.phone}</p>
                    </div>
                  </div>
                )}
                {settings?.email && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">Email</p>
                      <p className="text-sm text-white">{settings.email}</p>
                    </div>
                  </div>
                )}
              </div>
              {settings?.whatsapp_number && (
                <a
                href={`https://wa.me/${settings.whatsapp_number}?text=Hi%20I%20want%20to%20know%20about%20your%20Weight%20Loss%20Program.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 w-fit"
                >
                  <MessageCircle size={28} className="text-white" />
                  Chat on WhatsApp
                </a>
              )}
              
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-64">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.196096091947!2d75.35237197478864!3d19.916139681469232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdbbd1f8ab79abf%3A0xc6d6e5484fa7f1fd!2sPRAGATI%20wellness%20centre!5e0!3m2!1sen!2sin!4v1782561336252!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
