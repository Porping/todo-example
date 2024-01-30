package response

import "backend/domains"

type GetToDosResponse struct {
	Message   string         `json:"message"`
	IsSuccess bool           `json:"isSuccess"`
	Data      []domains.ToDo `json:"data,omitempty"`
}

type CreateToDosResponse struct {
	Message   string       `json:"message"`
	IsSuccess bool         `json:"isSuccess"`
	Data      domains.ToDo `json:"data,omitempty"`
}

type UpdateToDosResponse struct {
	Message   string       `json:"message"`
	IsSuccess bool         `json:"isSuccess"`
	Data      domains.ToDo `json:"data,omitempty"`
}

type DeleteToDosResponse struct {
	Message   string `json:"message"`
	IsSuccess bool   `json:"isSuccess"`
}
