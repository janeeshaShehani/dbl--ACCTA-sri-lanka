export type IndividualApplication = {
  // Step 1 - Membership
  membershipCategory: string;
  admissionRoute: string;
  residency: "sri-lanka" | "international";
  country: string;
  practisingIntention: boolean;
  professionalInsurance: boolean;

  // Step 2 - Personal Details
  title: string;
  fullName: string;
  initialsName: string;
  preferredName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  identificationNumber: string;
  preferredLanguage: string;

  // Step 3 - Contact Details
  residentialAddress: string;
  officialAddress: string;
  mailingAddress: string;
  mobile: string;
  whatsapp: string;
  officePhone: string;
  personalEmail: string;
  officialEmail: string;
  linkedIn: string;

  // Step 4 - Qualifications
  qualifications: string;
  professionalMemberships: string;

  // Step 5 - Employment and Experience
  employmentDetails: string;
  experience: string;
  expertise: string;
  statement: string;

  // Step 6 - Fit and Proper
  fitAndProperAnswers: Record<string, "yes" | "no" | "">;
  fitAndProperDetails: string;

  // Step 7 - Referees
  refereeOneName: string;
  refereeOneEmail: string;
  refereeOnePhone: string;
  refereeTwoName: string;
  refereeTwoEmail: string;
  refereeTwoPhone: string;

  // Step 8 - Documents
  documents: Record<string, File[]>;

  // Step 9 - Declaration
  declarationInformationAccepted: boolean;
  declarationAgeAccepted: boolean;
  declarationRulesAccepted: boolean;
  declarationDesignationAccepted: boolean;
  declarationRenewalAccepted: boolean;
  declarationChangesAccepted: boolean;
  declarationContributionAccepted: boolean;
  declarationConsentAccepted: boolean;

  declarationName: string;
  declarationDate: string;
  declarationPlace: string;
};

export type CorporateApplication = {
  // Step 1 - Membership Applied For
  membershipCategory: string;
  otherLegalEntity: string;
  residency: "sri-lanka" | "international";
  country: string;

  // Step 2 - Entity Details
  registeredName: string;
  tradingName: string;
  legalForm: string;
  registrationNumber: string;
  registrationDate: string;
  registrationCountry: string;
  tinNumber: string;
  vatNumber: string;
  registeredAddress: string;
  tradingAddress: string;
  website: string;
  staffCount: string;

  // Corporate Contact Details
  officePhone: string;
  officialEmail: string;

  // Step 3 - Directors & Shareholders
  directors: string;
  shareholders: string;
  parentFirm: string;

  // Step 4 - Services & Experience
  services: string;
  yearsInTaxation: string;
  registrations: string;
  clientProfile: string;
  firmProfile: string;

  // Step 5 - Company Representatives
  nominatedRepresentative: string;
  nominatedEmail: string;
  nominatedPhone: string;
  alternateRepresentative: string;
  alternateEmail: string;
  alternatePhone: string;

  // Step 6 - Fit & Proper
  fitAndProperAnswers: Record<string, "yes" | "no" | "">;
  fitAndProperDetails: string;

  // Step 7 - Supporting Documents
  documents: Record<string, File | null>;

  // Step 8 - Declaration
  signatoryOne: string;
  signatoryTwo: string;
  resolutionDate: string;
  declarationAccepted: boolean;

  // Step 9 - Fees & Payment
  totalAmountPaid: string;
  paymentMethod: string;
  paymentReference: string;
  paymentDate: string;
};