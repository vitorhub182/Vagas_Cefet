"use client";
import { 
  LucideIcon,
  House,
  CircleUserRound,
  Bell,
  LockKeyhole,
  UserCheck,
  LogOut } from "lucide-react";

  import SidebarItem from "./item";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const logout: ISidebarItem[] = [
  {
    name: "Logout",
    path: "/login",
    icon: LogOut,
  }
]
const items: ISidebarItem[] = [
  {
    name: "Minha Área",
    path: "/myArea",
    icon: House,
  },
  {
    name: "Vagas",
    path: "/",
    icon: UserCheck,
  },
  {
    name: "Notificações",
    path: "/notificacao",
    icon: Bell,
  },
  {
    name: "Perfil",
    path: "/perfil",
    icon: CircleUserRound,
  },
  {
    name: "Conta",
    path: "/perfil",
    icon: LockKeyhole,
    items: [
      {
        name: "Alterar senha",
        path: "/settings/security",
      },
      {
        name: "Atualizar Currículo",
        path: "/settings/curriculum",
      },
    ],
  },
];
interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
      <div className="flex flex-col space-y-10 w-full">
        <img className="h-20 w-fit" src="/logo-expanded.png" alt="Logo" />
        <div className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {logout.map((item, index) => (
            <SidebarItem key={index} item={item} onClick={onLogout} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;