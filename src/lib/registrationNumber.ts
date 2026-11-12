const categoryPrefixes: Record<string, string> = {
  "Associate (Standard) (ACTA)": "ASA",
  "Fellow (Standard) (FCTA)": "FSA",
  "Associate Academic (AACTA)": "AAA",
  "Fellow Academic (FACTA)": "FAA",
  "Affiliate (AFCTA)": "AFA",
  "Corporate Member": "CMA",
};

export function getCategoryPrefix(category: string): string {
  const prefix = categoryPrefixes[category];

  if (!prefix) {
    throw new Error(`Invalid membership category: ${category}`);
  }

  return prefix;
}

export function generateRegistrationNumber(
  category: string,
  sequence: number
): string {
  const prefix = getCategoryPrefix(category);

  const now = new Date();

  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const sequenceNumber = String(sequence).padStart(6, "0");

  return `${prefix}${year}${month}${sequenceNumber}`;
}