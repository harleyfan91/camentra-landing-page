import React, { useState, useEffect } from 'react';

/**
 * Camentra Landing Page
 * Design system aligned with Brand Alchemy LLC parent brand (see README, Brand alignment).
 * Fonts: Inter + Source Serif 4. Hero H1: Inter bold uppercase (parent Hero.tsx); section titles: .font-serif.
 * Neutrals: Tailwind gray-* only, aligned with public/brand-tokens.css.
 * Nav: text-[10px] font-bold uppercase tracking-[0.2em]
 * Section stack: eyebrow xs uppercase gray-400; serif H3 4xl/5xl font-normal; body Inter font-light gray-500 (features sm/md:base; about/support lg where appropriate)
 * Footer: wordmark + nav + β△ © parent name (no extra “product of” line)
 */

// ─── Inline AlchemyMark ───────────────────────────────────────────────────────
// Mirrors AlchemyMark.tsx from Brand Alchemy repo.
// normal-case prevents CSS uppercase transform from converting β → B.
const AlchemyMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={`font-bold select-none inline-block text-xs tracking-[0.12em] normal-case ${className}`}
    aria-label="Brand Alchemy mark"
  >
    β△
  </span>
);

// ─── SafeImage ────────────────────────────────────────────────────────────────
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

// ─── iPhone Mockup ────────────────────────────────────────────────────────────
const IPhoneMockup: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setIsLoading(false));
    }
  }, []);

  return (
    <div className="relative mx-auto w-[280px] h-[580px] md:w-[310px] md:h-[630px] bg-gray-900 rounded-[50px] p-[10px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] ring-1 ring-white/10 animate-fade-in">
      <div className="absolute -left-[2px] top-28 w-[3px] h-12 bg-gray-700 rounded-l-md" />
      <div className="absolute -left-[2px] top-44 w-[3px] h-24 bg-gray-700 rounded-l-md" />
      <div className="absolute -right-[2px] top-40 w-[3px] h-20 bg-gray-700 rounded-r-md" />

      <div className="relative w-full h-full bg-black rounded-[40px] overflow-hidden shadow-inner flex items-center justify-center">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            className={`w-full h-full object-contain transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            autoPlay loop muted playsInline preload="auto"
            onPlaying={() => setIsLoading(false)}
            poster="/welcome-screen-poster.jpg"
          >
            <source src="/welcome-screen-1-fixed.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'var(--ba-color-scrim)' }}
        onClick={onClose}
      />
      {/* Modal radius aligned with parent marketing patterns */}
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-6 md:px-10 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="text-2xl font-normal font-serif text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="custom-scrollbar overflow-y-auto p-6 text-sm font-light leading-relaxed text-gray-500 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

// ─── App ──────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [waitlistUsedMailto, setWaitlistUsedMailto] = useState(false);
  const companyName = "Brand Alchemy LLC";
  const supportEmail = "support@camentra.com";
  const waitlistFormAction = import.meta.env.VITE_WAITLIST_FORM_ACTION?.trim();

  // Matches Brand Alchemy header scroll behavior
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const submitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = waitlistEmail.trim();
    if (!isValidEmail(email)) {
      setWaitlistStatus('error');
      return;
    }
    setWaitlistStatus('submitting');
    setWaitlistUsedMailto(false);
    try {
      if (waitlistFormAction) {
        const res = await fetch(waitlistFormAction, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error('submit failed');
      } else {
        setWaitlistUsedMailto(true);
        const subject = encodeURIComponent('Camentra: App Store launch list');
        const body = encodeURIComponent(
          `Please add this address to the launch notification list:\n\n${email}\n`,
        );
        const a = document.createElement('a');
        a.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
        a.rel = 'noopener noreferrer';
        a.click();
      }
      setWaitlistEmail('');
      setWaitlistStatus('success');
    } catch {
      setWaitlistStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-black selection:text-white">

      <Modal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
        <div className="space-y-10">
          <section>
            <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest font-bold">
              Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p>
              This Privacy Policy describes how <strong className="text-gray-900">{companyName}</strong> ("we," "our," or "us"), which operates the Camentra mobile application (the "App") and the Camentra marketing website, collects, uses, and protects your information.
            </p>
          </section>

          <section>
            <h3 className="mb-4 font-serif text-2xl font-normal text-gray-900">1. Information We Collect</h3>
            <p className="mb-4">We collect the following types of information:</p>
            <ul className="space-y-4">
              <li><strong className="text-gray-900">Website waitlist and marketing signups:</strong> If you submit your email on our website (for example to be notified when Camentra is available on the App Store), we collect that email address. We use it to send launch notices and, where permitted, occasional emails about Camentra and related products or updates. Every marketing email includes a way to unsubscribe.</li>
              <li><strong className="text-gray-900">Account Information:</strong> If you create an account, we collect your email address and any profile information you provide.</li>
              <li><strong className="text-gray-900">Usage and Diagnostic Data:</strong> We collect limited diagnostic data (such as crash logs and performance information) to improve app stability.</li>
              <li><strong className="text-gray-900">Device Information:</strong> We may collect device identifiers, operating system version, and device type to improve app functionality.</li>
              <li><strong className="text-gray-900">Content You Submit (e.g., photos):</strong> Content you choose to submit for in-app features is processed to provide results. We do not retain original photos on our servers, but we may retain derived data, metadata, or insights generated from that content to improve features and product quality.</li>
              <li><strong className="text-gray-900">Avatar Images:</strong> If you upload a profile avatar, that image is stored in cloud storage associated with your account.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-4 font-serif text-2xl font-normal text-gray-900">2. How We Use Your Information</h3>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Provide, maintain, and improve the App</li>
              <li>Send launch announcements, waitlist updates, and marketing about Camentra when you have signed up on our website</li>
              <li>Process transactions and manage subscriptions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Diagnose crashes and performance issues</li>
              <li>Analyze content-related trends to improve guidance and product quality</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-4 font-serif text-2xl font-normal text-gray-900">3. Data Storage, Retention, and Security</h3>
            <p className="mb-4">Your data is primarily stored locally on your device. If you create an account, your account profile data and avatar (if uploaded) are stored on secure cloud servers.</p>
            <p className="mb-4"><strong className="text-gray-900">Data Retention:</strong> We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete or anonymize your personal information within a reasonable timeframe.</p>
            <p className="mb-4"><strong className="text-gray-900">Derived Data and Insights:</strong> We may retain derived data or insights generated from content to improve features. You may request deletion by contacting us.</p>
            <p className="mb-4"><strong className="text-gray-900">Data Backup:</strong> You are responsible for backing up your photos and content. We are not liable for any loss of data.</p>
            <p><strong className="text-gray-900">Sensitive Personal Information:</strong> We do not collect sensitive personal information (such as biometric data, health information, or precise geolocation).</p>
          </section>

          <section>
            <h3 className="mb-4 font-serif text-2xl font-normal text-gray-900">4. Third-Party Services</h3>
            <p className="mb-4">The App and our website may use third-party services for authentication, subscriptions, cloud storage, crash reporting, and (for example) processing email signups or delivering messages. We use:</p>
            <ul className="space-y-2 list-disc pl-5">
              <li>Supabase (authentication and avatar storage)</li>
              <li>RevenueCat (subscription management)</li>
              <li>Apple App Store (subscription processing)</li>
              <li>Sentry (crash reporting)</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-4 font-serif text-2xl font-normal text-gray-900">5. Your Rights and Choices</h3>
            <p className="mb-4">You have the right to:</p>
            <ul className="space-y-2 list-disc pl-5 mb-4">
              <li>Access, update, or delete your account information</li>
              <li>Request a copy of your personal data</li>
              <li>Unsubscribe from marketing or waitlist emails using the link in any such email, or by contacting us at the address below</li>
              <li>Opt out of certain data collection through settings</li>
              <li>Request removal of your User Content from our systems</li>
            </ul>
            <p>To exercise these rights, contact us at <span className="text-gray-900">{supportEmail}</span>. We typically respond within 30 days.</p>
          </section>

          <section>
            <h3 className="mb-4 font-serif text-2xl font-normal text-gray-900">6. Children&apos;s Privacy</h3>
            <p>The App is not intended for children under 13. We do not knowingly collect information from children under 13. If you believe we have, please contact us immediately.</p>
          </section>

          <section>
            <h3 className="mb-4 font-serif text-2xl font-normal text-gray-900">7. Contact Us</h3>
            <p>If you have questions about this Privacy Policy, please contact us at:<br /><strong className="text-gray-900">{supportEmail}</strong></p>
          </section>
        </div>
      </Modal>

      {/* ── Header: fixed + scroll-aware (parent pattern) ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <SafeImage
              src="/app-icon-ios.png"
              alt="Camentra Icon"
              className="h-8 w-8 rounded-[22.5%] border border-gray-100 shadow-sm"
            />
            <span className="text-xl font-bold tracking-tight text-gray-900">Camentra</span>
          </div>
          {/* Nav links: text-xs uppercase tracking (parent pattern) */}
          <nav className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            <a href="#features" className="hover:text-black transition-colors">How it Works</a>
            <a href="#about" className="hover:text-black transition-colors">Our Goal</a>
            <a href="#contact" className="hover:text-black transition-colors">Support</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-16">

        {/* ── Hero: Inter uppercase H1 + gray accent (parent Hero.tsx) ── */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
            <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-gray-50 to-white opacity-60 blur-3xl" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="text-center md:text-left flex flex-col items-center md:items-start flex-1 order-2 md:order-1 animate-fade-in">
              <h1 className="mb-5 max-w-4xl text-3xl font-bold uppercase leading-[1.08] tracking-tight text-gray-900 sm:text-4xl md:mb-8 md:text-5xl md:leading-[1.1] lg:text-6xl xl:text-7xl">
                Stop overthinking,
                <br />
                <span className="text-gray-500">Start posting.</span>
              </h1>
              <p className="mb-10 max-w-xl text-base font-light leading-relaxed text-gray-500 md:text-xl">
                You&apos;re an expert at what you do. You shouldn&apos;t have to be a photographer, too. Camentra gives you visual blueprints for every shot and a second set of eyes to make sure you nail it the first time.
              </p>
              <div className="w-full max-w-lg">
                <p className="mb-4 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 md:justify-start">
                  <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Coming soon on the App Store
                </p>
                {waitlistStatus === 'success' ? (
                  <div className="space-y-3" role="status">
                    <p className="text-sm font-light text-gray-700">
                      {waitlistUsedMailto
                        ? 'Almost there. If your email app opened a draft, send it to join the list.'
                        : "You're on the list. We'll email you when Camentra launches."}
                    </p>
                    {waitlistUsedMailto && (
                      <p className="text-xs text-gray-500">
                        Send that message so we can add you to the launch list.
                      </p>
                    )}
                    <p className="text-xs leading-relaxed text-gray-400">
                      Questions?{' '}
                      <a href={`mailto:${supportEmail}`} className="text-gray-600 underline decoration-gray-300 underline-offset-2 hover:text-gray-900">
                        {supportEmail}
                      </a>
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={submitWaitlist}
                    className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
                  >
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email for launch notification
                    </label>
                    <input
                      id="waitlist-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={waitlistEmail}
                      onChange={(ev) => {
                        setWaitlistEmail(ev.target.value);
                        if (waitlistStatus === 'error') setWaitlistStatus('idle');
                      }}
                      className="min-h-[48px] w-full flex-1 rounded-full border border-gray-200 bg-white px-5 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    />
                    <button
                      type="submit"
                      disabled={waitlistStatus === 'submitting'}
                      className="min-h-[48px] shrink-0 rounded-full bg-black px-8 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {waitlistStatus === 'submitting' ? 'Sending…' : 'Notify me'}
                    </button>
                  </form>
                )}
                {waitlistStatus === 'error' && (
                  <p className="mt-2 text-xs text-red-600" role="alert">
                    Enter a valid email, or try again.
                  </p>
                )}
                {waitlistStatus !== 'success' && (
                  <p className="mt-3 max-w-lg text-[10px] font-light leading-relaxed text-gray-400 md:text-[11px]">
                    By subscribing, you agree Camentra may send you launch and marketing emails. Unsubscribe anytime.{' '}
                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(true)}
                      className="font-light text-gray-500 underline decoration-gray-200/80 underline-offset-2 transition-colors hover:text-gray-800"
                    >
                      Privacy Policy
                    </button>
                  </p>
                )}
                {waitlistStatus === 'success' && (
                  <p className="mt-3 text-[10px] font-light leading-relaxed text-gray-400 md:text-[11px]">
                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(true)}
                      className="font-light text-gray-500 underline decoration-gray-200/80 underline-offset-2 transition-colors hover:text-gray-800"
                    >
                      Privacy Policy
                    </button>
                  </p>
                )}
              </div>
            </div>

            <div className="flex-1 order-1 md:order-2">
              <IPhoneMockup />
            </div>
          </div>
        </section>

        {/* ── Features: bg-gray-50, mirrors parent Services section ── */}
        <section id="features" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-400 md:mb-4">How it Works</h2>
              <h3 className="font-serif text-4xl font-normal text-gray-900 md:text-5xl">Simple tools. Real results.</h3>
            </div>

            {/* Body: Inter light gray-500, sm/md:base (parent Services intros) */}
            <div className="grid gap-16 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-6 text-5xl font-bold leading-none text-gray-200">01</div>
                <h4 className="mb-4 text-base font-bold text-gray-900">No Guesswork</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed md:text-base">
                  Visual blueprints show you exactly where to place your subject. Line it up, shoot it, done. Your second set of eyes confirms you got it before you walk away.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="mb-6 text-5xl font-bold leading-none text-gray-200">02</div>
                <h4 className="mb-4 text-base font-bold text-gray-900">Brand Consistency</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed md:text-base">
                  Use the same blueprint for similar shots, and your photos start to look like they belong together. When a brand&apos;s visuals feel intentional, customers notice, and that builds trust before you say a word.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="mb-6 text-5xl font-bold leading-none text-gray-200">03</div>
                <h4 className="mb-4 text-base font-bold text-gray-900">Done in One Shot</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed md:text-base">
                  No more &quot;let me take 20 just in case.&quot; Follow the blueprint, check the instant feedback, and you&apos;re done. One shot, post-ready, back to work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── About: centered, max-w-7xl / max-w-5xl prose ── */}
        <section id="about" className="py-24 bg-white">
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-400 md:mb-4">Our Goal</h2>
            <h3 className="mb-8 font-serif text-4xl font-normal text-gray-900 md:mb-10 md:text-5xl">
              Built for you.
            </h3>
            <div className="mx-auto max-w-5xl space-y-6 text-base font-light leading-relaxed text-gray-500 md:text-lg">
              <p>
                Camentra is for the baker, the maker, the shop owner who wears every hat. You know your craft, and we know photos. Our job is simple: remove the guesswork so you can shoot with confidence and get back to what you do best.
              </p>
              <p>
                The biggest hurdle for most business owners isn&apos;t taking photos. It&apos;s knowing whether they&apos;re good enough to post. Camentra removes that uncertainty entirely. We believe every business deserves to look its best.
              </p>
            </div>
          </div>
        </section>

        {/* ── Support: parent Contact pattern, email as text link ── */}
        <section id="contact" className="py-24 bg-gray-50">
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-400 md:mb-4">Support</h2>
            <h3 className="mb-8 font-serif text-4xl font-normal text-gray-900 md:text-5xl">Have questions?</h3>
            <p className="mx-auto max-w-5xl text-lg font-light leading-relaxed text-gray-500">
              We&apos;re here to help. Reach out any time and we&apos;ll get back to you as soon as we can. Email{' '}
              <a
                href={`mailto:${supportEmail}`}
                className="text-gray-900 underline underline-offset-2 transition-colors hover:text-gray-500"
              >
                {supportEmail}
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer: wordmark, nav, © parent (no duplicate product-of line) ── */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 sm:px-6 md:flex-row md:justify-between md:gap-6 lg:px-8">
          <div className="flex items-center gap-2">
            <SafeImage
              src="/app-icon-ios.png"
              alt=""
              className="h-5 w-5 rounded-[22.5%]"
            />
            <span className="text-sm font-bold tracking-tight text-gray-900">Camentra</span>
          </div>

          {/* Center: nav (parent footer style) */}
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <a href="#features" className="hover:text-black transition-colors">How it Works</a>
            <a href="#about" className="hover:text-black transition-colors">Our Goal</a>
            <button
              type="button"
              onClick={() => setIsPrivacyOpen(true)}
              className="m-0 cursor-pointer border-0 bg-transparent p-0 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
            >
              Privacy Policy
            </button>
          </div>

          {/* Right: maker's mark + copyright (parent footer) */}
          <div className="flex items-center gap-2.5 text-gray-300 text-xs font-medium uppercase tracking-widest">
            <AlchemyMark className="text-gray-300" />
            © {new Date().getFullYear()} Brand Alchemy LLC.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
