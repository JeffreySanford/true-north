export interface ServiceOffering {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  tags: string[];
  featuredImage?: string;
  relatedServices: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  serviceIds: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export const CORE_SERVICES: ServiceOffering[] = [
  {
    id: 'cyber-security',
    title: 'Cybersecurity Solutions',
    iconName: 'security',
    shortDescription: 'Enterprise-grade security solutions with military precision',
    longDescription: 'Our cybersecurity solutions leverage military-grade protocols and technologies to protect your digital assets. Drawing from our veteran expertise, we implement robust security frameworks that address modern threats while maintaining operational efficiency.',
    benefits: [
      'Advanced threat detection and prevention',
      'Security compliance with NIST, CMMC, and other frameworks',
      'Veteran-led security operations team',
      'Reduced vulnerability through continuous monitoring',
      'Incident response and recovery planning'
    ],
    tags: ['Zero Trust', 'Threat Intelligence', 'SIEM', 'Penetration Testing', 'Security Architecture'],
    featuredImage: '/assets/images/services/cybersecurity.jpg',
    relatedServices: ['cloud-migration', 'digital-transformation']
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Migration',
    iconName: 'cloud',
    shortDescription: 'Secure and efficient transition to cloud infrastructures',
    longDescription: 'We guide organizations through secure cloud migrations with military precision and strategic planning. Our approach ensures minimal disruption while maximizing the benefits of cloud technologies, all with an emphasis on security and long-term scalability.',
    benefits: [
      'Reduced infrastructure costs',
      'Enhanced operational flexibility',
      'Military-grade security protocols',
      'Improved disaster recovery capabilities',
      'Scalable architecture design'
    ],
    tags: ['AWS', 'Azure', 'GCP', 'Hybrid Cloud', 'Cloud Security', 'IaaS', 'PaaS'],
    featuredImage: '/assets/images/services/cloud-migration.jpg',
    relatedServices: ['cyber-security', 'digital-transformation']
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    iconName: 'sync',
    shortDescription: 'Strategic technological advancement with mission-focused execution',
    longDescription: 'Our digital transformation services help organizations modernize their technology stack with the same strategic planning approach used in military operations. We identify objectives, develop comprehensive strategies, and execute with precision to deliver measurable results.',
    benefits: [
      'Streamlined operations through automation',
      'Enhanced decision making through data analytics',
      'Improved customer engagement',
      'Strategic technological advantage',
      'Cultural transformation support'
    ],
    tags: ['Process Automation', 'Data Analytics', 'Legacy Modernization', 'DevOps', 'Agile Methodology'],
    featuredImage: '/assets/images/services/digital-transform.jpg',
    relatedServices: ['cyber-security', 'cloud-migration']
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-gov-security',
    title: 'Federal Agency Security Overhaul',
    client: 'U.S. Government Agency',
    industry: 'Government',
    challenge: 'Modernizing outdated security infrastructure while maintaining continuous operations and compliance with strict federal regulations.',
    solution: 'Implemented a phased security transformation leveraging Zero Trust architecture and NIST frameworks, with specialized training for staff.',
    results: '78% reduction in security incidents, 99.9% uptime during transition, and full compliance with federal requirements.',
    serviceIds: ['cyber-security'],
    testimonial: {
      quote: "True North's veteran-led team understood our unique challenges in ways other contractors couldn't. Their military background was evident in their meticulous planning and flawless execution.",
      author: "James Harrington",
      position: "Chief Information Security Officer"
    }
  },
  {
    id: 'cs-manufacturing-cloud',
    title: 'Multi-Site Manufacturing Cloud Migration',
    client: 'American Manufacturing Inc.',
    industry: 'Manufacturing',
    challenge: 'Migrating mission-critical production systems across 12 facilities to cloud infrastructure without production downtime.',
    solution: 'Developed a tailored migration strategy with facility-specific approaches, leveraging hybrid cloud technologies with redundant systems during transition.',
    results: 'Zero downtime during migration, 42% reduction in IT operating costs, and 67% improvement in system performance.',
    serviceIds: ['cloud-migration'],
    testimonial: {
      quote: "The True North team approached our complex migration with military precision. Their attention to detail and risk management was impressive.",
      author: "Sarah Chen",
      position: "VP of Operations"
    }
  },
  {
    id: 'cs-healthcare-digital',
    title: 'Healthcare Provider Digital Transformation',
    client: 'Midwest Medical Network',
    industry: 'Healthcare',
    challenge: 'Modernizing patient care systems while ensuring HIPAA compliance and maintaining quality of care across 8 facilities.',
    solution: 'Implemented comprehensive digital transformation roadmap with phased deployment of new technologies and parallel training programs.',
    results: '34% reduction in administrative workload, 28% improvement in patient satisfaction, and enhanced data security posture.',
    serviceIds: ['digital-transformation', 'cyber-security'],
    testimonial: {
      quote: "True North brought the same level of discipline and precision to our project that you'd expect from military veterans. They understood that failure wasn't an option when patient care was at stake.",
      author: "Dr. Robert Miller",
      position: "Chief Medical Information Officer"
    }
  }
];
