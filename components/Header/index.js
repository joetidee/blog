import { useState } from 'react'
import Image from 'next/image'
import { HamburgerSpin } from 'react-animated-burgers'

import { AUTHOR } from '@/lib/constants'
import ThemeToggler from '@/components/ThemeToggler'
import Menu from '@/components/Menu'

import { ICON_SIZES } from '@/lib/constants'

import { StyledHeader } from './styles'

const Header = ({ theme, themeToggler }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <StyledHeader>
        <Image
          src="/assets/authors/dastasoft.jpeg"
          alt={AUTHOR}
          {...ICON_SIZES}
        />
        <span>{AUTHOR}</span>
        <ThemeToggler theme={theme} onToggle={themeToggler} />
        <HamburgerSpin
          toggleButton={() => setMenuOpen(!menuOpen)}
          isActive={menuOpen}
        />
      </StyledHeader>
      <Menu isOpen={menuOpen} />
    </>
  )
}

export default Header
