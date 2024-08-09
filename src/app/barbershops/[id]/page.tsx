import PhoneItem from "@/app/_components/phone-component"
import ServiceItem from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarberShopPageProps) => {
  // chamar banco de dados
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop?.name}
          src={barbershop?.imageURL}
          fill
          className="object-cover"
        />

        <Link href={`/`}>
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-4"
          >
            <ChevronLeftIcon />
          </Button>
        </Link>

        <Link href={``}>
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-4"
          >
            <MenuIcon />
          </Button>
        </Link>
      </div>

      {/* Texto */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-1 text-lg font-bold">{barbershop?.name}</h1>
        <div className="mb-1 flex items-center gap-1">
          <MapPinIcon className="text-primary" />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="mb-2 flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" />
          <p className="ml-1 text-sm">5.0 (890 avaliações)</p>
        </div>
      </div>

      {/* Descrição */}
      <div className="border-b border-solid p-5">
        <h2 className="text-xl font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* Serviços */}
      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Serviços */}
      <div className="space-y-3 p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Contato</h2>
        {/* Direita */}
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </>
  )
}

export default BarbershopPage
