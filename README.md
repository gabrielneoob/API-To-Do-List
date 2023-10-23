# Api-To-Do-List

## Funções Todos
[API](https://api-todolist-b8bf07f7bcd9.herokuapp.com/)

- [X] Buscar Task

- [X] Buscar somente uma Task

- [X] Cadastrar uma task

- [X] Atualiza task

- [X] Atualiza check

| Método HTTP	| Endpoint | Descrição |
|--------|----------|----------|
| GET |	/ |	Retorna todas as task cadastradas |
| GET |	/todo/:id |	Retorna a task específica|
| POST |	/create |	Cadastra uma nova task |
| PUT |	/todo/check/:id |	Atualiza task como feita ou não feita |
| PUT |	/todo/update/:id |	Atualiza informação da task de uma task existente |
| DELETE |	/todo/:id |	Exclui uma task existente pelo ID |
#