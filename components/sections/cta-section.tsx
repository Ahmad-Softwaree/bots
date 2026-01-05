"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import { Scale } from "@/components/shared/animate";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="  py-20 md:py-24">
      <Scale>
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-br from-primary/10 via-accent/5 to-background p-8 md:p-16">
          <motion.div
            className="relative z-10 mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Ready to Automate Your Workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already boosting their
              productivity with our Telegram bots. Get started in minutes,
              completely free.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="gap-2">
                  <a
                    href="https://wa.me/9647701993085"
                    target="_blank"
                    rel="noopener noreferrer">
                    Get Started Now
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a
                    href="https://github.com/Ahmad-Softwaree"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    Star on GitHub
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <motion.div
              className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.4, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
        </div>
      </Scale>
    </section>
  );
}
