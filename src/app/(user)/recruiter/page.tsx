"use client";

import { Briefcase, Calendar, CheckCircle, Users } from 'lucide-react';

import { ActiveVacancies } from '@/components/common/dashboard/active-vacancies';
import { OverviewChart } from '@/components/common/dashboard/overview-chart';
import { RecentCandidates } from '@/components/common/dashboard/recent-candidates';
import { StatsCard } from '@/components/common/dashboard/stats-card';
import { TimeToHire } from '@/components/common/dashboard/time-to-hire';
import { useGetAllDashboardDetail } from '@/hooks/api/recruiter.hook';

export default function RecruiterDashboard() {
  const { data: dashboardData, refetch: refetchDashboard } = useGetAllDashboardDetail();

  const resume = dashboardData?.dashboardResume;

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <span className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Vacancies"
          value={resume?.total_active_vacancies?.toString() || '0'}
          icon={Briefcase}
          description="last month"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="New Candidates"
          value={resume?.total_recent_candidates?.toString() || '0'}
          icon={Users}
          description="last month"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Scheduled Interviews"
          value={resume?.total_interviews?.toString() || '0'}
          icon={Calendar}
          description="this week"
        />
        <StatsCard
          title="Hires"
          value={resume?.total_hired?.toString() || '0'}
          icon={CheckCircle}
          description="current month"
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <OverviewChart dashboard={dashboardData} />
        <TimeToHire />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <RecentCandidates candidates={dashboardData?.recentCandidates || []} />
        <ActiveVacancies
          vacancies={dashboardData?.activeVacancies || []}
          refetchDashboard={refetchDashboard}
        />
      </div>
    </main>
  );
}
