import Link from 'next/link'
import { Home } from 'lucide-react'

export default function Header() {
    return (
        <div className="flex gap-2 items-center justify-between shadow-md">
            <Link href='/'><h1 className="text-3xl font-bold m-3 text-center flex items-center justify-center"><Home className="mr-2" />JSMD Experiences</h1></Link>
            <Link href='/login' className='text-center'><p className="text-md font-bold m-3 text-center">Login</p></Link>
        </div>
    )
}