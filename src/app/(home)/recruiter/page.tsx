"use client";

import { ActiveVacancies } from '@/components/common/dashboard/active-vacancies';
import { OverviewChart } from '@/components/common/dashboard/overview-chart';
import { RecentCandidates } from '@/components/common/dashboard/recent-candidates';
import { StatsCard } from '@/components/common/dashboard/stats-card';
import { TimeToHire } from '@/components/common/dashboard/time-to-hire';
import { useGetAllDashboardDetail } from '@/hooks/api/recruiter.hook';
import { Briefcase, Calendar, CheckCircle, Users } from 'lucide-react';

export default function Recruiter() {
  const { data: dashboardData, refetch: refetchDashboard } = useGetAllDashboardDetail();

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Vacantes Activas"
          value={dashboardData?.dashboardResume.total_active_vacancies.toString() || '0'}
          icon={Briefcase}
          description="mes anterior"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Candidatos Nuevos"
          value={dashboardData?.dashboardResume.total_recent_candidates.toString() || '0'}
          icon={Users}
          description="mes anterior"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Entrevistas Programadas"
          value={dashboardData?.dashboardResume.total_interviews.toString() || '0'}
          icon={Calendar}
          description="esta semana"
        />
        <StatsCard
          title="Contrataciones"
          value={dashboardData?.dashboardResume.total_hired.toString() || '0'}
          icon={CheckCircle}
          description="mes actual"
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <OverviewChart dashboard={dashboardData} />
        <TimeToHire />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <RecentCandidates candidates={dashboardData?.recentCandidates || []} />
        <ActiveVacancies vacancies={dashboardData?.activeVacancies || []} refetchDashboard={refetchDashboard} />
      </div>
    </main>
  );
}