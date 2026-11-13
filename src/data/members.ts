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
    name: "Prof. (Dr) Damith Gangodawilage",
    letters: "FCTA",
    membershipNumber: "FS00001",
    city: "Colombo",
    firm: "Taxperts Lanka Pvt Ltd.",
    category: "Fellow",
    status: "In good standing",
    licensedCCTA: "2026",
  },
  {
    id: 2,
    name: "Mr. Sunil Wanigabadu",
    letters: "FCTA",
    membershipNumber: "FS00002",
    city: "Colombo",
    firm: "N/A",
    category: "Fellow",
    status: "In good standing",
    licensedCCTA: "2026",
  },
  {
    id: 3,
    name: "Mr. Thilak Dharmaratne",
    letters: "FCTA",
    membershipNumber: "FS00003",
    city: "London",
    firm: "Next Level Consultants",
    category: "Fellow",
    status: "In good standing",
  },
  {
    id: 4,
    name: "Taxperts Lanka Pvt. Ltd.",
    letters: "Corporate Member",
    membershipNumber: "FC00001",
    city: "Colombo",
    firm: "Prof. G K Wijayananda",
    category: "Corporate",
    status: "In good standing",
  },
  {
    id: 5,
    name: "Mr. Saman Shantha",
    letters: "FCTA",
    membershipNumber: "FS00004",
    city: "Colombo",
    firm: "N/A",
    category: "Fellow",
    status: "In good standing",
  },
  {
    id: 6,
    name: "Mrs. Wasanthi Manchanayake",
    letters: "FCTA",
    membershipNumber: "FS00005",
    city: "Colombo",
    firm: "N/A",
    category: "Fellow",
    status: "In good standing",
  },
  {
    id: 7,
    name: "Corporate Business Solutions Pvt. Ltd.",
    letters: "Corporate Member",
    membershipNumber: "FC00002",
    city: "Colombo",
    firm: "Prof. (Dr) Sanath Ajantha Divakara",
    category: "Corporate",
    status: "In good standing",
  },
  {
    id: 8,
    name: "Mr. Saman Dissanayake",
    letters: "FCTA",
    membershipNumber: "FS00005",
    city: "Colombo",
    firm: "Inland Revenue Department",
    category: "Fellow",
    status: "In good standing",
  },
  {
    id: 9,
    name: "Mr. H. I. M. H. Najith",
    letters: "AfCTA",
    membershipNumber: "AM00001",
    city: "Colombo",
    firm: "Corporate Business Solutions Pvt Ltd.",
    category: "Associate",
    status: "In good standing",
  },
  {
    id: 10,
    name: "Mr. K. Sivanesan",
    letters: "FCTA",
    membershipNumber: "FS0006",
    city: "Colombo",
    firm: "Amerasekera & Company",
    category: "Associate",
    status: "In good standing",
    licensedCCTA: "2026",
  },
];