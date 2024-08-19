import Image from "next/image"
import { db } from "../_lib/prisma"
import BarbershopItem from "./barbershopItem"
import SearchButton from "../_constant/SearchButton"
import InputSearch from "./SearchInput"
import BookingItem from "./booking-item"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

// No seu componente Search:
const Search = async () => {
  // Buscar barbearias
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  // Buscar agendamentos
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, ser humano</h2>
        <p>Domingo, 04 de agosto</p>

        <div className="mt-6">
          <InputSearch />
        </div>
        <SearchButton />

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/Banner01.png"
            alt="Agende nos melhores com BarberShop"
            fill
            className="rounded-xl object-cover"
            quality={100}
          />
        </div>

        {/* Renderizar agendamentos */}
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="mb-3 mt-5 text-base font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-5 text-base font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Search
