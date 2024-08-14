import BarbershopItem from "../_components/barbershopItem"
import Header from "../_components/header"
import InputSearch from "../_components/SearchInput"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })

  return (
    <>
      <div className="">
        <Header />

        <div className="my-6 px-5">
          <InputSearch />
        </div>
        <div className="px-5">
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            resultados para &quot;{searchParams.search}&quot;
          </h2>

          <div className="mb-4 grid grid-cols-2 gap-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BarbershopsPage
