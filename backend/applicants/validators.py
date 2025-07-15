from django.core.exceptions import ValidationError

def validate_file_size(file):
    max_size = 4 * 1024 * 1024  # 4MB
    if file.size > max_size:
        raise ValidationError("File size exceeds 4MB.")
