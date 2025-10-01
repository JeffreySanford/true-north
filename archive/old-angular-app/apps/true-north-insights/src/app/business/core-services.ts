/**
 * Service category types for organizing offerings
 */
export enum ServiceCategory {
  DATA_INTEGRITY = 'Data Integrity',
  COMPLIANCE = 'Compliance',
  MODERNIZATION = 'Modernization',
  SECURITY = 'Security',
  CONSULTING = 'Consulting',
}

/**
 * Interface defining the structure of a service offering
 */
export interface CoreService {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  longDescription: string;
  category: ServiceCategory;
  keyFeatures: string[];
  useCases: string[];
  relatedServices?: string[]; // IDs of related services
}

/**
 * Core services offered by True North
 */
export const CORE_SERVICES: CoreService[] = [
  {
    id: 'data-integrity',
    title: 'Data Integrity Solutions',
    iconName: 'security',
    shortDescription: 'Military-grade solutions ensuring your data remains accurate, consistent, and trustworthy across systems.',
    longDescription: 
      'Our Data Integrity Solutions employ military-precision methodologies to safeguard the accuracy, consistency, and reliability of your organizational data. ' +
      'Drawing on our veteran background in handling mission-critical information, we implement comprehensive validation protocols, ' +
      'error detection algorithms, and automated reconciliation processes that ensure your data maintains the highest standards of integrity. ' +
      'We understand that in both combat and business, decisions are only as good as the information they\'re based on.',
    category: ServiceCategory.DATA_INTEGRITY,
    keyFeatures: [
      'Automated data validation and verification',
      'Cross-system consistency monitoring',
      'Data quality assessment and reporting',
      'Master data management',
      'Audit trail implementation'
    ],
    useCases: [
      'Healthcare records management',
      'Financial transaction processing',
      'Government data systems',
      'Critical infrastructure monitoring'
    ],
    relatedServices: ['compliance-solutions', 'security-operations']
  },
  {
    id: 'compliance-solutions',
    title: 'Regulatory Compliance',
    iconName: 'gavel',
    shortDescription: 'Navigating complex regulatory requirements with the discipline and attention to detail of military operations.',
    longDescription: 
      'Our Regulatory Compliance service brings military discipline to the complex landscape of regulatory requirements. ' +
      'We translate complicated governmental and industry standards into actionable compliance protocols tailored to your organization. ' +
      'Our veteran-led team understands the critical importance of following established protocols while maintaining operational efficiency. ' +
      'We implement structured compliance frameworks that provide both protection and peace of mind, ensuring your operations remain within regulatory boundaries ' +
      'while minimizing the administrative burden on your team.',
    category: ServiceCategory.COMPLIANCE,
    keyFeatures: [
      'Compliance gap analysis',
      'Policy development and implementation',
      'Compliance monitoring and reporting',
      'Staff training and awareness programs',
      'Audit preparation and support'
    ],
    useCases: [
      'GDPR compliance',
      'HIPAA implementation',
      'FedRAMP certification',
      'SOC 2 compliance',
      'CMMC readiness'
    ],
    relatedServices: ['data-integrity', 'security-operations']
  },
  {
    id: 'legacy-modernization',
    title: 'Legacy System Modernization',
    iconName: 'upgrade',
    shortDescription: 'Transforming outdated systems into modern, efficient solutions with strategic precision.',
    longDescription: 
      'Our Legacy System Modernization service applies strategic military planning principles to transform outdated technology infrastructure into modern, ' +
      'efficient solutions. We understand the delicate balance between maintaining operational continuity and implementing necessary technological advancements. ' +
      'Our veteran-led teams execute carefully planned migration strategies that minimize disruption while maximizing improvement. ' +
      'We specialize in phased approaches that maintain critical functionality throughout the transition process, ensuring your organization experiences ' +
      'enhanced capabilities without sacrificing reliability or security.',
    category: ServiceCategory.MODERNIZATION,
    keyFeatures: [
      'System assessment and roadmapping',
      'Phased migration planning',
      'Code refactoring and optimization',
      'Cloud migration strategies',
      'Legacy data transformation'
    ],
    useCases: [
      'Government systems modernization',
      'Healthcare IT infrastructure updates',
      'Financial services technology transformation',
      'Manufacturing systems integration'
    ],
    relatedServices: ['cloud-solutions', 'application-development']
  },
  {
    id: 'security-operations',
    title: 'Security Operations',
    iconName: 'shield',
    shortDescription: 'Protecting your digital assets with the vigilance and strategic approach of military defense systems.',
    longDescription: 
      'Our Security Operations service brings battlefield vigilance to your digital environment. Drawing on our military background in threat assessment and ' +
      'strategic defense, we implement comprehensive security operations that actively monitor, detect, and respond to potential vulnerabilities and attacks. ' +
      'Our approach combines technological solutions with human expertise, creating layered defense systems that protect your critical digital assets. ' +
      'We establish clear protocols for incident response, ensuring rapid and effective action when security events occur, minimizing potential damage ' +
      'and accelerating recovery.',
    category: ServiceCategory.SECURITY,
    keyFeatures: [
      'Security Operations Center (SOC)',
      'Threat intelligence integration',
      'Incident response planning and drills',
      'Vulnerability assessment and management',
      'Security awareness training'
    ],
    useCases: [
      'Critical infrastructure protection',
      'Classified information handling',
      'Enterprise-wide security monitoring',
      'Executive security programs'
    ],
    relatedServices: ['compliance-solutions', 'data-integrity']
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions',
    iconName: 'cloud',
    shortDescription: 'Deploying and managing secure cloud environments with the precision of military logistical operations.',
    longDescription: 
      'Our Cloud Solutions service applies military-grade planning and execution to your cloud strategy. We design, implement, and manage cloud environments ' +
      'that provide both the flexibility of modern infrastructure and the security demanded by mission-critical systems. Our veteran-led approach emphasizes ' +
      'resilience, redundancy, and recoverability, ensuring your cloud deployments maintain operational continuity even under adverse conditions. ' +
      'We specialize in secure cloud architectures that meet stringent compliance requirements while delivering the scalability and cost benefits that ' +
      'make cloud computing advantageous.',
    category: ServiceCategory.MODERNIZATION,
    keyFeatures: [
      'Secure cloud architecture design',
      'Migration planning and execution',
      'Multi-cloud and hybrid strategies',
      'Cloud security implementation',
      'Cost optimization and management'
    ],
    useCases: [
      'Secure government cloud deployments',
      'Healthcare data environments',
      'Financial services cloud transformation',
      'Disaster recovery and business continuity'
    ],
    relatedServices: ['legacy-modernization', 'security-operations']
  },
  {
    id: 'application-development',
    title: 'Custom Application Development',
    iconName: 'code',
    shortDescription: 'Building mission-critical applications with the discipline and precision of military engineering.',
    longDescription: 
      'Our Custom Application Development service brings military engineering principles to software creation. We design and build mission-critical ' +
      'applications that combine robust functionality with intuitive usability. Our development process emphasizes thorough requirements analysis, ' +
      'strategic planning, and rigorous testing to ensure applications perform reliably under all conditions. Our veteran-led teams understand ' +
      'the importance of clear communication, disciplined execution, and attention to detail throughout the development lifecycle, resulting in ' +
      'solutions that consistently meet or exceed expectations.',
    category: ServiceCategory.MODERNIZATION,
    keyFeatures: [
      'Requirements engineering',
      'Secure development practices',
      'Agile and hybrid methodologies',
      'Quality assurance and testing',
      'Deployment and integration'
    ],
    useCases: [
      'Mission-critical operations systems',
      'Secure data processing applications',
      'Field operations management tools',
      'Command and control interfaces'
    ],
    relatedServices: ['legacy-modernization', 'cloud-solutions']
  },
  {
    id: 'strategic-consulting',
    title: 'Strategic Technology Consulting',
    iconName: 'insights',
    shortDescription: 'Guiding technology decisions with the strategic thinking and mission-focused approach of military leadership.',
    longDescription: 
      'Our Strategic Technology Consulting service applies battlefield wisdom to business technology challenges. Our veteran consultants bring decades ' +
      'of experience in mission-critical planning and execution to your organization\'s technology strategy. We help leadership teams identify objectives, ' +
      'assess capabilities, recognize threats, and develop actionable plans that align technology investments with organizational goals. ' +
      'Our approach emphasizes clarity of mission, efficiency of execution, and measurable results, ensuring your technology initiatives deliver ' +
      'maximum value with minimum waste.',
    category: ServiceCategory.CONSULTING,
    keyFeatures: [
      'Technology strategy development',
      'Digital transformation planning',
      'Vendor selection and management',
      'IT governance implementation',
      'Technology risk assessment'
    ],
    useCases: [
      'Executive technology advisory',
      'Digital transformation initiatives',
      'Technology investment planning',
      'Merger and acquisition technology integration'
    ],
    relatedServices: ['legacy-modernization', 'security-operations']
  }
];

/**
 * Helper function to get a service by ID
 * @param id Service identifier
 * @returns The matching service or undefined if not found
 */
export function getServiceById(id: string): CoreService | undefined {
  return CORE_SERVICES.find(service => service.id === id);
}

/**
 * Helper function to get services by category
 * @param category Service category
 * @returns Array of services in the specified category
 */
export function getServicesByCategory(category: ServiceCategory): CoreService[] {
  return CORE_SERVICES.filter(service => service.category === category);
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  serviceIds: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'federal-agency-data-tracking',
    title: 'Implementing Data Provenance for Federal Decision Making',
    client: 'U.S. Federal Agency',
    industry: 'Government',
    challenge: 'A federal agency struggled with demonstrating the lineage of critical data used in high-stakes decision making, creating audit findings and raising questions about data integrity.',
    solution: 'True North implemented our comprehensive Data Provenance system that tracked every data element from source to report, providing immutable records of all transformations and handling.',
    results: 'The agency passed their subsequent audit with zero findings, reduced data disputes by 87%, and established a new standard for data integrity within their department.',
    testimonial: {
      quote: "True North's methodical approach to data provenance brought military-grade precision to our information systems. We now have complete confidence in our data and can demonstrate its integrity to any stakeholder.",
      author: "Gabriela Martinez",
      position: "Chief Data Officer, Federal Agency"
    },
    serviceIds: ['data-provenance', 'audit']
  },
  {
    id: 'defense-contractor-modernization',
    title: 'Mission-Critical System Modernization',
    client: 'Leading Defense Contractor',
    industry: 'Defense',
    challenge: 'A major defense contractor needed to modernize a 25-year-old logistics system without disrupting operations or compromising security clearance requirements.',
    solution: 'Our veteran-led team developed a phased modernization approach, leveraging our military background to navigate complex security protocols while methodically upgrading systems.',
    results: 'The modernized system reduced operating costs by 43%, improved processing speeds by 300%, and eliminated security vulnerabilities while maintaining continuous operations throughout the transition.',
    testimonial: {
      quote: "True North's team understood our mission requirements in ways other contractors simply couldn't. Their military background was evident in their disciplined execution and ability to navigate complex security requirements.",
      author: "Colonel James Richardson (Ret.)",
      position: "VP of Operations, Defense Contractor"
    },
    serviceIds: ['modernization', 'efficiency']
  },
  {
    id: 'healthcare-efficiency',
    title: 'Operational Efficiency in Healthcare Logistics',
    client: 'Regional Healthcare Network',
    industry: 'Healthcare',
    challenge: 'A healthcare network with 12 facilities struggled with inefficient supply chain and resource allocation, leading to excess costs and occasional critical supply shortages.',
    solution: 'We implemented our Operational Efficiency framework, applying military logistics principles to medical supply management and staff resource allocation.',
    results: 'Reduced supply costs by 27%, eliminated critical shortages, and improved staff utilization metrics by 35%, resulting in annual savings of $4.2 million.',
    serviceIds: ['efficiency', 'modernization']
  }
];
