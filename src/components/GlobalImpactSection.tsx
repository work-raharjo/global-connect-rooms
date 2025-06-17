
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { number: "150+", label: "Countries Supported", icon: "🌍" },
  { number: "50+", label: "Languages Available", icon: "🗣️" },
  { number: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
  { number: "24/7", label: "Global Support", icon: "🤝" }
];

const organizations = [
  "Fortune 500 Companies",
  "Technology Leaders", 
  "Global Enterprises",
  "Financial Services",
  "Consulting Firms",
  "Healthcare Organizations"
];

export const GlobalImpactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50/30 to-blue-50/30 dark:from-green-950/10 dark:to-blue-950/10">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Global Impact</Badge>
          <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering organizations around the world, one meeting at a time.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 bg-white/70 backdrop-blur">
              <CardContent className="p-6">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">Industries We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {organizations.map((org, index) => (
              <div key={index} className="p-4 rounded-lg bg-white/50 backdrop-blur text-sm font-medium text-center">
                {org}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
