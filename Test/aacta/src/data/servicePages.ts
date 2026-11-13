// Only these known, unfinished destinations receive an availability page; other addresses remain 404s.
export const servicePages: Record<string, { title: string; message: string }> = {
  "membership/apply/individual": { title: "Individual membership application", message: "The online M-01 application is being prepared and is not accepting submissions yet. You can review the membership requirements or contact ACCTA for guidance." },
  "membership/apply/corporate": { title: "Corporate membership application", message: "The online M-02 application is being prepared and is not accepting submissions yet. Please contact ACCTA for guidance about corporate membership." },
  payment: { title: "Online payments", message: "Online payments are not available yet. Please contact ACCTA for guidance before making a payment." },
  "verify-member": { title: "Member and certificate verification", message: "Online verification is not available yet. Please contact ACCTA to confirm a membership or certificate. A directory listing alone is not a certificate verification." },
  complaint: { title: "Raise a concern", message: "The online complaints service and published procedure are not available yet. Please contact ACCTA for guidance on raising a concern about a member." },
  "code-of-ethics": { title: "Code of Ethics and Professional Conduct", message: "The approved document is not available for download yet. Please contact ACCTA to request information about its professional standards." },
  "privacy-policy": { title: "Privacy policy", message: "The approved privacy policy is awaiting publication. Please contact ACCTA with privacy questions. Do not send identity documents or sensitive application information through the general enquiry form." },
  "terms-of-use": { title: "Terms of use", message: "The approved terms of use are awaiting publication. Please contact ACCTA if you need clarification about using this website or its services." },
  "cookie-notice": { title: "Cookie notice", message: "The cookie notice is awaiting publication. Please contact ACCTA for information about website data handling." },
};

export const sectionDestinations: Record<string, string> = {
  "about/governing-council": "/about#governance",
  "about/committees": "/about#committees",
  "membership/fees": "/membership#fees",
  "membership/mature-entry": "/membership#admission-routes",
};
