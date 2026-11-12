"use client";

import { useState } from "react";

import ApplicationProgress from "@/components/applications/ApplicationProgress";
import FormNavigation from "@/components/applications/FormNavigation";

import CorporateMembershipStep from "@/components/applications/corporate/CorporateMembershipStep";
import EntityDetailsStep from "@/components/applications/corporate/EntityDetailsStep";
import DirectorsStep from "@/components/applications/corporate/DirectorsStep";
import ServicesStep from "@/components/applications/corporate/ServicesStep";
import RepresentativesStep from "@/components/applications/corporate/RepresentativesStep";
import CorporateFitProperStep from "@/components/applications/corporate/CorporateFitProperStep";
import CorporateDocumentsStep from "@/components/applications/corporate/CorporateDocumentsStep";
import CorporateDeclarationStep from "@/components/applications/corporate/CorporateDeclarationStep";
import CorporateFeesStep from "@/components/applications/corporate/CorporateFeesStep";

import type { CorporateApplication } from "@/types/application";

const TOTAL_STEPS = 9;

const initialFormData: CorporateApplication = {
  // Step 1 - Membership Applied For
  membershipCategory: "",
  otherLegalEntity: "",
  residency: "sri-lanka",
  country: "",

  // Step 2 - Entity Details
  registeredName: "",
  tradingName: "",
  legalForm: "",
  registrationNumber: "",
  registrationDate: "",
  registrationCountry: "",
  tinNumber: "",
  vatNumber: "",
  registeredAddress: "",
  tradingAddress: "",
  website: "",
  staffCount: "",

  // Corporate Contact Details
  officePhone: "",
  officialEmail: "",

  // Step 3 - Directors & Shareholders
  directors: "",
  shareholders: "",
  parentFirm: "",

  // Step 4 - Services & Experience
  services: "",
  yearsInTaxation: "",
  registrations: "",
  clientProfile: "",
  firmProfile: "",

  // Step 5 - Company Representatives
  nominatedRepresentative: "",
  nominatedEmail: "",
  nominatedPhone: "",
  alternateRepresentative: "",
  alternateEmail: "",
  alternatePhone: "",

  // Step 6 - Fit & Proper
  fitAndProperAnswers: {},
  fitAndProperDetails: "",

  // Step 7 - Supporting Documents
  documents: {},

  // Step 8 - Declaration
  signatoryOne: "",
  signatoryTwo: "",
  resolutionDate: "",
  declarationAccepted: false,

  // Step 9 - Fees & Payment
  totalAmountPaid: "",
  paymentMethod: "",
  paymentReference: "",
  paymentDate: "",
};

export default function CorporateApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] =
    useState<CorporateApplication>(initialFormData);

  const updateData = (data: Partial<CorporateApplication>) => {
    setFormData((previous) => ({
      ...previous,
      ...data,
    }));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      // Step 1 - Membership Category & Residency
      case 1:
        return (
          formData.membershipCategory.trim() !== "" &&
          (formData.membershipCategory !== "other" ||
            formData.otherLegalEntity.trim() !== "") &&
          (formData.residency === "sri-lanka" ||
            formData.country.trim() !== "")
        );

      // Step 2 - Entity Details
      case 2:
        return (
          formData.registeredName.trim() !== "" &&
          formData.legalForm.trim() !== "" &&
          formData.registrationNumber.trim() !== "" &&
          formData.registeredAddress.trim() !== ""
        );

      // Step 3 - Directors & Shareholders
      case 3:
        return formData.directors.trim() !== "";

      // Step 4 - Services & Experience
      case 4:
        return (
          formData.services.trim() !== "" &&
          formData.yearsInTaxation.trim() !== ""
        );

      // Step 5 - Representatives
      case 5:
        return (
          formData.nominatedRepresentative.trim() !== "" &&
          formData.nominatedEmail.trim() !== ""
        );

      // Step 6 - Fit & Proper
      case 6: {
        const answers = Object.values(formData.fitAndProperAnswers);

        return (
          answers.length > 0 &&
          answers.every(
            (answer) => answer === "yes" || answer === "no"
          ) &&
          formData.fitAndProperDetails.trim() !== ""
        );
      }

      // Step 7 - Supporting Documents
      case 7:
        return (
          formData.documents.incorporation instanceof File &&
          formData.documents.directors instanceof File &&
          formData.documents.boardResolution instanceof File &&
          formData.documents.companyProfile instanceof File &&
          formData.documents.taxationEvidence instanceof File &&
          formData.documents.irdRegistration instanceof File &&
          formData.documents.representativeMembership instanceof File &&
          formData.documents.identityDocuments instanceof File &&
          formData.documents.auditedStatements instanceof File &&
          formData.documents.paymentProof instanceof File
        );

      // Step 8 - Declaration
      case 8:
        return (
          formData.signatoryOne.trim() !== "" &&
          formData.signatoryTwo.trim() !== "" &&
          formData.resolutionDate !== "" &&
          formData.declarationAccepted
        );

      // Step 9 - Fees & Payment
      case 9:
        return (
          formData.totalAmountPaid.trim() !== "" &&
          formData.paymentMethod.trim() !== "" &&
          formData.paymentReference.trim() !== "" &&
          formData.paymentDate !== ""
        );

      default:
        return true;
    }
  };

  const handleNext = async () => {
  if (!validateCurrentStep()) {
    alert("Please complete all required fields before continuing.");
    return;
  }

  // Move to the next step
  if (currentStep < TOTAL_STEPS) {
    setCurrentStep((previous) => previous + 1);
    return;
  }

  try {
    setIsSubmitting(true);

    // Create one unique ID for this application.
    // The same ID will be used for the application and its documents.
    const applicationId = crypto.randomUUID();

    // --------------------------------------------
    // STEP 1: Upload corporate documents
    // --------------------------------------------
    const uploadFormData = new FormData();

    uploadFormData.append("applicationId", applicationId);

    // Send both the file and its document type
    Object.entries(formData.documents).forEach(
      ([documentType, file]) => {
        if (file instanceof File) {
          uploadFormData.append("files", file);
          uploadFormData.append("documentTypes", documentType);
        }
      }
    );

    const uploadResponse = await fetch(
      "/api/upload-corporate-documents",
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    const uploadResult = await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(
        uploadResult.error ||
          "Unable to upload corporate application documents."
      );
    }

    // --------------------------------------------
    // STEP 2: Organize uploaded document details
    // --------------------------------------------
    const uploadedDocuments = Object.fromEntries(
      uploadResult.files.map(
        (file: {
          documentType: string;
          name: string;
          path: string;
        }) => [
          file.documentType,
          {
            name: file.name,
            path: file.path,
          },
        ]
      )
    );

    // --------------------------------------------
    // STEP 3: Prepare application data
    // --------------------------------------------
    const applicationData = {
      ...formData,
      id: applicationId,
      documents: uploadedDocuments,
    };

    // --------------------------------------------
    // STEP 4: Save the application
    // --------------------------------------------
    const response = await fetch(
      "/api/apply-membership-applications",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "corporate",
          application: applicationData,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error ||
          "Unable to submit the corporate application."
      );
    }

    console.log("Corporate application submitted:", result);
    console.log(
      "Corporate documents uploaded:",
      uploadResult.files
    );

    alert("Corporate application submitted successfully!");

    // Reset the form after successful submission
    setFormData({ ...initialFormData });
    setCurrentStep(1);
  } catch (error) {
    console.error("Submission error:", error);

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong while submitting the application."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  return (
    <main className="min-h-screen bg-accta-surface py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-lg bg-white p-6 shadow-sm sm:p-10">
          <ApplicationProgress
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />

          <div className="mt-8">
            {currentStep === 1 && (
              <CorporateMembershipStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 2 && (
              <EntityDetailsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 3 && (
              <DirectorsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 4 && (
              <ServicesStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 5 && (
              <RepresentativesStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 6 && (
              <CorporateFitProperStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 7 && (
              <CorporateDocumentsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 8 && (
              <CorporateDeclarationStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 9 && (
              <CorporateFeesStep
                data={formData}
                updateData={updateData}
              />
            )}
          </div>

          <FormNavigation
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
          />

          {isSubmitting && (
            <p className="mt-4 text-center text-sm text-accta-muted">
              Submitting your application and uploading documents...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}