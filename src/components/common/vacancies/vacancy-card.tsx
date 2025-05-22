import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, FileEdit, MoreVertical, Trash2, Users } from 'lucide-react';
import { IJobPosition } from '@/providers/http/job-positions/interface';
import { StatusEnum } from '@/enums/common.enum';

interface VacancyCardProps {
  vacancy: IJobPosition;
}

function getDaysRemaining(deadline: Date): number {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const difference = deadlineDate.getTime() - today.getTime();
  return Math.ceil(difference / (1000 * 3600 * 24));
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const daysRemaining = getDaysRemaining(vacancy.due_date);
  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;
  const isExpired = daysRemaining <= 0;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <div className="absolute right-2 top-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileEdit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold line-clamp-2">{vacancy.name}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="bg-primary/10">
              {vacancy.recruiter.institution.name}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {vacancy.country.name}
            </Badge>
            <Badge variant="outline" className="bg-primary/10">
              {vacancy.contract_type}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
            {vacancy.description}
          </p>
        </div>
        
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Salario:</span>
            <span>{`$${vacancy.minimum_salary} - $${vacancy.maximum_salary} USD`}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Aplicantes:</span>
            <div className="flex items-center">
              <Users className="mr-1 h-3.5 w-3.5" />
              <span>{vacancy.total_applied}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Fecha límite:</span>
            <span className={isUrgent && !isExpired ? 'text-destructive font-medium' : isExpired ? 'text-destructive/70' : ''}>
              {isExpired ? 'Expirada' : new Date(vacancy.due_date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Publicada: {new Date(vacancy.date_posted).toLocaleDateString()}
        </div>
        
        <Badge
          variant={vacancy.status === StatusEnum.ACTIVE ? 'default' : 'secondary'}
        >
          {vacancy.status === StatusEnum.ACTIVE ? 'Active' : 'Closed'}
        </Badge>
      </CardFooter>
    </Card>
  );
}