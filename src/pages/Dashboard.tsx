import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
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
  user_id: string;
  role: 'renter' | 'owner';
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  company_name: string | null;
  company_inn: string | null;
  company_logo_url: string | null;
  payment_details: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
};

const AppSidebar = ({ profile, activeTab, setActiveTab }: { 
  profile: UserProfile | null;
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

  const menuItems = profile?.role === 'owner' ? ownerMenuItems : renterMenuItems;

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">
            {profile?.role === 'owner' ? 'Владелец техники' : 'Арендатор'}
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

const ProfileContent = ({ profile }: { profile: UserProfile | null }) => {
  if (!profile) return null;

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
              <p className="font-medium">{profile.first_name || 'Не указано'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Фамилия</label>
              <p className="font-medium">{profile.last_name || 'Не указано'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Телефон</label>
              <p className="font-medium">{profile.phone || 'Не указан'}</p>
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
                  <p className="font-medium">{profile.company_name || 'Не указано'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ИНН</label>
                  <p className="font-medium">{profile.company_inn || 'Не указан'}</p>
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

const RequestsContent = ({ profile }: { profile: UserProfile | null }) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {profile?.role === 'owner' ? 'Входящие заявки' : 'Мои заявки'}
        </CardTitle>
        <CardDescription>
          {profile?.role === 'owner' 
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
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate('/login');
        } else {
          // Fetch user profile when authenticated
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/login');
      } else {
        fetchProfile(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить профиль",
          variant: "destructive"
        });
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось выйти из аккаунта",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Выход",
        description: "Вы успешно вышли из аккаунта",
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

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
                  Добро пожаловать, {profile.first_name || 'Пользователь'}!
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