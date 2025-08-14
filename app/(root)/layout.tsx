import {ReactNode} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { isAuthenticated } from '@/lib/actions/auth.actions'
import { redirect } from 'next/navigation'
const RootLayout = async({children}:{children:ReactNode}) => {
  const isUserAuthenticated=await isAuthenticated();
  if(!isUserAuthenticated)redirect('/sign-in')
  return (
    <div className='root-layout p-6'>
      <nav className="fixed top-0 bg-black left-0 w-full z-50 p-4">
        <Link href="/" className='flex items-center gap-2'>
        {/* <Image src="/logo.svg" alt="Logo" width={38} height={32} /> */}
        <Image src="/Aceprep.png" alt="Logo" width={48} height={42} />
        <h2 className="text-primary-100">AcePrep</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout
