from django.db import models

class RP(models.Model):
    title = models.CharField(max_length=150)
    rp_file = models.FileField(upload_to='rps', null=False)
    def __str__(self):
        return self.title


class ProcessImage(models.Model):
    # name=models.CharField(max_length=100,default="rpsDocument")
    page_image=models.FileField(upload_to="processImages",null=False)

    # def __str__(self):
        # return self.name