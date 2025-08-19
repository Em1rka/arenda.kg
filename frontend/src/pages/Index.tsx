import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import EquipmentCard from "@/components/EquipmentCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Truck, Construction, Wrench, Zap } from "lucide-react";

const Index = () => {
  // Mock featured equipment
  const featuredEquipment = [
    {
      id: "1",
      title: "Экскаватор JCB JS330",
      price: 15000,
      priceUnit: "сутки" as const,
      location: "Бишкек",
      rating: 4.8,
      reviewsCount: 23,
      isPopular: true,
      ownerName: "ОсОО Стройтех",
      description: "Современный экскаватор для земляных работ. В отличном состоянии, все документы."
    },
    {
      id: "2", 
      title: "Автокран 25 тонн",
      price: 12000,
      priceUnit: "сутки" as const,
      location: "Ош",
      rating: 4.6,
      reviewsCount: 18,
      isNew: true,
      ownerName: "Кран-Сервис",
      description: "Автокран грузоподъемностью 25 тонн. Опытный машинист включен в стоимость."
    },
    {
      id: "3",
      title: "Самосвал КамАЗ",
      price: 8000,
      priceUnit: "сутки" as const,
      location: "Бишкек",
      rating: 4.5,
      reviewsCount: 31,
      ownerName: "ИП Асанов",
      description: "Самосвал для перевозки сыпучих материалов. Объем кузова 12 кубов."
    }
  ];

  const categories = [
    { 
      name: "Экскаваторы", 
      icon: Truck, 
      count: 45,
      description: "Гусеничные и колесные экскаваторы"
    },
    { 
      name: "Автокраны", 
      icon: Construction, 
      count: 32,
      description: "Краны различной грузоподъемности"
    },
    { 
      name: "Спецтехника", 
      icon: Wrench, 
      count: 28,
      description: "Бульдозеры, погрузчики, катки"
    },
    { 
      name: "Транспорт", 
      icon: Zap, 
      count: 61,
      description: "Самосвалы, бортовые машины"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />
      
      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Категории техники
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Выберите нужный тип техники и найдите лучшие предложения от проверенных владельцев
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to="/catalog"
                className="group bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/20"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category.description}
                </p>
                <div className="text-2xl font-bold text-primary">
                  {category.count}
                </div>
                <p className="text-xs text-muted-foreground">единиц техники</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4"
              asChild
            >
              <Link to="/catalog">Смотреть весь каталог</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Популярная техника
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Техника с лучшими отзывами и высоким рейтингом от наших пользователей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredEquipment.map((equipment) => (
              <EquipmentCard
                key={equipment.id}
                {...equipment}
              />
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4"
              asChild
            >
              <Link to="/catalog">Посмотреть больше</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Сдавайте свою технику и зарабатывайте
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Добавьте свою технику на платформу и получайте дополнительный доход. 
            Никаких комиссий, прямой контакт с арендаторами.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-warning hover:bg-warning/90 text-warning-foreground font-semibold px-8 py-4"
              asChild
            >
              <Link to="/add-equipment">Добавить технику</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary-foreground text-#1a4cb7 hover:bg-primary-foreground hover:text-primary font-semibold px-8 py-4"
              asChild
            >
              <Link to="/how-it-works">Узнать подробнее</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading text-xl font-bold mb-4">arenda.kg</h3>
              <p className="text-background/80 mb-4">
                Платформа для аренды строительной техники в Кыргызстане
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Для арендаторов</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/catalog" className="hover:text-background transition-colors">Каталог техники</Link></li>
                <li><Link to="/how-it-works" className="hover:text-background transition-colors">Как это работает</Link></li>
                <li><Link to="/support" className="hover:text-background transition-colors">Поддержка</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Для владельцев</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/add-equipment" className="hover:text-background transition-colors">Сдать технику</Link></li>
                <li><Link to="/pricing" className="hover:text-background transition-colors">Тарифы</Link></li>
                <li><Link to="/owner-guide" className="hover:text-background transition-colors">Руководство</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-background/80">
                <li>+996 (555) 123-456</li>
                <li>info@arenda.kg</li>
                <li>Бишкек, ул. Чуй 155</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2024 arenda.kg. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;