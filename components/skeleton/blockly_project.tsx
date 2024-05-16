import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function BlocklyProjectSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-4 md:flex-row h-full">
        <div className="h-full sm:hidden block">
        <div className="flex flex-col gap-4 h-full">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex space-x-2">
            <Skeleton className="h-1/2 w-1/2 " />
            <Skeleton className="h-1/2 w-1/2" />
          </div>
        </div>
      </div>
        <div className="md:w-2/3 h-full">
            <div className="flex gap-2 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="grid gap-4 h-full">
            <div className="grid gap-2 h-full">
                <Skeleton className="h-60 w-full" />
            </div>
            </div>
        </div>
        <div className="h-full sm:block hidden">
            <div className="flex flex-col gap-4 h-full">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Tabs className="w-full flex-1" defaultValue="tab1">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tab1">
                    <Skeleton className="h-8 w-full" />
                </TabsTrigger>
                <TabsTrigger value="tab2">
                    <Skeleton className="h-8 w-full" />
                </TabsTrigger>
                </TabsList>
                <TabsContent className="flex-1" value="tab1">
                <Skeleton className="h-full w-full" />
                </TabsContent>
                <TabsContent className="flex-1" value="tab2">
                <Skeleton className="h-full w-full" />
                </TabsContent>
            </Tabs>
            </div>
        </div>
        </div>
    );
}