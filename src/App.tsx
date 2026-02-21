import React, { useState, useEffect, type FC } from 'react';
import { 
  Phone, CheckCircle, Leaf, ShieldCheck, Sparkles, Clock, 
  ArrowRight, Heart, Star, Users, MapPin, Mail, Facebook, Instagram, Linkedin, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminLogin, AdminDashboard, type Service, type Submission, type Review } from './components/Admin';

// --- Data & Constants ---

const NAV_LINKS = [
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Our Story', href: '#about' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const FEATURES = [
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    desc: 'We use safe, environmentally friendly products that are tough on dirt but safe for your family and pets.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Team',
    desc: 'Background-checked, trained professionals led by a dedicated mother-daughter duo.',
  },
  {
    icon: Sparkles,
    title: 'Detail Focused',
    desc: 'From baseboards to ceiling fans, we tackle the hidden grime others miss.',
  },
  {
    icon: Clock,
    title: 'Reliable',
    desc: 'Consistent schedules and timely arrivals. We respect your time and your space.',
  },
];

const INITIAL_SERVICES: Service[] = [
  {
    title: 'Recurring Home Cleaning',
    desc: 'Keep your home consistently fresh. We dust, vacuum, mop, and sanitize kitchens, bathrooms, and living areas on a weekly or bi-weekly schedule.',
    image: 'https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/Residential%20Home%20Cleaners%20Indianapolis%20IN.jpg',
  },
  {
    title: 'Deep Cleaning Revitalize',
    desc: 'A top-to-bottom reset. We tackle built-up grime, baseboards, vents, and behind appliances to restore your home to its best condition.',
    image: 'https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/Deep%20Home%20Cleaning%20indianapolis%20IN.jpg',
  },
  {
    title: 'Move-In / Move-Out',
    desc: 'Moving is stressful; cleaning shouldn\'t be. We ensure properties are spotless for inspections, new tenants, or your fresh start.',
    image: 'https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/Move-In%20%26%20Move-Out%20Cleaning%20in%20Indianapolis%20an.jpg',
  },
  {
    title: 'Post-Construction',
    desc: 'Dust settles everywhere after a remodel. We remove construction debris, paint residue, and fine dust to make your new space move-in ready.',
    image: 'https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/Claudias%20Cleaning%20Empire%20Post%20Construction%20Cle.png',
  },
  {
    title: 'Office & Commercial',
    desc: 'Create a professional impression. Customized cleaning for offices, retail, and medical facilities to keep your workspace healthy and productive.',
    image: 'https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/Commercial%20Office%20Business%20Cleaning%20Indianapol.png',
  },
  {
    title: 'Emergency & Events',
    desc: 'Available 24/7 for urgent cleanups or special events. We handle the pre-party prep and the post-party mess so you can relax.',
    image: 'https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/sprcial%20event%20cleaning%20indianapolis%20in%20emergen.JPG',
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Ellie Symes',
    rating: 5,
    date: '4 months ago',
    text: "We love working with Claudia and her teams! They've transformed my home and taken a huge weight and responsibility off my shoulders. Highly recommend their service--seriously--I've already helped a neighbor sign up as well."
  },
  {
    id: '2',
    name: 'Ashlyn Lynn',
    rating: 5,
    date: '5 months ago',
    text: "Claudia and her crew do amazing work. We have been using their services since 2018. They are always thorough and make me excited to come home after they have been at our house to clean. Trustworthy, fair prices, and reliable. Highly recommend!"
  },
  {
    id: '3',
    name: 'Deb Farkas',
    rating: 5,
    date: '5 months ago',
    text: "Claudia & her team did an amazing job at my house. We used her several times and they made the house sparkle!! I will definitely be using her again. Thanks. Deb"
  },
  {
    id: '4',
    name: 'Jason Yoder',
    rating: 5,
    date: '3 months ago',
    text: "Claudia’s Cleaning Empire of Indianapolis did an amazing post-construction clean! Professional, detailed, and reliable. Best cleaning team in Indy, Carmel, and Fishers!"
  }
];

const FAQS = [
  {
    q: 'Do you offer one-time cleaning services?',
    a: 'Yes! We offer both one-time deep cleans and recurring maintenance plans to fit your specific needs.',
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve the entire Indianapolis metropolitan area, including Carmel, Fishers, Noblesville, Greenwood, Avon, Westfield, Plainfield, Brownsburg, Geist, and Zionsville.',
  },
  {
    q: 'What cleaning products do you use?',
    a: 'We use professional-grade, eco-friendly products that are safe for your family and pets while ensuring a deep, thorough clean.',
  },
  {
    q: 'Are you available for emergency cleaning?',
    a: 'Yes, we offer 24/7 emergency cleaning services for unexpected messes, water leaks, or last-minute needs.',
  },
];

// --- Components ---

function SectionHeader({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

const AccordionItem: FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-800 hover:text-primary transition-colors"
      >
        {question}
        <span className={`text-2xl font-light text-primary transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-gray-600 border-t border-gray-50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [view, setView] = useState<'home' | 'login' | 'dashboard'>('home');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Data State
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem('submissions');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist Data
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSubmission: Submission = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    };
    setSubmissions([newSubmission, ...submissions]);
    setShowConfirmation(true);
    e.currentTarget.reset();
    setTimeout(() => setShowConfirmation(false), 5000);
  };

  const handleDeleteSubmission = (id: string) => {
    const updated = submissions.filter(s => s.id !== id);
    setSubmissions(updated);
  };

  if (view === 'login') {
    return <AdminLogin onLogin={() => setView('dashboard')} />;
  }

  if (view === 'dashboard') {
    return (
      <AdminDashboard 
        services={services} 
        submissions={submissions} 
        reviews={reviews}
        onUpdateServices={setServices} 
        onUpdateReviews={setReviews}
        onDeleteSubmission={handleDeleteSubmission}
        onLogout={() => setView('home')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-20">
            
            {/* Logo - Left */}
            <div className="flex-shrink-0 flex items-center">
              <button 
                onClick={toggleMenu}
                className="font-heading font-bold text-xl md:text-2xl tracking-tight text-gray-900 uppercase focus:outline-none whitespace-nowrap"
              >
                Claudia's <span className="text-primary">Cleaning Empire</span>
              </button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 ml-8">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4 ml-auto">
              <a href="tel:3173839000" className="flex items-center gap-2 text-primary font-semibold text-sm hover:opacity-80">
                <Phone size={18} />
                (317) 383-9000
              </a>
              <a href="#contact" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg">
                Get a Free Quote
              </a>
            </div>

            {/* Mobile Menu Button - Positioned absolutely right for mobile */}
            <button onClick={toggleMenu} className="md:hidden absolute right-0 p-2 text-gray-700 hover:text-primary">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4 flex flex-col">
                {NAV_LINKS.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={closeMenu}
                    className="text-lg font-medium text-gray-800 hover:text-primary"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                  <a href="tel:3173839000" className="flex items-center gap-2 text-primary font-bold text-lg">
                    <Phone size={20} />
                    (317) 383-9000
                  </a>
                  <a href="#contact" onClick={closeMenu} className="bg-primary text-white text-center py-3 rounded-xl font-semibold shadow-md">
                    Get a Free Quote
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-[600px] lg:h-[85vh] flex items-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/Residential%20home%20cleaning%20indianapolis%20in.png" 
            alt="Claudia and Nancy - Cleaning Team" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-left text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block bg-primary/90 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-lg">
              Serving Indianapolis & Surrounding Areas
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Reclaim Your Time.<br />
              <span className="text-secondary">We’ll Handle the Shine.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mb-10 leading-relaxed drop-shadow-md">
              Experience the joy of a spotless home with Indy’s trusted mother-daughter cleaning team. Eco-friendly, reliable, and detailed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="#contact" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-1 text-center sm:text-left">
                Get a Free Quote
              </a>
              <a href="#services" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-1 text-center sm:text-left">
                View Services
              </a>
            </div>

            {/* Trust Micro-Row */}
            <div className="flex flex-wrap gap-6 md:gap-12 text-sm md:text-base font-medium text-white/95 drop-shadow-md mb-12">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-secondary" size={20} /> 30+ Years Experience
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-secondary" size={20} /> Eco-Friendly Products
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-secondary" size={20} /> 24/7 Emergency Service
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Why Homeowners Choose Us" 
            subtitle="We don't just clean; we care for your home with precision and pride."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-16 h-16 bg-light-bg text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-light-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Our Cleaning Services" 
            subtitle="Customized solutions for homes and businesses across Central Indiana."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-primary-dark mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{service.desc}</p>
                  <a href="#contact" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                    Book This <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="What Our Clients Say" 
            subtitle="Don't just take our word for it. Here's what your neighbors are saying."
          />
          
          <div className="relative w-full overflow-hidden mb-12">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex w-max"
              animate={{ x: "-25%" }}
              transition={{
                duration: Math.max(20, reviews.length * 5),
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...reviews, ...reviews, ...reviews, ...reviews].map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="w-[300px] md:w-[400px] flex-shrink-0 mr-8 bg-gray-50 p-8 rounded-2xl border border-gray-100 relative"
                >
                  <div className="flex items-center gap-2 mb-4 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg italic mb-6 line-clamp-4">"{review.text}"</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                      <Heart size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center">
            <a 
              href="https://www.google.com/maps/place/Claudia's+Cleaning+Empire/@41.0354353,-89.8858062,1443033m/data=!3m1!1e3!4m8!3m7!1s0xadf8257c23062df1:0x22ab8cfc214471b9!8m2!3d40.6142592!4d-87.0823346!9m1!1b1!16s%2Fg%2F11yjk1bfk5?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank"
              className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all border-b-2 border-primary pb-1"
            >
              See all reviews on Google Maps <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* About / Our Story Section */}
      <section id="about" className="py-24 bg-light-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Composition */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] hidden md:block"
            >
              <div className="absolute top-0 left-0 w-4/5 h-4/5 rounded-3xl overflow-hidden shadow-2xl z-10">
                <img 
                  src="https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/Residential%20home%20cleaning%20indianapolis%20in.png" 
                  alt="Claudia and Nancy" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20">
                <img 
                  src="https://img1.wsimg.com/isteam/ip/0087f4dc-6c65-43c5-a062-d2a1143da011/Business%20Office%20cleaning%20Indianapolis%20IN.jpg" 
                  alt="Cleaning Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-light-bg rounded-full -z-10"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Our Mission</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">A Mother-Daughter Duo Driven by Passion</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  At the heart of <strong>Claudia’s Cleaning Empire</strong> is the dynamic team of Claudia and Nancy. What started over 30 years ago in New York City as Claudia's personal passion has grown into Indianapolis's most trusted cleaning brand.
                </p>
                <p>
                  Nancy grew up watching her mother’s unmatched work ethic and now brings modern innovation to the business. Together, they blend experience with a heartfelt commitment to excellence.
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-gray-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-light-bg flex items-center justify-center text-primary shrink-0">
                    <Heart size={20} />
                  </div>
                  "There's a method to the madness — you MUST love it!"
                </li>
                <li className="flex items-center gap-3 text-gray-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-light-bg flex items-center justify-center text-primary shrink-0">
                    <Star size={20} />
                  </div>
                  Serving Indy, Carmel, Fishers, & Beyond
                </li>
                <li className="flex items-center gap-3 text-gray-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-light-bg flex items-center justify-center text-primary shrink-0">
                    <Users size={20} />
                  </div>
                  Fully trained, background-checked staff
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              
              {/* Contact Info Sidebar */}
              <div className="bg-primary p-10 lg:p-16 text-white lg:col-span-2 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Set Your Cleaning Up Today!</h2>
                  <p className="text-white/90 text-lg mb-12">
                    Let us know how we can help you. We are here and ready to make your home shine.
                  </p>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <MapPin className="shrink-0 mt-1" />
                      <div>
                        <strong className="block text-lg mb-1">Address</strong>
                        <p className="text-white/80">200 E Washington St ste 311,<br/>Indianapolis, IN 46204</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="shrink-0 mt-1" />
                      <div>
                        <strong className="block text-lg mb-1">Phone</strong>
                        <a href="tel:3173839000" className="text-white/80 hover:text-white underline">(317) 383-9000</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="shrink-0 mt-1" />
                      <div>
                        <strong className="block text-lg mb-1">Email</strong>
                        <a href="mailto:Claudiascleaningempire@gmail.com" className="text-white/80 hover:text-white underline break-all">Claudiascleaningempire@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <a href="https://www.facebook.com/claudiascleaningempire/" target="_blank" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                    <Facebook size={20} />
                  </a>
                  <a href="https://www.instagram.com/claudias_cleaningempire/" target="_blank" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="https://www.linkedin.com/claudiascleaningempire" target="_blank" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-10 lg:p-16 lg:col-span-3 bg-white">
                <AnimatePresence>
                  {showConfirmation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="bg-green-50 text-green-800 px-6 py-4 rounded-xl border border-green-100 flex items-center gap-3 overflow-hidden"
                    >
                      <CheckCircle className="text-green-600 shrink-0" size={24} />
                      <div>
                        <p className="font-bold">Request Received!</p>
                        <p className="text-sm">We'll be in touch shortly to confirm your appointment.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <form className="space-y-6" onSubmit={handleSubmission}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name*</label>
                      <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Your Full Name" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone*</label>
                      <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="(317) 555-0123" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email*</label>
                    <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="you@example.com" />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                    <div className="relative">
                      <select id="service" name="service" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none bg-white">
                        <option value="Regular">Regular Home Cleaning</option>
                        <option value="Deep">Deep Cleaning</option>
                        <option value="Move">Move-In / Move-Out</option>
                        <option value="Office">Office / Commercial</option>
                        <option value="Construction">Post-Construction</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" placeholder="Tell us about your cleaning needs..."></textarea>
                  </div>

                  <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                    Send Request
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Frequently Asked Questions" centered={true} />
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-white/20 pb-12">
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-white text-2xl font-bold mb-4 font-heading">Claudia's Cleaning Empire</h3>
              <p className="text-white/90 leading-relaxed max-w-sm">
                Servicing Central IN including Indianapolis, Carmel, Fishers, Noblesville, and beyond. Professional, reliable, and detail-oriented.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#services" className="hover:text-white/80 transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white/80 transition-colors">Our Story</a></li>
                <li><a href="#contact" className="hover:text-white/80 transition-colors">Contact</a></li>
                <li><a href="https://www.homeadvisor.com/rated.ClaudiasCleaningEmpire.130936284.html" target="_blank" className="hover:text-white/80 transition-colors">Reviews</a></li>
                <li>
                  <button onClick={() => setView('login')} className="hover:text-white/80 transition-colors text-left">
                    Admin
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white/80 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white/80 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-white/80">
            <p>&copy; 2025 Claudia's Cleaning Empire of Indianapolis. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
