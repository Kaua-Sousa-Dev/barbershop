"use client"

import { CalendarIcon, HomeIcon, LogIn, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quichSearchOptions } from "../_constant/SearchButton"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SingInDialog from "./sing-in-dailog"

const Sheetsidebar = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data?.user?.image ?? ""} />
              </Avatar>

              <div>
                <p className="font-bold">{data?.user.name}</p>
                <p className="text-xs">{data?.user.email}</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-lg">Olá, faça seu login</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon" className="h-[35px] w-[40px]">
                    <LogIn />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <SingInDialog />
                </DialogContent>
              </Dialog>
            </>
          )}
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
            <SheetClose key={Option.title} asChild>
              <Button className="justify-start gap-2" variant="ghost" asChild>
                <Link href={`/barbershops?services=${Option.title}`}>
                  <Image
                    alt={Option.title}
                    src={Option.imageURL}
                    height={18}
                    width={18}
                  />
                  {Option.title}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

        {data?.user && (
          <div className="flex flex-col gap-2 border-solid py-5">
            <Button className="gap-2" onClick={handleLogoutClick}>
              <LogOutIcon size={20} />
              Sair da conta
            </Button>
          </div>
        )}
      </SheetContent>
    </>
  )
}

export default Sheetsidebar
