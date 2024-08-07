import { MenuIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"

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
          <Button variant={"outline"} size="icon">
            <MenuIcon />
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

export default Header
