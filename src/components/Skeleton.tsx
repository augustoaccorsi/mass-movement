import React from 'react';

export function Skeleton({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`animate-pulse rounded bg-slate-200 dark:bg-slate-700 ${className}`} style={style} />
  );
}

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 my-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 shadow-sm">
          <Skeleton className="h-3 w-24 mb-3" />
          <Skeleton className="h-7 w-16 mb-2" />
          <Skeleton className="h-2.5 w-32" />
        </div>
      ))}
    </div>
  );
}

export function ChartCardSkeleton({ barCount = 6, donut = false }: { barCount?: number; donut?: boolean }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 sm:p-5 shadow-sm min-w-0">
      <Skeleton className="h-3 w-40 mb-5" />
      {donut ? (
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="w-40 h-40 rounded-full" />
          <div className="flex gap-3 flex-wrap justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-2.5 w-20" />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: barCount }).map((_, i) => (
            <Skeleton key={i} className="h-5" style={{ width: `${55 + Math.sin(i) * 30}%` }} />
          ))}
        </div>
      )}
    </div>
  );
}

export function SectionSkeleton() {
  return (
    <div className="my-6 sm:my-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 rounded bg-slate-200 dark:bg-slate-700" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ChartCardSkeleton barCount={5} />
        <ChartCardSkeleton donut />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <StatsCardsSkeleton />
      <div className="my-6 sm:my-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-5 rounded bg-slate-200 dark:bg-slate-700" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-3 w-80 mb-4" />
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
          <div className="flex gap-4 mb-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-16" />
            ))}
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-4 py-2 border-t border-slate-100 dark:border-slate-800">
              {Array.from({ length: 10 }).map((_, j) => (
                <Skeleton key={j} className="h-3" style={{ width: `${40 + Math.sin(i + j) * 20}px` }} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <SectionSkeleton />
      <SectionSkeleton />
    </>
  );
}
