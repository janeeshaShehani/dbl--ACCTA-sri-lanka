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

const initialFormData: IndividualApplication = {
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
};

export default function IndividualApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] =
    useState<IndividualApplication>(initialFormData);

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
          formData.membershipCategory.trim() !== "" &&
          formData.admissionRoute.trim() !== ""
        );

      case 2:
        return (
          formData.fullName.trim() !== "" &&
          formData.dateOfBirth !== "" &&
          formData.nationality.trim() !== "" &&
          formData.identificationNumber.trim() !== ""
        );

      case 3:
        return (
          formData.residentialAddress.trim() !== "" &&
          formData.mobile.trim() !== "" &&
          formData.personalEmail.trim() !== ""
        );

      case 4:
        return formData.qualifications.trim() !== "";

      case 5:
        return formData.employmentDetails.trim() !== "";

      case 6:
        return formData.fitAndProperDetails.trim() !== "";

      case 7:
        return (
          formData.refereeOneName.trim() !== "" &&
          formData.refereeOneEmail.trim() !== "" &&
          formData.refereeTwoName.trim() !== "" &&
          formData.refereeTwoEmail.trim() !== ""
        );

      // Add document validation here later if all documents are required
      case 8:
        return true;

      case 9:
        return (
          formData.declarationName.trim() !== "" &&
          formData.declarationDate !== "" &&
          formData.declarationPlace.trim() !== ""
        );

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

    // Submit application on Step 10
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

      console.log("Sending application to API:", applicationData);

      const response = await fetch(
        "/api/apply-membership-applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "individual",
            application: applicationData,
          }),
        }
      );

      const result = await response.json();

      console.log("API response:", result);

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to submit the application."
        );
      }

      console.log("Individual application submitted:", result);

      // Remove saved draft after successful submission
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);

      alert(
        "Your application has been submitted successfully. A confirmation email will be sent to you."
      );

      // Reset the form
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (error) {
      console.error("Application submission error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your application."
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
            {currentStep === 10 && (
              <FeesStep data={formData} />
            )}
          </div>

          {/* Save Draft Button */}
          <div className="mt-8 flex justify-end border-t border-accta-border pt-6">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="rounded-md border border-accta-navy px-5 py-2.5 text-sm font-semibold text-accta-navy transition hover:bg-accta-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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