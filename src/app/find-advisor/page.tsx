"use client";

import { useState } from "react";
import AdvisorHero from "@/components/find-advisor/AdvisorHero";
import AdvisorRegister from "@/components/find-advisor/AdvisorRegister";
import { members, type Member } from "@/data/members";

export default function FindAdvisorPage() {
  const [filteredMembers, setFilteredMembers] =
    useState<Member[]>(members);

  const handleSearch = (filters: {
    search: string;
    category: string;
    city: string;
    licensedOnly: boolean;
  }) => {
    const filtered = members.filter((member) => {
      const searchText = filters.search.toLowerCase().trim();

      // Search by name or membership number
      const matchesSearch =
        member.name.toLowerCase().includes(searchText) ||
        member.membershipNumber.includes(searchText);

      // Filter by category
      const matchesCategory =
        !filters.category || member.category === filters.category;

      // Filter by city
      const matchesCity =
        !filters.city || member.city === filters.city;

      // Show only licensed CCTAs if selected
      const matchesLicence =
        !filters.licensedOnly || Boolean(member.licensedCCTA);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCity &&
        matchesLicence
      );
    });

    setFilteredMembers(filtered);
  };

  return (
    <main>
      <AdvisorHero onSearch={handleSearch} />

      <AdvisorRegister members={filteredMembers} />
    </main>
  );
}