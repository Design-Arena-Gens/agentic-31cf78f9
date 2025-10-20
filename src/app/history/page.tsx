import { Sidebar } from "@/components/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const jobs = [
  {
    id: 1,
    type: "Audiobook",
    name: "The Great Gatsby",
    status: "Completed",
    createdAt: "2023-10-26",
  },
  {
    id: 2,
    type: "Podcast",
    name: "AI News Weekly",
    status: "Processing",
    createdAt: "2023-10-27",
  },
  {
    id: 3,
    type: "Audiobook",
    name: "Dune",
    status: "Failed",
    createdAt: "2023-10-27",
  },
];

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-serif font-bold mb-4">Job History</h1>
        <Table>
          <TableCaption>A list of your recent jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Job ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.type}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      job.status === "Completed"
                        ? "default"
                        : job.status === "Processing"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>{job.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
