import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-center text-sm text-gray-400">
            <span className="font-bold">© 2023 Copyright Barbershop</span>
          </p>
        </CardContent>
      </Card>
    </>
  )
}

export default Footer
