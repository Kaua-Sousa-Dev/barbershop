import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"

const Search = () => {
  return (
    <>
      {/* Texto */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, ser humano</h2>
        <p>Domingo, 04 de agosto</p>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Search" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/Banner01.png"
            alt="Agende nos melhores com BarberShop"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamento */}
        <Card className="mt-6">
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia Ks.Lima</p>
              </div>
            </div>

            {/* Direita */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Search
