import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { registerUser, loginUser } from "@/lib/api";
import type { LoginResponse } from "@/types/api";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"renter" | "owner">("renter");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [renterData, setRenterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreeMarketing: false
  });

  const [ownerData, setOwnerData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreeMarketing: false
  });

const handleRenterSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (renterData.password !== renterData.confirmPassword) {
    toast({ title: "Пароли не совпадают", variant: "destructive" });
    return;
  }
  setIsLoading(true);
  try {
    await registerUser({
      email: renterData.email.trim(),
      password: renterData.password,
      name: renterData.name.trim(),
      role: "renter",
      phone: renterData.phone.trim(),
    });

    const { data } = await loginUser({
      email: renterData.email.trim(),
      password: renterData.password,
    });
    localStorage.setItem("access_token", data.access);
    if (data.refresh) localStorage.setItem("refresh_token", data.refresh);

    toast({ title: "Регистрация успешна", description: "Аккаунт арендатора создан." });
    navigate("/dashboard", { state: { userRole: "renter" } });
  } catch (err: any) {
    const msg = err?.response?.data?.detail || "Проверьте данные";
    toast({ title: "Ошибка регистрации", description: msg, variant: "destructive" });
  } finally {
    setIsLoading(false);
  }
};

// owner
const handleOwnerSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (ownerData.password !== ownerData.confirmPassword) {
    toast({ title: "Пароли не совпадают", variant: "destructive" });
    return;
  }
  setIsLoading(true);
  try {
    await registerUser({
      email: ownerData.email.trim(),
      password: ownerData.password,
      name: ownerData.name.trim(),
      role: "owner",
      phone: ownerData.phone.trim(),
      company: ownerData.company.trim(),
    });

    const { data } = await loginUser({
      email: ownerData.email.trim(),
      password: ownerData.password,
    });
    localStorage.setItem("access_token", data.access);
    if (data.refresh) localStorage.setItem("refresh_token", data.refresh);

    toast({ title: "Регистрация успешна", description: "Аккаунт владельца создан." });
    navigate("/dashboard", { state: { userRole: "owner" } });
  } catch (err: any) {
    const msg = err?.response?.data?.detail || "Проверьте данные";
    toast({ title: "Ошибка регистрации", description: msg, variant: "destructive" });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
              Регистрация в arenda.kg
            </h1>
            <p className="text-muted-foreground">
              Выберите тип аккаунта и заполните форму регистрации
            </p>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Создать аккаунт
              </CardTitle>
              <CardDescription className="text-center">
                Присоединяйтесь к платформе аренды техники
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={userType} onValueChange={(value) => setUserType(value as "renter" | "owner")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="renter" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Арендатор
                  </TabsTrigger>
                  <TabsTrigger value="owner" className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    Владелец техники
                  </TabsTrigger>
                </TabsList>

                {/* Renter Registration */}
                <TabsContent value="renter">
                  <div className="mb-6 p-4 bg-secondary/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Арендатор</strong> - ищете технику для аренды? 
                      Получите доступ к каталогу, контактам владельцев и возможности бронирования.
                    </p>
                  </div>

                  <form onSubmit={handleRenterSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="renter-name">Полное имя *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="renter-name"
                          placeholder="Иван Иванов"
                          value={renterData.name}
                          onChange={(e) => setRenterData(prev => ({ ...prev, name: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="renter-email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="renter-email"
                          type="email"
                          placeholder="ivan@example.com"
                          value={renterData.email}
                          onChange={(e) => setRenterData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="renter-phone">Телефон *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="renter-phone"
                          type="tel"
                          placeholder="+996 555 123 456"
                          value={renterData.phone}
                          onChange={(e) => setRenterData(prev => ({ ...prev, phone: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="renter-password">Пароль *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="renter-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Минимум 6 символов"
                            value={renterData.password}
                            onChange={(e) => setRenterData(prev => ({ ...prev, password: e.target.value }))}
                            className="pl-10 pr-10"
                            minLength={6}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="renter-confirm-password">Подтвердите пароль *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="renter-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Повторите пароль"
                            value={renterData.confirmPassword}
                            onChange={(e) => setRenterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="renter-terms"
                          checked={renterData.agreeTerms}
                          onCheckedChange={(checked) => 
                            setRenterData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                          }
                          required
                        />
                        <Label htmlFor="renter-terms" className="text-sm">
                          Я согласен с{" "}
                          <Link to="/terms" className="text-primary hover:text-primary/80">
                            условиями использования
                          </Link>
                          {" "}и{" "}
                          <Link to="/privacy" className="text-primary hover:text-primary/80">
                            политикой конфиденциальности
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="renter-marketing"
                          checked={renterData.agreeMarketing}
                          onCheckedChange={(checked) => 
                            setRenterData(prev => ({ ...prev, agreeMarketing: checked as boolean }))
                          }
                        />
                        <Label htmlFor="renter-marketing" className="text-sm">
                          Получать уведомления о новой технике и акциях
                        </Label>
                      </div>
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      className="w-full bg-warning hover:bg-warning/90 text-warning-foreground font-semibold"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Регистрация..." : "Зарегистрироваться как арендатор"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>

                {/* Owner Registration */}
                <TabsContent value="owner">
                  <div className="mb-6 p-4 bg-warning/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Владелец техники</strong> - сдаете технику в аренду? 
                      Получите доступ к добавлению техники, управлению заявками и финансам.
                    </p>
                  </div>

                  <form onSubmit={handleOwnerSubmit} className="space-y-4">
                    {/* Name and Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="owner-name">Контактное лицо *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="owner-name"
                            placeholder="Иван Иванов"
                            value={ownerData.name}
                            onChange={(e) => setOwnerData(prev => ({ ...prev, name: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-company">Название компании *</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="owner-company"
                            placeholder="ОсОО Стройтех"
                            value={ownerData.company}
                            onChange={(e) => setOwnerData(prev => ({ ...prev, company: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="owner-email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="owner-email"
                            type="email"
                            placeholder="info@company.kg"
                            value={ownerData.email}
                            onChange={(e) => setOwnerData(prev => ({ ...prev, email: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-phone">Телефон *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="owner-phone"
                            type="tel"
                            placeholder="+996 555 123 456"
                            value={ownerData.phone}
                            onChange={(e) => setOwnerData(prev => ({ ...prev, phone: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="owner-password">Пароль *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="owner-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Минимум 6 символов"
                            value={ownerData.password}
                            onChange={(e) => setOwnerData(prev => ({ ...prev, password: e.target.value }))}
                            className="pl-10 pr-10"
                            minLength={6}
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="owner-confirm-password">Подтвердите пароль *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="owner-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Повторите пароль"
                            value={ownerData.confirmPassword}
                            onChange={(e) => setOwnerData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="owner-terms"
                          checked={ownerData.agreeTerms}
                          onCheckedChange={(checked) => 
                            setOwnerData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                          }
                          required
                        />
                        <Label htmlFor="owner-terms" className="text-sm">
                          Я согласен с{" "}
                          <Link to="/terms" className="text-primary hover:text-primary/80">
                            условиями использования
                          </Link>
                          {" "}и{" "}
                          <Link to="/privacy" className="text-primary hover:text-primary/80">
                            политикой конфиденциальности
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="owner-marketing"
                          checked={ownerData.agreeMarketing}
                          onCheckedChange={(checked) => 
                            setOwnerData(prev => ({ ...prev, agreeMarketing: checked as boolean }))
                          }
                        />
                        <Label htmlFor="owner-marketing" className="text-sm">
                          Получать уведомления о новых арендаторах и обновлениях
                        </Label>
                      </div>
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Регистрация..." : "Зарегистрироваться как владелец"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Уже есть аккаунт?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Войти
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;