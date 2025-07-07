import LandingHero from "./(landing)/page";
import AnimatedCursor from "@/components/AnimatedCursor";

export default function Home() {
  return (
    <>
      <main className="bg-gray-50 min-h-screen ">
         <AnimatedCursor />
        <LandingHero />
      </main>
    </>
  );
}
