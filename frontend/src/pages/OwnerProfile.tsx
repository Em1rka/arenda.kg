import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Star, MessageCircle, Check, X, Eye, Edit } from "lucide-react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const OwnerProfile = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const mockEquipment = [
    {
      id: 1,
      name: "Экскаватор JCB JS220",
      image: "/src/assets/excavator-jcb.jpg",
      category: "Экскаваторы",
      status: "Активно",
      price: "8000 сом/день",
      location: "Бишкек",
    },
    {
      id: 2,
      name: "Автокран КАМАЗ",
      image: "/src/assets/crane-mobile.jpg",
      category: "Краны",
      status: "На проверке",
      price: "12000 сом/день",
      location: "Ош",
    },
  ];

  const mockRequests = [
    {
      id: 1,
      equipment: "Экскаватор JCB JS220",
      renter: "Алибек Иманов",
      renterRating: 4.7,
      dates: "2024-01-20 - 2024-01-22",
      status: "Новая",
      phone: "+996 555 123 456",
    },
    {
      id: 2,
      equipment: "Автокран КАМАЗ",
      renter: "Бекзат Токтосунов",
      renterRating: 4.9,
      dates: "2024-01-25 - 2024-01-27",
      status: "В работе",
      phone: "+996 777 987 654",
    },
  ];

  const mockTransactions = [
    {
      id: 1,
      date: "2024-01-15",
      equipment: "Экскаватор JCB JS220",
      amount: "+24000 сом",
      status: "Завершено",
    },
    {
      id: 2,
      date: "2024-01-10",
      equipment: "Автокран КАМАЗ",
      amount: "+36000 сом",
      status: "Завершено",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Личный кабинет</h1>
            <p className="text-muted-foreground">Владелец техники</p>
          </div>
          <Button variant="outline" onClick={logout}>
            Выйти
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="equipment">Моя техника</TabsTrigger>
            <TabsTrigger value="requests">Заявки</TabsTrigger>
            <TabsTrigger value="finances">Финансы</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Данные компании</CardTitle>
                <CardDescription>Управляйте информацией о вашей компании</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xl">СТ</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="flex items-center gap-2">
                    Загрузить логотип
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Название компании</Label>
                    <Input id="company" defaultValue="ООО СтройТех" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inn">ИНН</Label>
                    <Input id="inn" defaultValue="12345678901234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" defaultValue="+996 555 987 654" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="info@stroytech.kg" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-4">Реквизиты для выплат</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="card">Номер карты</Label>
                      <Input id="card" placeholder="**** **** **** 1234" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account">Расчетный счет</Label>
                      <Input id="account" placeholder="1234567890123456789" />
                    </div>
                  </div>
                </div>

                <Button className="w-full md:w-auto">Сохранить изменения</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Моя техника</h2>
                <p className="text-muted-foreground">Управляйте вашим парком техники</p>
              </div>
              <Button asChild className="bg-warning hover:bg-warning/90 text-warning-foreground">
                <Link to="/add-equipment" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Добавить технику
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEquipment.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <Badge
                        className="absolute top-2 left-2"
                        variant={item.status === "Активно" ? "default" : "secondary"}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <p className="text-lg font-bold text-primary">{item.price}</p>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Входящие заявки</CardTitle>
                <CardDescription>Управляйте запросами на аренду</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Техника</TableHead>
                      <TableHead>Арендатор</TableHead>
                      <TableHead>Даты аренды</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.equipment}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{request.renter}</div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-warning text-warning" />
                              <span className="text-sm">{request.renterRating}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{request.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{request.dates}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "Новая"
                                ? "secondary"
                                : request.status === "В работе"
                                ? "default"
                                : "outline"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <X className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="w-4 h-4" />
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

          <TabsContent value="finances" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Общий баланс</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">125,500 сом</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Доступно к выводу</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">89,300 сом</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Заморожено</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-muted-foreground">36,200 сом</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>История транзакций</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Техника</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.equipment}</TableCell>
                        <TableCell className="font-bold text-primary">
                          {transaction.amount}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{transaction.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Отзывы о компании</CardTitle>
                <CardDescription>Средний рейтинг: 4.8 из 5.0</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Алибек Иманов</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-4 h-4 fill-warning text-warning" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Отличный сервис! Техника в хорошем состоянии, быстрая доставка.
                        </p>
                        <p className="text-xs text-muted-foreground">15 января 2024</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Ответить
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerProfile;