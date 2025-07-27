import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { 
  User as UserIcon, 
  FileText, 
  History, 
  Heart, 
  Building, 
  DollarSign, 
  Star, 
  Bell, 
  LogOut,
  Settings,
  Users,
  PlusCircle,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UserProfile = {
  id: string;
  role: 'renter' | 'owner';
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
  company_name: string | null;
  company_inn: string | null;
  is_verified: boolean;
  created_at: string;
};

// Mock user data for demo
const mockProfile: UserProfile = {
  id: '1',
  role: 'owner',
  first_name: 'Иван',
  last_name: 'Петров',
  email: 'ivan@example.com',
  phone: '+996 555 123 456',
  avatar_url: null,
  company_name: 'ОсОО "СтройТех"',
  company_inn: '12345678901234',
  is_verified: true,
  created_at: new Date().toISOString(),
};

const AppSidebar = ({ profile, activeTab, setActiveTab }: { 
  profile: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renterMenuItems = [
    { id: "profile", title: "Мой профиль", icon: UserIcon },
    { id: "requests", title: "Мои заявки", icon: FileText },
    { id: "history", title: "История аренды", icon: History },
    { id: "favorites", title: "Избранное", icon: Heart },
  ];

  const ownerMenuItems = [
    { id: "profile", title: "Мой профиль", icon: UserIcon },
    { id: "equipment", title: "Моя техника", icon: Building },
    { id: "requests", title: "Заявки", icon: Users },
    { id: "finances", title: "Финансы", icon: DollarSign },
    { id: "reviews", title: "Отзывы", icon: Star },
    { id: "analytics", title: "Аналитика", icon: BarChart3 },
  ];

  const menuItems = profile.role === 'owner' ? ownerMenuItems : renterMenuItems;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            {profile.role === 'owner' ? 'Владелец техники' : 'Арендатор'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full justify-start ${
                      activeTab === item.id ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const ProfileContent = ({ profile }: { profile: UserProfile }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Личные данные
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Имя</label>
              <p className="font-medium">{profile.first_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Фамилия</label>
              <p className="font-medium">{profile.last_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="font-medium">{profile.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Телефон</label>
              <p className="font-medium">{profile.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Статус</label>
              <div className="flex items-center gap-2">
                <Badge variant={profile.is_verified ? "default" : "secondary"}>
                  {profile.is_verified ? "Подтвержден" : "Не подтвержден"}
                </Badge>
              </div>
            </div>
          </div>
          
          {profile.role === 'owner' && (
            <div className="border-t pt-4 space-y-4">
              <h3 className="font-semibold">Данные компании</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Название компании</label>
                  <p className="font-medium">{profile.company_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ИНН</label>
                  <p className="font-medium">{profile.company_inn}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Редактировать
            </Button>
            {profile.role === 'renter' && !profile.is_verified && (
              <Button>
                Подтвердить личность
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RequestsContent = ({ profile }: { profile: UserProfile }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {profile.role === 'owner' ? 'Входящие заявки' : 'Мои заявки'}
        </CardTitle>
        <CardDescription>
          {profile.role === 'owner' 
            ? 'Заявки на аренду вашей техники' 
            : 'Ваши запросы на аренду техники'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Заявки пока отсутствуют</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const EquipmentContent = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="h-5 w-5" />
          Моя техника
        </CardTitle>
        <CardDescription>
          Управление вашим парком техники
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Building className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">Техника пока не добавлена</p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Добавить технику
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);

const FavoritesContent = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Избранное
        </CardTitle>
        <CardDescription>
          Сохраненная техника для аренды
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Избранная техника пока отсутствует</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const Dashboard = () => {
  const [profile] = useState<UserProfile>(mockProfile);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Выход",
      description: "Вы успешно вышли из аккаунта",
    });
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent profile={profile} />;
      case "requests":
        return <RequestsContent profile={profile} />;
      case "equipment":
        return <EquipmentContent />;
      case "favorites":
        return <FavoritesContent />;
      default:
        return <ProfileContent profile={profile} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Global header with trigger */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border flex items-center justify-between px-4 z-50">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="font-heading text-xl font-bold">
              arenda.kg
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </header>

        <div className="flex flex-1 pt-16">
          <AppSidebar profile={profile} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Добро пожаловать, {profile.first_name}!
                </h2>
                <p className="text-muted-foreground">
                  {profile.role === 'owner' 
                    ? 'Управляйте своей техникой и заявками' 
                    : 'Ищите и арендуйте технику'
                  }
                </p>
              </div>
              
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;