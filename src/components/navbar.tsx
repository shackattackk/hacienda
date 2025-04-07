"use client"
import { Bell, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { UserButton } from "@clerk/nextjs"

export function Navbar() {
  const router = useRouter()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <HelpCircle className="h-5 w-5" />
          </Button>
         
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-8 w-8",
                userButtonPopover: "w-64"
              },
              variables: {
                colorPrimary: "rgb(5 150 105)"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

