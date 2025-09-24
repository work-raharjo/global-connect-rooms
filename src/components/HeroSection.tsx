
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Calendar, MapPin, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-6 bg-background/50 backdrop-blur">
            <span className="text-blue-600">🌍</span>
            Powering Modern Workplaces
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            <span className="text-primary">Smart Meeting Spaces</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Effortless Solutions
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Effortless room reservations and intuitive wayfinding tailored for UNDP facilities. 
            Seamlessly integrate with your development workflow while supporting global teams and missions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/booking-demo">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Try Booking Demo
              </Button>
            </Link>
            <Link to="/room-booking">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Monitor className="mr-2 h-5 w-5" />
                Smart Booking System
              </Button>
            </Link>
            <Link to="/wayfinding-demo">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <MapPin className="mr-2 h-5 w-5" />
                Try Wayfinding Demo
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <ArrowDown className="h-4 w-4 mr-2 animate-bounce" />
            Trusted by companies worldwide
          </div>
        </div>
      </div>
    </section>
  );
};
