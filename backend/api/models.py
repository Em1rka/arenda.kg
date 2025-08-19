from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra):
        if not email:
            raise ValueError("Email обязателен")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra)
        user.set_password(password)
        user.is_active = extra.get("is_active", True)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra):
        extra.setdefault("is_staff", True)
        extra.setdefault("is_superuser", True)
        if not extra["is_staff"] or not extra["is_superuser"]:
            raise ValueError("Суперпользователь должен иметь is_staff=True и is_superuser=True")
        return self.create_user(email, password, **extra)

class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (('renter','Арендатор'), ('owner','Владелец'), ('admin','Админ'))

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='renter')

    # НЕ удаляем телефон полностью — пусть будет опциональным
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=255, blank=True)

    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role']

    objects = UserManager()

    def __str__(self):
        return self.email


class Equipment(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='equipment')
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    is_available = models.BooleanField(default=True)
    has_gps = models.BooleanField(default=False)
    has_insurance = models.BooleanField(default=False)


class Booking(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Ожидание'),
        ('confirmed', 'Подтверждено'),
        ('cancelled', 'Отменено'),
    )
    renter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name='bookings')
    start_date = models.DateField()
    end_date = models.DateField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    deposit = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)


class Payment(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_type = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=255)


class Review(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='reviews')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='written_reviews')
    target = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_reviews')
    rating = models.PositiveIntegerField()
    comment = models.TextField()


class Document(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='documents')
    doc_type = models.CharField(max_length=50)
    file_url = models.URLField()
