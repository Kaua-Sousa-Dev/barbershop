"use client"

import { Barbershop, barbershopService, Booking } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { createBooking } from "../_actions/create-booking"
import { addDays, isPast, isToday, set } from "date-fns"
import { toast } from "sonner"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SingInDialog from "./sing-in-dailog"

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

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimelist = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number)

    const timeIsOnPast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnPast && isToday(selectedDay)) {
      return false
    }

    const hasBookingCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    return !hasBookingCurrentTime
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return // Adiciona verificação para evitar chamadas desnecessárias
      try {
        const bookings = await getBookings({
          date: selectedDay,
          serviceId: service.id,
        })
        setDayBookings(bookings)
      } catch (error) {
        console.error("Erro ao buscar reservas:", error)
        toast.error("Erro ao buscar reservas!")
      }
    }
    fetch()
  }, [selectedDay, service.id])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleSelectedTime = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return

      const [hour, minute] = selectedTime.split(":").map(Number)
      const newDate = set(selectedDay, { hours: hour, minutes: minute })

      await createBooking({
        serviceId: service.id,
        date: newDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error("Erro ao criar reserva:", error)
      toast.error("Erro ao criar reserva!")
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimelist({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
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

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="h-[22px] w-[260px] text-sm text-gray-400">
              {service.description}
            </p>

            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("PT-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

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
                      fromDate={addDays(new Date(), 0)}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: { width: "100%" },
                        button: { width: "100%" },
                        nav_button_previous: { width: "32px", height: "32px" },
                        nav_button_next: { width: "32px", height: "32px" },
                        caption: { textTransform: "capitalize" },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-2 overflow-x-auto border-b border-solid py-4 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
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
                        ))
                      ) : (
                        <p className="text-xs">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
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
                  <SheetFooter className="mt-5 px-5">
                    <Button
                      type="submit"
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SingInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
