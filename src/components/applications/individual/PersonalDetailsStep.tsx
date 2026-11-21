import type { IndividualApplication } from "@/types/application";

type PersonalDetailsStepProps = {
  data: IndividualApplication;
  updateData: (data: Partial<IndividualApplication>) => void;
};

export default function PersonalDetailsStep({
  data,
  updateData,
}: PersonalDetailsStepProps) {
  // Today's date for the maximum date of birth
  const today = new Date();

  const maxDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <div>
      {/* Section Header */}
      <div className="border-b border-accta-border pb-5">
        <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
          SECTION B
        </p>

        <h2 className="mt-2 font-serif text-2xl font-bold text-accta-navy">
          Personal details
        </h2>

        <p className="mt-2 text-sm text-accta-muted">
          Please provide your personal information as it should appear in your
          membership records.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="text-sm font-semibold text-accta-ink"
          >
            Title <span className="text-accta-maroon">*</span>
          </label>

          <select
            id="title"
            value={data.title}
            onChange={(e) => updateData({ title: e.target.value })}
            required
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="">Select title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="text-sm font-semibold text-accta-ink"
          >
            Full name <span className="text-accta-maroon">*</span>
          </label>

          <input
            id="fullName"
            type="text"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder="Enter your full name"
            required
            maxLength={150}
            autoComplete="name"
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Name with Initials */}
        <div>
          <label
            htmlFor="initialsName"
            className="text-sm font-semibold text-accta-ink"
          >
            Name with initials <span className="text-accta-maroon">*</span>
          </label>

          <input
            id="initialsName"
            type="text"
            value={data.initialsName}
            onChange={(e) => updateData({ initialsName: e.target.value })}
            placeholder="Example: J. A. Smith"
            required
            maxLength={150}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />

          <p className="mt-1 text-xs text-accta-muted">
            This name may be used on membership records and certificates.
          </p>
        </div>

        {/* Preferred Name */}
        <div>
          <label
            htmlFor="preferredName"
            className="text-sm font-semibold text-accta-ink"
          >
            Preferred name
            <span className="ml-1 font-normal text-accta-muted">
              (optional)
            </span>
          </label>

          <input
            id="preferredName"
            type="text"
            value={data.preferredName}
            onChange={(e) => updateData({ preferredName: e.target.value })}
            placeholder="Enter your preferred name"
            maxLength={100}
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dateOfBirth"
            className="text-sm font-semibold text-accta-ink"
          >
            Date of birth <span className="text-accta-maroon">*</span>
          </label>

          <input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            max={maxDate}
            required
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />

          <p className="mt-1 text-xs text-accta-muted">
            Your date of birth cannot be in the future.
          </p>
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="text-sm font-semibold text-accta-ink"
          >
            Gender <span className="text-accta-maroon">*</span>
          </label>

          <select
            id="gender"
            value={data.gender}
            onChange={(e) => updateData({ gender: e.target.value })}
            required
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        {/* Nationality */}
        <div>
          <label
            htmlFor="nationality"
            className="text-sm font-semibold text-accta-ink"
          >
            Nationality <span className="text-accta-maroon">*</span>
          </label>

          <input
            id="nationality"
            type="text"
            value={data.nationality}
            onChange={(e) => updateData({ nationality: e.target.value })}
            placeholder="Enter your nationality"
            required
            maxLength={100}
            autoComplete="country-name"
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Identification Number */}
        <div>
          <label
            htmlFor="identificationNumber"
            className="text-sm font-semibold text-accta-ink"
          >
            NIC or passport number <span className="text-accta-maroon">*</span>
          </label>

          <input
            id="identificationNumber"
            type="text"
            value={data.identificationNumber}
            onChange={(e) =>
              updateData({ identificationNumber: e.target.value })
            }
            placeholder="Enter your NIC or passport number"
            required
            maxLength={50}
            autoComplete="off"
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          />
        </div>

        {/* Preferred Language */}
        <div className="md:col-span-2">
          <label
            htmlFor="preferredLanguage"
            className="text-sm font-semibold text-accta-ink"
          >
            Preferred language for communication{" "}
            <span className="text-accta-maroon">*</span>
          </label>

          <select
            id="preferredLanguage"
            value={data.preferredLanguage}
            onChange={(e) =>
              updateData({ preferredLanguage: e.target.value })
            }
            required
            className="mt-2 w-full rounded-md border border-accta-border bg-white px-4 py-3 text-sm outline-none focus:border-accta-maroon"
          >
            <option value="">Select a language</option>
            <option value="English">English</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>
      </div>
    </div>
  );
}