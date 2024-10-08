import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemprops {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemprops) => {
  return (
    <>
      <Card className="min-w-[167px] rounded-2xl">
        <CardContent className="p-0 px-1 pt-1">
          {/* Imagem */}
          <div className="relative h-[159px] w-full">
            <Image
              fill
              className="rounded-2xl object-cover"
              src={barbershop.imageURL}
              alt={barbershop.name}
            />

            <Badge className="absolute left-2 top-2" variant="secondary">
              <StarIcon size={12} className="fill-primary text-primary" />
              <p className="p-0.5 font-semibold">5,0</p>
            </Badge>
          </div>

          {/* Texto */}
          <div className="px-1 py-3">
            <h3 className="truncate font-semibold">{barbershop.name}</h3>
            <p className="truncate text-sm text-gray-400">
              {barbershop.address}
            </p>
            <Link href={`/barbershops/${barbershop.id}`}>
              <Button variant="secondary" className="mt-3 w-full">
                Reservar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BarbershopItem
