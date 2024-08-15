"use client"

import { Barbershop, barbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

interface ServiceItemProps {
  service: barbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleSelectedTime = (time: string) => {
    setSelectedTime(time)
  }

  return (
    <>
      {/* Imagem */}
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageURL}
              alt={service.name}
              fill
              className="rounded-xl object-cover"
            />
          </div>

          {/* Direita */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="h-[22px] w-[260px] text-sm text-gray-400">
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

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Faça sua reserva</SheetTitle>
                  </SheetHeader>
                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      className="rounded-md"
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-2 overflow-x-auto border-b border-solid py-4 [&::-webkit-scrollbar]:hidden">
                      {TIME_LIST.map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full"
                          onClick={() => handleSelectedTime(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedTime && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="space-y-1 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold">
                              {service.name}
                            </h2>
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
                            <p className="text-sm font-bold text-primary">
                              {selectedTime}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm">Barbearia</h2>
                            <p className="text-sm font-bold text-primary">
                              {barbershop.name}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <SheetFooter className="mt-2 px-5">
                    <SheetClose asChild>
                      <Button type="submit">Confirmar</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ServiceItem
