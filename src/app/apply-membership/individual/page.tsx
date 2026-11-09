"use client";

import { useEffect, useState } from "react";

import ApplicationProgress from "@/components/applications/ApplicationProgress";
import FormNavigation from "@/components/applications/FormNavigation";

import MembershipStep from "@/components/applications/individual/MembershipStep";
import PersonalDetailsStep from "@/components/applications/individual/PersonalDetailsStep";
import ContactDetailsStep from "@/components/applications/individual/ContactDetailsStep";
import QualificationsStep from "@/components/applications/individual/QualificationsStep";
import ExperienceStep from "@/components/applications/individual/ExperienceStep";
import FitProperStep from "@/components/applications/individual/FitProperStep";
import RefereesStep from "@/components/applications/individual/RefereesStep";
import DocumentsStep from "@/components/applications/individual/DocumentsStep";
import DeclarationStep from "@/components/applications/individual/DeclarationStep";
import FeesStep from "@/components/applications/individual/FeesStep";

import type { IndividualApplication } from "@/types/application";

const TOTAL_STEPS = 10;

const STORAGE_KEY = "accta-individual-application";
const STEP_STORAGE_KEY = "accta-individual-application-step";

export default function IndividualApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<IndividualApplication>({
    // Step 1 - Membership
    membershipCategory: "",
    admissionRoute: "",
    residency: "sri-lanka",
    country: "",
    practisingIntention: false,
    professionalInsurance: false,

    // Step 2 - Personal Details
    title: "",
    fullName: "",
    initialsName: "",
    preferredName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    identificationNumber: "",
    preferredLanguage: "",

    // Step 3 - Contact Details
    residentialAddress: "",
    officialAddress: "",
    mailingAddress: "",
    mobile: "",
    whatsapp: "",
    officePhone: "",
    personalEmail: "",
    officialEmail: "",
    linkedIn: "",

    // Step 4 - Qualifications
    qualifications: "",
    professionalMemberships: "",

    // Step 5 - Employment and Experience
    employmentDetails: "",
    experience: "",
    expertise: "",
    statement: "",

    // Step 6 - Fit and Proper
    fitAndProperDetails: "",

    // Step 7 - Referees
    refereeOneName: "",
    refereeOneEmail: "",
    refereeOnePhone: "",
    refereeTwoName: "",
    refereeTwoEmail: "",
    refereeTwoPhone: "",

    // Step 8 - Documents
    documents: {},

    // Step 9 - Declaration
    declarationName: "",
    declarationDate: "",
    declarationPlace: "",
  });

  const updateData = (data: Partial<IndividualApplication>) => {
    setFormData((previous) => ({
      ...previous,
      ...data,
    }));
  };

  // Load saved application when the page opens
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STEP_STORAGE_KEY);

    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    if (savedStep) {
      const step = Number(savedStep);

      if (step >= 1 && step <= TOTAL_STEPS) {
        setCurrentStep(step);
      }
    }
  }, []);

  // Save the application as a draft
  const handleSaveDraft = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    localStorage.setItem(STEP_STORAGE_KEY, String(currentStep));

    alert("Your application has been saved successfully.");
  };

  // Validate required fields before moving to the next step
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.membershipCategory !== "" &&
          formData.admissionRoute !== ""
        );

      case 2:
        return (
          formData.fullName !== "" &&
          formData.dateOfBirth !== "" &&
          formData.nationality !== "" &&
          formData.identificationNumber !== ""
        );

      case 3:
        return (
          formData.residentialAddress !== "" &&
          formData.mobile !== "" &&
          formData.personalEmail !== ""
        );

      case 4:
        return formData.qualifications !== "";

      case 5:
        return formData.employmentDetails !== "";

      case 7:
        return (
          formData.refereeOneName !== "" &&
          formData.refereeOneEmail !== "" &&
          formData.refereeTwoName !== "" &&
          formData.refereeTwoEmail !== ""
        );

      case 9:
        return (
          formData.declarationName !== "" &&
          formData.declarationDate !== "" &&
          formData.declarationPlace !== ""
        );

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      alert("Please complete all required fields before continuing.");
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((previous) => previous + 1);
    } else {
      console.log("Application submitted:", formData);

      // Remove saved draft after successful submission
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);

      alert("Your application is ready to be submitted.");
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
            {/* Step 1 - Membership Applied For */}
            {currentStep === 1 && (
              <MembershipStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 2 - Personal Details */}
            {currentStep === 2 && (
              <PersonalDetailsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 3 - Contact Details */}
            {currentStep === 3 && (
              <ContactDetailsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 4 - Qualifications */}
            {currentStep === 4 && (
              <QualificationsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 5 - Employment and Experience */}
            {currentStep === 5 && (
              <ExperienceStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 6 - Fit and Proper */}
            {currentStep === 6 && (
              <FitProperStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 7 - Referees */}
            {currentStep === 7 && (
              <RefereesStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 8 - Documents */}
            {currentStep === 8 && (
              <DocumentsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 9 - Declaration */}
            {currentStep === 9 && (
              <DeclarationStep
                data={formData}
                updateData={updateData}
              />
            )}

            {/* Step 10 - Fees */}
            {currentStep === 10 && <FeesStep data={formData} />}
          </div>

          {/* Save Draft Button */}
          <div className="mt-8 flex justify-end border-t border-accta-border pt-6">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="rounded-md border border-accta-navy px-5 py-2.5 text-sm font-semibold text-accta-navy transition hover:bg-accta-navy hover:text-white"
            >
              Save and Resume Later
            </button>
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