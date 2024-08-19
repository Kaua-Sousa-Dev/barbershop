import { Card, CardContent } from "./ui/card"

const BookingSummary = () => {
  return (
    <>
      <Card>
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
              {selectedDay?.toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-sm">Horário</h2>
            <p className="text-sm font-bold text-primary">{selectedTime}</p>
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
