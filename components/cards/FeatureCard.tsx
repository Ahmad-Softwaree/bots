import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Feature } from "../sections/features-section";
import {
  FeatureCardMotion,
  CardHoverMotion,
} from "@/components/shared/animate";

const FeatureCard = (val: Feature) => {
  return (
    <FeatureCardMotion key={val.title}>
      <Card className="border-border/40 h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardHoverMotion className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <val.icon className="h-6 w-6 text-primary" />
          </CardHoverMotion>
          <CardTitle className="text-xl">{val.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{val.description}</p>
        </CardContent>
      </Card>
    </FeatureCardMotion>
  );
};

export default FeatureCard;
