import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Feature } from "../sections/features-section";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeatureCard = (val: Feature) => {
  return (
    <motion.div
      key={val.title}
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
            <val.icon className="h-6 w-6 text-primary" />
          </motion.div>
          <CardTitle className="text-xl">{val.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{val.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
