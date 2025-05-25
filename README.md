### Docker
**UWAGA**: tam gdzie jest napisane ```docker-compose``` i to nie działa, zamiennie można użyć ```docker compose```

#### Włączanie kontenerów Dockera
```docker-compose up --build```
wychodzimy za pomocą Ctrl+C

#### Pomocne flagi
- ```--build``` - buduje obrazy kontenerów podczas włączania
- ```--remove-orphans``` - usuwa niepotrzebne już kontenery
- ```-d``` - włącza kontenery w tle (później można wyłączyć za pomocą ```docker-compose down```)

#### Po włączeniu dostępne będą następujące adresy:
- ```localhost:8000``` - serwer
- ```localhost:8080``` - strona internetowa
- ```localhost:3000``` - adminer (dane logowania są w pliku .env)

#### Wchodzenie do konsoli kontenerów
Kontener musi być uruchomiony (np. w innym oknie terminala)
```docker-compose exec -it [kontener] sh```
wychodzimy za pomocą komendy ```exit```

nazwy kontenerów: ```server```, ```webpage```, ```database```