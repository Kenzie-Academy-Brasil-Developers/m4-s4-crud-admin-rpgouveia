CREATE TABLE IF NOT EXISTS users (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20) NOT NULL,
	"email" VARCHAR(100) UNIQUE NOT NULL,
	"password" VARCHAR(120) NOT NULL,
	"admin" BOOLEAN DEFAULT FALSE NOT NULL,
	"active" BOOLEAN DEFAULT TRUE NOT NULL
);