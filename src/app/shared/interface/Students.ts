export interface Student {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    courses: string[];
    enrollmentDate: string;
    status: 'active' | 'inactive';
  } 