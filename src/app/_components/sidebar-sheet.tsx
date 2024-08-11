import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quichSearchOptions } from "../_constant/SearchButton"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Sheetsidebar = () => {
  return (
    <>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-3 border-b border-solid py-5">
          <Avatar>
            <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbpn4T4OhforZp1rhcHfkShvSsmk3Z6CWKmg&s" />
          </Avatar>

          <div>
            <p className="font-bold">Kawan bala</p>
            <p className="text-xs">kawan124@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-solid py-5">
          <SheetClose asChild>
            <Button className="justify-start gap-2" asChild>
              <Link href="/">
                <HomeIcon size={18} />
                Início
              </Link>
            </Button>
          </SheetClose>

          <Button className="justify-start gap-2" variant="ghost">
            <CalendarIcon size={18} />
            Agendamentos
          </Button>
        </div>

        <div className="flex flex-col gap-4 border-b border-solid py-5">
          {quichSearchOptions.map((Option) => (
            <Button
              key={Option.title}
              className="justify-start gap-2"
              variant="ghost"
            >
              <Image
                alt={Option.title}
                src={Option.imageURL}
                height={18}
                width={18}
              />
              {Option.title}
            </Button>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-solid py-5">
          <Button className="gap-2">
            <LogOutIcon size={20} />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </>
  )
}

export default Sheetsidebar
