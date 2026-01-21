
import React, { useState, useEffect } from 'react';

/**
 * Camentra Landing Page
 * Apple-standard minimalist design.
 * Features: Video iPhone Mockup, Full Legal Privacy Policy.
 * Entity: Brand Alchemy LLC
 */

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className, style, fallbackSrc }) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      if (typeof currentSrc === 'string' && !currentSrc.endsWith('.png')) {
        setCurrentSrc(`${currentSrc}.png`);
      } else if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      }
      setHasError(true);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={{ ...style, opacity: hasError && !currentSrc ? 0 : 1 }}
      onError={handleError}
    />
  );
};

const IPhoneMockup: React.FC = () => {
  return (
    <div className="relative mx-auto w-[280px] h-[580px] md:w-[310px] md:h-[630px] bg-[#1d1d1f] rounded-[50px] p-[10px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] ring-1 ring-white/10 animate-fade-in">
      
      {/* Physical Chassis Accents (Buttons) */}
      <div className="absolute -left-[2px] top-28 w-[3px] h-12 bg-[#3a3a3c] rounded-l-md" /> {/* Action/Mute */}
      <div className="absolute -left-[2px] top-44 w-[3px] h-24 bg-[#3a3a3c] rounded-l-md" /> {/* Volume */}
      <div className="absolute -right-[2px] top-40 w-[3px] h-20 bg-[#3a3a3c] rounded-r-md" /> {/* Power */}

      {/* The "Screen" - Ultra Thin Bezel */}
      <div className="relative w-full h-full bg-black rounded-[40px] overflow-hidden shadow-inner flex items-center justify-center">
        
        {/* Dynamic Island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-end px-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/10" />
        </div>
        
        {/* Video Content */}
        <div className="w-full h-full relative">
          <video 
            src="/welcome-screen-1.mp4" 
            className="w-full h-full object-contain"
            autoPlay 
            loop 
            muted 
            playsInline
            poster="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800"
          />
          
          {/* Subtle Screen Glare Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col">
        <div className="flex justify-between items-center p-8 md:p-10 border-b border-gray-50 flex-shrink-0">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-8 md:p-10 overflow-y-auto text-[#424245] leading-relaxed custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const companyName = "Brand Alchemy LLC";
  const supportEmail = "support@camentra.com";

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-50 selection:text-blue-700">
      {/* Full Privacy Modal */}
      <Modal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
        title="Privacy Policy"
      >
        <div className="space-y-10">
          <section>
            <p className="text-sm text-[#86868b] mb-4">
              Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p>
              This Privacy Policy describes how <strong>{companyName}</strong> ("we," "our," or "us"), which operates the Camentra mobile application (the "App"), collects, uses, and protects your information when you use the App.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">1. Information We Collect</h3>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="space-y-4">
              <li><strong className="text-[#1d1d1f]">Account Information:</strong> If you create an account, we collect your email address and any profile information you provide.</li>
              <li><strong className="text-[#1d1d1f]">Usage and Diagnostic Data:</strong> We collect limited diagnostic data (such as crash logs and performance information) to improve app stability.</li>
              <li><strong className="text-[#1d1d1f]">Device Information:</strong> We may collect device identifiers, operating system version, and device type to improve app functionality.</li>
              <li><strong className="text-[#1d1d1f]">Content You Submit (e.g., photos):</strong> Content you choose to submit for in-app features is processed to provide results. We do not retain original photos on our servers, but we may retain derived data, metadata, or insights generated from that content to improve features and product quality.</li>
              <li><strong className="text-[#1d1d1f]">Avatar Images:</strong> If you upload a profile avatar, that image is stored in cloud storage associated with your account.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">2. How We Use Your Information</h3>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="space-y-2 list-disc pl-5 text-[#424245]">
              <li>Provide, maintain, and improve the App</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Diagnose crashes and performance issues</li>
              <li>Analyze content-related trends to improve guidance and product quality</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">3. Data Storage, Retention, and Security</h3>
            <p className="mb-4">Your data is primarily stored locally on your device. If you create an account, your account profile data and avatar (if uploaded) are stored on secure cloud servers.</p>
            <p className="mb-4"><strong className="text-[#1d1d1f]">Data Retention:</strong> We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete or anonymize your personal information within a reasonable timeframe.</p>
            <p className="mb-4"><strong className="text-[#1d1d1f]">Derived Data and Insights:</strong> We may retain derived data or insights generated from content to improve features. You may request deletion by contacting us.</p>
            <p className="mb-4"><strong className="text-[#1d1d1f]">Data Backup:</strong> You are responsible for backing up your photos and content. We are not liable for any loss of data.</p>
            <p><strong className="text-[#1d1d1f]">Sensitive Personal Information:</strong> We do not collect sensitive personal information (such as biometric data, health information, or precise geolocation).</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">4. Third-Party Services</h3>
            <p className="mb-4">The App uses third-party services for authentication, subscriptions, cloud storage, and crash reporting. We use:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Supabase (authentication and avatar storage)</li>
              <li>RevenueCat (subscription management)</li>
              <li>Apple App Store (subscription processing)</li>
              <li>Sentry (crash reporting)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">5. Your Rights and Choices</h3>
            <p className="mb-4">You have the right to:</p>
            <ul className="space-y-2 list-disc pl-5 mb-4">
              <li>Access, update, or delete your account information</li>
              <li>Request a copy of your personal data</li>
              <li>Opt out of certain data collection through settings</li>
              <li>Request removal of your User Content from our systems</li>
            </ul>
            <p>To exercise these rights, contact us at <span className="text-blue-600">{supportEmail}</span>. We typically respond within 30 days.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">6. Children's Privacy</h3>
            <p>The App is not intended for children under 13. We do not knowingly collect information from children under 13. If you believe we have, please contact us immediately.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-[#1d1d1f] mb-4">7. Contact Us</h3>
            <p>If you have questions about this Privacy Policy, please contact us at:<br /><strong>{supportEmail}</strong></p>
          </section>
        </div>
      </Modal>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SafeImage 
              src="/logo-transparent-background.png"
              alt="Camentra Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-[#1d1d1f]">Camentra</span>
          </div>
          <nav className="hidden md:flex gap-8 text-[13px] font-medium text-[#86868b]">
            <a href="#features" className="hover:text-[#1d1d1f] transition-colors">How it Works</a>
            <a href="#about" className="hover:text-[#1d1d1f] transition-colors">Our Goal</a>
            <a href="#contact" className="hover:text-[#1d1d1f] transition-colors">Support</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-32 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="text-center md:text-left flex flex-col items-center md:items-start flex-1 order-2 md:order-1 animate-fade-in">
              <div className="mb-8 hidden md:block">
                <SafeImage 
                  src="./app-icon-ios.png" 
                  alt="Icon" 
                  className="w-16 h-16 rounded-[22.5%] shadow-md border border-gray-100"
                />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1d1d1f] mb-6 leading-[1.1]">
                Pro Quality Photos, Simplified.
              </h1>
              <p className="text-lg md:text-xl text-[#86868b] font-medium mb-10 leading-relaxed max-w-xl">
                You don't need a studio or professional camera to take great photos. Camentra is an AI-powered coach that helps you take clear, consistent, and beautiful pictures right from your phone.
              </p>
              <div className="inline-flex items-center bg-black text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-[#1d1d1f] transition-all cursor-default shadow-xl shadow-black/10 active:scale-95">
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.36 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download on the App Store
              </div>
            </div>
            
            <div className="flex-1 order-1 md:order-2">
              <IPhoneMockup />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-[#f5f5f7]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-[#1d1d1f]">No Guesswork</h3>
                <p className="text-[#86868b] leading-relaxed">
                  Camentra includes 25+ overlay templates and an AI coach that guides your phone to the perfect angle in real-time.
                </p>
              </div>

              <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-[#1d1d1f]">Brand Consistency</h3>
                <p className="text-[#86868b] leading-relaxed">
                  Maintain the same style across every photo so your listings and social posts look professional and intentional.
                </p>
              </div>

              <div className="bg-white p-12 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-[#1d1d1f]">Done in One Shot</h3>
                <p className="text-[#86868b] leading-relaxed">
                  Stop scrolling through dozens of bad takes. Get the 'hero shot' the first time and get back to your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-10 tracking-tight">Built for you.</h2>
            <div className="space-y-8 text-lg md:text-xl text-[#424245] leading-relaxed">
              <p>
                Camentra is for the solo entrepreneur, small business owner or builder who wears every hat: The baker, the maker, and the shop owner. We know you don't have time to learn complex photography, but we also know that great photos define your brand.
              </p>
              <p>
                Our goal is to give you the confidence to capture your work beautifully, without the stress. We believe every business deserves to look its best.
              </p>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="contact" className="py-24 border-t border-gray-50 bg-white">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2 tracking-tight">Support</h2>
            <p className="text-[#86868b] mb-4">Have questions or need assistance?</p>
            <a href={`mailto:${supportEmail}`} className="text-[#0066cc] font-medium hover:underline text-lg">
              {supportEmail}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-2 opacity-40 grayscale">
              <SafeImage src="./logo-transparent-background" alt="" className="w-4 h-4" />
              <span className="font-bold text-[#1d1d1f] text-xs">Camentra</span>
            </div>
            <p className="text-[#1d1d1f] font-medium text-sm leading-none mb-1 text-gray-900">{companyName}</p>
            <p className="text-[#86868b] text-xs tracking-tight">© 2026. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-4 text-[13px] font-medium text-[#86868b]">
            <a href="#about" className="hover:text-[#1d1d1f] transition-colors">Our Goal</a>
            <a href="#contact" className="hover:text-[#1d1d1f] transition-colors">Support</a>
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-[#1d1d1f] transition-colors text-left"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
