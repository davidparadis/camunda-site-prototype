const columns = [
  {
    title: "Product",
    links: ["Platform", "Modeler", "Connectors", "Pricing"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Blog", "Academy", "Community"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="text-xl font-bold tracking-tight text-white">
              CAMUNDA
            </p>
            <p className="mt-3 text-sm text-[#A0A0A0]">
              The Business Orchestration Company.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#A0A0A0] transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-[#2A2A2A] pt-8 text-center text-xs text-[#A0A0A0]">
          &copy; {new Date().getFullYear()} Camunda Services GmbH. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
