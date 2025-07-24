import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface EquipmentCardProps {
  id: string;
  title: string;
  price: number;
  priceUnit: "час" | "сутки" | "смена";
  location: string;
  rating: number;
  reviewsCount: number;
  imageUrl?: string;
  isPopular?: boolean;
  isNew?: boolean;
  ownerName: string;
  description: string;
}

const EquipmentCard = ({ 
  id, 
  title, 
  price, 
  priceUnit, 
  location, 
  rating, 
  reviewsCount,
  imageUrl,
  isPopular,
  isNew,
  ownerName,
  description
}: EquipmentCardProps) => {
  return (
    <div className="card-equipment group cursor-pointer">
      {/* Image Container */}
      <div className="relative mb-4 rounded-lg overflow-hidden">
        {/* TODO: Заменить на реальные фото техники */}
        <div className="aspect-[4/3] bg-secondary/50 flex items-center justify-center">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-2">🚛</div>
              <p className="text-sm">Фото техники</p>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isPopular && (
            <Badge className="bg-warning text-warning-foreground">
              Популярное
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-success text-success-foreground">
              Новое
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        {/* Location & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground ml-1">({reviewsCount})</span>
          </div>
        </div>

        {/* Owner */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
            <span className="text-xs font-bold text-primary">
              {ownerName.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{ownerName}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-foreground">
              {price.toLocaleString('ru-RU')} ₸
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              / {priceUnit}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link to={`/equipment/${id}`}>
              Подробнее
            </Link>
          </Button>
          <Button 
            size="sm" 
            className="bg-warning hover:bg-warning/90 text-warning-foreground"
            onClick={(e) => {
              e.preventDefault();
              // TODO: Implement phone call functionality
              alert("Войдите или зарегистрируйтесь чтобы увидеть номер телефона");
            }}
          >
            <Phone className="w-4 h-4 mr-2" />
            Позвонить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;