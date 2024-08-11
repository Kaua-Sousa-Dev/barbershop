import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import Sheetsidebar from "./sidebar-sheet"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <>
      <Card>
        <CardContent className="flex flex-row items-center justify-between p-5">
          <Image
            src="/logoBarber.png"
            alt="Logo BarberShop"
            height={18}
            width={120}
          />

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <Sheetsidebar />
          </Sheet>
        </CardContent>
      </Card>
    </>
  )
}

export default Header
