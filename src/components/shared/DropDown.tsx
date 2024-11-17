import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'


const DropDown = () => {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
        <AlignJustify/>
      </DropdownMenuTrigger>
  <DropdownMenuContent>
    {/* <DropdownMenuLabel>
    
    </DropdownMenuLabel> */}
    <DropdownMenuSeparator />
    <DropdownMenuItem>
    <Link href={"/about"}>About</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
    <Link href={"/faq"}>FAQ</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
    <Link href={"/contact"}>Contact</Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default DropDown