# Loqui Chat App - API

## GET /api/users
> Pobierz dane wszystkich użytkowników.

Dostępne tylko dla zalogowanego użytkownika.

### Przykładowe zapytanie
```json
GET /api/users

{
    "token": "eyJhbGciOiJIUzI1N..."
}
```

### Przykładowa odpowiedź
```json
STATUS 200

{
	"users": [
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
```json
GET /api/users/2

{
    "token": "eyJhbGciOiJIUzI1N..."
}
```

### Przykładowa odpowiedź
```json
STATUS 200

{
	"user": {
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
```json
POST /api/users

{
    "username": "jan123",
    "password": "haslomaslo"
}
```

### Przykładowa odpowiedź
```json
STATUS 201

{
	"message": "201 New user created successfully."
}
```

## DELETE /users/:id
> Ustaw użytkownikowi o podanym id status na usunięty.

Dostępne tylko dla użytkownika o danym id.

TBD

## PUT /users/:id
> Aktualizuj dane użytkownika o podanym id.

Dostępne tylko dla użytkownika o danym id.

TBD

## POST /api/auth
> Zaloguj wybranego użytkownika.

Dostępne tylko dla niezalogowanych.

### Przykładowe zapytanie
```json
POST /api/auth

{
    "username": "jan123",
    "password": "haslomaslo"
}
```

### Przykładowa odpowiedź
```json
STATUS 200

{
	"login": true,
	"id": 19,
	"username": "jan123",
	"token": "eyJhbGciOiJIUzI1NiIsI..."
}
```

### Przykładowy błąd
```json
STATUS 401

{
	"login": false,
	"message": "401 Invalid password."
}
```
```json
STATUS 401

{
	"login": false,
	"message": "401 User does not exist."
}
```

## DELETE /api/auth
> Wyloguj obecnie zalogowanego użytkownika.

Dostępne tylko dla zalogowanego użytkownika.

TBD