import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { IRecentCandidate } from '@/providers/http/recruiters/interface';
import { StatusRequestEnum } from '@/enums/request.enum';

type CandidateStatus = 'review' | 'interview' | 'technical' | 'offer' | 'hired' | 'rejected';

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: CandidateStatus;
  avatarUrl?: string;
  dateApplied: string;
}

const statusColors: Record<StatusRequestEnum, string> = {
  [StatusRequestEnum.DRAFT]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  [StatusRequestEnum.SUBMITTED]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [StatusRequestEnum.UNDER_REVIEW]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [StatusRequestEnum.INTERVIEW]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  [StatusRequestEnum.EVALUATED]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  [StatusRequestEnum.APPROVED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [StatusRequestEnum.REJECTED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  [StatusRequestEnum.HIRED]: 'bg-green-200 text-green-900 dark:bg-green-950 dark:text-green-200',
  [StatusRequestEnum.CANCELLED]: 'bg-red-200 text-red-900 dark:bg-red-950 dark:text-red-200',
};

const statusLabels: Record<StatusRequestEnum, string> = {
  [StatusRequestEnum.DRAFT]: 'Borrador',
  [StatusRequestEnum.SUBMITTED]: 'Enviado',
  [StatusRequestEnum.UNDER_REVIEW]: 'En Revisión',
  [StatusRequestEnum.INTERVIEW]: 'Entrevista',
  [StatusRequestEnum.EVALUATED]: 'Evaluado',
  [StatusRequestEnum.APPROVED]: 'Aprobado',
  [StatusRequestEnum.REJECTED]: 'Rechazado',
  [StatusRequestEnum.HIRED]: 'Contratado',
  [StatusRequestEnum.CANCELLED]: 'Cancelado',
};

const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'carlos@example.com',
    position: 'Desarrollador Frontend',
    status: 'interview',
    dateApplied: '2025-06-15',
  },
  {
    id: '2',
    name: 'Lucia Fernandez',
    email: 'lucia@example.com',
    position: 'Diseñadora UX/UI',
    status: 'technical',
    dateApplied: '2025-06-17',
  },
  {
    id: '3',
    name: 'Roberto Torres',
    email: 'roberto@example.com',
    position: 'Product Manager',
    status: 'hired',
    dateApplied: '2025-06-10',
  },
  {
    id: '4',
    name: 'Ana Gómez',
    email: 'ana@example.com',
    position: 'Desarrollador Backend',
    status: 'offer',
    dateApplied: '2025-06-12',
  },
];

export function RecentCandidates({ candidates }: {candidates: IRecentCandidate[] | []}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Candidatos Recientes</CardTitle>
          <CardDescription>
            Los últimos candidatos que aplicaron
          </CardDescription>
        </div>
        <Button size="sm" variant="outline">Ver todos</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <div key={candidate.uuid} className="flex items-start space-x-4">
              <Avatar className="h-10 w-10 border">
                <AvatarImage alt={candidate.full_name} />
                <AvatarFallback>
                  {candidate.full_name.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{candidate.full_name}</div>
                  <Badge variant="outline" className={statusColors[candidate.status]}>
                    {statusLabels[candidate.status]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{candidate.position_type}</p>
                <div className="flex items-center text-xs text-muted-foreground pt-1">
                  <span>Aplicó: {new Date(candidate.applied_at).toLocaleDateString()}</span>
                  <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                    <FileText className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}