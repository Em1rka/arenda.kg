import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, Grid, List, Search } from "lucide-react";
import Header from "@/components/Header";
import EquipmentCard from "@/components/EquipmentCard";
import { useEquipmentFilters } from "@/hooks/useEquipmentFilters";
import { mockEquipment } from "@/data/mockEquipment";

const Catalog = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  
  const { filters, filteredEquipment, updateFilter } = useEquipmentFilters(mockEquipment);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Каталог техники
          </h1>
          <p className="text-muted-foreground">
            Найдено {filteredEquipment.length} единиц техники
          </p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`w-full lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-bold">Фильтры</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  ✕
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Поиск
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Найти технику..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Equipment Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Тип техники
                </label>
                <Select value={filters.category} onValueChange={(value) => updateFilter('category', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="excavator">Экскаваторы</SelectItem>
                    <SelectItem value="crane">Автокраны</SelectItem>
                    <SelectItem value="truck">Грузовики</SelectItem>
                    <SelectItem value="bulldozer">Бульдозеры</SelectItem>
                    <SelectItem value="loader">Погрузчики</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Город
                </label>
                <Select value={filters.location} onValueChange={(value) => updateFilter('location', value === 'all' ? '' : value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите город" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все города</SelectItem>
                    <SelectItem value="Бишкек">Бишкек</SelectItem>
                    <SelectItem value="Ош">Ош</SelectItem>
                    <SelectItem value="Джалал-Абад">Джалал-Абад</SelectItem>
                    <SelectItem value="Каракол">Каракол</SelectItem>
                    <SelectItem value="Талас">Талас</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-3">
                  Цена за сутки (сом)
                </label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter('priceRange', value)}
                  max={50000}
                  min={0}
                  step={1000}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.priceRange[0].toLocaleString('ru-RU')} сом</span>
                  <span>{filters.priceRange[1].toLocaleString('ru-RU')} сом</span>
                </div>
              </div>

              {/* Apply Filters */}
              <Button className="w-full bg-primary hover:bg-primary/90">
                Применить фильтры
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(true)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
                
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">По популярности</SelectItem>
                    <SelectItem value="price-low">Сначала дешевые</SelectItem>
                    <SelectItem value="price-high">Сначала дорогие</SelectItem>
                    <SelectItem value="rating">По рейтингу</SelectItem>
                    <SelectItem value="new">Сначала новые</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Equipment Grid */}
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-6"
            }>
              {filteredEquipment.map((equipment) => (
                <EquipmentCard
                  key={equipment.id}
                  {...equipment}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Предыдущая
                </Button>
                <Button className="bg-primary">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">
                  Следующая
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;