import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Image from "next/image"

const Search = () => {
  return (
    <>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, ser humano</h2>
        <p>Domingo, 04 de agosto</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Search" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/Banner01.png"
            alt="Agende nos melhores com BarberShop"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </>
  )
}

export default Search
