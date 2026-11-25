"use client";

import { useEffect, useState } from "react";


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

  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  const [submissionMessage, setSubmissionMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);


  const [formData, setFormData] =
    useState<CorporateApplication>(initialFormData);

  const [showValidationAlert, setShowValidationAlert] = useState(false);

  const [validationAlertMessage, setValidationAlertMessage] = useState(
    "Please complete all required fields before continuing."
  );

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    if (!showValidationAlert) return;

    const timer = setTimeout(() => {
      setShowValidationAlert(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showValidationAlert]);

  const updateData = (data: Partial<CorporateApplication>) => {
    setFormData((previous) => ({
      ...previous,
      ...data,
    }));

    setValidationErrors((previousErrors) => {
      const updatedErrors = { ...previousErrors };

      Object.keys(data).forEach((key) => {
        delete updatedErrors[key];

        if (key === "fitAndProperAnswers" && data.fitAndProperAnswers) {
          Object.keys(data.fitAndProperAnswers).forEach((questionId) => {
            delete updatedErrors[questionId];
          });
        }

        if (key === "documents" && data.documents) {
          Object.keys(data.documents).forEach((documentId) => {
            delete updatedErrors[documentId];
          });
        }
      });

      return updatedErrors;
    });
  };


  const scrollToFirstError = () => {
    requestAnimationFrame(() => {
      const firstError = document.querySelector(
        '[aria-invalid="true"]'
      ) as HTMLElement | null;

      if (!firstError) return;

      const focusTarget = firstError.matches(
        "input, select, textarea, button"
      )
        ? firstError
        : (firstError.querySelector(
            "input, select, textarea, button"
          ) as HTMLElement | null);

      firstError.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      focusTarget?.focus({ preventScroll: true });
    });
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      // Step 1 - Membership Category & Residency
      case 1: {
          const step1Errors: Record<string, string> = {};

          if (!formData.membershipCategory) {
            step1Errors.membershipCategory =
              "Please select an entity type.";
          }

          if (
            formData.membershipCategory === "other" &&
            !formData.otherLegalEntity.trim()
          ) {
            step1Errors.otherLegalEntity =
              "Please specify the legal entity.";
          }

          if (!formData.residency) {
            step1Errors.residency =
              "Please select the registration status.";
          }

          if (
            formData.residency === "international" &&
            !formData.country.trim()
          ) {
            step1Errors.country =
              "Please enter the country of registration.";
          }

          setValidationErrors(step1Errors);

          return Object.keys(step1Errors).length === 0;
        }

      // Step 2 - Entity Details
      case 2: {
          const step2Errors: Record<string, string> = {};

          if (!formData.registeredName.trim()) {
            step2Errors.registeredName =
              "Please enter the registered name.";
          }

          if (!formData.legalForm) {
            step2Errors.legalForm =
              "Please select the legal form.";
          }

          if (!formData.registrationNumber.trim()) {
            step2Errors.registrationNumber =
              "Please enter the registration number.";
          }

          if (!formData.registrationDate) {
            step2Errors.registrationDate =
              "Please enter the registration date.";
          } else if (
            new Date(formData.registrationDate) > new Date()
          ) {
            step2Errors.registrationDate =
              "Registration date cannot be in the future.";
          }

          if (!formData.registrationCountry.trim()) {
            step2Errors.registrationCountry =
              "Please enter the country of registration.";
          }

          if (!formData.registeredAddress.trim()) {
            step2Errors.registeredAddress =
              "Please enter the registered address.";
          }

          if (!formData.officePhone.trim()) {
            step2Errors.officePhone =
              "Please enter the office phone number.";
          }

          if (!formData.officialEmail.trim()) {
            step2Errors.officialEmail =
              "Please enter the official email address.";
          } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
              formData.officialEmail
            )
          ) {
            step2Errors.officialEmail =
              "Please enter a valid email address.";
          }

          if (formData.website.trim()) {
            const website = formData.website.trim();

            const websiteRegex =
              /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;

            if (!websiteRegex.test(website)) {
              step2Errors.website =
                "Please enter a valid website URL (e.g. samurda.com).";
            }
          }

          if (
            formData.staffCount !== "" &&
            Number(formData.staffCount) < 0
          ) {
            step2Errors.staffCount =
              "Number of employees cannot be negative.";
          }

          setValidationErrors(step2Errors);

          return Object.keys(step2Errors).length === 0;
        }

      // Step 3 - Directors & Shareholders
      case 3: {
          const step3Errors: Record<string, string> = {};

          if (!formData.directors.trim()) {
            step3Errors.directors =
              "Please provide the directors and key officers.";
          }

          if (!formData.shareholders.trim()) {
            step3Errors.shareholders =
              "Please provide the shareholders and ownership details.";
          }

          if (!formData.parentFirm.trim()) {
            step3Errors.parentFirm =
              "Please provide the parent firm details or enter N/A.";
          }

          setValidationErrors(step3Errors);

          return Object.keys(step3Errors).length === 0;
        }

      // Step 4 - Services & Experience
      case 4: {
          const step4Errors: Record<string, string> = {};

          if (!formData.services.trim()) {
            step4Errors.services =
              "Please describe the tax and professional services offered.";
          }

          setValidationErrors(step4Errors);

          return Object.keys(step4Errors).length === 0;
        }

      // Step 5 - Representatives
      case 5: {
          const step5Errors: Record<string, string> = {};

          // Nominated representative
          if (!formData.nominatedRepresentative.trim()) {
            step5Errors.nominatedRepresentative =
              "Please enter the nominated representative's full name.";
          }

          if (!formData.nominatedEmail.trim()) {
            step5Errors.nominatedEmail =
              "Please enter the nominated representative's email address.";
          } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.nominatedEmail)
          ) {
            step5Errors.nominatedEmail =
              "Please enter a valid email address.";
          }

          if (!formData.nominatedPhone.trim()) {
            step5Errors.nominatedPhone =
              "Please enter the nominated representative's phone number.";
          }

          // Alternate representative (optional)
          const hasAlternateDetails =
            formData.alternateRepresentative.trim() ||
            formData.alternateEmail.trim() ||
            formData.alternatePhone.trim();

          if (hasAlternateDetails) {
            if (!formData.alternateRepresentative.trim()) {
              step5Errors.alternateRepresentative =
                "Please enter the alternate representative's full name.";
            }

            if (!formData.alternateEmail.trim()) {
              step5Errors.alternateEmail =
                "Please enter the alternate representative's email address.";
            } else if (
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.alternateEmail)
            ) {
              step5Errors.alternateEmail =
                "Please enter a valid email address.";
            }

            if (!formData.alternatePhone.trim()) {
              step5Errors.alternatePhone =
                "Please enter the alternate representative's phone number.";
            }
          }

          setValidationErrors(step5Errors);

          return Object.keys(step5Errors).length === 0;
        }

      // Step 6 - Fit & Proper
        case 6: {
          const step6Errors: Record<string, string> = {};

          // Validate all six questions
          const questions = ["f1", "f2", "f3", "f4", "f5", "f6"];

          questions.forEach((questionId) => {
            if (!formData.fitAndProperAnswers[questionId]) {
              step6Errors[questionId] =
                "Please select Yes or No.";
            }
          });

          // Validate details
          const hasYesAnswer = Object.values(
            formData.fitAndProperAnswers
          ).some((answer) => answer === "yes");

          if (!formData.fitAndProperDetails.trim()) {
            step6Errors.fitAndProperDetails = hasYesAnswer
              ? "Please provide details of the Yes answer(s)."
              : "Please enter N/A if all answers are No.";
          } else if (
            !hasYesAnswer &&
            formData.fitAndProperDetails.trim().toUpperCase() !== "N/A"
          ) {
            step6Errors.fitAndProperDetails =
              "If all answers are No, please enter N/A.";
          }

          setValidationErrors(step6Errors);

          return Object.keys(step6Errors).length === 0;
        }

      // Step 7 - Supporting Documents
      case 7: {
        const step7Errors: Record<string, string> = {};

        const requiredDocuments = [
          "incorporation",
          "directors",
          "boardResolution",
          "companyProfile",
          "taxationEvidence",
          "irdRegistration",
          "representativeMembership",
          "identityDocuments",
          "auditedStatements",
          "paymentProof",
        ];

        requiredDocuments.forEach((documentId) => {
          if (!formData.documents[documentId]) {
            step7Errors[documentId] =
              "Please upload this required document.";
          }
        });

        setValidationErrors(step7Errors);

        return Object.keys(step7Errors).length === 0;
      }

      // Step 8 - Declaration
      case 8: {
        const step8Errors: Record<string, string> = {};

        // Authorised signatory one
        if (!formData.signatoryOne.trim()) {
          step8Errors.signatoryOne =
            "Please enter the name of the authorised signatory.";
        }

        // Resolution date
        if (!formData.resolutionDate) {
          step8Errors.resolutionDate =
            "Please select the resolution date.";
        } else {
          const selectedDate = new Date(
            `${formData.resolutionDate}T00:00:00`
          );

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate > today) {
            step8Errors.resolutionDate =
              "Resolution date cannot be in the future.";
          }
        }

        // Declaration confirmation
        if (!formData.declarationAccepted) {
          step8Errors.declarationAccepted =
            "You must confirm the declaration before proceeding.";
        }

        setValidationErrors(step8Errors);

        return Object.keys(step8Errors).length === 0;
      }

      // Step 9 - Fees & Payment
      case 9: {
        const step9Errors: Record<string, string> = {};

        const expectedAmount = formData.residency === "sri-lanka"
          ? 20000
          : 200;

        // Total amount paid
        if (!formData.totalAmountPaid.trim()) {
          step9Errors.totalAmountPaid =
            "Please enter the total amount paid.";
        } else {
          const enteredAmount = Number(
            formData.totalAmountPaid.replace(/[^0-9.]/g, "")
          );

          if (isNaN(enteredAmount)) {
            step9Errors.totalAmountPaid =
              "Please enter a valid payment amount.";
          } else if (enteredAmount !== expectedAmount) {
            step9Errors.totalAmountPaid =
              `The expected total fee is ${formData.residency === "sri-lanka" ? "Rs. 20,000" : "USD 200"}.`;
          }
        }

        // Payment method
        if (!formData.paymentMethod) {
          step9Errors.paymentMethod =
            "Please select a payment method.";
        }

        // Payment reference
        if (!formData.paymentReference.trim()) {
          step9Errors.paymentReference =
            "Please enter the payment reference number.";
        }

        // Payment date
        if (!formData.paymentDate) {
          step9Errors.paymentDate =
            "Please select the payment date.";
        } else {
          const selectedDate = new Date(
            `${formData.paymentDate}T00:00:00`
          );

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate > today) {
            step9Errors.paymentDate =
              "Payment date cannot be in the future.";
          }
        }

        setValidationErrors(step9Errors);

        return Object.keys(step9Errors).length === 0;
      }

      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
    setValidationAlertMessage(
      "Please complete all required fields before continuing."
    );

    setShowValidationAlert(true);
    scrollToFirstError();
    return;
  }

  setValidationErrors({});
  setShowValidationAlert(false);

  // Move to the next step
  if (currentStep < TOTAL_STEPS) {
    setCurrentStep((previous) => previous + 1);
    return;
  }

  if (hasSubmitted) return;

  setSubmissionStatus(null);
  setSubmissionMessage("");

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
       "/api/apply-corporate",
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

    setHasSubmitted(true);

    setSubmissionStatus("success");
    setSubmissionMessage(
      "Your corporate application has been submitted successfully. A confirmation message will be sent to you."
    );
  } catch (error) {
      console.error("Submission error:", error);

      setSubmissionStatus("error");

      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the corporate application."
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
                {validationAlertMessage}
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
              <CorporateMembershipStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 2 && (
              <EntityDetailsStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 3 && (
              <DirectorsStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 4 && (
              <ServicesStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 5 && (
              <RepresentativesStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 6 && (
              <CorporateFitProperStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 7 && (
              <CorporateDocumentsStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 8 && (
              <CorporateDeclarationStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}

            {currentStep === 9 && (
              <CorporateFeesStep
                data={formData}
                updateData={updateData}
                validationErrors={validationErrors}
              />
            )}
          </div>


          {currentStep === TOTAL_STEPS && submissionStatus && (
            <div
              role={submissionStatus === "error" ? "alert" : "status"}
              className={`mb-5 flex items-start gap-3 rounded-lg border p-4 ${
                submissionStatus === "success"
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <div className="mt-0.5">
                {submissionStatus === "success" ? (
                  <svg
                    className="h-5 w-5 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                ) : (
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
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`text-sm font-semibold ${
                    submissionStatus === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {submissionStatus === "success"
                    ? "Corporate application submitted successfully!"
                    : "Corporate application submission failed"}
                </p>

                <p
                  className={`mt-1 text-sm ${
                    submissionStatus === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {submissionMessage}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmissionStatus(null);
                  setSubmissionMessage("");
                }}
                aria-label="Close notification"
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
          )}

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