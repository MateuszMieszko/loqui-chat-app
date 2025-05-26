# Loqui Chat App - API documentation

## GET /api/users
> Pobierz dane wszystkich użytkowników.
Dostępne tylko dla zalogowanego użytkownika.

### Przykładowe zapytanie
**GET /api/users**
Authorization: Bearer eyJhbGciOiJIUzI1N...

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "users_data": [
        {
            "id": 1,
            "username": "alice",
            "password_hash": "88d4266fd4e6338d...",
            "deleted": 0
        },
        {
            "id": 2,
            "username": "bob",
            "password_hash": "$2y$10$qrdefghij...",
            "deleted": 0
        },
        {
            "id": 3,
            "username": "carol",
            "password_hash": "$2y$10$123567890...",
            "deleted": 1
        },
    ]
}
```

## GET /api/users/:id
> Pobierz dane użytkownika o podanym id.
Dostępne tylko dla zalogowanego użytkownika.

### Przykładowe zapytanie
**GET /api/users/2**
Authorization: Bearer eyJhbGciOiJIUzI1N...

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "user_data": {
        "id": 2,
        "username": "bob",
        "password_hash": "$2y$10$qrstuvwxyzabcdefghij",
        "deleted": 0
    }
}
```

## POST /api/users
> Stwórz nowego użytkownika.
Dostępne tylko dla niezalogowanego użytkownika.

### Przykładowe zapytanie
**POST /api/users**
Authorization: Bearer eyJhbGciOiJIUzI1N...
```json
{
    "username": "jan123",
    "password": "haslomaslo"
}
```

### Przykładowa odpowiedź
**STATUS 201**
```json
{
    "message": "201 New user created successfully."
}
```

## DELETE /api/users
> Ustaw użytkownikowi o podanym id status na usunięty.
Dostępne tylko dla użytkownika o danym id.

### Przykładowe zapytanie
**DELETE /api/users**
Authorization: Bearer eyJhbGciOiJIUzI1N...

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "message": "200 Deleted account succesfully."
}
```

### Przykładowy błąd
**STATUS 401**
```json
{
    "message": "401 Deleted user."
}
```

## PUT /api/users
> Aktualizuj dane użytkownika o podanym id.
Dostępne tylko dla użytkownika o danym id.

### Przykładowe zapytanie
**PUT /api/users**
Authorization: Bearer eyJhbGciOiJIUzI1N...
```json
{
    "username": "NowyNick",
    "password": "NoweHaslo"
}
```
`username` i `password` są opcjonalne

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "message": "200 Edited user info."
}
```

## GET /api/auth
> Pobierz dane zalogowanego użytkownika
Dostępne tylko dla zalogowanych.

### Przykładowe zapytanie
**GET /api/auth**
Authorization: Bearer eyJhbGciOiJIUzI1N...

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "login": true,
    "message": "200 User is logged in.",
    "id": 11,
    "username": "zuzol23"
}
```

### Przykładowy błąd
**STATUS 401**
```json
{
    "message": "401 Invalid token."
}
```

## POST /api/auth
> Zaloguj wybranego użytkownika.
Dostępne tylko dla niezalogowanych.

### Przykładowe zapytanie
**POST /api/auth**
```json
{
    "username": "jan123",
    "password": "haslomaslo"
}
```

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "login": true,
    "id": 19,
    "username": "jan123",
    "token": "eyJhbGciOiJIUzI1NiIsI..."
}
```

### Przykładowy błąd
**STATUS 401**
```json
{
    "login": false,
    "message": "401 Invalid password."
}
```
**STATUS 401**
```json
{
    "login": false,
    "message": "401 User does not exist."
}
```

## DELETE /api/auth
> Wyloguj obecnie zalogowanego użytkownika.
Dostępne tylko dla zalogowanego użytkownika.

### Przykładowe zapytanie
**POST /api/auth**
Authorization: Bearer eyJhbGciOiJIUzI1N...

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "message": "Token added to blacklist."
}
```

### Przykładowy błąd
**STATUS 401**
```json
{
    "message": "401 Invalid token."
}
```
**STATUS 401**
```json
{
    "message": "401 Token expired."
}
```

## GET /api/messages/:id
> Pobierz wiadomości wysłane między użytkownikiem o danym id oraz zalogowanym użytkownikiem.
Dostępne tylko dla zalogowanego użytkownika.

### Przykładowe zapytanie
**GET /api/messages/2**
Authorization: Bearer eyJhbGciOiJIUzI1N...

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "content": [
        {
            "id": 1,
            "sender_id": 1,
            "receiver_id": 2,
            "content": "Cześć Bob, jak się masz?",
            "created_at": "2025-05-15T09:12:00.000Z",
            "updated_at": "2025-05-20T05:03:20.000Z"
        },
        {
            "id": 2,
            "sender_id": 2,
            "receiver_id": 1,
            "content": "Hej Alice! Wszystko w porządku, a u Ciebie?",
            "created_at": "2025-05-15T09:13:10.000Z",
            "updated_at": "2025-05-20T05:03:20.000Z"
        },
        {
            "id": 7,
            "sender_id": 1,
            "receiver_id": 2,
            "content": "Zastanawiam się nad wspólnym projektem.",
            "created_at": "2025-05-16T08:03:00.000Z",
            "updated_at": "2025-05-20T05:03:20.000Z"
        }
    ]
}
```
**STATUS 200**
```json
{
    "content": []
}
```

### Przykładowy błąd
**STATUS 401**
```json
{
    "message": "401 Invalid token."
}
```

## POST /api/messages
> Utwórz wiadomość wysłaną przez zalogowanego użytkownika do użytkownika o podanym id.
Dostępne tylko dla zalogowanego użytkownika.

### Przykładowe zapytanie
**POST /api/messages**
Authorization: Bearer eyJhbGciOiJIUzI1N...
```json
{
    "receiver_id": 2,
    "content": "Ależ ciekawa wiadomość do wspaniałego kolegi!"
}
```
### Przykładowa odpowiedź
**STATUS 201**
```json
{
    "message": "201 New message created successfully."
}
```
**STATUS 401**
```json
{
    "message": "401 Invalid token."
}
```