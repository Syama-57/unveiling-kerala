from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Story(models.Model):

    CATEGORY_CHOICES = [
        ("temple", "Temple Legends"),
        ("nature", "Nature & Mountain Legends"),
        ("ghost", "Ghosts & Supernatural Myths"),
        ("tribe", "Tribal Folklore and Legends"),
        ("folklore", "Local Folklore"),
    ]

    DISTRICT_CHOICES = [
        ("Alappuzha", "Alappuzha"),
        ("Ernakulam", "Ernakulam"),
        ("Idukki", "Idukki"),
        ("Kannur", "Kannur"),
        ("Kasaragod", "Kasaragod"),
        ("Kollam", "Kollam"),
        ("Kottayam", "Kottayam"),
        ("Kozhikode", "Kozhikode"),
        ("Malappuram", "Malappuram"),
        ("Palakkad", "Palakkad"),
        ("Pathanamthitta", "Pathanamthitta"),
        ("Thiruvananthapuram", "Thiruvananthapuram"),
        ("Thrissur", "Thrissur"),
        ("Wayanad", "Wayanad"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)

    short_description = models.TextField()
    full_story = models.TextField()

    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    district = models.CharField(max_length=100, choices=DISTRICT_CHOICES)

    image = models.ImageField(upload_to="story_images/", blank=True, null=True)

    source = models.CharField(
        max_length=20,
        choices=[("system", "System"), ("user", "User")],
        default="system",
    )
    is_approved = models.BooleanField(default=False)

    submitted_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="submitted_stories",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            while Story.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
