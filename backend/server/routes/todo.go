package routes

import (
	"backend/domains"
	"backend/server/payload"
	"backend/server/response"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type ToDoRoute struct {
	ToDoUseCase domains.ToDoUseCase
}

func NewToDoRoute(toDoUseCase domains.ToDoUseCase) *ToDoRoute {
	return &ToDoRoute{toDoUseCase}
}

func (r *ToDoRoute) GetToDos(ctx *fiber.Ctx) error {
	var response response.GetToDosResponse

	todo, err := r.ToDoUseCase.GetAll()
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	response.IsSuccess = true
	response.Message = "Success"
	response.Data = todo
	ctx.JSON(response)

	return nil
}

func (r *ToDoRoute) CreateToDo(ctx *fiber.Ctx) error {
	var response response.CreateToDosResponse
	var payload payload.CreateTodoPayload

	err := ctx.BodyParser(&payload)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	err = validator.New().Struct(payload)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	createdTodo, err := r.ToDoUseCase.Create(payload.Title)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	response.IsSuccess = true
	response.Message = "Success"
	response.Data = *createdTodo

	ctx.JSON(response)

	return nil
}

func (r *ToDoRoute) UpdateToDo(ctx *fiber.Ctx) error {
	var response response.UpdateToDosResponse
	var payload payload.UpdateTodoPayload

	id := ctx.Params("id")

	parsedId, err := strconv.Atoi(id)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	err = ctx.BodyParser(&payload)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	err = validator.New().Struct(payload)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	updatedTodo, err := r.ToDoUseCase.Update(parsedId, payload.Title, *payload.Completed)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	response.IsSuccess = true
	response.Message = "Success"
	response.Data = *updatedTodo

	ctx.JSON(response)

	return nil
}

func (r *ToDoRoute) DeleteToDo(ctx *fiber.Ctx) error {
	var response response.DeleteToDosResponse

	id := ctx.Params("id")

	parsedId, err := strconv.Atoi(id)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	err = r.ToDoUseCase.Delete(parsedId)
	if err != nil {
		response.Message = err.Error()
		ctx.JSON(response)
		return err
	}

	response.IsSuccess = true
	response.Message = "Success"

	ctx.JSON(response)

	return nil
}
