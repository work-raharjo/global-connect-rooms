
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const integrations = [
  { name: "Microsoft Outlook", logo: "/lovable-uploads/826ea460-eca0-47e9-a9b8-379f873bb9bf.png", description: "Seamless calendar sync" },
  { name: "Google Calendar", logo: "/lovable-uploads/2797a371-6238-47b0-ae79-5c371064e48e.png", description: "Real-time scheduling" },
  { name: "Microsoft Teams", logo: "/lovable-uploads/6db60645-97f1-4a9a-be1b-91fcd5aeb526.png", description: "Meeting integration" },
  { name: "Zoom", logo: "/lovable-uploads/b5d46628-2976-4dbc-add1-e27e00c68705.png", description: "Video conferencing" },
  { name: "Figma", logo: "/lovable-uploads/1acf60a0-e587-4765-8a21-c099da27ba31.png", description: "Design collaboration" },
  { name: "Azure AD", logo: "/lovable-uploads/467970ca-a440-4fcf-9188-3501672107fe.png", description: "Enterprise security" }
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
                <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center">
                  <img 
                    src={integration.logo} 
                    alt={`${integration.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
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
