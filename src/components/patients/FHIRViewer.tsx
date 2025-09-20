import { useState } from "react";
import { ArrowLeft, Copy, CheckCircle, Clock, Send, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface FHIRViewerProps {
  encounter: {
    id: string;
    date: string;
    time: string;
    doctor: string;
    diagnosis: string;
    fhirVersions: string[];
  };
  patient: {
    name: string;
    hospitalId: string;
    abhaId: string;
  };
  onBack: () => void;
}

export function FHIRViewer({ encounter, patient, onBack }: FHIRViewerProps) {
  const [activeVersion, setActiveVersion] = useState("v3");
  const [isValidated, setIsValidated] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [isRequestingConsent, setIsRequestingConsent] = useState(false);
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const mockFHIRBundle = {
    resourceType: "Bundle",
    id: `bundle-${encounter.id}`,
    meta: {
      lastUpdated: encounter.date + "T" + encounter.time + ":00Z",
      profile: ["http://hl7.org/fhir/StructureDefinition/Bundle"]
    },
    identifier: {
      system: "urn:ietf:rfc:3986",
      value: `urn:uuid:${encounter.id}`
    },
    type: "document",
    timestamp: encounter.date + "T" + encounter.time + ":00Z",
    entry: [
      {
        fullUrl: `urn:uuid:composition-${encounter.id}`,
        resource: {
          resourceType: "Composition",
          id: `composition-${encounter.id}`,
          status: "final",
          type: {
            coding: [{
              system: "http://loinc.org",
              code: "11488-4",
              display: "Consult note"
            }]
          },
          subject: {
            reference: `Patient/${patient.abhaId}`,
            display: patient.name
          },
          encounter: {
            reference: `Encounter/${encounter.id}`
          },
          date: encounter.date + "T" + encounter.time + ":00Z",
          author: [{
            reference: `Practitioner/dr-sarah-johnson`,
            display: encounter.doctor
          }],
          title: "Clinical Encounter Note",
          section: [{
            title: "Assessment and Plan",
            text: {
              status: "generated",
              div: `<div xmlns=\"http://www.w3.org/1999/xhtml\">${encounter.diagnosis}</div>`
            }
          }]
        }
      },
      {
        fullUrl: `urn:uuid:patient-${patient.abhaId}`,
        resource: {
          resourceType: "Patient",
          id: patient.abhaId,
          identifier: [
            {
              system: "https://healthid.ndhm.gov.in",
              value: patient.abhaId
            },
            {
              system: "http://hospital.example.com",
              value: patient.hospitalId
            }
          ],
          name: [{
            use: "official",
            text: patient.name
          }],
          active: true
        }
      },
      {
        fullUrl: `urn:uuid:encounter-${encounter.id}`,
        resource: {
          resourceType: "Encounter",
          id: encounter.id,
          status: "finished",
          class: {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "ambulatory"
          },
          subject: {
            reference: `Patient/${patient.abhaId}`
          },
          period: {
            start: encounter.date + "T" + encounter.time + ":00Z",
            end: encounter.date + "T" + encounter.time + ":30Z"
          },
          reasonCode: [{
            text: encounter.diagnosis
          }]
        }
      }
    ]
  };

  const handleValidateFHIR = () => {
    setIsValidated(true);
    toast({
      title: "FHIR Validated ✅",
      description: "FHIR Bundle has been successfully validated against HL7 standards.",
    });
  };

  const handleRequestConsent = () => {
    setIsRequestingConsent(true);
    setShowConsentDialog(true);
    
    // Simulate consent process
    setTimeout(() => {
      setIsRequestingConsent(false);
      setHasConsent(true);
      setShowConsentDialog(false);
      toast({
        title: "Consent Granted ✅",
        description: "Patient has granted consent for data sharing.",
      });
    }, 3000);
  };

  const handleSendToServer = () => {
    setIsSending(true);
    
    // Simulate sending to server
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: "FHIR Bundle Sent 🎉",
        description: "FHIR Bundle has been successfully sent to the server.",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(mockFHIRBundle, null, 2));
    toast({
      title: "Copied to clipboard",
      description: "FHIR Bundle has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">FHIR Bundle - Version History</h1>
            <p className="text-muted-foreground">
              {patient.name} • {encounter.date} • {encounter.diagnosis}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Version Tabs */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">FHIR Versions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs orientation="vertical" value={activeVersion} onValueChange={setActiveVersion}>
              <TabsList className="grid grid-cols-1 w-full h-auto space-y-2">
                {encounter.fhirVersions.map((version) => (
                  <TabsTrigger
                    key={version}
                    value={version}
                    className="w-full justify-start data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{version.toUpperCase()}</span>
                      {version === activeVersion && (
                        <Badge variant="secondary" className="ml-2">Current</Badge>
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button
                onClick={handleValidateFHIR}
                disabled={isValidated}
                className="w-full"
                variant={isValidated ? "secondary" : "default"}
              >
                {isValidated ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    FHIR Validated
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Validate FHIR
                  </>
                )}
              </Button>

              <Button
                onClick={handleRequestConsent}
                disabled={!isValidated || hasConsent || isRequestingConsent}
                className="w-full"
                variant={hasConsent ? "secondary" : "default"}
              >
                {isRequestingConsent ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Requesting...
                  </>
                ) : hasConsent ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Consent Granted
                  </>
                ) : (
                  "Request Consent"
                )}
              </Button>

              <Button
                onClick={handleSendToServer}
                disabled={!isValidated || !hasConsent || isSending}
                className="w-full"
                variant="default"
              >
                {isSending ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send to Server
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FHIR Bundle Display */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">FHIR Bundle JSON</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 max-h-[600px] overflow-auto">
              <pre className="text-xs font-mono text-foreground whitespace-pre-wrap">
                {JSON.stringify(mockFHIRBundle, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consent Dialog */}
      <Dialog open={showConsentDialog} onOpenChange={setShowConsentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Requesting Patient Consent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 animate-spin text-primary" />
              <div>
                <p className="font-medium">Consent request sent</p>
                <p className="text-sm text-muted-foreground">
                  Waiting for patient response...
                </p>
              </div>
            </div>
            <div className="bg-muted p-3 rounded-lg text-sm">
              <p>Patient {patient.name} will receive a notification to approve data sharing for this FHIR bundle.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}