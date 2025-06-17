
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">GC</span>
          </div>
          <span className="font-semibold text-xl">GlobalConnect</span>
          <span className="text-sm text-muted-foreground">Rooms</span>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <div className="grid gap-1">
                    <h3 className="font-medium">Room Booking</h3>
                    <p className="text-sm text-muted-foreground">Effortless reservations with real-time availability</p>
                  </div>
                  <div className="grid gap-1">
                    <h3 className="font-medium">Wayfinding</h3>
                    <p className="text-sm text-muted-foreground">Interactive maps and multilingual navigation</p>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost">Features</Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost">Integrations</Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">Contact</Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
};
