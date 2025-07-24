import { Search, Phone, Handshake } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Поиск техники",
      description: "Найдите нужную технику в каталоге. Используйте фильтры по типу, цене и городу для быстрого поиска."
    },
    {
      icon: Phone,
      title: "Контакт с владельцем",
      description: "Свяжитесь с владельцем напрямую через телефон или внутренний чат. Обсудите все детали аренды."
    },
    {
      icon: Handshake,
      title: "Договоренность о встрече",
      description: "Договоритесь о времени и месте встречи. Проверьте технику и оформите аренду без посредников."
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Простой процесс аренды без оплаты через платформу. 
            Все договоренности напрямую с владельцем.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full font-bold text-xl mb-6">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-background rounded-full shadow-lg mb-6 -mt-10 relative z-10">
                <step.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-primary/20 transform translate-x-8 z-0"></div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-background rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Никаких скрытых платежей
            </h3>
            <p className="text-muted-foreground mb-6">
              Платформа не берет комиссию с аренды. Вы платите только владельцу техники 
              согласованную сумму. Регистрация и поиск техники — бесплатно.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-success mb-2">0%</div>
                <p className="text-sm text-muted-foreground">Комиссия с аренды</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-2">Бесплатно</div>
                <p className="text-sm text-muted-foreground">Регистрация</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-2">Прямой</div>
                <p className="text-sm text-muted-foreground">Контакт с владельцем</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;