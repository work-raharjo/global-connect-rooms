
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const integrations = [
  { name: "Microsoft Outlook", logo: "📧", description: "Seamless calendar sync" },
  { name: "Google Calendar", logo: "📅", description: "Real-time scheduling" },
  { name: "Microsoft Teams", logo: "💼", description: "Meeting integration" },
  { name: "Zoom", logo: "📹", description: "Video conferencing" },
  { name: "Slack", logo: "💬", description: "Team notifications" },
  { name: "Azure AD", logo: "🔐", description: "Enterprise security" }
];

export const IntegrationsSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Integrations</Badge>
          <h2 className="text-3xl font-bold mb-4">Works with Your Existing Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Seamlessly integrate with the platforms your organization already uses.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {integrations.map((integration, index) => (
            <Card key={index} className="group hover:shadow-md transition-all duration-300 border-0 bg-gray-50/50 hover:bg-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">{integration.logo}</div>
                <h3 className="font-medium text-sm mb-1">{integration.name}</h3>
                <p className="text-xs text-muted-foreground">{integration.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
