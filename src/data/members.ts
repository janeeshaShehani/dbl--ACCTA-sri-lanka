export type MemberCategory =
  | "Associate"
  | "Fellow"
  | "Academic"
  | "Corporate";

export type Member = {
  id: number;
  name: string;
  letters: string;
  membershipNumber: string;
  city: string;
  firm: string;
  category: MemberCategory;
  status: "In good standing";
  licensedCCTA?: string;
};

export const members: Member[] = [
  {
    id: 1,
    name: "Kasun Perera",
    letters: "FCTA",
    membershipNumber: "000001",
    city: "Colombo",
    firm: "Perera Tax Consultants",
    category: "Fellow",
    status: "In good standing",
    licensedCCTA: "2026",
  },
  {
    id: 2,
    name: "Nadeesha Silva",
    letters: "ACTA",
    membershipNumber: "000002",
    city: "Kandy",
    firm: "Silva & Associates",
    category: "Associate",
    status: "In good standing",
    licensedCCTA: "2026",
  },
  {
    id: 3,
    name: "Dr. Amal Fernando",
    letters: "FACTA",
    membershipNumber: "000003",
    city: "Galle",
    firm: "University of Galle",
    category: "Academic",
    status: "In good standing",
  },
  {
    id: 4,
    name: "TaxPro Lanka (Pvt) Ltd",
    letters: "Corporate Member",
    membershipNumber: "000004",
    city: "Colombo",
    firm: "TaxPro Lanka",
    category: "Corporate",
    status: "In good standing",
  },
  {
    id: 5,
    name: "Chamika Jayasinghe",
    letters: "FACTA",
    membershipNumber: "000005",
    city: "Negombo",
    firm: "Jayasinghe Tax Services",
    category: "Fellow",
    status: "In good standing",
  },
];