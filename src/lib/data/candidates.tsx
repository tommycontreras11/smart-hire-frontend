// export type CandidateStatus = 'new' | 'review' | 'interview' | 'offer' | 'hired' | 'rejected' | 'technical';

import { StatusRequestEnum } from "@/enums/request.enum";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: StatusRequestEnum;
  rating: number;
  appliedDate: string;
  avatarUrl?: string;
  skills?: string[];
  department?: string;
  lastContact?: string;
  source?: string;
}

export const candidatesData: Candidate[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'carlos@example.com',
    position: 'Desarrollador Frontend',
    status: StatusRequestEnum.INTERVIEW,
    rating: 4,
    appliedDate: '2025-06-15',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS'],
    department: 'Tecnología',
    source: 'LinkedIn'
  },
  {
    id: '2',
    name: 'Lucia Fernandez',
    email: 'lucia@example.com',
    position: 'Diseñadora UX/UI',
    status: StatusRequestEnum.UNDER_REVIEW,
    rating: 5,
    appliedDate: '2025-06-17',
    skills: ['Figma', 'Adobe XD', 'UI/UX', 'Wireframing'],
    department: 'Diseño',
    source: 'Referencia'
  },
  {
    id: '3',
    name: 'Roberto Torres',
    email: 'roberto@example.com',
    position: 'Product Manager',
    status: StatusRequestEnum.HIRED,
    rating: 5,
    appliedDate: '2025-06-10',
    skills: ['Gestión de Producto', 'Agile', 'User Stories', 'Roadmapping'],
    department: 'Producto',
    source: 'Indeed'
  },
  {
    id: '4',
    name: 'Ana Gómez',
    email: 'ana@example.com',
    position: 'Desarrollador Backend',
    status: StatusRequestEnum.APPROVED,
    rating: 4,
    appliedDate: '2025-06-12',
    skills: ['Node.js', 'Express', 'MongoDB', 'API Design'],
    department: 'Tecnología',
    source: 'Sitio Web'
  },
  {
    id: '5',
    name: 'Miguel Rodríguez',
    email: 'miguel@example.com',
    position: 'DevOps Engineer',
    status: StatusRequestEnum.UNDER_REVIEW,
    rating: 3,
    appliedDate: '2025-06-18',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    department: 'Infraestructura',
    source: 'LinkedIn'
  },
  {
    id: '7',
    name: 'Javier López',
    email: 'javier@example.com',
    position: 'Especialista en Ventas',
    status: StatusRequestEnum.INTERVIEW,
    rating: 3,
    appliedDate: '2025-06-13',
    skills: ['B2B Sales', 'Negotiation', 'CRM', 'Lead Generation'],
    department: 'Ventas',
    source: 'Referencia'
  },
  {
    id: '8',
    name: 'Carmen Díaz',
    email: 'carmen@example.com',
    position: 'Recursos Humanos',
    status: StatusRequestEnum.EVALUATED,
    rating: 2,
    appliedDate: '2025-06-08',
    skills: ['Recruitment', 'Employee Relations', 'Onboarding', 'HR Policies'],
    department: 'RRHH',
    source: 'LinkedIn'
  },
  {
    id: '10',
    name: 'Laura Jiménez',
    email: 'laura@example.com',
    position: 'Contadora',
    status: StatusRequestEnum.UNDER_REVIEW,
    rating: 3,
    appliedDate: '2025-06-16',
    skills: ['Financial Reporting', 'Tax Management', 'Auditing', 'ERP'],
    department: 'Finanzas',
    source: 'Indeed'
  },
  {
    id: '11',
    name: 'Daniel Moreno',
    email: 'daniel@example.com',
    position: 'Soporte Técnico',
    status: StatusRequestEnum.CANCELLED,
    rating: 4,
    appliedDate: '2025-06-14',
    skills: ['Help Desk', 'Troubleshooting', 'Customer Service', 'IT Support'],
    department: 'Soporte',
    source: 'Referencia'
  },
  {
    id: '12',
    name: 'Isabel Vega',
    email: 'isabel@example.com',
    position: 'Diseñadora Gráfica',
    status: StatusRequestEnum.REJECTED,
    rating: 4,
    appliedDate: '2025-06-11',
    skills: ['Adobe Creative Suite', 'Branding', 'Typography', 'Illustration'],
    department: 'Diseño',
    source: 'LinkedIn'
  }
];