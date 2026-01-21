from django.apps import AppConfig
from django.db.backends.base.base import BaseDatabaseWrapper
from django.db.backends.mysql.features import DatabaseFeatures

class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        
        BaseDatabaseWrapper.check_database_version_supported = lambda self: None
        
        
        DatabaseFeatures.can_return_columns_from_insert = property(lambda self: False)