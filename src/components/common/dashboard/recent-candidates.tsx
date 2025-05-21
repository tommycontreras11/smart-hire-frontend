import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

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

const statusColors: Record<CandidateStatus, string> = {
  review: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  interview: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  technical: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  offer: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  hired: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  rejected: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const statusLabels: Record<CandidateStatus, string> = {
  review: 'En Revisión',
  interview: 'Entrevista',
  technical: 'Prueba Técnica',
  offer: 'Oferta',
  hired: 'Contratado',
  rejected: 'Rechazado',
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

export function RecentCandidates() {
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
            <div key={candidate.id} className="flex items-start space-x-4">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                <AvatarFallback>
                  {candidate.name.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{candidate.name}</div>
                  <Badge variant="outline" className={statusColors[candidate.status]}>
                    {statusLabels[candidate.status]}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{candidate.position}</p>
                <div className="flex items-center text-xs text-muted-foreground pt-1">
                  <span>Aplicó: {new Date(candidate.dateApplied).toLocaleDateString()}</span>
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