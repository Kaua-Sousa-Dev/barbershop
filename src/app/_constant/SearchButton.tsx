import { Button } from "../_components/ui/button"
import Image from "next/image"

interface QuickSearchOptions {
  imageURL: string
  title: string
}
export const quichSearchOptions: QuickSearchOptions[] = [
  {
    imageURL: "IconCabelo.svg",
    title: "Cabelo",
  },
  {
    imageURL: "IconBarba.svg",
    title: "Barba",
  },
  {
    imageURL: "IconAcabamento.svg",
    title: "Acabamento",
  },
  {
    imageURL: "IconSobran.svg",
    title: "Sobrancelha",
  },
  {
    imageURL: "IconHidratacao.svg",
    title: "Hidratação",
  },
  {
    imageURL: "IconMassagem.svg",
    title: "Massagem",
  },
]

const SearchButton = () => {
  return (
    <>
      {/* Busca Rápida */}
      <div className="mt-2 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quichSearchOptions.map((Option) => (
          <Button className="mt-3 gap-2" variant="secondary" key={Option.title}>
            <Image src={Option.imageURL} alt="Cabelo" width={16} height={16} />
            {Option.title}
          </Button>
        ))}
      </div>
    </>
  )
}

export default SearchButton
