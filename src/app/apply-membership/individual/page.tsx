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
  fitAndProperAnswers: {
    disciplinaryAction: "",
    criminalOffence: "",
    professionalInvestigation: "",
    bankruptcy: "",
    professionalBodyRemoval: "",
    falseInformation: "",
    otherMatter: "",
  },

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
  declarationInformationAccepted: false,
  declarationAgeAccepted: false,
  declarationRulesAccepted: false,
  declarationDesignationAccepted: false,
  declarationRenewalAccepted: false,
  declarationChangesAccepted: false,
  declarationContributionAccepted: false,
  declarationConsentAccepted: false,

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
        const parsedData = JSON.parse(savedData);

        setFormData({
          ...initialFormData,
          ...parsedData,
          documents: {},
        });
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

  // Save application as a draft
  const handleSaveDraft = () => {
    try {
      const { documents, ...dataWithoutDocuments } = formData;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...dataWithoutDocuments,
          documents: {},
        })
      );

      localStorage.setItem(STEP_STORAGE_KEY, String(currentStep));

      alert(
        "Your application has been saved successfully. Please note that uploaded files will need to be selected again when you resume."
      );
    } catch {
      alert("Unable to save your application. Please try again.");
    }
  };

  // Validate each step
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

      case 6: {
        const answers = Object.values(formData.fitAndProperAnswers);

        if (answers.length < 7 || answers.includes("")) {
          return false;
        }

        const hasYesAnswer = answers.includes("yes");

        return hasYesAnswer
          ? formData.fitAndProperDetails.trim() !== ""
          : true;
      }

      case 7:
        return (
          formData.refereeOneName.trim() !== "" &&
          formData.refereeOneEmail.trim() !== "" &&
          formData.refereeTwoName.trim() !== "" &&
          formData.refereeTwoEmail.trim() !== ""
        );

      case 8:
        return true;

      case 9:
        return (
          formData.declarationInformationAccepted &&
          formData.declarationAgeAccepted &&
          formData.declarationRulesAccepted &&
          formData.declarationDesignationAccepted &&
          formData.declarationRenewalAccepted &&
          formData.declarationChangesAccepted &&
          formData.declarationContributionAccepted &&
          formData.declarationConsentAccepted &&
          formData.declarationName.trim() !== "" &&
          formData.declarationDate !== "" &&
          formData.declarationPlace.trim() !== ""
        );

      default:
        return true;
    }
  };

  const handleNext = async () => {
    // Validate current step
    if (!validateCurrentStep()) {
      alert("Please complete all required fields before continuing.");
      return;
    }

    // Move between steps
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((previous) => previous + 1);
      return;
    }

    // Submit application on Step 10
    try {
      setIsSubmitting(true);

      // STEP 1: Create the application ID first.
      // This ID will be used for both the application and document folder.
      const applicationId = crypto.randomUUID();

      // This will store the uploaded document information.
      const uploadedDocuments: Record<
        string,
        {
          name: string;
          path: string;
        }[]
      > = {};

      // STEP 2: Check whether documents were selected.
      const hasDocuments = Object.values(formData.documents).some(
        (files) => files.length > 0
      );

      // STEP 3: Upload documents first.
      if (hasDocuments) {
        const uploadFormData = new FormData();

        uploadFormData.append("applicationId", applicationId);

        Object.entries(formData.documents).forEach(
          ([documentType, files]) => {
            files.forEach((file: File) => {
              uploadFormData.append("files", file);
              uploadFormData.append("documentTypes", documentType);
            });
          }
        );

        console.log("Uploading documents...");

        const uploadResponse = await fetch(
          "/api/upload-documents",
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(
            uploadResult.error || "Unable to upload documents."
          );
        }

        // STEP 4: Organize uploaded documents by document type.
        uploadResult.files.forEach(
          (file: {
            documentType: string;
            name: string;
            path: string;
          }) => {
            if (!uploadedDocuments[file.documentType]) {
              uploadedDocuments[file.documentType] = [];
            }

            uploadedDocuments[file.documentType].push({
              name: file.name,
              path: file.path,
            });
          }
        );

        console.log(
          "Documents uploaded successfully:",
          uploadedDocuments
        );
      }

      // STEP 5: Create the final application data.
      // File objects are replaced with the actual uploaded file paths.
      const applicationData = {
        ...formData,
        id: applicationId,
        documents: uploadedDocuments,
      };

      console.log("Saving application:", applicationData);

      // STEP 6: Save the application with document paths.
      const applicationResponse = await fetch(
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

      const applicationResult = await applicationResponse.json();

      if (!applicationResponse.ok) {
        throw new Error(
          applicationResult.error || "Unable to save application."
        );
      }

      console.log(
        "Application submitted successfully:",
        applicationResult
      );

      // STEP 7: Remove saved draft and reset the form.
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_STORAGE_KEY);

      alert(
        "Your application has been submitted successfully. A confirmation email will be sent to you."
      );

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
            {currentStep === 1 && (
              <MembershipStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 2 && (
              <PersonalDetailsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 3 && (
              <ContactDetailsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 4 && (
              <QualificationsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 5 && (
              <ExperienceStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 6 && (
              <FitProperStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 7 && (
              <RefereesStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 8 && (
              <DocumentsStep
                data={formData}
                updateData={updateData}
              />
            )}

            {currentStep === 9 && (
              <DeclarationStep
                data={formData}
                updateData={updateData}
              />
            )}

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