import { useState } from "react";
import { Search, Calendar, Filter, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Patient {
  id: string;
  name: string;
  hospitalId: string;
  abhaId: string;
  lastVisit: string;
  lastDiagnosis: string;
  status: "active" | "discharged";
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    hospitalId: "HSP-2024-001",
    abhaId: "14-1234-5678-9012",
    lastVisit: "2024-01-15",
    lastDiagnosis: "Hypertension",
    status: "active",
    age: 45,
    gender: "Male",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    address: "123 MG Road, Bangalore, Karnataka 560001",
    dateOfBirth: "1979-03-15"
  },
  {
    id: "2",
    name: "Priya Sharma",
    hospitalId: "HSP-2024-002",
    abhaId: "14-2345-6789-0123",
    lastVisit: "2024-01-14",
    lastDiagnosis: "Diabetes Type 2",
    status: "active",
    age: 38,
    gender: "Female",
    phone: "+91 87654 32109",
    email: "priya.sharma@email.com",
    address: "456 Brigade Road, Bangalore, Karnataka 560002",
    dateOfBirth: "1986-07-22"
  },
  {
    id: "3",
    name: "Anil Patel",
    hospitalId: "HSP-2024-003",
    abhaId: "14-3456-7890-1234",
    lastVisit: "2024-01-10",
    lastDiagnosis: "Asthma",
    status: "discharged",
    age: 52,
    gender: "Male",
    phone: "+91 76543 21098",
    email: "anil.patel@email.com",
    address: "789 Commercial Street, Bangalore, Karnataka 560003",
    dateOfBirth: "1972-11-08"
  }
];

interface PatientListProps {
  onPatientSelect: (patient: Patient) => void;
}

export function PatientList({ onPatientSelect }: PatientListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.abhaId.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Patient Name or ABHA ID..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Date Range
              </label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="discharged">Discharged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest Visit</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="abha">ABHA ID</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full mt-4">
              Apply Filters
            </Button>
          </CardContent>
        </Card>

        {/* Patient List */}
        <div className="lg:col-span-3 space-y-4">
          {filteredPatients.map((patient) => (
            <Card
              key={patient.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-1"
              onClick={() => onPatientSelect(patient)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{patient.name}</h3>
                      <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                        {patient.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {patient.hospitalId}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {patient.abhaId}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}
                      </div>
                      <div className="text-foreground">
                        Last Diagnosis: <span className="font-medium">{patient.lastDiagnosis}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}