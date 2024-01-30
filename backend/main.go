package main

import (
	"backend/domains"
	mysql "backend/infrastructures"
	"backend/server/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST, PATCH, DELETE",
	}))

	database, err := mysql.NewMySql("root:root@(localhost:3306)/todo")
	if err != nil {
		panic(err)
	}

	todoUseCase := domains.NewToDoUseCase(database)

	todoRoute := routes.NewToDoRoute(todoUseCase)

	app.Get("/todo", todoRoute.GetToDos)
	app.Post("/todo", todoRoute.CreateToDo)
	app.Patch("/todo/:id", todoRoute.UpdateToDo)
	app.Delete("/todo/:id", todoRoute.DeleteToDo)

	app.Listen(":3000")
}
