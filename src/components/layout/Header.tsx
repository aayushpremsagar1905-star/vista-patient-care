import { Search, Bell, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients, reports..."
              className="pl-10 bg-muted border-0 focus-visible:ring-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-xs text-destructive-foreground rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 ml-4">
            <Avatar className="h-8 w-8 bg-primary">
              <AvatarFallback className="text-primary-foreground text-sm font-medium">
                DJ
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">Dr. Sarah Johnson</div>
              <div className="text-muted-foreground text-xs">Chief Medical Officer</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}