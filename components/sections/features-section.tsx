import { Zap, Shield, Code, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Instant responses and quick task execution to save your valuable time.",
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description:
      "Built with security in mind, ensuring your data and privacy are protected.",
  },
  {
    icon: Code,
    title: "Open Source",
    description:
      "All bots are open-source. Contribute, customize, or learn from the code.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Always online and ready to assist you whenever you need them.",
  },
];

export function FeaturesSection() {
  return (
    <section className="  py-20 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
          Why Choose Our Bots?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Built with modern technology and best practices to deliver exceptional
          automation experiences.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="border-border/40">
              <CardHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
