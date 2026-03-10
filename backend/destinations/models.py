from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from geopy.geocoders import Nominatim

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
     # Coordinate fields for the Map
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    district = models.CharField(max_length=100, choices=DISTRICT_CHOICES)
    image = models.ImageField(upload_to="story_images/", blank=True, null=True)

    source = models.CharField(
        max_length=20,
        choices=[("system", "System"), ("user", "User")],
        default="system",
    )
    is_approved = models.BooleanField(default=False)
    submitted_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="submitted_stories")
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


        # 3. AUTOMATIC LOCATION SEARCH (Geocoding)
        # This looks up the specific location of the story title independently
    if not self.latitude or not self.longitude:
            try:
                geolocator = Nominatim(user_agent="unveiling_kerala")
                # Search for: "Title, District, Kerala"
                search_query = f"{self.title}, {self.district}, Kerala"
                location = geolocator.geocode(search_query)

                if location:
                    self.latitude = location.latitude
                    self.longitude = location.longitude
                else:
                    # If specific place isn't found, use District center as backup
                    fallback = geolocator.geocode(f"{self.district}, Kerala")
                    if fallback:
                        self.latitude = fallback.latitude
                        self.longitude = fallback.longitude
            except Exception as e:
                print(f"Geocoding error: {e}")

    super().save(*args, **kwargs)

    def __str__(self):
        return self.title
class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookmarks")
    story = models.ForeignKey(Story, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'story') # Prevents duplicate bookmarks    
