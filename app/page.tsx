import { ShinyButton } from "@/components/mage-ui/button/shiny-button";
import { SecondaryButton } from "@/components/mage-ui/button/secondary-button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
          Welcome to{" "}
          <span className="text-primary">Talib's Portfolio</span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          A professional showcase of innovative projects, technical expertise, and creative solutions.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <ShinyButton className="px-8 py-3">
            View Projects
          </ShinyButton>
          <SecondaryButton className="px-8 py-3">
            Contact Me
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
