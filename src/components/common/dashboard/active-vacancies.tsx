import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IActiveVacancy } from '@/providers/http/recruiters/interface';

interface Vacancy {
  id: string;
  position: string;
  department: string;
  location: string;
  applicants: number;
  postDate: string;
  deadline: string;
}

const vacancies: Vacancy[] = [
  {
    id: '1',
    position: 'Desarrollador Full Stack',
    department: 'Tecnología',
    location: 'Remoto',
    applicants: 24,
    postDate: '2025-06-01',
    deadline: '2025-06-30',
  },
  {
    id: '2',
    position: 'Diseñador UX/UI',
    department: 'Diseño',
    location: 'Ciudad de México',
    applicants: 18,
    postDate: '2025-06-05',
    deadline: '2025-07-05',
  },
  {
    id: '3',
    position: 'Gerente de Marketing',
    department: 'Marketing',
    location: 'Ciudad de México',
    applicants: 12,
    postDate: '2025-06-10',
    deadline: '2025-07-10',
  },
];

function getDaysRemaining(deadline: string): number {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const difference = deadlineDate.getTime() - today.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
}

export function ActiveVacancies({ vacancies }: { vacancies: IActiveVacancy[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Vacantes Activas</CardTitle>
          <CardDescription>
            Vacantes publicadas actualmente
          </CardDescription>
        </div>
        <Button size="sm" variant="outline">Crear Vacante</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vacancies.map((vacancy) => {
            const daysRemaining = getDaysRemaining(vacancy.due_date.toString());
            const isUrgent = daysRemaining <= 7;
            
            return (
              <div
                key={vacancy.uuid}
                className="rounded-lg border p-3 text-sm transition-all hover:bg-accent"
              >
                <div className="flex items-center justify-between">
                  <div className="font-medium">{vacancy.name}</div>
                  <div className="flex items-center space-x-1">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {vacancy.total_candidates} candidatos
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <span>{vacancy.department}</span>
                    <span className="mx-2">•</span>
                    <span>{vacancy.country}</span>
                  </div>
                  <div 
                    className={`${isUrgent ? 'text-destructive' : 'text-muted-foreground'}`}
                  >
                    {daysRemaining > 0 
                      ? `${daysRemaining} días restantes` 
                      : 'Expirada'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}