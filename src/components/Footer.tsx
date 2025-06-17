import { Badge } from "@/components/ui/badge";

export const Footer = () => {
  return (
    <footer className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">GC</span>
              </div>
              <span className="font-semibold text-xl">GlobalConnect</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Human-centered meeting room solutions for global humanitarian organizations.
            </p>
            <Badge variant="outline" className="w-fit">
              <span className="text-green-600">🌱</span>
              Carbon Neutral Platform
            </Badge>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Room Booking</li>
              <li>Wayfinding</li>
              <li>Analytics</li>
              <li>Mobile Apps</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Integrations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Microsoft 365</li>
              <li>Google Workspace</li>
              <li>Zoom</li>
              <li>Teams</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>24/7 Support</li>
              <li>Training</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 PT Galactic Indonesia Perkasa (gip.co.id)
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
