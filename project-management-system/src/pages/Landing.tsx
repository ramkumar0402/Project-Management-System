import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  LayoutDashboard, 
  Users, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  ArrowRight,
  Globe,
  Mail,
  Info,
  Star,
  Check,
  ChevronRight,
  Play
} from 'lucide-react';

export const Landing = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] selection:bg-blue-100 selection:text-blue-700 font-sans">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/70 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
              <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">ProjectHub</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Platform</a>
            <a href="#solutions" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Solutions</a>
            <a href="#pricing" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Customers</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-black px-4 py-2 transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 shadow-sm transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-[13px] font-medium text-gray-600 mb-10 shadow-sm animate-fade-in cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Now with advanced AI task sorting</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 tracking-tight mb-10 leading-[1.05] max-w-4xl mx-auto">
            Design, build, and <br />
            <span className="text-blue-600">ship together.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-14 leading-relaxed font-medium">
            ProjectHub is the intelligent workspace where teams connect to work on projects. 
            From startups to enterprises, we help you ship faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/signup" className="w-full sm:w-auto px-10 py-4 bg-black text-white rounded-full font-bold shadow-xl shadow-black/10 hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group">
              Get started for free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-black" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-24 pt-10 border-t border-gray-100">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10">Trusted by modern teams globally</p>
            <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-50">
              <span className="text-2xl font-black italic tracking-tighter">Acme Corp</span>
              <span className="text-2xl font-black tracking-widest">GLOBAL</span>
              <span className="text-2xl font-black">Velocity</span>
              <span className="text-2xl font-black tracking-tight underline underline-offset-8">PRISM</span>
              <span className="text-2xl font-black border-2 border-black px-2">BLOCK</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[20%] left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-[120px] -z-10" />
      </section>

      {/* Product Preview */}
      <section className="pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden p-3 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-[#111] rounded-2xl aspect-[16/9] flex items-center justify-center relative overflow-hidden border border-white/5">
              {/* Abstract Dashboard Mockup */}
              <div className="w-full h-full p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                  </div>
                  <div className="w-32 h-6 bg-white/5 rounded-full" />
                </div>
                <div className="flex-1 grid grid-cols-12 gap-6">
                  <div className="col-span-3 space-y-4">
                    <div className="h-8 bg-blue-600 rounded-lg w-full" />
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-4 bg-white/10 rounded w-1/2" />
                    <div className="pt-8 space-y-3">
                      {[1,2,3,4].map(i => <div key={i} className="h-3 bg-white/5 rounded w-full" />)}
                    </div>
                  </div>
                  <div className="col-span-9 space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-white/5 rounded-xl border border-white/10" />
                      <div className="h-24 bg-white/5 rounded-xl border border-white/10" />
                      <div className="h-24 bg-white/5 rounded-xl border border-white/10" />
                    </div>
                    <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4">
                       <div className="h-6 bg-white/10 rounded w-1/4" />
                       {[1,2,3].map(i => (
                         <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-4">
                           <div className="w-4 h-4 rounded border border-white/20" />
                           <div className="h-4 bg-white/10 rounded flex-1" />
                           <div className="w-12 h-4 bg-white/5 rounded" />
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for speed. <br />Created for quality.</h2>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
                We've spent thousands of hours perfecting the project management experience so your team can focus on what matters most: building great products.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                <FeatureItem 
                  icon={<Zap className="w-5 h-5 text-blue-600" />}
                  title="Zero latency updates"
                  text="Real-time syncing that actually works. No refreshes needed."
                />
                <FeatureItem 
                  icon={<BarChart3 className="w-5 h-5 text-indigo-600" />}
                  title="Insightful analytics"
                  text="Understand where your team spends most of their time."
                />
                <FeatureItem 
                  icon={<ShieldCheck className="w-5 h-5 text-green-600" />}
                  title="Enterprise security"
                  text="Your data is encrypted and protected with RBAC."
                />
                <FeatureItem 
                  icon={<Globe className="w-5 h-5 text-purple-600" />}
                  title="Remote first"
                  text="Built to handle globally distributed teams with ease."
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-gray-50 rounded-[2.5rem] p-10 border border-gray-100 relative overflow-hidden h-[500px]">
                <div className="absolute top-10 -right-20 w-[500px] h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xl font-bold">New Project</span>
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Live</div>
                  </div>
                  <div className="space-y-6">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-100 rounded w-3/4" />
                          <div className="h-3 bg-gray-50 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Loved by developers, <br />trusted by founders.</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
          </div>
          <p className="text-gray-500 font-medium tracking-tight">4.9/5 average rating from over 2,000+ teams</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            quote="ProjectHub changed how we build. The UI is so fast that we actually enjoy updating our tasks."
            author="Sarah Jenkins"
            role="CTO at TechFlow"
          />
          <TestimonialCard 
            quote="The best project management tool I've ever used. It's like Linear and Slack had a baby."
            author="David Chen"
            role="Product Lead at Vibe"
          />
          <TestimonialCard 
            quote="We migrated from Jira in less than a day. Our team productivity increased by 40% immediately."
            author="Mark Wilson"
            role="CEO at FoundersBase"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing.</h2>
          <p className="text-gray-500 text-lg">Start for free, upgrade when you're ready.</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 p-10 rounded-[2.5rem] shadow-sm hover:border-gray-300 transition-all">
            <h3 className="text-xl font-bold mb-2">Free Forever</h3>
            <p className="text-gray-500 mb-8 font-medium">Perfect for individuals and side projects.</p>
            <div className="text-4xl font-black mb-8">$0<span className="text-lg text-gray-400 font-bold tracking-tight">/mo</span></div>
            <ul className="space-y-4 mb-10 text-sm font-medium text-gray-600">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-600" /> Up to 3 projects</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-600" /> Basic analytics</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-600" /> Unlimited tasks</li>
              <li className="flex items-center gap-3 text-gray-300"><Check className="w-4 h-4" /> Team members</li>
            </ul>
            <Link to="/signup" className="block w-full py-4 text-center bg-gray-50 text-black border border-gray-100 rounded-2xl font-bold hover:bg-gray-100 transition-all">
              Sign up for free
            </Link>
          </div>
          <div className="bg-white border-2 border-blue-600 p-10 rounded-[2.5rem] shadow-xl shadow-blue-600/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-6 py-2 rounded-bl-3xl text-xs font-bold uppercase tracking-widest">Popular</div>
            <h3 className="text-xl font-bold mb-2">Pro Team</h3>
            <p className="text-gray-500 mb-8 font-medium">Everything you need for growing teams.</p>
            <div className="text-4xl font-black mb-8">$12<span className="text-lg text-gray-400 font-bold tracking-tight">/user/mo</span></div>
            <ul className="space-y-4 mb-10 text-sm font-medium text-gray-600">
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-600" /> Unlimited projects</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-600" /> Advanced AI analytics</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-600" /> Priority support</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-600" /> Unlimited members</li>
            </ul>
            <Link to="/signup" className="block w-full py-4 text-center bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Focus on shipping. <br />We'll handle the rest.</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">Join 500+ teams and start managing your projects like a pro today. No credit card required.</p>
          <Link to="/signup" className="inline-flex px-12 py-5 bg-white text-black rounded-full font-bold shadow-2xl hover:bg-gray-100 transition-all active:scale-95">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="text-white w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-gray-900 tracking-tight">ProjectHub</span>
              </div>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">The workspace for high-performance teams to plan, track, and ship amazing products together.</p>
              <div className="flex gap-4">
                 <Mail className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
                 <Globe className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
                 <Info className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 gap-y-12 flex-1 justify-end">
              <div>
                <h4 className="font-bold text-black mb-6 text-sm">Product</h4>
                <ul className="space-y-4 text-sm font-medium text-gray-500">
                  <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Integrations</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Changelog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-black mb-6 text-sm">Resources</h4>
                <ul className="space-y-4 text-sm font-medium text-gray-500">
                  <li><a href="#" className="hover:text-black transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Guides</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Community</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-black mb-6 text-sm">Company</h4>
                <ul className="space-y-4 text-sm font-medium text-gray-500">
                  <li><a href="#" className="hover:text-black transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm font-medium text-gray-400">
            <p>© 2024 ProjectHub Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-black">Privacy</a>
              <a href="#" className="hover:text-black">Terms</a>
              <a href="#" className="hover:text-black">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureItem = ({ icon, title, text }: any) => (
  <div className="flex gap-4 group">
    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-white group-hover:shadow-lg group-hover:shadow-black/5 transition-all">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">{text}</p>
    </div>
  </div>
);

const TestimonialCard = ({ quote, author, role }: any) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/[0.02] hover:-translate-y-1 transition-all">
    <p className="text-lg text-gray-700 italic mb-8 font-medium leading-relaxed">"{quote}"</p>
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-100" />
      <div>
        <h4 className="font-bold text-gray-900 text-sm">{author}</h4>
        <p className="text-xs text-gray-400 font-bold">{role}</p>
      </div>
    </div>
  </div>
);
