import { Home, Heart, Target, CheckSquare, User } from 'lucide-react';
import { Nav, NavItem, NavLabel } from './BottomNav.styles';

const BottomNav = () => {
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Início' },
    { path: '/couple', icon: Heart, label: 'Casal' },
    { path: '/challenges', icon: Target, label: 'Desafios' },
    { path: '/tasks', icon: CheckSquare, label: 'Tarefas' },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <Nav>
      {navItems.map(({ path, icon: Icon, label }) => (
        <NavItem key={path} to={path}>
          <Icon size={24} />
          <NavLabel>{label}</NavLabel>
        </NavItem>
      ))}
    </Nav>
  );
};

export default BottomNav;