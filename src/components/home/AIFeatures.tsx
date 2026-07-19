// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Sparkles, MapPin, MessageSquare, ArrowRight, Zap } from 'lucide-react';
// import Section from '@/components/Section';
// import Container from '@/components/Container';

// const features = [
//   {
//     icon: MapPin,
//     title: 'AI Trip Planner',
//     description: 'Generate complete travel itineraries tailored to your budget, interests, and travel style in seconds.',
//     href: '/ai/planner',
//     gradient: 'from-blue-500 to-cyan-500',
//     bgGradient: 'from-blue-50 to-cyan-50',
//   },
//   {
//     icon: Sparkles,
//     title: 'Smart Recommendations',
//     description: 'Get AI-powered destination suggestions based on your preferences and travel goals.',
//     href: '/ai/recommend',
//     gradient: 'from-purple-500 to-pink-500',
//     bgGradient: 'from-purple-50 to-pink-50',
//   },
//   {
//     icon: MessageSquare,
//     title: 'Travel Assistant',
//     description: 'Chat with our AI travel assistant for instant answers to all your travel questions 24/7.',
//     href: '/ai/chat',
//     gradient: 'from-teal-500 to-emerald-500',
//     bgGradient: 'from-teal-50 to-emerald-50',
//   },
// ];

// export default function AIFeatures() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.12,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   };

//   return (
//     <Section bgColor="gray" className="bg-slate-50">
//       <Container>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.1 }}
//             className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium mb-6"
//           >
//             <Zap size={16} />
//             Powered by Advanced AI
//           </motion.div>
//           <h2 className="text-h2 text-slate-900 mb-4">Intelligent Travel Features</h2>
//           <p className="text-body-lg text-slate-600 max-w-3xl mx-auto">
//             Harness the power of AI to discover destinations, create personalized itineraries, and get expert travel advice instantly
//           </p>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-8"
//         >
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ y: -12, transition: { duration: 0.2 } }}
//                 className="group"
//               >
//                 <Link href={feature.href}>
//                   <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl border border-slate-200 p-8 h-full hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden group`}>
//                     <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" />

//                     <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
//                       <Icon size={28} />
//                     </div>

//                     <h3 className="text-h4 font-semibold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
//                       {feature.title}
//                     </h3>

//                     <p className="text-slate-600 mb-6 flex-1 leading-relaxed">
//                       {feature.description}
//                     </p>

//                     <div className="flex items-center gap-2 text-sky-600 font-semibold group-hover:gap-3 transition-all">
//                       Explore
//                       <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </Container>
//     </Section>
//   );
// }








'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  Sparkles, MapPin, MessageSquare, ArrowRight, Zap,
  Globe, Star, Crown, Shield, Users
} from 'lucide-react';

// Deterministic pseudo-random so SSR and client render identical values
const seededRandom = (index: number, salt: number) => {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const features = [
  {
    icon: MapPin,
    title: 'AI Trip Planner',
    description: 'Generate complete travel itineraries tailored to your budget, interests, and travel style in seconds.',
    href: '/ai/planner',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50/80 to-cyan-50/80',
    badge: 'Most Popular',
    stats: '10K+ itineraries created'
  },
  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description: 'Get AI-powered destination suggestions based on your preferences and travel goals.',
    href: '/ai/recommend',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50/80 to-pink-50/80',
    badge: 'AI Powered',
    stats: '95% satisfaction rate'
  },
  {
    icon: MessageSquare,
    title: 'Travel Assistant',
    description: 'Chat with our AI travel assistant for instant answers to all your travel questions 24/7.',
    href: '/ai/chat',
    gradient: 'from-teal-500 to-emerald-500',
    bgGradient: 'from-teal-50/80 to-emerald-50/80',
    badge: '24/7 Available',
    stats: 'Average 3min response'
  },
];

export default function AIFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-slate-300/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, (seededRandom(i, 1) - 0.5) * 80, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + seededRandom(i, 2) * 8,
              repeat: Infinity,
              delay: seededRandom(i, 3) * 10,
            }}
            style={{
              left: `${seededRandom(i, 4) * 100}%`,
              top: `${seededRandom(i, 5) * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-200/30 mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] text-slate-600 font-medium tracking-[0.2em] uppercase">
              Powered by Advanced AI
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Intelligent{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Travel Features
            </span>
          </h2>
          
          <p className="text-sm text-slate-500 mt-3 max-w-2xl mx-auto">
            Harness the power of AI to discover destinations, create personalized itineraries, 
            and get expert travel advice instantly
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className="relative bg-white rounded-2xl border border-slate-200/60 p-6 h-full hover:border-slate-300/80 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                    
                    {/* Badge */}
                    <div className="relative mb-4">
                      <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400/20 to-orange-400/20 px-3 py-1 rounded-full border border-amber-200/30">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-medium text-amber-700">{feature.badge}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="relative mb-4">
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={26} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{feature.stats}</span>
                        </div>
                      </div>

                      {/* Explore Link */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                        <span>Explore</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Decorative Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl px-6 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-slate-600">100% Secure</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-slate-600">Premium Support</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-slate-600">Global Coverage</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}