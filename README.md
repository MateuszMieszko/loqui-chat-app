# Loqui

Aplikacja czatu — Node.js (Express) + React (Vite) + MariaDB, uruchamiana przez Docker Compose.

Repozytorium: https://github.com/MateuszMieszko/loqui-chat-app

## Wymagania

- [Docker](https://docs.docker.com/engine/install/) i Docker Compose
- opcjonalnie Node.js 20+ (do uruchamiania bez Dockera)

## Konfiguracja

Konfiguracja odbywa się przez pliki `.env`:

- `.env` w katalogu głównym — baza danych, porty, sekrety JWT
- `webpage/.env` — adres API dla frontendu (`VITE_API_URL`)

Zmienne w głównym `.env`:

| Zmienna | Opis |
| --- | --- |
| `DB_HOST` | nazwa hosta bazy (w Dockerze: `database`) |
| `DB_PORT` | port bazy wewnątrz sieci Dockera |
| `DB_HOST_PORT` | port bazy wystawiony na hosta |
| `DB_USER` | użytkownik bazy |
| `DB_PASSWORD` | hasło bazy |
| `DB_NAME` | nazwa bazy |
| `ADMINER_HOST_PORT` | port panelu Adminer na hoście |
| `ADMINER_PORT` | port Adminer wewnątrz kontenera |
| `SERVER_PORT` | port serwera wewnątrz kontenera |
| `SERVER_HOST_PORT` | port serwera wystawiony na hosta |
| `WEBPAGE_PORT` | port frontendu wewnątrz kontenera |
| `WEBPAGE_HOST_PORT` | port frontendu wystawiony na hosta |
| `JWT_SECRET_KEY` | sekret do podpisywania tokenów JWT |
| `JWT_LIFETIME` | czas życia tokenu JWT |
| `BCRYPT_SALT` | liczba rund solenia haseł (bcrypt) |

> **Uwaga:** pliki `.env` są częścią repozytorium (wartości dev-owe). Przed wdrożeniem produkcyjnym zmień `DB_PASSWORD`, `JWT_SECRET_KEY` i `BCRYPT_SALT`.

## Docker

**UWAGA**: tam gdzie jest napisane `docker-compose` i to nie działa, zamiennie można użyć `docker compose`.

#### Włączanie kontenerów Dockera

```bash
docker-compose up --build
```

wychodzimy za pomocą Ctrl+C

#### Pomocne flagi

- `--build` - buduje obrazy kontenerów podczas włączania
- `--remove-orphans` - usuwa niepotrzebne już kontenery
- `-d` - włącza kontenery w tle (później można wyłączyć za pomocą `docker-compose down`)

#### Po włączeniu dostępne będą następujące adresy:

- `localhost:8000` - serwer
- `localhost:8080` - strona internetowa
- `localhost:3000` - adminer (dane logowania są w pliku .env)

#### Wchodzenie do konsoli kontenerów

Kontener musi być uruchomiony (np. w innym oknie terminala).

```bash
docker-compose exec -it [kontener] sh
```

wychodzimy za pomocą komendy `exit`

nazwy kontenerów: `server`, `webpage`, `database`

## Struktura projektu

```
.
├── database/          # init.sql i dane bazy (db-data ignorowane przez git)
├── server/            # backend Express + MariaDB
├── webpage/           # frontend React + Vite
├── docker-compose.yml
└── wait-for.sh        # czeka na gotowość bazy przed startem serwera
```
