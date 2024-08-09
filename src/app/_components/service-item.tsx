import { barbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface ServiceItemProps {
  service: barbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <>
      {/* Imagem */}
      <Card className="flex items-center gap-3">
        <CardContent className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            src={service.imageURL}
            alt={service.name}
            fill
            className="rounded-xl object-cover p-1"
          />
        </CardContent>

        {/* Direita */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="h-[22px] w-[310px] text-sm text-gray-400">
            {service.description}
          </p>

          {/* Preço */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("PT-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default ServiceItem
