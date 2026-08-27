import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Code2,
  Database,
  Cpu,
  Layers,
  GraduationCap,
  BadgeCheck,
  Send,
  Search,
  X,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PortfolioChat } from "@/components/PortfolioChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import cvAsset from "@/assets/cv.pdf.asset.json";

const TITLE = "Kishore Kumar Reddy — Full Stack & AI/ML Developer";
const DESCRIPTION =
  "Portfolio of Danareddy Gari Kishore Kumar Reddy: full stack web applications, backend systems, DBMS design and hardware-software integration projects.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const GITHUB_URL = "https://github.com/";
const LINKEDIN_URL = "https://www.linkedin.com/in/dg-kishore-kumar-reddy-a17a2a39b/";
const INSTAGRAM_URL = "https://www.instagram.com/?hl=en";
const EMAIL = "reddydkishore57@gmail.com";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SKILL_GROUPS = [
  {
    title: "Languages",
    icon: Code2,
    items: ["Python", "JavaScript", "C"],
  },
  {
    title: "Web Technologies",
    icon: Layers,
    items: ["HTML5", "CSS3", "Responsive Web Design", "REST API Concepts"],
  },
  {
    title: "Databases & Systems",
    icon: Database,
    items: ["SQL", "DBMS (Design & Optimization)", "Sensor Systems", "Embedded Logic"],
  },
  {
    title: "Core Engineering",
    icon: Cpu,
    items: [
      "CRUD Workflows",
      "Data Structures",
      "Hardware-Software Integration",
      "UI/UX Fundamentals",
    ],
  },
];

type Project = {
  title: string;
  category: "Web Dev" | "Hardware/IoT";
  tags: string[];
  short: string;
  description: string;
  highlights: string[];
};

const PROJECTS: Project[] = [
  {
    title: "Student Expense Tracker",
    category: "Web Dev",
    tags: ["HTML", "CSS", "JavaScript"],
    short:
      "Dynamic expense management application designed to record, manage, and monitor daily student spending.",
    description:
      "Developed a user-friendly Student Expense Tracker to efficiently manage financial records, categorize expenses, and track total expenditures.",
    highlights: [
      "Full CRUD functionality to add, view, update, and delete expense records",
      "Integrated expense categorization and dynamic total spending calculations",
      "Clean, simple interface designed for seamless daily financial tracking",
    ],
  },
  {
    title: "Laser & Piezoelectric Smart Security System",
    category: "Hardware/IoT",
    tags: ["Embedded Logic", "Sensors", "Hardware Integration"],
    short:
      "Dual-layer real-time intrusion detection using laser and piezoelectric sensor cross-validation.",
    description:
      "Real-time dual-layer intrusion detection system using laser and piezoelectric sensors. Implemented cross-validation triggers to significantly reduce false alarm rates.",
    highlights: [
      "Dual-sensor architecture for redundant detection",
      "Cross-validation trigger logic to cut false alarms",
      "Real-time signal handling with embedded control logic",
    ],
  },
];

const FILTERS = ["All", "Web Dev", "Hardware/IoT"] as const;

const EDUCATION = [
  {
    school: "Lovely Professional University",
    detail: "B.Tech CSE — AI & ML Specialization",
    period: "2024 - 2028",
    score: "CGPA: 8.5 / 10.0",
  },
  {
    school: "Sri Chaitanya College",
    detail: "Intermediate — Class XII",
    period: "Completed",
    score: "96.3%",
  },
  {
    school: "Keshava Reddy School",
    detail: "Secondary — Class X",
    period: "Completed",
    score: "94.1%",
  },
];

const CERTIFICATIONS = [
  { name: "Python Programming", issuer: "Infosys Springboard" },
  { name: "Database Management Systems", issuer: "CodeTantra" },
  { name: "C Programming", issuer: "NeoColab" },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-3xl font-extrabold uppercase tracking-normal text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function Index() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<Project | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const visible = PROJECTS.filter((p) => {
    const matchesFilter = filter === "All" || p.category === filter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      [p.title, p.short, p.description, ...p.tags].join(" ").toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || name.length > 100) {
      toast.error("Please enter a valid name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!message || message.length > 1000) {
      toast.error("Message must be between 1 and 1000 characters.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f412da53-720e-432c-956b-a7c6cca5f377",
          name,
          email,
          message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Thanks! Your message has been sent successfully.");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <PortfolioChat />


      {/* Nav */}
      <header className="sticky top-0 z-40 glass border-x-0 border-t-0">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5">
          <div className="flex items-center gap-2.5 shrink-0 mr-auto">
  <a
    href="/kishore.jpeg"
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border/60 hover:opacity-80 transition-opacity"
    title="Click to view photo"
  >
    <img
      src="/kishore.jpeg"
      alt="Kishore"
      className="aspect-square h-full w-full object-cover"
    />
  </a>
  <a href="#top" className="truncate text-sm font-bold tracking-tight text-foreground">
    KISHORE<span className="text-gradient">  ASPIRING  FULL-STACK  DEVELOPER</span>
  </a>
</div>
          <div className="hidden shrink-0 items-center gap-6 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-border bg-background px-3.5 py-1.5 text-base font-medium text-foreground transition-all hover:bg-accent/10 hover:border-accent/40"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="relative hidden shrink-0 items-center sm:flex">
            <Search className="pointer-events-none absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-32 rounded-full border-border bg-background text-foreground placeholder:text-muted-foreground pl-8 pr-3 text-xs focus-visible:w-48 transition-all"
            />
          </div>
          <ThemeToggle className="shrink-0" />
          <a href="#contact" className="shrink-0 md:hidden">

            <Button variant="glass" size="sm">
              Contact
            </Button>
          </a>
          {/* <a
            href={"/CV.pdf"}
            download="Kishore_Kumar_Reddy_CV.pdf"
            className="hidden shrink-0 md:block"
          >
            <Button variant="glass" size="sm">
              <Download /> CV
            </Button>
          </a> */}
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pb-24 pt-10 sm:pt-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] hero-glow" />
          <div className="relative mx-auto max-w-6xl">
            {/* <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Open to internships & collaborations
            </span> */}
            <h1 className="mt-0 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
              Hi, I'm <span className="text-gradient">Danareddy Gari Kishore Kumar Reddy</span>
            </h1>
            <p className="mt-5 text-lg font-medium text-foreground/85 sm:text-xl">
              Full Stack Developer | AI &amp; ML Specialist | Hardware Integration Enthusiast
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Building responsive web applications, backend systems, and hardware-software
              integrations with clean code and smart logic.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects">
                <Button variant="hero" size="xl">
                  View Projects <ArrowRight />
                </Button>
              </a>
              <a href={"/CV.pdf"} download="Kishore_Kumar_Reddy_CV.pdf">
                <Button variant="glass" size="xl">
                  <Download /> Download CV
                </Button>
              </a>
              <a href="#contact">
                <Button variant="glass" size="xl">
                  Contact Me
                </Button>
              </a>
              <div className="ml-1 flex items-center gap-2">
                {[
                  { href: GITHUB_URL, icon: Github, label: "GitHub" },
                  { href: LINKEDIN_URL, icon: Linkedin, label: "LinkedIn" },
                  { href: INSTAGRAM_URL, icon: Instagram, label: "Instagram" },
                  { href: `mailto:${EMAIL}`, icon: Mail, label: "Email" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={label}
                    className="glass grid h-11 w-11 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:text-accent"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
              {/* Replace lines 308 to 330 with this clean block: */}
<div className="mt-8 space-y-4 w-full">
  <p className="text-muted-foreground text-base leading-relaxed">
    Full-stack developer with a focus on AI/ML applications and hardware-software integration. Experienced in end-to-end development, from designing responsive frontend components to setting up backend logic, database schemas, and IoT sensor interfaces.
  </p>

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 sm:grid-cols-3 w-full pt-2 text-base text-muted-foreground">
    <div>
      <span className="font-bold text-foreground block mb-1">Core Focus</span>
      Building high-availability web applications and intelligent hardware integrations.
    </div>
    <div>
      <span className="font-semibold text-foreground block mb-1">Problem Solving</span>
      Translating real-world requirements into clean code, optimized queries, and efficient algorithms.
    </div>
    <div>
      <span className="font-semibold text-foreground block mb-1">Engineering Standard</span>
      Clean code organization, modular component design, and responsive visual layouts.
    </div>
  </div>
</div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-5 py-4">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="About me" title="Engineering across the full stack" />
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 w-full">
              <div className="glass rounded-2xl p-7">
                <p className="text-base leading-relaxed text-muted-foreground">
                  I'm a Computer Science undergraduate specializing in{" "}
                  <span className="text-foreground">Artificial Intelligence & Machine Learning</span>{" "}
                  at Lovely Professional University, currently holding a CGPA of{" "}
                  <span className="text-foreground">8.5/10.0</span>.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  My work sits where software meets systems — designing full-stack architectures,
                  modelling and optimising relational databases, processing real-time data, and
                  wiring embedded hardware into clean, usable interfaces.
                </p>
              </div>
              <div className="grid gap-4 grid-cols-1 w-full">
                {[
                  "Full-stack architecture & clean code practices",
                  "Relational database design & optimization",
                  "Real-time data processing pipelines",
                  "Embedded hardware-software systems",
                ].map((item) => (
                  <div key={item} className="glass glass-hover rounded-xl px-5 py-4 text-sm">
                    <span className="mr-3 text-accent">▹</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="px-5 py-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Skills" title="Tools and fundamentals I build with" />
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 w-full">
              {SKILL_GROUPS.map(({ title, icon: Icon, items }) => (
                <div key={title} className="glass glass-hover rounded-2xl p-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-brand text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="truncate text-lg font-semibold">{title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground/85"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-18 space-y-8 w-full">
  <p className="text-muted-foreground text-base leading-relaxed">
    Proficient across modern software stacks and hardware interfaces. Capable of taking concepts from low-level system design and relational data modeling to polished frontend interfaces and embedded IoT triggers.
  </p>

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full pt-2 text-base text-muted-foreground">
    <div>
      <span className="font-bold text-foreground block mb-2">Languages</span>
      Core programming in Python, JavaScript, and C focused on algorithm efficiency, clean syntax, and system logic.
    </div>
    <div>
      <span className="font-semibold text-foreground block mb-2">Web Technologies</span>
      Building modern, mobile-first web layouts with semantic HTML5, CSS3, and scalable RESTful API integration.
    </div>
    <div>
      <span className="font-semibold text-foreground block mb-2">Databases & Systems</span>
      Relational database design, SQL query optimization, sensor signal integration, and embedded hardware logic.
    </div>
    <div>
      <span className="font-semibold text-foreground block mb-2">Core Engineering</span>
      Full-cycle development covering CRUD workflows, data structures, hardware-software syncing, and clean UI/UX.
    </div>
  </div>
</div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-5 py-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Projects" title="Things I've designed and shipped" />
            <div className="mb-8 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    filter === f
                      ? "bg-gradient-brand text-primary-foreground shadow-[var(--shadow-glow)]"
                      : "glass text-muted-foreground hover:text-accent"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
              {visible.map((project) => (
                <article key={project.title} className="glass glass-hover rounded-2xl p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-xl font-bold leading-snug">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.short}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="mt-6 -ml-2 text-accent hover:bg-secondary"
                    onClick={() => setActive(project)}
                  >
                    View details <ArrowRight />
                  </Button>
                </article>
              ))}
            </div>
            <div className="mt-18 space-y-6 w-full">
  <p className="text-muted-foreground text-base leading-relaxed">
    Detailed engineering breakdowns highlighting architectural design, data processing logic, and key technical capabilities for featured builds.
  </p>

  <div className="grid grid-cols-1 gap-12 pt-1 text-base text-muted-foreground">
    {/* First Project Breakdown */}
        <div className="space-y-3 pt-4 border-t border-border/40">
          <h4 className="text-base font-bold text-foreground">Student Expense Tracker</h4>
          <ul className="space-y-2">
            <li>
              <strong className="text-foreground">Core Workflows:</strong> Implements complete CRUD operations to add, view, update, and delete daily student financial records seamlessly.
            </li>
            <li>
              <strong className="text-foreground">Data Analytics:</strong> Features automated expense categorization and dynamic spending total calculations to evaluate student budget patterns.
            </li>
            <li>
              <strong className="text-foreground">User Interface:</strong> Built with a clean, responsive HTML/CSS/JS frontend designed for quick daily entry and clear visual tracking.
            </li>
          </ul>
        </div>
    {/* Second Project Breakdown */}
    <div className="space-y-3 pt-4 border-t border-border/40">
      <h4 className="text-base font-bold text-foreground">Laser & Piezoelectric Smart Security System</h4>
      <ul className="space-y-2">
        <li>
          <strong className="text-foreground">Dual-Layer Validation:</strong> Uses integrated laser and piezoelectric sensors to cross-check real-time environmental activity.
        </li>
        <li>
          <strong className="text-foreground">False Alarm Reduction:</strong> Evaluates concurrent hardware triggers to eliminate environmental noise and false positive alerts.
        </li>
        <li>
          <strong className="text-foreground">Embedded Control Logic:</strong> Programmed microcontrollers handle immediate sensor signal acquisition and low-latency processing.
        </li>
        <li>
          <strong className="text-foreground">Hardware-Software Sync:</strong> Transmits security status directly to a web interface for continuous monitoring and alerting.
        </li>
      </ul>
    </div>
  </div>
</div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="px-5 py-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow="Education" title="Academic foundation" />
            <div className="flex flex-col gap-10">
              <div className="relative border-l border-border pl-7">
                {EDUCATION.map((item) => (
                  <div key={item.school} className="relative pb-9 last:pb-0">
                    <span className="absolute -left-[35px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-gradient-brand ring-4 ring-background" />
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                      <h3 className="min-w-0 text-lg font-semibold">{item.school}</h3>
                      <span className="shrink-0 text-xs text-muted-foreground">{item.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                      <GraduationCap className="h-4 w-4" /> {item.score}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-14 pt-4">
              <SectionHeading eyebrow="Certifications" title="Verified credentials" />
              </div>
              <div className="space-y-4">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="glass glass-hover flex min-w-0 items-center gap-4 rounded-xl p-5"
                  >
                    <BadgeCheck className="h-6 w-6 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-5 py-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading title="" eyebrow="Contact / Get in touch" />
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: "Phagwara, Punjab, India", href: null },
                  { icon: Phone, label: "+91 63018 45520", href: "tel:+916301845520" },
                  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
                ].map(({ icon: Icon, label, href }) => (
                  <div key={label} className="glass flex min-w-0 items-center gap-4 rounded-xl p-5">
                    <Icon className="h-5 w-5 shrink-0 text-accent" />
                    {href ? (
                      <a
                        href={href}
                        className="min-w-0 truncate text-sm transition-colors hover:text-accent"
                      >
                        {label}
                      </a>
                    ) : (
                      <span className="min-w-0 truncate text-sm">{label}</span>
                    )}
                  </div>
                ))}
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground">Reach Out Anytime</h3>
              <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-7">
              <input type="hidden" name="access_key" value="f412da53-720e-432c-956b-a7c6cca5f377" />
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      maxLength={255}
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Your address"
                  />
                </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    maxLength={1000}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or role…"
                  />
                </div>
                <Button type="submit" variant="hero" size="xl" className="w-full">
                  Send message <Send />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="glass mt-10 border-x-0 border-b-0 px-5 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <p className="min-w-0 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Danareddy Gari Kishore Kumar Reddy. All rights reserved.
          </p>
          <div className="flex shrink-0 items-center gap-2">
            {[
              { href: GITHUB_URL, icon: Github, label: "GitHub" },
              { href: LINKEDIN_URL, icon: Linkedin, label: "LinkedIn" },
              { href: INSTAGRAM_URL, icon: Instagram, label: "Instagram" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Project modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-4 backdrop-blur-sm sm:items-center"
          onClick={() => setActive(null)}
        >
          <div
            className="glass max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  {active.category}
                </p>
                <h3 className="mt-2 text-xl font-bold leading-snug">{active.title}</h3>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="shrink-0 cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {active.description}
            </p>
            <ul className="mt-5 space-y-2">
              {active.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-accent">▹</span>
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {active.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
