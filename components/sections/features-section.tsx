"use client";

import { Zap, Shield, Code, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SlideUp, StaggerContainer } from "@/components/shared/animate";
import { motion } from "framer-motion";

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section className="  py-20 md:py-24">
      <SlideUp>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Why Choose Our Bots?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built with modern technology and best practices to deliver
            exceptional automation experiences.
          </p>
        </div>
      </SlideUp>

      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}>
              <Card className="border-border/40 h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <motion.div
                    className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}>
                    <Icon className="h-6 w-6 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
