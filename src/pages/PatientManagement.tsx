import { useState } from "react";
import { PatientList } from "@/components/patients/PatientList";
import { PatientProfile } from "@/components/patients/PatientProfile";

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

export default function PatientManagement() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="p-6">
      {selectedPatient ? (
        <PatientProfile
          patient={selectedPatient}
          onBack={() => setSelectedPatient(null)}
        />
      ) : (
        <div>
          <h1 className="text-2xl font-semibold mb-6">Patient Management</h1>
          <PatientList onPatientSelect={setSelectedPatient} />
        </div>
      )}
    </div>
  );
}