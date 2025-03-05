export interface Experience {
    id: number
    title: string
    description: string
    price: number
    strikePrice: number | null
    numberOfPeople: number
    imageUrl: string
    locations: string[]
    timeSlots: { [key: string]: string[] | undefined };
  }
  
  