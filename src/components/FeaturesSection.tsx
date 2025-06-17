
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Navigation } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Effortless Booking",
    description: "Real-time availability tracking with instant reservations that sync with your existing calendar systems.",
    benefits: ["One-click booking", "Real-time updates", "Calendar integration"]
  },
  {
    icon: MapPin,
    title: "Smart Wayfinding",
    description: "Interactive maps with multilingual support to navigate complex office buildings with confidence.",
    benefits: ["Interactive maps", "Multi-language", "Accessibility features"]
  },
  {
    icon: Users,
    title: "Global Accessibility",
    description: "Designed for diverse teams with inclusive interfaces supporting multiple languages and accessibility standards.",
    benefits: ["Universal design", "WCAG compliant", "Cultural sensitivity"]
  },
  {
    icon: Navigation,
    title: "IoT Integration",
    description: "Seamlessly connect with office infrastructure for automated room management and enhanced user experience.",
    benefits: ["Smart sensors", "Automated systems", "Energy efficiency"]
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50/30 dark:from-background dark:to-blue-950/10">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Core Features</Badge>
          <h2 className="text-3xl font-bold mb-4">Built for Global Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed with humanitarian organizations in mind, 
            prioritizing accessibility, efficiency, and seamless collaboration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {feature.benefits.map((benefit, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
