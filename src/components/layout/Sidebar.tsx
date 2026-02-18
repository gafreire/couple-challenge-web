import { useNavigate } from "react-router-dom";
import {
  Home,
  Heart,
  Target,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import {
  SidebarWrapper,
  SidebarNav,
  SidebarItem,
  SidebarLabel,
  CollapseButton,
  LogoutButton,
  SidebarHeader,
  SidebarLogo,
} from "./Sidebar.styles";
import React from "react";

interface SidebarProps {
  collapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapseChange }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Início" },
    { path: "/couple", icon: Heart, label: "Casal" },
    { path: "/challenges", icon: Target, label: "Desafios" },
    { path: "/profile", icon: User, label: "Perfil" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarWrapper $collapsed={collapsed}>
      <CollapseButton
        onClick={() => onCollapseChange(!collapsed)}
        type="button"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </CollapseButton>

      <SidebarHeader>
        <SidebarLogo $collapsed={collapsed}>Couple{"\n"}Challenge</SidebarLogo>
      </SidebarHeader>

      <SidebarNav>
        {navItems.map(({ path, icon: Icon, label }) => (
          <SidebarItem key={path} to={path} $collapsed={collapsed}>
            <Icon size={20} />
            <SidebarLabel $collapsed={collapsed}>{label}</SidebarLabel>
          </SidebarItem>
        ))}
      </SidebarNav>

      <LogoutButton onClick={handleLogout} type="button" $collapsed={collapsed}>
        <LogOut size={20} />
        <span>Sair</span>
      </LogoutButton>
    </SidebarWrapper>
  );
};

export default Sidebar;
