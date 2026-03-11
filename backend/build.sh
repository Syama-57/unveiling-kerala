#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser automatically if it doesn't exist
# Replace 'admin' and 'password123' with what you want
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'password123')"

# Collect static files for Whitenoise
python manage.py collectstatic --no-input