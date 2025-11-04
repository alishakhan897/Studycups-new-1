import type { College, Course, Placements, Exam, BlogPost, Testimonial, Event } from './types';

export const POPULAR_COURSES_DATA = [
    {
        name: 'B.Tech',
        fullName: 'Bachelor of Technology',
        description: 'Forge the future with core engineering principles and cutting-edge tech.',
        icon: 'btech',
        color: 'from-blue-500 to-indigo-600',
        stream: 'Engineering',
        level: 'Undergraduate',
        courseLinkName: 'B.Tech in Computer Science'
    },
    {
        name: 'MBA',
        fullName: 'Master of Business Administration',
        description: 'Ascend the corporate ladder with advanced leadership and management skills.',
        icon: 'mba',
        color: 'from-purple-500 to-violet-600',
        stream: 'Management',
        level: 'Postgraduate',
        courseLinkName: 'MBA'
    },
    {
        name: 'BBA',
        fullName: 'Bachelor of Business Administration',
        description: 'Build a strong foundation in business principles, strategy, and operations.',
        icon: 'bba',
        color: 'from-amber-500 to-orange-600',
        stream: 'Management',
        level: 'Undergraduate',
        courseLinkName: 'BBA'
    },
    {
        name: 'MCA',
        fullName: 'Master of Computer Applications',
        description: 'Master the world of software development and advanced computing applications.',
        icon: 'mca',
        color: 'from-sky-500 to-cyan-600',
        stream: 'Engineering',
        level: 'Postgraduate',
        courseLinkName: 'B.Tech in Computer Science'
    },
    {
        name: 'MBBS',
        fullName: 'Bachelor of Medicine, Bachelor of Surgery',
        description: 'Embark on the noble path of saving lives and advancing modern healthcare.',
        icon: 'mbbs',
        color: 'from-green-500 to-emerald-600',
        stream: 'Medical',
        level: 'Undergraduate',
        courseLinkName: 'MBBS'
    },
    {
        name: 'LLB',
        fullName: 'Bachelor of Laws',
        description: 'Champion justice and navigate the intricate world of the legal system.',
        icon: 'llb',
        color: 'from-yellow-500 to-lime-600',
        stream: 'Law',
        level: 'Undergraduate',
        courseLinkName: 'LLB'
    },
    {
        name: 'B.Com',
        fullName: 'Bachelor of Commerce',
        description: 'Understand the language of business, finance, and economic policies.',
        icon: 'bcom',
        color: 'from-rose-500 to-red-600',
        stream: 'Arts & Science',
        level: 'Undergraduate',
        courseLinkName: 'B.Com'
    },
    {
        name: 'B.Des',
        fullName: 'Bachelor of Design',
        description: 'Shape the world with creativity, aesthetics, and user-centric design.',
        icon: 'bdes',
        color: 'from-pink-500 to-fuchsia-600',
        stream: 'Design',
        level: 'Undergraduate',
        courseLinkName: 'Bachelor of Design'
    }
];

export const COURSE_STREAMS: { [key: string]: string[] } = {
    'Engineering': ['B.Tech in Computer Science', 'B.Tech in Mechanical Engineering', 'B.Tech in Civil Engineering', 'B.Tech in Electrical Engineering', 'M.Tech in AI'],
    'Management': ['BBA', 'MBA', 'PGDM in Marketing'],
    'Medical': ['MBBS', 'BDS', 'B.Sc Nursing'],
    'Arts & Science': ['B.A in History', 'B.Sc in Physics', 'M.Sc in Chemistry', 'B.Com'],
    'Law': ['LLB', 'LLM'],
    'Design': ['Bachelor of Design', 'Master of Design']
};

const COLLEGES_COURSES: { [key: string]: Course[] } = {
    'IITD': [
        { id: 1, name: 'B.Tech in Computer Science', duration: '4 Years', level: 'Undergraduate', fees: 220000, eligibility: '10+2 with 75% + JEE Advanced' },
        { id: 2, name: 'B.Tech in Mechanical Engineering', duration: '4 Years', level: 'Undergraduate', fees: 220000, eligibility: '10+2 with 75% + JEE Advanced' },
        { id: 3, name: 'Master of Design', duration: '2 Years', level: 'Postgraduate', fees: 150000, eligibility: 'B.Des or B.Tech + CEED' },
    ],
    'VIT': [
        { id: 4, name: 'B.Tech in Computer Science', duration: '4 Years', level: 'Undergraduate', fees: 395000, eligibility: '10+2 with 60% + VITEEE' },
        { id: 5, name: 'BBA', duration: '3 Years', level: 'Undergraduate', fees: 150000, eligibility: '10+2 with 60%' },
        { id: 6, name: 'B.Tech in Electrical Engineering', duration: '4 Years', level: 'Undergraduate', fees: 395000, eligibility: '10+2 with 60% + VITEEE' },
    ],
    'AIIMS': [
         { id: 7, name: 'MBBS', duration: '5.5 Years', level: 'Undergraduate', fees: 6500, eligibility: '10+2 with PCB + NEET' },
         { id: 8, name: 'B.Sc Nursing', duration: '4 Years', level: 'Undergraduate', fees: 2400, eligibility: '10+2 with PCB' },
    ],
    'IIMB': [
        { id: 9, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 2300000, eligibility: 'Graduation + CAT' },
        { id: 10, name: 'PGDM in Marketing', duration: '2 Years', level: 'Postgraduate', fees: 2100000, eligibility: 'Graduation + CAT' },
    ],
    'NLU': [
        { id: 11, name: 'LLB', duration: '5 Years', level: 'Undergraduate', fees: 250000, eligibility: '10+2 + CLAT' },
        { id: 12, name: 'LLM', duration: '1 Year', level: 'Postgraduate', fees: 180000, eligibility: 'LLB + CLAT PG' },
    ]
};

// Added courses for new colleges
const NEW_COURSE_ID_START = 13;
const COLLEGES_COURSES_EXT: { [key: string]: Course[] } = {
    'ABS': [
        { id: 13, name: 'PGDM in Marketing', duration: '2 Years', level: 'Postgraduate', fees: 350000, eligibility: 'Graduation + CAT/MAT/ATMA/XAT/CMAT' },
        { id: 14, name: 'BBA', duration: '3 Years', level: 'Undergraduate', fees: 150000, eligibility: '10+2' },
    ],
    'BENNETT': [
        { id: 15, name: 'B.Tech in Computer Science', duration: '4 Years', level: 'Undergraduate', fees: 250000, eligibility: '10+2 + JEE Main' },
        { id: 16, name: 'B.Tech in Civil Engineering', duration: '4 Years', level: 'Undergraduate', fees: 240000, eligibility: '10+2 + JEE Main' },
        { id: 17, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 500000, eligibility: 'Graduation + CAT/XAT/CMAT' },
        { id: 18, name: 'BBA', duration: '3 Years', level: 'Undergraduate', fees: 180000, eligibility: '10+2' },
        { id: 19, name: 'LLB', duration: '5 Years', level: 'Undergraduate', fees: 200000, eligibility: '10+2 + CLAT' },
    ],
    'IILM': [
        { id: 20, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 400000, eligibility: 'Graduation + CAT/MAT/XAT' },
        { id: 21, name: 'BBA', duration: '3 Years', level: 'Undergraduate', fees: 150000, eligibility: '10+2' },
        { id: 22, name: 'LLB', duration: '5 Years', level: 'Undergraduate', fees: 200000, eligibility: '10+2 + CLAT' },
        { id: 23, name: 'B.Tech in Computer Science', duration: '4 Years', level: 'Undergraduate', fees: 250000, eligibility: '10+2 + JEE Main' },
    ],
    'GDGU': [
        { id: 24, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 300000, eligibility: 'Graduation + CAT/MAT/XAT' },
        { id: 25, name: 'B.Tech in Mechanical Engineering', duration: '4 Years', level: 'Undergraduate', fees: 220000, eligibility: '10+2 + JEE Main' },
        { id: 26, name: 'LLB', duration: '5 Years', level: 'Undergraduate', fees: 180000, eligibility: '10+2 + CLAT' },
        { id: 27, name: 'Bachelor of Design', duration: '4 Years', level: 'Undergraduate', fees: 250000, eligibility: '10+2' },
    ],
    'KRMU': [
        { id: 28, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 280000, eligibility: 'Graduation + CAT/MAT/XAT' },
        { id: 29, name: 'B.Tech in Computer Science', duration: '4 Years', level: 'Undergraduate', fees: 220000, eligibility: '10+2 + JEE Main' },
        { id: 30, name: 'LLB', duration: '5 Years', level: 'Undergraduate', fees: 180000, eligibility: '10+2 + CLAT' },
        { id: 31, name: 'BBA', duration: '3 Years', level: 'Undergraduate', fees: 150000, eligibility: '10+2' },
        { id: 32, name: 'Bachelor of Design', duration: '4 Years', level: 'Undergraduate', fees: 230000, eligibility: '10+2' },
    ],
    'MANGALMAY': [
        { id: 33, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 250000, eligibility: 'Graduation + CAT/MAT/XAT' },
        { id: 34, name: 'B.Tech in Civil Engineering', duration: '4 Years', level: 'Undergraduate', fees: 200000, eligibility: '10+2 + JEE Main' },
        { id: 35, name: 'BBA', duration: '3 Years', level: 'Undergraduate', fees: 120000, eligibility: '10+2' },
        { id: 36, name: 'B.Com', duration: '3 Years', level: 'Undergraduate', fees: 100000, eligibility: '10+2' },
    ],
    'AMITY': [
        { id: 37, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 300000, eligibility: 'Graduation + AMAT/CAT/XAT' },
        { id: 38, name: 'B.Tech in Computer Science', duration: '4 Years', level: 'Undergraduate', fees: 250000, eligibility: '10+2 + JEE Main' },
        { id: 39, name: 'LLB', duration: '5 Years', level: 'Undergraduate', fees: 200000, eligibility: '10+2 + CLAT' },
        { id: 40, name: 'BBA', duration: '3 Years', level: 'Undergraduate', fees: 150000, eligibility: '10+2' },
        { id: 41, name: 'Bachelor of Design', duration: '4 Years', level: 'Undergraduate', fees: 250000, eligibility: '10+2' },
    ],
    'IITK': [
        { id: 42, name: 'B.Tech in Computer Science', duration: '4 Years', level: 'Undergraduate', fees: 220000, eligibility: '10+2 with 75% + JEE Advanced' },
        { id: 43, name: 'M.Tech in AI', duration: '2 Years', level: 'Postgraduate', fees: 150000, eligibility: 'B.Tech + GATE' },
        { id: 44, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 250000, eligibility: 'Graduation + CAT' },
    ],
    'IITB': [
        { id: 45, name: 'B.Tech in Computer Science', duration: '4 Years', level: 'Undergraduate', fees: 220000, eligibility: '10+2 with 75% + JEE Advanced' },
        { id: 46, name: 'M.Tech in AI', duration: '2 Years', level: 'Postgraduate', fees: 150000, eligibility: 'B.Tech + GATE' },
        { id: 47, name: 'MBA', duration: '2 Years', level: 'Postgraduate', fees: 250000, eligibility: 'Graduation + CAT' },
    ],
};

const COLLEGES_PLACEMENTS: { [key: string]: Placements } = {
    'IITD': { highestPackage: '2.5 Cr', averagePackage: '25 LPA', placementPercentage: 95, topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Jane Street'] },
    'VIT': { highestPackage: '1.02 Cr', averagePackage: '9.23 LPA', placementPercentage: 92, topRecruiters: ['Infosys', 'Wipro', 'Cognizant', 'TCS'] },
    'AIIMS': { highestPackage: 'N/A', averagePackage: 'Govt. Stipend', placementPercentage: 100, topRecruiters: ['Government Hospitals', 'Private Hospitals'] },
    'IIMB': { highestPackage: '80 LPA', averagePackage: '33.8 LPA', placementPercentage: 100, topRecruiters: ['McKinsey & Company', 'BCG', 'Bain & Company', 'Goldman Sachs'] },
    'NLU': { highestPackage: '20 LPA', averagePackage: '15 LPA', placementPercentage: 85, topRecruiters: ['Cyril Amarchand Mangaldas', 'Khaitan & Co', 'AZB & Partners'] },
};

// Added placements for new colleges
const COLLEGES_PLACEMENTS_EXT: { [key: string]: Placements } = {
    'ABS': { highestPackage: '15 LPA', averagePackage: '6–7 LPA', placementPercentage: 85, topRecruiters: ['Deloitte', 'KPMG', 'ICICI'] },
    'BENNETT': { highestPackage: '40 LPA', averagePackage: '8 LPA', placementPercentage: 90, topRecruiters: ['Amazon', 'Microsoft', 'Times Group'] },
    'IILM': { highestPackage: '24 LPA', averagePackage: '7–8 LPA', placementPercentage: 88, topRecruiters: ['Accenture', 'EY', 'Infosys'] },
    'GDGU': { highestPackage: '18 LPA', averagePackage: '5–7 LPA', placementPercentage: 85, topRecruiters: ['Deloitte', 'Wipro', 'L&T'] },
    'KRMU': { highestPackage: '15 LPA', averagePackage: '5–6 LPA', placementPercentage: 85, topRecruiters: ['Infosys', 'IBM', 'ICICI Bank'] },
    'MANGALMAY': { highestPackage: '12 LPA', averagePackage: '4–5 LPA', placementPercentage: 80, topRecruiters: ['TCS', 'HCL', 'IBM'] },
    'AMITY': { highestPackage: '22 LPA', averagePackage: '6–7 LPA', placementPercentage: 88, topRecruiters: ['Accenture', 'Amazon', 'Cognizant'] },
    'IITK': { highestPackage: '2.0 Cr', averagePackage: '15–30 LPA', placementPercentage: 95, topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs'] },
    'IITB': { highestPackage: '2.2 Cr', averagePackage: '14–30 LPA', placementPercentage: 95, topRecruiters: ['Google', 'IBM', 'Tata'] },
};


export const COLLEGES_DATA: College[] = [
    {
        id: 1, name: 'Indian Institute of Technology, Delhi', location: 'New Delhi, Delhi', rating: 4.8, reviewCount: 1250,
        imageUrl: 'https://images.unsplash.com/photo-1622397333335-e6de182a5273?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/1200px-Indian_Institute_of_Technology_Delhi_Logo.svg.png',
        established: 1961, type: 'Government', accreditation: ['NAAC A++', 'NIRF'],
        description: 'IIT Delhi is one of the most prestigious engineering institutions in India, known for its rigorous academic programs and cutting-edge research.',
        highlights: ['Top Engineering College', 'Excellent Placements', 'Research Focused'],
        feesRange: { min: 200000, max: 250000 },
        courses: COLLEGES_COURSES['IITD'],
        placements: COLLEGES_PLACEMENTS['IITD']
    },
    {
        id: 2, name: 'Vellore Institute of Technology', location: 'Vellore, Tamil Nadu', rating: 4.5, reviewCount: 2500,
        imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        logoUrl: 'https://vit.ac.in/sites/default/files/VIT-logo.png',
        established: 1984, type: 'Private', accreditation: ['NAAC A++', 'ABET'],
        description: 'VIT is a leading private university in India, renowned for its excellent infrastructure, diverse student body, and strong industry connections.',
        highlights: ['Top Private University', 'FFCS System', 'International Collaborations'],
        feesRange: { min: 150000, max: 400000 },
        courses: COLLEGES_COURSES['VIT'],
        placements: COLLEGES_PLACEMENTS['VIT']
    },
    {
        id: 3, name: 'All India Institute of Medical Sciences, Delhi', location: 'New Delhi, Delhi', rating: 4.9, reviewCount: 980,
        imageUrl: 'https://images.unsplash.com/photo-1584982235211-807e3739a834?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        logoUrl: 'https://www.aiims.edu/images/logo-hindi-eng.png',
        established: 1956, type: 'Government', accreditation: ['MCI'],
        description: 'AIIMS Delhi is the premier medical college and hospital in India, consistently ranked as the top medical institution for its exceptional clinical care and research.',
        highlights: ['Top Medical College', 'Subsidized Fees', 'Advanced Healthcare'],
        feesRange: { min: 2000, max: 7000 },
        courses: COLLEGES_COURSES['AIIMS'],
        placements: COLLEGES_PLACEMENTS['AIIMS']
    },
    {
        id: 4, name: 'Indian Institute of Management Bangalore', location: 'Bengaluru, Karnataka', rating: 4.7, reviewCount: 850,
        imageUrl: 'https://images.unsplash.com/photo-1593348987445-96f1a415a772?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        logoUrl: 'https://www.iimb.ac.in/themes/custom/iimb/logo.svg',
        established: 1973, type: 'Government', accreditation: ['EQUIS', 'AMBA'],
        description: 'IIM Bangalore is a leading graduate school of management in Asia, recognized for its excellence in management education and research.',
        highlights: ['Top B-School', 'Global Network', 'Case-based Learning'],
        feesRange: { min: 2100000, max: 2400000 },
        courses: COLLEGES_COURSES['IIMB'],
        placements: COLLEGES_PLACEMENTS['IIMB']
    },
    {
        id: 5, name: 'National Law School of India University', location: 'Bengaluru, Karnataka', rating: 4.6, reviewCount: 600,
        imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f8bf2c53a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        logoUrl: 'https://www.nls.ac.in/wp-content/uploads/2021/07/NLS-Logo-Navbar.png',
        established: 1986, type: 'Government', accreditation: ['BCI'],
        description: 'NLSIU is the top-ranked law university in India, pioneering legal education and setting standards for law schools across the country.',
        highlights: ['Top Law School', 'Moot Court Excellence', 'Legal Aid Clinics'],
        feesRange: { min: 180000, max: 300000 },
        courses: COLLEGES_COURSES['NLU'],
        placements: COLLEGES_PLACEMENTS['NLU']
    }
    ,
    {
        id: 6, name: 'Asian Business School', location: 'Noida, Uttar Pradesh', rating: 4.3, reviewCount: 420,
        imageUrl: '/images/ABS.jpg',
        logoUrl: 'https://dummyimage.com/64x64/ffffff/0b5cff.png&text=ABS',
        established: 2006, type: 'Private', accreditation: ['AICTE', 'UGC'],
        description: 'Renowned for PGDM and management programs with industry-focused curriculum.',
        highlights: ['Industry-Focused Curriculum', 'Live Projects', 'Professional Certifications'],
        feesRange: { min: 150000, max: 350000 },
        courses: COLLEGES_COURSES_EXT['ABS'],
        placements: COLLEGES_PLACEMENTS_EXT['ABS']
    },
    {
        id: 7, name: 'Bennett University', location: 'Greater Noida, Uttar Pradesh', rating: 4.4, reviewCount: 560,
        imageUrl: '/images/Bennett.jpg',
        logoUrl: 'https://dummyimage.com/64x64/ffffff/0b5cff.png&text=BU',
        established: 2016, type: 'Private', accreditation: ['NAAC A', 'UGC'],
        description: 'A Times Group initiative offering contemporary management, engineering, and law programs.',
        highlights: ['Modern Infrastructure', 'Industry Collaboration', 'Research Focus'],
        feesRange: { min: 180000, max: 500000 },
        courses: COLLEGES_COURSES_EXT['BENNETT'],
        placements: COLLEGES_PLACEMENTS_EXT['BENNETT']
    },
    {
        id: 8, name: 'IILM University', location: 'Gurugram, Greater Noida, Lodhi Road (Delhi)', rating: 4.2, reviewCount: 480,
        imageUrl: '/images/iilm.jpg',
        logoUrl: 'https://dummyimage.com/64x64/ffffff/0b5cff.png&text=IILM',
        established: 1993, type: 'Private', accreditation: ['NAAC', 'UGC'],
        description: 'A leading university in business and liberal arts, strong global partnerships.',
        highlights: ['Global Partnerships', 'Experiential Learning', 'Interdisciplinary Programs'],
        feesRange: { min: 150000, max: 400000 },
        courses: COLLEGES_COURSES_EXT['IILM'],
        placements: COLLEGES_PLACEMENTS_EXT['IILM']
    },
    {
        id: 9, name: 'GD Goenka University', location: 'Gurgaon, Haryana', rating: 4.1, reviewCount: 390,
        imageUrl: '/images/GD_Goenka.jpg',
        logoUrl: 'https://dummyimage.com/64x64/ffffff/0b5cff.png&text=GDGU',
        established: 2013, type: 'Private', accreditation: ['NAAC', 'UGC'],
        description: 'Business, engineering, law, and design programs with excellent infrastructure.',
        highlights: ['Excellent Infrastructure', 'Industry Connect', 'Holistic Development'],
        feesRange: { min: 150000, max: 300000 },
        courses: COLLEGES_COURSES_EXT['GDGU'],
        placements: COLLEGES_PLACEMENTS_EXT['GDGU']
    },
    {
        id: 10, name: 'KR Mangalam University', location: 'Gurgaon, Haryana', rating: 4.2, reviewCount: 410,
        imageUrl: '/images/KR_Mangalam.jpg',
        logoUrl: 'https://dummyimage.com/64x64/ffffff/0b5cff.png&text=KRMU',
        established: 2013, type: 'Private', accreditation: ['NAAC', 'UGC'],
        description: 'Known for student-centric approach and interdisciplinary programs.',
        highlights: ['Student-Centric Approach', 'Interdisciplinary Learning', 'Modern Labs'],
        feesRange: { min: 150000, max: 280000 },
        courses: COLLEGES_COURSES_EXT['KRMU'],
        placements: COLLEGES_PLACEMENTS_EXT['KRMU']
    },
    {
        id: 11, name: 'Mangalmay Group of Institutions', location: 'Greater Noida, Uttar Pradesh', rating: 4.0, reviewCount: 360,
        imageUrl: '/images/download (5).jpg',
        logoUrl: 'https://dummyimage.com/64x64/ffffff/0b5cff.png&text=MGI',
        established: 2002, type: 'Private', accreditation: ['NAAC', 'UGC'],
        description: 'Management, engineering, B.Ed, and commerce courses focused on employability.',
        highlights: ['Employability Focus', 'Industry Ties', 'Affordable Fees'],
        feesRange: { min: 100000, max: 250000 },
        courses: COLLEGES_COURSES_EXT['MANGALMAY'],
        placements: COLLEGES_PLACEMENTS_EXT['MANGALMAY']
    },
    {
        id: 12, name: 'Amity University', location: 'Noida, Lucknow, Gurugram', rating: 4.3, reviewCount: 2100,
        imageUrl: 'https://images.unsplash.com/photo-1541339907198-8449483da7b7?q=80&w=2070&auto=format&fit=crop',
        logoUrl: 'https://dummyimage.com/64x64/ffffff/0b5cff.png&text=AMITY',
        established: 1995, type: 'Private', accreditation: ['NAAC A+', 'UGC'],
        description: 'Flagship private university with vast course options and global exposures.',
        highlights: ['Global Exposure', 'Large Campus', 'Advanced Infrastructure'],
        feesRange: { min: 150000, max: 300000 },
        courses: COLLEGES_COURSES_EXT['AMITY'],
        placements: COLLEGES_PLACEMENTS_EXT['AMITY']
    },
    {
        id: 13, name: 'Indian Institute of Technology Kanpur', location: 'Kanpur, Uttar Pradesh', rating: 4.8, reviewCount: 1400,
        imageUrl: 'https://images.unsplash.com/photo-1622397333335-e6de182a5273?q=80&w=2070&auto=format&fit=crop',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/IIT_Kanpur_Logo.svg/1200px-IIT_Kanpur_Logo.svg.png',
        established: 1959, type: 'Government', accreditation: ['NIRF', 'NAAC A++'],
        description: 'Prestigious government engineering and research institute.',
        highlights: ['Prestigious Institute', 'Strong Research', 'Excellent Placements'],
        feesRange: { min: 200000, max: 250000 },
        courses: COLLEGES_COURSES_EXT['IITK'],
        placements: COLLEGES_PLACEMENTS_EXT['IITK']
    },
    {
        id: 14, name: 'Indian Institute of Technology Bombay', location: 'Powai, Mumbai, Maharashtra', rating: 4.9, reviewCount: 1600,
        imageUrl: 'https://images.unsplash.com/photo-1622397333335-e6de182a5273?q=80&w=2070&auto=format&fit=crop',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/IIT_Bombay_Logo.svg/1200px-IIT_Bombay_Logo.svg.png',
        established: 1958, type: 'Government', accreditation: ['NIRF', 'NAAC A++'],
        description: 'Leading engineering, management, and science institute in India.',
        highlights: ['Top Engineering Institute', 'World-Class Research', 'Cultural Clubs'],
        feesRange: { min: 200000, max: 250000 },
        courses: COLLEGES_COURSES_EXT['IITB'],
        placements: COLLEGES_PLACEMENTS_EXT['IITB']
    }
];

export const EXAMS_DATA: Exam[] = [
    { id: 1, name: 'JEE Main', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/35/JEE_Main_Logo.svg/1200px-JEE_Main_Logo.svg.png', conductingBody: 'National Testing Agency (NTA)', stream: 'Engineering', date: 'April & May 2024',
      description: 'The Joint Entrance Examination (Main) is a national-level entrance exam for admission to undergraduate engineering programs.',
      eligibility: '10+2 with Physics, Chemistry, and Mathematics.',
      syllabus: [
        { subject: 'Physics', topics: ['Kinematics', 'Laws of Motion', 'Thermodynamics', 'Optics', 'Electromagnetism'] },
        { subject: 'Chemistry', topics: ['Atomic Structure', 'Chemical Bonding', 'Organic Chemistry', 'Inorganic Chemistry'] },
        { subject: 'Mathematics', topics: ['Calculus', 'Algebra', 'Trigonometry', 'Coordinate Geometry'] }
      ],
      importantDates: [{event: 'Registration', date: 'Feb 2024'}, {event: 'Exam Date', date: 'Apr 2024'}]
    },
    { id: 2, name: 'NEET', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/NEET_UG_Logo.svg/1200px-NEET_UG_Logo.svg.png', conductingBody: 'National Testing Agency (NTA)', stream: 'Medical', date: 'May 2024',
      description: 'The National Eligibility cum Entrance Test (Undergraduate) is for students who wish to study undergraduate medical courses (MBBS) and dental courses (BDS).',
      eligibility: '10+2 with Physics, Chemistry, and Biology.',
      syllabus: [
        { subject: 'Physics', topics: ['Mechanics', 'Thermodynamics', 'Modern Physics'] },
        { subject: 'Chemistry', topics: ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'] },
        { subject: 'Biology', topics: ['Diversity in Living World', 'Human Physiology', 'Genetics and Evolution'] }
      ],
      importantDates: [{event: 'Registration', date: 'Mar 2024'}, {event: 'Exam Date', date: 'May 2024'}]
    },
    { id: 3, name: 'CAT', logoUrl: 'https://iimcat.ac.in/uploads/CAT_2023_logo.png', conductingBody: 'Indian Institutes of Management (IIMs)', stream: 'Management', date: 'November 2024',
      description: 'The Common Admission Test is a computer-based test for admission to postgraduate management programs.',
      eligibility: 'Bachelor\'s Degree with at least 50% marks.',
      syllabus: [
        { subject: 'Verbal Ability & Reading Comprehension', topics: ['Para Jumbles', 'Reading Comprehension Passages', 'Sentence Correction'] },
        { subject: 'Data Interpretation & Logical Reasoning', topics: ['Tables', 'Graphs', 'Caselets', 'Blood Relations'] },
        { subject: 'Quantitative Aptitude', topics: ['Arithmetic', 'Algebra', 'Geometry', 'Modern Math'] }
      ],
      importantDates: [{event: 'Registration', date: 'Aug 2024'}, {event: 'Exam Date', date: 'Nov 2024'}]
    },
    { id: 4, name: 'UPSC CSE', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/UPSC_Logo.svg/1200px-UPSC_Logo.svg.png', conductingBody: 'Union Public Service Commission', stream: 'Civil Services', date: 'May 2024 (Prelims)',
      description: 'The Civil Services Examination is a nationwide competitive examination in India for recruitment to various Civil Services of the Government of India.',
      eligibility: 'Bachelor\'s Degree from any recognized university.',
      syllabus: [
        { subject: 'General Studies Paper I', topics: ['History of India', 'Indian and World Geography', 'Indian Polity and Governance'] },
        { subject: 'General Studies Paper II (CSAT)', topics: ['Comprehension', 'Logical Reasoning', 'Basic Numeracy'] }
      ],
      importantDates: [{event: 'Prelims Exam', date: 'May 2024'}, {event: 'Mains Exam', date: 'Sep 2024'}]
    },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
    { id: 1, title: 'Top 10 Engineering Colleges in India 2024', author: 'Dr. Ramesh Kumar', date: 'May 1, 2024', 
      category: 'Rankings',
      imageUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      excerpt: 'Explore the latest NIRF rankings and our expert analysis to find the best engineering institution for your future.',
      content: '<h2>Introduction</h2><p>Choosing an engineering college is a pivotal decision... Here are the top 10 based on the latest data.</p><h3>1. IIT Madras</h3><p>Indian Institute of Technology Madras is a public technical university located in Chennai, Tamil Nadu, India. As one of the Indian Institutes of Technology, it is recognized as an Institute of National Importance and has been consistently ranked as the country\'s top engineering institute.</p><h3>2. IIT Delhi</h3><p>Indian Institute of Technology Delhi is a public technical university located in Hauz Khas, South Delhi, Delhi, India. It is one of the oldest Indian Institutes of Technology in India.</p>'
    },
    { id: 2, title: 'How to Prepare for the CAT Exam in 6 Months', author: 'Priya Sharma, IIM-A Alumna', date: 'April 25, 2024', 
      category: 'Exam Prep',
      imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      excerpt: 'A comprehensive guide with a month-by-month study plan to help you ace the CAT and get into your dream B-School.',
      content: '<h2>6-Month Strategy</h2><p>The key to cracking CAT is consistent effort and smart work...</p><h4>Month 1-2: Build Fundamentals</h4><p>Focus on understanding the basic concepts of all three sections. For Quantitative Aptitude, cover topics like Arithmetic, Algebra, and Geometry. For Verbal Ability, start reading newspapers and novels daily to improve your reading speed and comprehension.</p>'
    },
    { id: 3, title: 'The Future of AI in Medicine and Healthcare', author: 'Team StudyCups', date: 'April 18, 2024', 
      category: 'Career Advice',
      imageUrl: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      excerpt: 'Discover how artificial intelligence is revolutionizing diagnostics, treatment protocols, and medical research.',
      content: '<h2>AI in Diagnostics</h2><p>AI algorithms are now capable of analyzing medical images like X-rays and MRIs with higher accuracy than humans, helping in early detection of diseases like cancer and diabetic retinopathy.</p><h2>Personalized Treatment</h2><p>AI can analyze a patient\'s genetic makeup, lifestyle, and medical history to recommend personalized treatment plans, leading to better outcomes.</p>'
    },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
    { id: 1, name: 'Anjali Singh', college: 'IIT Delhi', 
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      quote: 'StudyCups was instrumental in my college search. The AI assistant helped me shortlist colleges that perfectly matched my profile. The detailed information is unmatched!'
    },
    { id: 2, name: 'Rohan Mehta', college: 'IIM Bangalore', 
      avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      quote: 'The CAT preparation articles and exam date reminders were a lifesaver. I could easily compare B-schools and make an informed decision. Highly recommended!'
    },
    { id: 3, name: 'Fatima Khan', college: 'AIIMS Delhi', 
      avatarUrl: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      quote: 'The detailed syllabus breakdown for NEET on StudyCups was incredibly helpful. It simplified my study plan and helped me focus on important topics.'
    },
];

// Dynamically set future dates for events
const getFutureDate = (days: number, hours = 0, minutes = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(date.getHours() + hours);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toISOString();
};


export const EVENTS_DATA: Event[] = [
    { 
        id: 1, 
        title: 'AI in Education: The Next Frontier', 
        category: 'Webinar', 
        date: getFutureDate(12, 3), 
        description: 'Join industry experts to discuss how Artificial Intelligence is revolutionizing the education sector, from personalized learning to automated grading.',
        imageUrl: 'https://images.unsplash.com/photo-1674027444485-a940e4d12f6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: '#'
    },
    { 
        id: 2, 
        title: 'National Engineering College Fair 2024', 
        category: 'College Fair', 
        date: getFutureDate(25, 6),
        description: 'Meet representatives from India\'s top 50 engineering colleges. Get your questions answered and explore your options all in one place.',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: '#'
    },
    { 
        id: 3, 
        title: 'Advanced Application Writing Workshop', 
        category: 'Workshop', 
        date: getFutureDate(38, 2),
        description: 'Learn the art of crafting compelling college applications and personal statements that stand out to admission committees.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: '#'
    },
     { 
        id: 4, 
        title: 'JEE Advanced Application Deadline', 
        category: 'Deadline', 
        date: getFutureDate(50, 23, 59),
        description: 'Final call for all aspiring engineers! Ensure your application for the JEE Advanced exam is submitted before the portal closes.',
        imageUrl: 'https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: '#'
    },
];