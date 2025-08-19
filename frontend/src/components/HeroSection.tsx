import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover "
        style={{ backgroundImage: `url(${heroImage})`,
        filter: 'brightness(100%) blur(4px)',
        backgroundPosition: "center 20%"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
            Аренда техники <br />
            <span className="text-foreground">без посредников</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-#1C1C1C mb-8 max-w-2xl mx-auto">
            Прямой контакт с владельцами. Честные цены. Проверенная техника.
            Находите нужное оборудование быстро и безопасно.
          </p>

          {/* Search Bar */}
          <div className="bg-background rounded-2xl shadow-xl p-4 md:p-6 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Equipment Type */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Что ищете?
                </label>
                <Input
                  placeholder="Экскаватор, кран, грузовик..."
                  className="bg-secondary/50 border-none"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Город
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Бишкек, Ош..."
                    className="pl-10 bg-secondary/50 border-none"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Когда нужна
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Выберите дату"
                    className="pl-10 bg-secondary/50 border-none"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button className="w-full bg-warning hover:bg-warning/90 text-warning-foreground h-10 font-semibold" asChild>
                  <Link to="/catalog">
                    <Search className="w-4 h-4 mr-2" />
                    Найти
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-warning hover:bg-warning/90 text-warning-foreground font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link to="/catalog">Найти технику</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 text-lg"
              asChild
            >
              <Link to="/add-equipment">Сдать технику</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-black">Единиц техники</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-black">Проверенных владельцев</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-black">Поддержка клиентов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
