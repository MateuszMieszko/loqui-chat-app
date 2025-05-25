# Loqui Chat App - API documentation

## GET /api/users
> Pobierz dane wszystkich użytkowników.

Dostępne tylko dla zalogowanego użytkownika.

### Przykładowe zapytanie
**GET /api/users**
```json
{
    "token": "eyJhbGciOiJIUzI1N..."
}
```

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "users_data": [
        {
            "id": 1,
            "username": "alice",
            "password_hash": "88d4266fd4e6338d"
        },
        {
            "id": 2,
            "username": "bob",
            "password_hash": "$2y$10$qrdefghij"
        },
        {
            "id": 3,
            "username": "carol",
            "password_hash": "$2y$10$123567890"
        },
    ]
}
```

## GET /api/users/:id
> Pobierz dane użytkownika o podanym id.

Dostępne tylko dla zalogowanego użytkownika.

### Przykładowe zapytanie
**GET /api/users/2**
```json
{
    "token": "eyJhbGciOiJIUzI1N..."
}
```

### Przykładowa odpowiedź
**STATUS 200**
```json
{
    "user_data": {
        "id": 2,
        "username": "bob",
        "password_hash": "$2y$10$qrstuvwxyzabcdefghij"
    }
}
```

## POST /api/users
> Stwórz nowego użytkownika.

Dostępne tylko dla niezalogowanego użytkownika.

### Przykładowe zapytanie
**POST /api/users**
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

## DELETE /users
> Ustaw użytkownikowi o podanym id status na usunięty.

Dostępne tylko dla użytkownika o danym id.

### Przykładowe zapytanie
**DELETE /users**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsI..."
}
```

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

## PUT /users
> Aktualizuj dane użytkownika o podanym id.

Dostępne tylko dla użytkownika o danym id.

### Przykładowe zapytanie
**PUT /users**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsI...",
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
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsI..."
}
```

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