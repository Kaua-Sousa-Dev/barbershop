import { Barbershop, barbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BooksSummaryProps {
  service: Pick<barbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BooksSummaryProps) => {
  return (
    <>
      <Card className="lg:w-[300px]">
        <CardContent className="space-y-1 p-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">{service.name}</h2>
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("PT-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm">Data</h2>
            <p className="text-sm font-bold text-primary">
              {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm">Horário</h2>
            <p className="text-sm font-bold text-primary">
              {format(selectedDate, "HH:mm")}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm">Barbearia</h2>
            <p className="text-sm font-bold text-primary">{barbershop.name}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingSummary
