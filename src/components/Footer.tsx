import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSettings } from '../hooks/useSettings';
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-dark-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-white text-sm tracking-wide">
                PRAGATI <span className="text-mint font-normal">Wellness</span>
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Transform your body, transform your life. Premium yoga, wellness, and fitness center.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-white/50 hover:text-mint transition-colors">Home</Link>
              <Link to="/programs" className="text-sm text-white/50 hover:text-mint transition-colors">Programs</Link>
              <Link to="/courses" className="text-sm text-white/50 hover:text-mint transition-colors">Courses</Link>
              <Link to="/about" className="text-sm text-white/50 hover:text-mint transition-colors">About</Link>
              <Link to="/contact" className="text-sm text-white/50 hover:text-mint transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              {settings?.address && (
                <div className="flex items-start gap-2 text-sm text-white/50">
                  <MapPin size={16} className="mt-0.5 text-mint shrink-0" />
                  <span>{settings.address}</span>
                </div>
              )}
              {settings?.phone && (
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Phone size={16} className="text-mint shrink-0" />
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings?.email && (
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Mail size={16} className="text-mint shrink-0" />
                  <span>{settings.email}</span>
                </div>
              )}
               {settings?.instagram_url && (
      <a
        href={settings.instagram_url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-dark-700 hover:bg-pink-600 transition-all duration-300 flex items-center justify-center"
      >
        <FaInstagram className="text-white text-lg" />
      </a>
    )}

    {settings?.facebook_url && (
      <a
        href={settings.facebook_url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-dark-700 hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
      >
        <FaFacebookF className="text-white text-lg" />
      </a>
    )}

    {settings?.whatsapp_number && (
      <a
        href={`https://wa.me/${settings.whatsapp_number}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-dark-700 hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
      >
        <FaWhatsapp className="text-white text-xl" />
      </a>
    )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/30">{currentYear} Pragati Wellness Centre. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
