import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-heading font-bold text-2xl text-primary">
            arenda.kg
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className="text-foreground hover:text-primary transition-colors">
              Каталог
            </Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
              Как это работает
            </Link>
            <Link to="/add-equipment" className="text-foreground hover:text-primary transition-colors">
              Сдать технику
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск техники..."
                className="pl-10 bg-secondary/50 border-none"
              />
            </div>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Войти</Link>
            </Button>
            <Button className="bg-warning hover:bg-warning/90 text-warning-foreground" asChild>
              <Link to="/register">Регистрация</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Поиск техники..."
                  className="pl-10 bg-secondary/50 border-none"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link
                  to="/catalog"
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Каталог
                </Link>
                <Link
                  to="/how-it-works"
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Как это работает
                </Link>
                <Link
                  to="/add-equipment"
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Сдать технику
                </Link>
              </nav>

              {/* Mobile Auth */}
              <div className="flex space-x-4 pt-4">
                <Button variant="ghost" className="flex-1" asChild>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Войти
                  </Link>
                </Button>
                <Button className="flex-1 bg-warning hover:bg-warning/90 text-warning-foreground" asChild>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    Регистрация
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;