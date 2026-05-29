import { Share2, Mail, ExternalLink, Check, Copy } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full py-10 bg-[#f3f4f6] dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* LEFT: Branding */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-bold text-xl text-blue-900 tracking-tight">TKMIT Portal</span>
            <p className="text-xs text-gray-500 mt-1.5">
              © 2024 TKM Institute of Technology. All Rights Reserved.
            </p>
          </div>

          {/* MIDDLE: Primary institutional links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-600">
            <button 
              onClick={() => setShowContact(true)} 
              className="hover:text-blue-800 transition-colors hover:underline cursor-pointer"
            >
              Contact Us
            </button>
            <a href="#" className="hover:text-blue-800 transition-colors hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-800 transition-colors hover:underline">
              Terms of Service
            </a>
            <a 
              href="http://www.tkmit.ac.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-800 transition-colors hover:underline flex items-center gap-1 font-semibold"
            >
              <span>tkmit.ac.in</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* RIGHT: Quick Utilities */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-blue-800 hover:text-white cursor-pointer ${
                copied ? 'bg-green-600 text-white! border-green-600' : ''
              }`}
              title="Share Portal Link"
              id="btn-footer-share"
            >
              {copied ? <Check className="h-4.5 w-4.5" /> : <Share2 className="h-4.5 w-4.5" />}
            </button>
            <button
              onClick={() => setShowContact(true)}
              className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-800 hover:text-white transition-all cursor-pointer"
              title="Campus Contact Registry"
              id="btn-footer-contact"
            >
              <Mail className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* CONTACT INFO MODAL */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-gray-100 relatve">
            <h3 className="text-lg font-bold text-blue-900 border-b pb-2 mb-4">Campus Contact Registry</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <p className="font-bold text-gray-800">TKM Institute of Technology</p>
                <p>Musaliar Hills, Karuvelil P.O., Kollam,</p>
                <p>Kerala, India - 691505</p>
              </div>
              <div className="border-t pt-3">
                <p className="font-semibold text-gray-800">Administration Office</p>
                <p>Phone: +91 474 2482833, 2482012</p>
                <p>Email: <a href="mailto:info@tkmit.ac.in" className="text-blue-700 hover:underline">info@tkmit.ac.in</a></p>
              </div>
              <div className="border-t pt-3">
                <p className="font-semibold text-gray-800">Training & Placement Cell</p>
                <p>Email: <a href="mailto:placement@tkmit.ac.in" className="text-blue-700 hover:underline">placement@tkmit.ac.in</a></p>
              </div>
            </div>
            <button
              onClick={() => setShowContact(false)}
              className="mt-6 w-full bg-blue-800 text-white font-bold py-2 rounded-lg hover:bg-blue-900 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
