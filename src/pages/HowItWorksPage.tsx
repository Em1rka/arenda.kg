import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Search, Phone, Handshake, Shield, Clock, Users, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: Search,
      title: "Поиск техники",
      description: "Найдите нужную технику в каталоге. Используйте фильтры по типу, цене и городу для быстрого поиска.",
      details: [
        "Более 500 единиц техники в каталоге",
        "Удобные фильтры по параметрам", 
        "Фото и подробные характеристики",
        "Отзывы и рейтинги владельцев"
      ]
    },
    {
      icon: Phone,
      title: "Контакт с владельцем",
      description: "Свяжитесь с владельцем напрямую через телефон или внутренний чат. Обсудите все детали аренды.",
      details: [
        "Прямое общение без посредников",
        "Встроенный чат для переписки",
        "Проверенные номера телефонов",
        "Быстрый ответ от владельцев"
      ]
    },
    {
      icon: Handshake,
      title: "Договоренность о встрече",
      description: "Договоритесь о времени и месте встречи. Проверьте технику и оформите аренду без посредников.",
      details: [
        "Гибкие условия встречи",
        "Осмотр техники перед арендой", 
        "Прямые расчеты с владельцем",
        "Никаких скрытых комиссий"
      ]
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Безопасность",
      description: "Все владельцы проходят проверку документов"
    },
    {
      icon: Clock,
      title: "Экономия времени",
      description: "Быстрый поиск и прямой контакт"
    },
    {
      icon: Users,
      title: "Проверенные пользователи",
      description: "Система рейтингов и отзывов"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Как работает arenda.kg
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Простой и безопасный способ арендовать строительную технику напрямую от владельцев 
            без переплат и посредников
          </p>
          <Button 
            size="lg" 
            className="bg-warning hover:bg-warning/90 text-warning-foreground"
            asChild
          >
            <Link to="/catalog">Начать поиск</Link>
          </Button>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="flex items-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full font-bold text-2xl mr-4">
                    {index + 1}
                  </div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-background border-2 border-primary rounded-full shadow-lg">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-success mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-6 w-12 h-0.5 bg-primary/30"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Почему выбирают arenda.kg
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                  <benefit.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-background rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <p className="text-sm text-muted-foreground">Единиц техники</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <p className="text-sm text-muted-foreground">Владельцев</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.8</div>
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-muted-foreground ml-1">Рейтинг</span>
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Поддержка</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Часто задаваемые вопросы
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Нужно ли платить комиссию платформе?",
                answer: "Нет, платформа абсолютно бесплатна для всех пользователей. Вы платите только владельцу техники."
              },
              {
                question: "Как проверяется техника?",
                answer: "Все владельцы проходят верификацию документов. Вы можете осмотреть технику перед арендой и прочитать отзывы других пользователей."
              },
              {
                question: "Что если техника сломается?",
                answer: "Условия ремонта и ответственности обговариваются напрямую с владельцем. Рекомендуем обсуждать это до заключения договора аренды."
              },
              {
                question: "Можно ли арендовать технику с оператором?",
                answer: "Да, многие владельцы предлагают услуги опытных машинистов. Эта информация указана в карточке техники."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-4">
            Готовы начать?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к arenda.kg и найдите нужную технику за несколько минут
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-warning hover:bg-warning/90 text-warning-foreground"
              asChild
            >
              <Link to="/register">Зарегистрироваться</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link to="/catalog">Смотреть каталог</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;