import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Calendar, Search, Download, Filter, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:25",
    user: "Dr. Sarah Wilson",
    action: "Created",
    resourceType: "Patient",
    resourceId: "HSP-2024-001",
    outcome: "Success",
    details: "New patient John Doe registered"
  },
  {
    id: "2", 
    timestamp: "2024-01-15 13:45:12",
    user: "Nurse Mary Johnson",
    action: "Viewed",
    resourceType: "Lab Report",
    resourceId: "LAB-2024-089",
    outcome: "Success",
    details: "Blood test results accessed"
  },
  {
    id: "3",
    timestamp: "2024-01-15 12:20:08",
    user: "Dr. Michael Chen",
    action: "Edited",
    resourceType: "Encounter",
    resourceId: "ENC-2024-156",
    outcome: "Success",
    details: "Updated diagnosis information"
  },
  {
    id: "4",
    timestamp: "2024-01-15 11:15:33",
    user: "Admin Kate Brown",
    action: "Deleted",
    resourceType: "FHIR Bundle",
    resourceId: "FHIR-2024-023",
    outcome: "Failed",
    details: "Bundle deletion failed - referenced by active encounter"
  },
  {
    id: "5",
    timestamp: "2024-01-15 10:30:45",
    user: "Dr. James Taylor",
    action: "Viewed",
    resourceType: "Patient",
    resourceId: "HSP-2024-002",
    outcome: "Success",
    details: "Patient profile accessed"
  }
];

// Mock data for charts
const actionTypeData = [
  { name: "Viewed", value: 45, color: "#3b82f6" },
  { name: "Created", value: 22, color: "#22c55e" },
  { name: "Edited", value: 20, color: "#f97316" },
  { name: "Deleted", value: 13, color: "#ef4444" }
];

const dailyActivityData = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 19 },
  { day: "Wed", count: 8 },
  { day: "Thu", count: 15 },
  { day: "Fri", count: 22 },
  { day: "Sat", count: 6 },
  { day: "Sun", count: 4 }
];

const getActionBadgeVariant = (action: string) => {
  switch (action) {
    case "Created": return "default";
    case "Viewed": return "secondary"; 
    case "Edited": return "outline";
    case "Deleted": return "destructive";
    default: return "secondary";
  }
};

const getOutcomeIcon = (outcome: string) => {
  return outcome === "Success" ? "✅" : "❌";
};

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("7");
  const [actionType, setActionType] = useState("all");
  const [resourceType, setResourceType] = useState("all");
  const [outcome, setOutcome] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDateRange("7");
    setActionType("all");
    setResourceType("all");
    setOutcome("all");
    setCurrentPage(1);
  };

  const handleExportLogs = () => {
    // Mock export functionality
    const csv = mockAuditLogs.map(log => 
      `${log.timestamp},${log.user},${log.action},${log.resourceType},${log.resourceId},${log.outcome}`
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-logs.csv';
    a.click();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Audit Logs</h1>
        <Button onClick={handleExportLogs} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Summary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={actionTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {actionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {actionTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daily Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyActivityData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            {/* Search Bar */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Doctor, Staff, Patient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-end">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-32">
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Today</SelectItem>
                    <SelectItem value="7">Last 7 Days</SelectItem>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Action</label>
                <Select value={actionType} onValueChange={setActionType}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="add">Add</SelectItem>
                    <SelectItem value="edit">Edit</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Resource</label>
                <Select value={resourceType} onValueChange={setResourceType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="encounter">Encounter</SelectItem>
                    <SelectItem value="lab">Lab Report</SelectItem>
                    <SelectItem value="fhir">FHIR Bundle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Outcome</label>
                <Select value={outcome} onValueChange={setOutcome}>
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button className="gap-2">
                  <Filter className="h-4 w-4" />
                  Apply Filters
                </Button>
                <Button variant="outline" onClick={handleResetFilters} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Audit Trail</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Date & Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource Type</TableHead>
                  <TableHead>Resource ID</TableHead>
                  <TableHead>Outcome</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAuditLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell className="font-medium">
                      {log.user}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getActionBadgeVariant(log.action)}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {log.resourceType}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      <span 
                        className="cursor-pointer hover:text-primary transition-colors"
                        title={log.details}
                      >
                        {log.resourceId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getOutcomeIcon(log.outcome)}</span>
                        <span className={log.outcome === "Success" ? "text-success" : "text-destructive"}>
                          {log.outcome}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}