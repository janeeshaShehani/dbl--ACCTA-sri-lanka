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

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [showValidationAlert, setShowValidationAlert] = useState(false);

  const updateData = (data: Partial<IndividualApplication>) => {
    setFormData((previous) => ({
      ...previous,
      ...data,
    }));

    // Clear validation errors for fields being updated
    setValidationErrors((previousErrors) => {
      const updatedErrors = { ...previousErrors };

      Object.keys(data).forEach((key) => {
        delete updatedErrors[key];

        if (key === "fitAndProperAnswers" && data.fitAndProperAnswers) {
          Object.keys(data.fitAndProperAnswers).forEach((questionId) => {
            delete updatedErrors[questionId];
          });
        }
      });

      return updatedErrors;
    });
  };


  useEffect(() => {
    if (!showValidationAlert) return;

    const timer = setTimeout(() => {
      setShowValidationAlert(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showValidationAlert]);


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
      case 1: {
        const errors: Record<string, string> = {};

        if (!formData.membershipCategory.trim()) {
          errors.membershipCategory = "Please select a membership category.";
        }

        if (
          formData.residency === "international" &&
          !formData.country.trim()
        ) {
          errors.country = "Please enter your country of residence.";
        }

        if (!formData.admissionRoute.trim()) {
          errors.admissionRoute = "Please select a route of admission.";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
      }

      case 2: {
        const errors: Record<string, string> = {};

        const today = new Date();
        const todayString = [
          today.getFullYear(),
          String(today.getMonth() + 1).padStart(2, "0"),
          String(today.getDate()).padStart(2, "0"),
        ].join("-");

        if (!formData.title.trim()) {
          errors.title = "Please select your title.";
        }

        if (!formData.fullName.trim()) {
          errors.fullName = "Please enter your full name.";
        }

        if (!formData.initialsName.trim()) {
          errors.initialsName = "Please enter your name with initials.";
        }

        if (!formData.dateOfBirth) {
          errors.dateOfBirth = "Please select your date of birth.";
        } else if (formData.dateOfBirth > todayString) {
          errors.dateOfBirth = "Date of birth cannot be in the future.";
        }

        if (!formData.gender.trim()) {
          errors.gender = "Please select your gender.";
        }

        if (!formData.nationality.trim()) {
          errors.nationality = "Please enter your nationality.";
        }

        if (!formData.identificationNumber.trim()) {
          errors.identificationNumber = "Please enter your NIC or passport number.";
        }

        if (!formData.preferredLanguage.trim()) {
          errors.preferredLanguage = "Please select your preferred language.";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
      }

     case 3: {
        const errors: Record<string, string> = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex = /^\+?[\d\s\-()]{7,20}$/;

        const isValidPhone = (phone: string) => {
          const digits = phone.replace(/\D/g, "");

          return (
            phoneRegex.test(phone) &&
            digits.length >= 7 &&
            digits.length <= 15
          );
        };

        const isValidLinkedIn = (url: string) => {
          if (!url.trim()) return true;

          try {
            const parsedUrl = new URL(url);

            return (
              (parsedUrl.hostname === "linkedin.com" ||
                parsedUrl.hostname === "www.linkedin.com") &&
              parsedUrl.pathname.startsWith("/in/")
            );
          } catch {
            return false;
          }
        };

        // Residential address
        if (!formData.residentialAddress.trim()) {
          errors.residentialAddress = "Residential address is required.";
        } else if (formData.residentialAddress.length > 500) {
          errors.residentialAddress =
            "Residential address cannot exceed 500 characters.";
        }

        // Mobile number
        if (!formData.mobile.trim()) {
          errors.mobile = "Mobile number is required.";
        } else if (!isValidPhone(formData.mobile)) {
          errors.mobile = "Please enter a valid mobile number.";
        }

        // WhatsApp number - optional
        if (
          formData.whatsapp.trim() &&
          !isValidPhone(formData.whatsapp)
        ) {
          errors.whatsapp = "Please enter a valid WhatsApp number.";
        }

        // Office phone - optional
        if (
          formData.officePhone.trim() &&
          !isValidPhone(formData.officePhone)
        ) {
          errors.officePhone = "Please enter a valid office phone number.";
        }

        // Personal email
        if (!formData.personalEmail.trim()) {
          errors.personalEmail = "Personal email address is required.";
        } else if (
          !emailRegex.test(formData.personalEmail.trim())
        ) {
          errors.personalEmail = "Please enter a valid email address.";
        }

        // Official email - optional
        if (
          formData.officialEmail.trim() &&
          !emailRegex.test(formData.officialEmail.trim())
        ) {
          errors.officialEmail = "Please enter a valid email address.";
        }

        // LinkedIn profile - optional
        if (!isValidLinkedIn(formData.linkedIn)) {
          errors.linkedIn =
            "Please enter a valid LinkedIn profile URL.";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
}

      case 4: {
        const errors: Record<string, string> = {};

        if (!formData.qualifications.trim()) {
          errors.qualifications =
            "Please enter your academic qualifications.";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
      }

      case 5:
        const step5Errors: Record<string, string> = {};

        if (!formData.employmentDetails.trim()) {
          step5Errors.employmentDetails =
            "Please enter your current employment details.";
        }

        if (!formData.experience.trim()) {
          step5Errors.experience =
            "Please enter your relevant professional experience.";
        }

        if (!formData.expertise.trim()) {
          step5Errors.expertise =
            "Please enter your areas of expertise.";
        }

        setValidationErrors(step5Errors);

        return Object.keys(step5Errors).length === 0;

      case 6: {
        const step6Errors: Record<string, string> = {};

        const requiredQuestions = [
          "disciplinaryAction",
          "criminalOffence",
          "professionalInvestigation",
          "bankruptcy",
          "professionalBodyRemoval",
          "falseInformation",
          "otherMatter",
        ];

        requiredQuestions.forEach((questionId) => {
          if (!formData.fitAndProperAnswers[questionId]) {
            step6Errors[questionId] =
              "Please select Yes or No.";
          }
        });

        const hasYesAnswer = Object.values(
          formData.fitAndProperAnswers
        ).includes("yes");

        if (hasYesAnswer && !formData.fitAndProperDetails.trim()) {
          step6Errors.fitAndProperDetails =
            "Please provide details for your Yes answer(s).";
        }

        setValidationErrors(step6Errors);

        return Object.keys(step6Errors).length === 0;
      }

      case 7: {
        const step7Errors: Record<string, string> = {};

        // Referee 1 - Full name
        if (!formData.refereeOneName.trim()) {
          step7Errors.refereeOneName =
            "Please enter referee 1's full name.";
        }

        // Referee 1 - Email
        if (!formData.refereeOneEmail.trim()) {
          step7Errors.refereeOneEmail =
            "Please enter referee 1's email address.";
        } else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            formData.refereeOneEmail.trim()
          )
        ) {
          step7Errors.refereeOneEmail =
            "Please enter a valid email address.";
        }

        // Referee 2 - Full name
        if (!formData.refereeTwoName.trim()) {
          step7Errors.refereeTwoName =
            "Please enter referee 2's full name.";
        }

        // Referee 2 - Email
        if (!formData.refereeTwoEmail.trim()) {
          step7Errors.refereeTwoEmail =
            "Please enter referee 2's email address.";
        } else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            formData.refereeTwoEmail.trim()
          )
        ) {
          step7Errors.refereeTwoEmail =
            "Please enter a valid email address.";
        }

        setValidationErrors(step7Errors);

        return Object.keys(step7Errors).length === 0;
      }

      case 8: {
        const step8Errors: Record<string, string> = {};

        const requiredDocuments = [
          {
            id: "identity",
            label: "NIC or passport",
          },
          {
            id: "photo",
            label: "passport-size photograph",
          },
          {
            id: "academic",
            label: "academic certificates and transcripts",
          },
          {
            id: "cv",
            label: "detailed CV",
          },
          {
            id: "payment",
            label: "proof of payment",
          },
        ];

        requiredDocuments.forEach((document) => {
          const files = formData.documents[document.id] ?? [];

          if (files.length === 0) {
            step8Errors[document.id] = `Please upload ${document.label}.`;
          }
        });

        setValidationErrors(step8Errors);

        return Object.keys(step8Errors).length === 0;
      }

      case 9: {
        const step9Errors: Record<string, string> = {};

        // Validate all declaration checkboxes
        const requiredDeclarations = [
          "declarationInformationAccepted",
          "declarationAgeAccepted",
          "declarationRulesAccepted",
          "declarationDesignationAccepted",
          "declarationRenewalAccepted",
          "declarationChangesAccepted",
          "declarationContributionAccepted",
          "declarationConsentAccepted",
        ];

        requiredDeclarations.forEach((field) => {
          if (!formData[field as keyof IndividualApplication]) {
            step9Errors[field] = "You must accept this declaration.";
          }
        });

        // Validate full name
        if (!formData.declarationName.trim()) {
          step9Errors.declarationName = "Please enter your full name.";
        }

        // Validate declaration date
        if (!formData.declarationDate) {
          step9Errors.declarationDate = "Please select the declaration date.";
        }

        // Validate place
        if (!formData.declarationPlace.trim()) {
          step9Errors.declarationPlace = "Please enter the place.";
        }

        setValidationErrors(step9Errors);

        return Object.keys(step9Errors).length === 0;
      }

      default:
        return true;
    }
  };


  const scrollToFirstError = () => {
    requestAnimationFrame(() => {
      const firstError = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLElement | null;

      if (!firstError) return;

      const focusTarget =
        firstError.matches("input, select, textarea, button")
          ? firstError
          : firstError.querySelector(
              'input, select, textarea, button'
            ) as HTMLElement | null;

      firstError.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      focusTarget?.focus({ preventScroll: true });
    });
  };

  const handleNext = async () => {
    // Validate current step
    if (!validateCurrentStep()) {
       setShowValidationAlert(true);
       scrollToFirstError();
       return;
    }

    // Clear validation errors after successful validation
    setValidationErrors({});
    setShowValidationAlert(false);

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
        "/api/apply-individual",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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

         
          {showValidationAlert && (
            <div
              role="alert"
              className="fixed right-5 top-5 z-50 flex w-[calc(100%-40px)] max-w-sm items-start gap-3 rounded-xl border border-red-100 bg-white p-4 shadow-xl"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50">
                <svg
                  className="h-5 w-5 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-accta-ink">
                  Please check the form
                </p>
                <p className="mt-1 text-xs leading-5 text-accta-muted">
                  Please complete all required fields before continuing.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowValidationAlert(false)}
                aria-label="Close notification"
                className="text-gray-400 transition hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          )}


          <div className="mt-8">
            {currentStep === 1 && (
              <MembershipStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 2 && (
              <PersonalDetailsStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
                
              />
            )}

            {currentStep === 3 && (
              <ContactDetailsStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 4 && (
              <QualificationsStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 5 && (
              <ExperienceStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 6 && (
              <FitProperStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 7 && (
              <RefereesStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 8 && (
              <DocumentsStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 9 && (
              <DeclarationStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
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