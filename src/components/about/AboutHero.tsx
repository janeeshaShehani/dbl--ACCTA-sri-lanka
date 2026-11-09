import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="bg-accta-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        
        {/* Breadcrumb */}
        <div className="mb-5 text-sm text-white/70">
          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>
          <span className="mx-1">/</span>
          <span>About ACCTA</span>
        </div>

        <h1 className="font-serif text-5xl font-bold tracking-tight ">
           About ACCTA
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-white/85 md:text-[16px]">
          A professional body established to promote excellence, integrity and professionalism in the practice of tax advisory services.
  
        </p>
      </div>
    </section>
  );
}
