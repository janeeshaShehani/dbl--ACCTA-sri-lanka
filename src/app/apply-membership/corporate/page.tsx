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

export default function CorporateApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<CorporateApplication>({
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
  });

  const updateData = (data: Partial<CorporateApplication>) => {
    setFormData((previous) => ({
      ...previous,
      ...data,
    }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((previous) => previous + 1);
    } else {
      console.log("Corporate application submitted:", formData);
      alert("Your corporate application is ready to be submitted.");
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

            {/* Step 7 - Documents */}
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

            {/* Step 9 - Fees */}
            {currentStep === 9 && <CorporateFeesStep data={formData} />}
          </div>

          <FormNavigation
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
          />
        </div>
      </div>
    </main>
  );
}