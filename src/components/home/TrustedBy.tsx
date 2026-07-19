// 'use client';

// import { motion } from 'framer-motion';
// import Section from '@/components/Section';
// import Container from '@/components/Container';

// const partners = [
//   { name: 'Google', icon: '🔍' },
//   { name: 'Microsoft', icon: '💼' },
//   { name: 'Amazon', icon: '📦' },
//   { name: 'Airbnb', icon: '🏠' },
//   { name: 'Booking', icon: '📅' },
//   { name: 'Expedia', icon: '🌐' },
// ];

// export default function TrustedBy() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5 },
//     },
//   };

//   return (
//     <Section className="bg-white border-b border-slate-200">
//       <Container>
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-10"
//         >
//           <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
//             Trusted by industry leaders
//           </p>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center"
//         >
//           {partners.map((partner, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg hover:bg-slate-50 transition-colors"
//             >
//               <span className="text-3xl">{partner.icon}</span>
//               <p className="text-sm font-medium text-slate-600">{partner.name}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </Container>
//     </Section>
//   );
// }






'use client';

import { motion } from 'framer-motion';

const partners = [
  { name: 'Google', icon: '🔍' },
  { name: 'Microsoft', icon: '💼' },
  { name: 'Amazon', icon: '📦' },
  { name: 'Airbnb', icon: '🏠' },
  { name: 'Booking', icon: '📅' },
  { name: 'Expedia', icon: '🌐' },
];

export default function TrustedBy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const stats = [
    { value: '10K+', label: 'Companies Trust Us' },
    { value: '50K+', label: 'Trips Booked' },
    { value: '4.9/5', label: 'Average Rating' },
  ];

  return (
    <section className="relative py-16 bg-white border-y border-slate-100 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #e2e8f0 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-slate-50/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-200/50 mb-4">
            <span className="text-[10px] text-slate-500 font-medium tracking-[0.2em] uppercase">
              Partners
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
            Join 10,000+ companies that trust VoyageAI for their travel planning needs
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -4,
              }}
              className="group relative bg-white border border-slate-200/60 hover:border-slate-300/80 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-slate-200/50"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              {/* Content */}
              <div className="relative flex flex-col items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl"
                >
                  {partner.icon}
                </motion.div>
                <p className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors duration-300">
                  {partner.name}
                </p>
                
                {/* Decorative Line */}
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent group-hover:via-slate-400 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-slate-200/50"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="space-y-1"
              >
                <p className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}