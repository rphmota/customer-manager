import { FC, ReactNode, useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

interface MenuItemData {
  icon: ReactNode
  label: string
  onClick?: () => void
}

interface GenericHeaderMenuProps {
  icon: ReactNode // Icon component to render
  menuItems: MenuItemData[] // Menu items array
}

export const GenericHeaderMenu: FC<GenericHeaderMenuProps> = ({
  icon,
  menuItems,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
      <MenuButton
        width="24px"
        height="24px"
        color="gray.400"
        transition="all .2s"
        _hover={{ cursor: 'pointer', filter: 'brightness(0.8)' }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {icon} {/* Render the icon passed as a prop */}
        teste
      </MenuButton>
      {/* Render the menu options using MenuList and MenuItem */}
      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => item.onClick?.()}>
            {item.icon} {/* Render the icon directly from MenuItemData */}
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
