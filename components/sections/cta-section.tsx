import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";

export function CtaSection() {
  return (
    <section className="  py-20 md:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/10 via-accent/5 to-background p-8 md:p-16">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Ready to Automate Your Workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already boosting their productivity
            with our Telegram bots. Get started in minutes, completely free.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="gap-2">
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a
                href="https://github.com/Ahmad-Softwaree"
                target="_blank"
                rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
