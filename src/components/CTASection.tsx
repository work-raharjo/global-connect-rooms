
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowDown } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <Card className="border-0 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Workspace?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join global humanitarian organizations already using GlobalConnect Rooms 
              to create more efficient, inclusive, and impactful meeting experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Start Free Trial
              </Button>
            </div>
            
            <div className="flex items-center justify-center text-sm opacity-75">
              <ArrowDown className="h-4 w-4 mr-2" />
              No credit card required • 30-day free trial
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
