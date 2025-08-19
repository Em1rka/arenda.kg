import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Star, Heart, MessageCircle, X } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

const RenterProfile = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const mockRequests = [
    {
      id: 1,
      equipment: "Экскаватор JCB JS220",
      image: "/src/assets/excavator-jcb.jpg",
      owner: "ООО СтройТех",
      ownerRating: 4.8,
      status: "Ожидает ответа",
      date: "2024-01-15 10:30",
    },
    {
      id: 2,
      equipment: "Бульдозер CAT D6",
      image: "/src/assets/bulldozer-cat.jpg",
      owner: "ИП Иванов А.А.",
      ownerRating: 4.9,
      status: "Подтверждено",
      date: "2024-01-14 14:20",
    },
  ];

  const mockHistory = [
    {
      id: 1,
      equipment: "Автокран КАМАЗ",
      image: "/src/assets/crane-mobile.jpg",
      owner: "ООО КранСервис",
      date: "2023-12-10 - 2023-12-12",
      rating: null,
    },
  ];

  const mockFavorites = [
    {
      id: 1,
      equipment: "Грузовик КАМАЗ",
      image: "/src/assets/truck-kamaz.jpg",
      price: "5000 сом/день",
      location: "Бишкек",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Личный кабинет</h1>
            <p className="text-muted-foreground">Арендатор</p>
          </div>
          <Button variant="outline" onClick={logout}>
            Выйти
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Мой профиль</TabsTrigger>
            <TabsTrigger value="requests">Мои заявки</TabsTrigger>
            <TabsTrigger value="history">История аренды</TabsTrigger>
            <TabsTrigger value="favorites">Избранное</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Личные данные</CardTitle>
                <CardDescription>Управляйте своей контактной информацией</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl">АИ</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Загрузить фото
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" defaultValue="Алибек Иманов" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" defaultValue="+996 555 123 456" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="alibek@example.com" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Верификация личности</h3>
                      <p className="text-sm text-muted-foreground">
                        Подтвердите личность для доступа к премиум-технике
                      </p>
                    </div>
                    <Button className="bg-warning hover:bg-warning/90 text-warning-foreground">
                      Подтвердить личность
                    </Button>
                  </div>
                </div>

                <Button className="w-full md:w-auto">Сохранить изменения</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Мои заявки</CardTitle>
                <CardDescription>Отслеживайте статус ваших запросов на аренду</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Техника</TableHead>
                      <TableHead>Владелец</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата создания</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img
                              src={request.image}
                              alt={request.equipment}
                              className="w-12 h-12 rounded-md object-cover"
                            />
                            <span className="font-medium">{request.equipment}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{request.owner}</div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-warning text-warning" />
                              <span className="text-sm">{request.ownerRating}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "Подтверждено"
                                ? "default"
                                : request.status === "Отклонено"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {request.date}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>История аренды</CardTitle>
                <CardDescription>Завершенные сделки</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.equipment}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{item.equipment}</h3>
                          <p className="text-sm text-muted-foreground">{item.owner}</p>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      {!item.rating && (
                        <Button variant="outline">Оставить отзыв</Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Избранное</CardTitle>
                <CardDescription>Сохраненные позиции из каталога</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockFavorites.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.equipment}
                            className="w-full h-40 object-cover rounded-md"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2 bg-background/80"
                          >
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        <div className="mt-4 space-y-2">
                          <h3 className="font-semibold">{item.equipment}</h3>
                          <p className="text-lg font-bold text-primary">{item.price}</p>
                          <p className="text-sm text-muted-foreground">{item.location}</p>
                          <Button className="w-full">Арендовать</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RenterProfile;