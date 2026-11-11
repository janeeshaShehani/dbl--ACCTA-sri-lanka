import Image from "next/image";

export default function Governance() {

  const councilMembers= [
    {
      role: "Founder President",
      name: "Prof. (Dr) Damith Sanjaya Kumara Gangodawilage",
      image: "/images/council/dr.damith.jpeg",
    },
    {
      role: "Senior Vice President",
      name: "Prof. (Dr) Sanath Ajantha Divakara",
      image: "/images/council/prof.sanath.jpeg",
    },
    {
      role: "Senior Vice President",
      name: "Mr. Saman Shantha",
      image: "/images/council/mr.saman.jpeg",
    },
    {
      role: "Senior Vice President",
      name: "Mrs. Wasanthi Manchanayake",
      image: "/images/council/mrs.wasanthi.jpeg",
    },
    {
      role: "Assistant Vice President",
      name: "Mr. Thilak Dharmarathne",
      image: null,
    },
    {
      role: "Secretary",
      name: "Mr. Sunil Wanigabadu",
      image: "/images/council/mr.SunilWanigabadu.jpeg",
    },
    {
      role: "Permanent Corporate Member Representative",
      name: "Prof. G K Wijayananda",
      image: "/images/council/mr.wijayananda.jpeg",
    },
  ]

  const councilComposition = [
  {
    title: "Seven members",
    description: "Elected by the members of the Association",
  },
  {
    title: "Founder President and three Immediate Past Presidents",
    description: "Ex-officio",
  },
  {
    title: "Permanent Corporate Members",
    description: "Ex-officio",
  },
  {
    title: "Two corporate members",
    description: "Elected from the corporate members",
  },
  {
    title: "Three members",
    description: "Nominated by the Minister in charge of Finance",
  },
  {
    title: "Secretary to the Ministry of Education, or nominee",
    description: "Nominated",
  },
];


  return (
    <section id="governance" className="scroll-mt-8">
      <p className="text-xs font-bold tracking-[0.18em] text-accta-maroon">
        GOVERNANCE
      </p>

      <h2 className="mt-3 font-serif text-3xl font-bold text-accta-navy">
        Governing Council
      </h2>

      {/* Council Members */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {councilMembers.map((member) => (
          <article
            key={`${member.role}-${member.name}`}
            className="overflow-hidden rounded-md border border-accta-border bg-white"
          >
            {/* Placeholder for future image */}
            <div className="relative aspect-[3/3] w-full bg-accta-surface sm:aspect-[4/3] lg:h-60 lg:aspect-auto">
  {member.image ? (
    <Image
      src={member.image}
      alt={member.name}
      fill
      className="object-cover object-top"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
  ) : (
    <div className="flex h-full items-center justify-center text-xs text-accta-muted">
      [Photo]
    </div>
  )}
</div>

            <div className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-accta-maroon">
                {member.role}
              </p>

              <h3 className="mt-2 font-serif text-base font-bold leading-5 text-accta-ink">
                {member.name}
              </h3>
            </div>
          </article>
        ))}
      </div>

      {/* Council Composition */}
      <div className="mt-16">
        <h2 className="font-serif text-3xl font-bold text-accta-navy">
          Council composition
        </h2>

        <div className="mt-6 overflow-hidden rounded-md border border-accta-border">
          {councilComposition.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col justify-between gap-2 px-5 py-5 md:flex-row md:items-center ${
                index !== councilComposition.length - 1
                  ? "border-b border-accta-border"
                  : ""
              }`}
            >
              <h3 className="font-semibold text-accta-ink">{item.title}</h3>

              <p className="text-sm text-accta-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}