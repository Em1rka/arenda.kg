import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"renter" | "owner">("renter");
  
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

  const handleRenterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (renterData.password !== renterData.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    if (!renterData.agreeTerms) {
      alert("Необходимо согласиться с условиями использования");
      return;
    }
    // TODO: Implement registration with Supabase
    console.log("Renter registration:", renterData);
    alert("Регистрация арендатора будет реализована после подключения Supabase");
  };

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ownerData.password !== ownerData.confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    if (!ownerData.agreeTerms) {
      alert("Необходимо согласиться с условиями использования");
      return;
    }
    // TODO: Implement registration with Supabase
    console.log("Owner registration:", ownerData);
    alert("Регистрация владельца будет реализована после подключения Supabase");
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
                    >
                      Зарегистрироваться как арендатор
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
                          Получать уведомления о новых заявках и новостях платформы
                        </Label>
                      </div>
                    </div>

                    {/* Submit */}
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                      size="lg"
                    >
                      Зарегистрироваться как владелец
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Или зарегистрируйтесь через
                  </span>
                </div>
              </div>

              {/* Social Registration */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // TODO: Implement Google registration
                    alert("Регистрация через Google будет реализована после подключения Supabase");
                  }}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    // TODO: Implement Facebook registration
                    alert("Регистрация через Facebook будет реализована после подключения Supabase");
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>

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