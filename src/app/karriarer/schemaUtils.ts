import { JobType } from './data';

// Function to generate structured data for a single job posting
export function generateJobPostingSchema(job: JobType) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,

    // Use actual posted date or fallback to current date
    datePosted: job.datePosted || new Date().toISOString().split('T')[0],

    // Add application deadline if available
    validThrough: job.validThrough || null,

    // Better employment type mapping
    employmentType: mapEmploymentType(job.type),

    hiringOrganization: {
      '@type': 'Organization',
      name: 'Offertu AB',
      sameAs: 'https://offertu.se',
      logo: 'https://offertu.se/logo.png', // Update with actual logo URL
      // Add organization description if available
      description: 'Ett snabbväxande tech-bolag som revolutionerar hur företag hanterar sina offerter och kalkyler'
    },

    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressRegion: extractRegion(job.location),
        addressCountry: 'SE'
      }
    },

    // Better salary structure
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'SEK',
      value: {
        '@type': 'QuantitativeValue',
        unitText: 'MONTH',
        value: job.salary || 'Konkurrensmässig'
      }
    },

    // Add skills, experience and education requirements
    skills: job.skills || job.requirements.join(', '),
    qualifications: job.requirements.join(', '),
    experienceRequirements: job.experience || null,
    educationRequirements: job.education || null,

    // Add responsibilities
    responsibilities: job.responsibilities.join(', '),

    // Add industry and occupation info
    industry: 'Software',
    occupationalCategory: job.department,

    // Add benefits
    jobBenefits: job.benefits?.join(', ') || null,

    // Add application info
    applicationContact: {
      '@type': 'ContactPoint',
      email: 'karriar@offertu.se'
    },

    // Add direct URL to apply
    url: `https://offertu.se/karriarer/${job.slug}`,
  };
}

// Better employment type mapping
function mapEmploymentType(type: string): string | string[] {
  switch (type.toLowerCase()) {
    case 'heltid':
      return 'FULL_TIME';
    case 'deltid':
      return 'PART_TIME';
    case 'konsult':
      return 'CONTRACTOR';
    case 'praktik':
      return 'INTERN';
    case 'säsong':
      return 'TEMPORARY';
    case 'hybrid':
      return ['FULL_TIME', 'REMOTE'];
    case 'remote':
      return ['FULL_TIME', 'REMOTE'];
    default:
      return 'FULL_TIME';
  }
}

// Extract region from city
function extractRegion(location: string): string {
  // Basic region mapping for common Swedish cities
  if (location.includes('Stockholm')) return 'Stockholm';
  if (location.includes('Göteborg')) return 'Västra Götaland';
  if (location.includes('Malmö')) return 'Skåne';
  return ''; // Default empty if unknown
}

// Function to generate structured data for a list of job postings
export function generateJobListSchema(jobs: JobType[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: jobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://offertu.se/karriarer/${job.slug}`,
      item: generateJobPostingSchema(job) // Use the complete JobPosting schema for each job
    }))
  };
} 