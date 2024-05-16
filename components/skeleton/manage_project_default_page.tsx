import { Skeleton } from "@/components/ui/skeleton";

export default function ManageProjectDefaultPageSkeleton() {
    return (
        <div>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Manage</h1>
        </div>
        <div className="mx-auto grid h-full w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="h-full bg-secondary rounded-md" x-chunk="dashboard-04-chunk-0">
            <div className="sm:flex sm:flex-row sm:justify-center sm:items-center sm: sm:gap-1 text-sm text-muted-foreground flex flex-wrap px-2 py-2 w-full justify-between overflow-hidden">
                <Skeleton className="sm:rounded-b-none w-[100px] h-[40px] rounded sm:w-[220px]" />
                <Skeleton className="sm:rounded-b-none w-[100px] h-[40px] rounded sm:w-[220px]" />
                <Skeleton className="sm:rounded-b-none w-[100px] h-[40px] rounded sm:w-[220px]" />
            </div>
          </nav>
          <div className="grid gap-6 w-full h-full">
            <Skeleton className="sm:rounded-b-none w-full h-[400px] rounded" />
          </div>
        </div>
      </main>
    </div>
    )
}