package domains

import (
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type ToDo struct {
	Id        int    `json:"id" db:"id"`
	Title     string `json:"title" db:"title"`
	Completed bool   `json:"completed" db:"completed"`
	CreatedAt string `json:"created_at" db:"created_at"`
}

type ToDoUseCase interface {
	GetAll() ([]ToDo, error)
	GetById(id int) (*ToDo, error)
	Create(title string) (*ToDo, error)
	Update(id int, title string, completed bool) (*ToDo, error)
	Delete(id int) error
}

type toDoUseCase struct {
	db *sqlx.DB
}

func NewToDoUseCase(db *sqlx.DB) ToDoUseCase {
	return &toDoUseCase{db}
}

func (u *toDoUseCase) GetAll() ([]ToDo, error) {
	var toDos []ToDo
	err := u.db.Select(&toDos, "SELECT * FROM todos")
	if err != nil {
		return nil, err
	}
	return toDos, nil
}

func (u *toDoUseCase) GetById(id int) (*ToDo, error) {
	var toDo ToDo
	err := u.db.Get(&toDo, "SELECT * FROM todos WHERE id=?", id)
	if err == sql.ErrNoRows {
		return &ToDo{}, fmt.Errorf("todo with id %d not found", id)
	}
	if err != nil {
		return nil, err
	}

	return &toDo, nil
}

func (u *toDoUseCase) Create(title string) (*ToDo, error) {
	_, err := u.db.Exec(`INSERT INTO todos (title, completed) VALUES (?, ?)`, title, false)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var toDo ToDo
	err = u.db.Get(&toDo, "SELECT * FROM todos ORDER BY id DESC LIMIT 1")
	if err != nil {
		return nil, err
	}

	return &toDo, nil
}

func (u *toDoUseCase) Update(id int, title string, completed bool) (*ToDo, error) {
	_, err := u.GetById(id)
	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("todo with id %d not found", id)
	}
	if err != nil {
		return nil, err
	}

	query := `UPDATE todos SET title=?, completed=? WHERE id=?`
	_, err = u.db.Exec(query, title, completed, id)
	if err != nil {
		return nil, err
	}

	var toDo ToDo
	err = u.db.Get(&toDo, "SELECT * FROM todos WHERE id=?", id)
	if err != nil {
		return nil, err
	}

	return &toDo, nil
}

func (u *toDoUseCase) Delete(id int) error {
	_, err := u.GetById(id)
	if err == sql.ErrNoRows {
		return fmt.Errorf("todo with id %d not found", id)
	}
	if err != nil {
		return err
	}

	query := `DELETE FROM todos WHERE id=?`
	_, err = u.db.Exec(query, id)
	if err != nil {
		return err
	}

	return nil
}
