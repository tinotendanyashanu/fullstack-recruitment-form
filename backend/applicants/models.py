from django.db import models
from django.core.validators import FileExtensionValidator
from .validators import validate_file_size


def upload_to_applicant(instance, filename):
    # Organizes files by applicant name (you can adjust as needed)
    return f'applicants/{instance.name}/{filename}'


class Applicant(models.Model):
    YEAR_CHOICES = [
        ('1', '1st Year'),
        ('2', '2nd Year'),
        ('3', '3rd Year'),
        ('4', '4th Year or Higher'),
        ('Grad', 'Graduate'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=50)

    university = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    year_of_study = models.CharField(max_length=10, choices=YEAR_CHOICES)

    cv = models.FileField(
        upload_to=upload_to_applicant,
        validators=[FileExtensionValidator(
            ['pdf', 'docx']), validate_file_size],
        blank=True, null=True
    )
    cover_letter = models.FileField(
        upload_to=upload_to_applicant,
        validators=[FileExtensionValidator(
            ['pdf', 'docx']), validate_file_size],
        blank=True, null=True
    )
    supporting_documents = models.FileField(
        upload_to=upload_to_applicant,
        validators=[FileExtensionValidator(
            ['pdf', 'docx']), validate_file_size],
        blank=True, null=True
    )

    motivation = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.university}"
