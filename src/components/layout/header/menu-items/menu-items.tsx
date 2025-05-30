import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import { useTranslations } from '@deriv-com/translations';
import { MenuItem, Text, useDevice } from '@deriv-com/ui';
import { MenuItems as items, TRADERS_HUB_LINK_CONFIG } from '../header-config';
import './menu-items.scss';

export const MenuItems = observer(() => {
    const { localize } = useTranslations();
    const { isDesktop } = useDevice();
    const store = useStore();
    if (!store) return null;
    const { is_logged_in } = store.client;

    return (
        <>
            {is_logged_in &&
                items.map(({ as, href, icon, label }) => (
                    <MenuItem 
                        as={as} 
                        className={isDesktop ? 'app-header__menu' : 'flex gap-2 p-5'} 
                        href={href} 
                        key={label} 
                        leftComponent={icon}
                    >
                        <Text>{localize(label)}</Text>
                    </MenuItem>
                ))}
        </>
    );
});

export const TradershubLink = () => (
    <MenuItem
        as='a'
        className='app-header__menu'
        href={TRADERS_HUB_LINK_CONFIG.href}
        key={TRADERS_HUB_LINK_CONFIG.label}
        leftComponent={TRADERS_HUB_LINK_CONFIG.icon}
    >
        <Text>{TRADERS_HUB_LINK_CONFIG.label}</Text>
    </MenuItem>
);

MenuItems.TradershubLink = TradershubLink;
export default MenuItems;
