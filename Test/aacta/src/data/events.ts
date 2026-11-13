export type EventType =
  | "Seminar"
  | "Workshop"
  | "Webinar"
  | "Conference";

export type Event = {
  id: number;
  type: EventType;
  points: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  memberFee: string;
  nonMemberFee: string;
  image: string | null;

  // Optional external registration website
  registrationLink?: string;
};

export const upcomingEvents: Event[] = [
  {
    id: 1,
    type: "Seminar",
    points: "4 CPD points",
    title: "Budget Seminar 2027",
    date: "13 Nov 2026",
    time: "6:00 PM",
    venue: "Colombo",
    memberFee: "Free of Charge",
    nonMemberFee: "Free of Charge",
    image: "/images/events/tax-update.jpg",

    registrationLink:
      "https://enc.eu.com/meeting/national-budget-2027/",
  },
  {
    id: 2,
    type: "Webinar",
    points: "2 CPD points",
    title: "Understanding Recent Tax Developments",
    date: "22 Nov 2026",
    time: "6:00 PM",
    venue: "Online",
    memberFee: "Rs. 1,500",
    nonMemberFee: "Rs. 2,000",
    image: "/images/events/understanding-recent.jpg",

    // No registration link yet
  },
  {
    id: 3,
    type: "Workshop",
    points: "6 CPD points",
    title: "Practical Tax Compliance Workshop",
    date: "05 Dec 2026",
    time: "9:30 AM",
    venue: "Colombo",
    memberFee: "Rs. 3,000",
    nonMemberFee: "Rs. 4,000",
    image: "/images/events/practical-tax.jpeg",

    // No registration link yet
  },
];