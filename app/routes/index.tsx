import { Logo } from "~/components/logo";
import { HorizontalScrollSection } from "~/components/horizontal-scroll-section";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router + Tailwind v4 + shadcn" },
    { name: "description", content: "Starter with dark mode support" },
  ];
}

export default function IndexRoute() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between w-full py-4 px-6">
        <Logo />
        <button className="text-lg font-medium">Say Hello</button>
      </div>

      <HorizontalScrollSection
        contentAbove={
          <section className="flex flex-col gap-4 px-16 py-16">
            <div className="flex flex-col font-thin uppercase text-sm">
              <p>Senior Software Engineer</p>
              <p>Specializing in full-stack development & design systems.</p>
            </div>

            <div className="flex flex-col text-6xl tracking-tight font-medium">
              <p>Welcome!</p>
              <p>From designers to</p>
              <p>developers, we've</p>
              <p>got you covered.</p>
            </div>
          </section>
        }
        contentBelow={
          <section className="flex flex-col h-dvh min-h-dvh px-10 py-12">
            <div className="size-full rounded-3xl bg-[#E63946]" />
          </section>
        }
        slides={[
          <div className="w-full h-full bg-[#E63946] rounded-3xl" />,
          <div className="w-full h-full bg-[#1A1A1A] rounded-3xl" />,
          <div className="w-full h-full bg-[#E63946] rounded-3xl" />,
          <div className="w-full h-full bg-[#1A1A1A] rounded-3xl" />,
          <div className="w-full h-full bg-[#E63946] rounded-3xl" />,
          <div className="w-full h-full bg-[#1A1A1A] rounded-3xl" />,
        ]}
      />
    </div>
  );
}
