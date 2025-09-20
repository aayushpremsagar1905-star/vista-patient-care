import { useState } from "react";
import { ArrowLeft, Edit, User, Phone, Mail, MapPin, Calendar, FileText, Activity, Clipboard, TestTube, Heart, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FHIRViewer } from "./FHIRViewer";

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

interface PatientProfileProps {
  patient: Patient;
  onBack: () => void;
}

export function PatientProfile({ patient, onBack }: PatientProfileProps) {
  const [showFHIRViewer, setShowFHIRViewer] = useState(false);
  const [selectedEncounter, setSelectedEncounter] = useState<any>(null);

  const encounters = [
    {
      id: "enc-001",
      date: "2024-01-15",
      time: "14:30",
      doctor: "Dr. Sarah Johnson",
      diagnosis: "Hypertension",
      fhirVersions: ["v1", "v2", "v3"]
    },
    {
      id: "enc-002", 
      date: "2024-01-10",
      time: "10:15",
      doctor: "Dr. Michael Chen",
      diagnosis: "Routine Checkup",
      fhirVersions: ["v1", "v2"]
    }
  ];

  const labReports = [
    {
      id: "lab-001",
      testName: "Complete Blood Count",
      loinc: "58410-2",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "lab-002",
      testName: "Lipid Panel",
      loinc: "57698-3",
      date: "2024-01-14",
      status: "pending"
    }
  ];

  const vitals = [
    { date: "2024-01-15", bp: "140/90", hr: "72", weight: "75" },
    { date: "2024-01-10", bp: "138/88", hr: "75", weight: "76" },
    { date: "2024-01-05", bp: "142/92", hr: "70", weight: "75" }
  ];

  const clinicalNotes = [
    {
      id: "note-001",
      date: "2024-01-15",
      time: "14:45",
      author: "Dr. Sarah Johnson",
      note: "Patient presents with elevated blood pressure. Continuing current medication regimen. Follow-up in 2 weeks.",
      expanded: false
    },
    {
      id: "note-002",
      date: "2024-01-10", 
      time: "10:30",
      author: "Dr. Michael Chen",
      note: "Routine follow-up. Patient reports feeling well. Vital signs stable. Continue current treatment plan.",
      expanded: false
    }
  ];

  const attachments = [
    {
      id: "att-001",
      name: "Chest X-Ray Report",
      type: "PDF",
      date: "2024-01-15",
      size: "2.4 MB"
    },
    {
      id: "att-002",
      name: "ECG Results", 
      type: "PDF",
      date: "2024-01-14",
      size: "1.8 MB"
    }
  ];

  const handleViewFHIR = (encounter: any) => {
    setSelectedEncounter(encounter);
    setShowFHIRViewer(true);
  };

  if (showFHIRViewer && selectedEncounter) {
    return (
      <FHIRViewer
        encounter={selectedEncounter}
        patient={patient}
        onBack={() => setShowFHIRViewer(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Patient Profile</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Summary Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="bg-muted/50 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-primary">
                  <AvatarFallback className="text-primary-foreground font-semibold">
                    {patient.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{patient.name}</h2>
                  <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                    {patient.status}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Hospital ID</div>
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3 text-muted-foreground" />
                  {patient.hospitalId}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">ABHA ID</div>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 text-muted-foreground" />
                  {patient.abhaId}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Age</div>
                <div>{patient.age} years</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Gender</div>
                <div>{patient.gender}</div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Date of Birth</div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  {new Date(patient.dateOfBirth).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Phone</div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  {patient.phone}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Email</div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  {patient.email}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Address</div>
                <div className="flex items-start gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="text-xs leading-relaxed">{patient.address}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabbed Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="encounters" className="text-xs">Encounters</TabsTrigger>
              <TabsTrigger value="notes" className="text-xs">Clinical Notes</TabsTrigger>
              <TabsTrigger value="labs" className="text-xs">Lab Reports</TabsTrigger>
              <TabsTrigger value="vitals" className="text-xs">Vitals</TabsTrigger>
              <TabsTrigger value="attachments" className="text-xs">Attachments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Primary Complaint</h3>
                      <p className="text-muted-foreground">{patient.lastDiagnosis}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Last Encounter</h3>
                      <p className="text-muted-foreground">{new Date(patient.lastVisit).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Next Appointment</h3>
                      <p className="text-muted-foreground">Jan 29, 2024 - 2:30 PM</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Quick Stats</h3>
                      <div className="text-sm text-muted-foreground">
                        <div>Total Encounters: {encounters.length}</div>
                        <div>Lab Reports: {labReports.length}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="encounters">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Encounter History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {encounters.map((encounter) => (
                      <div key={encounter.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{encounter.date} - {encounter.time}</div>
                          <div className="text-sm text-muted-foreground">{encounter.doctor}</div>
                          <div className="text-sm">{encounter.diagnosis}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewFHIR(encounter)}
                        >
                          View FHIR Bundle
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Clinical Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clinicalNotes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">{note.date} - {note.time}</div>
                          <div className="text-sm text-muted-foreground">{note.author}</div>
                        </div>
                        <p className="text-sm">{note.note}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="labs">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Laboratory Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {labReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="font-medium">{report.testName}</div>
                          <div className="text-sm text-muted-foreground">LOINC: {report.loinc}</div>
                          <div className="text-sm">{report.date}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View/Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vitals">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Vital Signs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vitals.map((vital, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div>
                          <div className="text-sm text-muted-foreground">Date</div>
                          <div className="font-medium">{vital.date}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Blood Pressure</div>
                          <div className="font-medium">{vital.bp} mmHg</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Heart Rate</div>
                          <div className="font-medium">{vital.hr} bpm</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Weight</div>
                          <div className="font-medium">{vital.weight} kg</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attachments">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {attachments.map((attachment) => (
                      <div key={attachment.id} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{attachment.name}</div>
                            <div className="text-sm text-muted-foreground">{attachment.type} • {attachment.size}</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3">{attachment.date}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}