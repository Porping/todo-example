package payload

type CreateTodoPayload struct {
	Title string `json:"title" validate:"required"`
}

type UpdateTodoPayload struct {
	Title     string `json:"title" validate:"required"`
	Completed *bool  `json:"completed" validate:"required"`
}
