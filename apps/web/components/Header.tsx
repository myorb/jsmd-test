import Link from 'next/link'
import { Home, Github, LogIn } from 'lucide-react'

export default function Header() {
    return (
        <div className="flex gap-2 items-center justify-between shadow-md">
            <Link href='/'><h1 className="text-3xl font-bold m-3 text-center flex items-center justify-center"><Home className="mr-2" />JSMD Experiences</h1></Link>
            <div className='flex gap-2'>
                <Link href='https://github.com/myorb/jsmd-test' target='_blank' className='text-center'><p className="text-md font-bold m-3 text-center flex"><Github /> Code</p></Link>
                <Link href='/login' className='text-center'><p className="text-md font-bold m-3 text-center flex">Login<LogIn /></p></Link>
            </div>
        </div>
    )
}