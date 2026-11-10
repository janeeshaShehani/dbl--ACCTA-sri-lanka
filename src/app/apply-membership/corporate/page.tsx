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
  // Step 1 - Category & Residency
  membershipCategory: "",
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

  // Step 5 - Representatives
  nominatedRepresentative: "",
  nominatedEmail: "",
  nominatedPhone: "",
  alternateRepresentative: "",
  alternateEmail: "",
  alternatePhone: "",

  // Step 6 - Fit & Proper
  fitAndProperDetails: "",

  // Step 7 - Documents
  documents: {},

  // Step 8 - Declaration
  signatoryOne: "",
  signatoryTwo: "",
  resolutionDate: "",
  declarationAccepted: false,
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

  // Validate each step before continuing
  const validateCurrentStep = () => {
    switch (currentStep) {
      // Step 1 - Membership Category & Residency
      case 1:
        return (
          formData.membershipCategory.trim() !== "" &&
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
      // Phone numbers are not currently required.
      case 5:
        return (
          formData.nominatedRepresentative.trim() !== "" &&
          formData.nominatedEmail.trim() !== ""
        );

      // Step 6 - Fit & Proper
      case 6:
        return formData.fitAndProperDetails.trim() !== "";

      // Step 7 - Supporting Documents
      // Requires all documents currently shown in CorporateDocumentsStep.
      case 7:
        return (
          formData.documents.registration instanceof File &&
          formData.documents.tin instanceof File &&
          formData.documents.directors instanceof File &&
          formData.documents.profile instanceof File
        );

      // Step 8 - Declaration
      case 8:
        return (
          formData.signatoryOne.trim() !== "" &&
          formData.signatoryTwo.trim() !== "" &&
          formData.resolutionDate !== "" &&
          formData.declarationAccepted
        );

      // Step 9 - Fees & Submission
      default:
        return true;
    }
  };

  const handleNext = async () => {
    // Validate before moving to the next step
    if (!validateCurrentStep()) {
      alert("Please complete all required fields before continuing.");
      return;
    }

    // Move to the next step
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((previous) => previous + 1);
      return;
    }

    // Submit the application on Step 9
    try {
      setIsSubmitting(true);

      // JSON cannot store File objects directly.
      // Save selected document names for now.
      const documentNames = Object.fromEntries(
        Object.entries(formData.documents).map(([key, file]) => [
          key,
          file?.name || null,
        ])
      );

      const applicationData = {
        ...formData,
        documents: documentNames,
      };

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
          result.error || "Unable to submit the corporate application."
        );
      }

      console.log("Corporate application submitted:", result);

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
            {/* Step 1 - Corporate Membership */}
            {currentStep === 1 && (
              <CorporateMembershipStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 2 - Entity Details */}
            {currentStep === 2 && (
              <EntityDetailsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 3 - Directors & Shareholders */}
            {currentStep === 3 && (
              <DirectorsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 4 - Services & Experience */}
            {currentStep === 4 && (
              <ServicesStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 5 - Representatives */}
            {currentStep === 5 && (
              <RepresentativesStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 6 - Fit & Proper */}
            {currentStep === 6 && (
              <CorporateFitProperStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 7 - Supporting Documents */}
            {currentStep === 7 && (
              <CorporateDocumentsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 8 - Declaration */}
            {currentStep === 8 && (
              <CorporateDeclarationStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 9 - Fees and Submission */}
            {currentStep === 9 && (
              <CorporateFeesStep data={formData} />
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
              Submitting your application...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}