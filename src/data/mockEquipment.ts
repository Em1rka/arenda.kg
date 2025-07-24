import { Equipment } from '@/hooks/useEquipmentFilters';
import excavatorImage from '@/assets/excavator-jcb.jpg';
import craneImage from '@/assets/crane-mobile.jpg';
import truckImage from '@/assets/truck-kamaz.jpg';
import bulldozerImage from '@/assets/bulldozer-cat.jpg';

export const mockEquipment: Equipment[] = [
  {
    id: "1",
    title: "Экскаватор JCB JS330",
    price: 15000,
    priceUnit: "сутки",
    location: "Бишкек",
    rating: 4.8,
    reviewsCount: 23,
    isPopular: true,
    ownerName: "ОсОО Стройтех",
    description: "Современный экскаватор для земляных работ. В отличном состоянии, все документы.",
    imageUrl: excavatorImage,
    category: "excavator"
  },
  {
    id: "2", 
    title: "Автокран 25 тонн",
    price: 12000,
    priceUnit: "сутки",
    location: "Ош",
    rating: 4.6,
    reviewsCount: 18,
    isNew: true,
    ownerName: "Кран-Сервис",
    description: "Автокран грузоподъемностью 25 тонн. Опытный машинист включен в стоимость.",
    imageUrl: craneImage,
    category: "crane"
  },
  {
    id: "3",
    title: "Самосвал КамАЗ",
    price: 8000,
    priceUnit: "сутки",
    location: "Бишкек",
    rating: 4.5,
    reviewsCount: 31,
    ownerName: "ИП Асанов",
    description: "Самосвал для перевозки сыпучих материалов. Объем кузова 12 кубов.",
    imageUrl: truckImage,
    category: "truck"
  },
  {
    id: "4",
    title: "Бульдозер Caterpillar",
    price: 18000,
    priceUnit: "сутки",
    location: "Джалал-Абад",
    rating: 4.9,
    reviewsCount: 12,
    isPopular: true,
    ownerName: "КатСтрой ОсОО",
    description: "Мощный бульдозер для планировочных работ. Техническое состояние отличное.",
    imageUrl: bulldozerImage,
    category: "bulldozer"
  },
  {
    id: "5",
    title: "Погрузчик JCB",
    price: 10000,
    priceUnit: "сутки",
    location: "Бишкек",
    rating: 4.7,
    reviewsCount: 15,
    ownerName: "СтройТех КГ",
    description: "Компактный погрузчик для работ в ограниченном пространстве.",
    imageUrl: excavatorImage,
    category: "loader"
  },
  {
    id: "6",
    title: "Автокран 16 тонн",
    price: 9000,
    priceUnit: "сутки",
    location: "Ош",
    rating: 4.4,
    reviewsCount: 8,
    isNew: true,
    ownerName: "Кран-Мастер",
    description: "Надежный автокран для строительных работ средней сложности.",
    imageUrl: craneImage,
    category: "crane"
  }
];