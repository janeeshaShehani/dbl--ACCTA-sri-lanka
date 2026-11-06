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
};

export const upcomingEvents: Event[] = [
  {
    id: 1,
    type: "Seminar",
    points: "4 CPD points",
    title: "Tax Updates and Professional Practice",
    date: "15 Nov 2026",
    time: "9:00 AM",
    venue: "Colombo",
    memberFee: "Rs. 2,500",
    nonMemberFee: "Rs. 3,500",
    image: "/images/events/tax-update.jpg",
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
  },
];