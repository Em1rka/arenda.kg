import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  BarChart3,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  MessageSquare,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type UserRole = 'renter' | 'owner';

type UserProfile = {
  id: string;
  role: UserRole;
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

type RentalRequest = {
  id: string;
  equipment: {
    name: string;
    image: string;
    category: string;
  };
  owner?: {
    name: string;
    rating: number;
  };
  renter?: {
    name: string;
    rating: number;
  };
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  dates: {
    start: string;
    end: string;
  };
  created_at: string;
  price: number;
};

type Equipment = {
  id: string;
  name: string;
  category: string;
  description: string;
  price_per_day: number;
  status: 'active' | 'pending' | 'archived';
  images: string[];
  location: string;
  created_at: string;
};

// Mock data
const mockRenterProfile: UserProfile = {
  id: '1',
  role: 'renter',
  first_name: 'Алексей',
  last_name: 'Иванов',
  email: 'alex@example.com',
  phone: '+996 555 123 456',
  avatar_url: null,
  company_name: null,
  company_inn: null,
  is_verified: false,
  created_at: new Date().toISOString(),
};

const mockOwnerProfile: UserProfile = {
  id: '2',
  role: 'owner',
  first_name: 'Иван',
  last_name: 'Петров',
  email: 'ivan@stroytech.kg',
  phone: '+996 555 987 654',
  avatar_url: null,
  company_name: 'ОсОО "СтройТех"',
  company_inn: '12345678901234',
  is_verified: true,
  created_at: new Date().toISOString(),
};

const mockRenterRequests: RentalRequest[] = [
  {
    id: '1',
    equipment: {
      name: 'Экскаватор JCB JS220',
      image: '/src/assets/excavator-jcb.jpg',
      category: 'Экскаваторы'
    },
    owner: {
      name: 'ОсОО СтройТех',
      rating: 4.8
    },
    status: 'pending',
    dates: {
      start: '2024-01-15',
      end: '2024-01-20'
    },
    created_at: '2024-01-10',
    price: 12000
  },
  {
    id: '2',
    equipment: {
      name: 'Бульдозер CAT D6',
      image: '/src/assets/bulldozer-cat.jpg',
      category: 'Бульдозеры'
    },
    owner: {
      name: 'ИП Осмонов',
      rating: 4.5
    },
    status: 'approved',
    dates: {
      start: '2024-01-08',
      end: '2024-01-10'
    },
    created_at: '2024-01-05',
    price: 15000
  }
];

const mockOwnerRequests: RentalRequest[] = [
  {
    id: '3',
    equipment: {
      name: 'Экскаватор JCB JS220',
      image: '/src/assets/excavator-jcb.jpg',
      category: 'Экскаваторы'
    },
    renter: {
      name: 'Алексей Иванов',
      rating: 4.2
    },
    status: 'pending',
    dates: {
      start: '2024-01-20',
      end: '2024-01-25'
    },
    created_at: '2024-01-18',
    price: 12000
  }
];

const mockEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Экскаватор JCB JS220',
    category: 'Экскаваторы',
    description: 'Надежный экскаватор для строительных работ',
    price_per_day: 12000,
    status: 'active',
    images: ['/src/assets/excavator-jcb.jpg'],
    location: 'Бишкек',
    created_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'Кран мобильный 25т',
    category: 'Краны',
    description: 'Мобильный кран грузоподъемностью 25 тонн',
    price_per_day: 18000,
    status: 'active',
    images: ['/src/assets/crane-mobile.jpg'],
    location: 'Бишкек',
    created_at: '2024-01-01'
  }
];

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
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-lg">
                {profile.first_name[0]}{profile.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Изменить фото
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG до 5MB
              </p>
            </div>
          </div>

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
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Телефон</label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{profile.phone}</p>
              </div>
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
                <Upload className="mr-2 h-4 w-4" />
                Подтвердить личность
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RequestsContent = ({ profile }: { profile: UserProfile }) => {
  const requests = profile.role === 'owner' ? mockOwnerRequests : mockRenterRequests;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Ожидает ответа</Badge>;
      case 'approved':
        return <Badge variant="default">Подтверждено</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Отклонено</Badge>;
      case 'completed':
        return <Badge variant="outline">Завершено</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
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
          {requests.length > 0 ? (
            <div className="space-y-4">
              {requests.map((request) => (
                <Card key={request.id} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <img 
                          src={request.equipment.image} 
                          alt={request.equipment.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="space-y-2">
                          <h3 className="font-semibold">{request.equipment.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {profile.role === 'owner' && request.renter && (
                              <div className="flex items-center gap-1">
                                <UserIcon className="h-3 w-3" />
                                {request.renter.name}
                                <div className="flex items-center gap-1 ml-2">
                                  <Star className="h-3 w-3 fill-warning text-warning" />
                                  {request.renter.rating}
                                </div>
                              </div>
                            )}
                            {profile.role === 'renter' && request.owner && (
                              <div className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {request.owner.name}
                                <div className="flex items-center gap-1 ml-2">
                                  <Star className="h-3 w-3 fill-warning text-warning" />
                                  {request.owner.rating}
                                </div>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {request.dates.start} - {request.dates.end}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {request.price.toLocaleString()} сом
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(request.status)}
                        {profile.role === 'owner' && request.status === 'pending' && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="default">
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="destructive">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Чат
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Заявки пока отсутствуют</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const EquipmentContent = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Моя техника
            </CardTitle>
            <CardDescription>
              Управление вашим парком техники
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Добавить технику
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {mockEquipment.length > 0 ? (
          <div className="space-y-4">
            {mockEquipment.map((equipment) => (
              <Card key={equipment.id} className="border border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img 
                        src={equipment.images[0]} 
                        alt={equipment.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="space-y-2">
                        <h3 className="font-semibold">{equipment.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{equipment.category}</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {equipment.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {equipment.price_per_day.toLocaleString()} сом/день
                          </div>
                        </div>
                        <Badge variant={
                          equipment.status === 'active' ? 'default' : 
                          equipment.status === 'pending' ? 'secondary' : 'outline'
                        }>
                          {equipment.status === 'active' ? 'Активно' : 
                           equipment.status === 'pending' ? 'На проверке' : 'Архив'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Building className="h-12 w-12 mx-auto mb-4 opacity-50 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">Техника пока не добавлена</p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить технику
            </Button>
          </div>
        )}
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

const FinancesContent = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Общий баланс</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">125,000 сом</div>
          <p className="text-xs text-muted-foreground">+5,000 за последний месяц</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Заморожено</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15,000 сом</div>
          <p className="text-xs text-muted-foreground">По активным заявкам</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Доступно</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">110,000 сом</div>
          <p className="text-xs text-muted-foreground">Можно вывести</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const ReviewsContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Star className="h-5 w-5" />
        Отзывы о вас
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center py-8 text-muted-foreground">
        <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Отзывы пока отсутствуют</p>
      </div>
    </CardContent>
  </Card>
);

const AnalyticsContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Аналитика
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center py-8 text-muted-foreground">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Данные аналитики пока отсутствуют</p>
      </div>
    </CardContent>
  </Card>
);

const HistoryContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <History className="h-5 w-5" />
        История аренды
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center py-8 text-muted-foreground">
        <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>История аренды пока отсутствует</p>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<UserRole>('renter');
  const [profile, setProfile] = useState<UserProfile>(mockRenterProfile);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const role = location.state?.userRole || 'renter';
    setUserRole(role);
    setProfile(role === 'owner' ? mockOwnerProfile : mockRenterProfile);
  }, [location.state]);

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
      case "finances":
        return <FinancesContent />;
      case "reviews":
        return <ReviewsContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "history":
        return <HistoryContent />;
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