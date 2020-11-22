Set-Location .\Backend\pharmacyproject\;
pipenv run python manage.py makemigrations pharmacyapi
pipenv run python manage.py migrate
Set-Location ../../;