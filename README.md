
# api-receitas

Api de receitas culinárias, feita utilizando NestJS, Postgres e TypeORM.

Possui as funcionalidades de Autenticação, Receitas e Avaliações.

##

#### Instalação de dependências
`npm install`

##

#### Execução
Para executar, deve-se ter um arquivo `.env` com os mesmos campos do arquivo `.example.env` disponibilizado no repositório.

`npm run start` irá compilar e executar o projeto.

##

#### Requisitos funcionais da API

##### Cadastro - POST /auth/register
1. Deve receber obrigatoriamente os campos `username` (string), `firstName` (string), `lastName` (string) e `password` (string);
2. `Username` deve ser único. Se o username informado pertencer a outro usuário, deve retornar uma exceção;
3. A senha deve conter ao menos uma letra. Caso contrário deve retornar uma exceção com status **400**;
4. A senha deve conter ao menos um número. Caso contrário deve retornar uma exceção com status **400**;
5. A senha deve conter pelo menos 8 digítos. Caso contrário deve retornar uma exceção com status **400**;
6. Cadastro bem-sucedido deve retornar status **201** e um `id` no response body.

##### Login - POST /auth/login
7. Deve receber obrigatoriamente os campos `username` (string) e `password` (string);
8. Login bem-sucedido deve retornar status **200** e um `access_token` no response body;
9. Caso as credenciais sejam inválidas, deve retornar uma exceção com status **401**.


##### Criar receita - POST /recipes
10. Deve receber obrigatoriamente os campos `name` (string), `ingredientes` (array de strings), `instructions` (string), `preparationTime` (int), `cookingTime` (int) e `servings` (int);
11. Caso o usuário esteja logado (token Authorization) e envie um request body válido, deve ser criada uma receita e atribuída ao usuário logado. Deve retornar status **201** e o response body deve ter os campos `name` (string), `ingredientes` (array de strings), `instructions` (string), `preparationTime` (int), `cookingTime` (int), `totalTime` (int), `servings` (int), `userId` (int), `id` (int), `views` (int), `createdAt` (string) e `updatedAt` (string);
12. Caso o usuário envie um request body válido sem estar logado, deve retornar uma exceção com status **401**;

##### Atualizar receita - PUT /recipes/{id}
13. Deve receber obrigatoriamente os campos `name` (string), `ingredientes` (array de strings), `instructions` (string), `preparationTime` (int), `cookingTime` (int) e `servings` (int);
14. Caso o usuário esteja logado (token Authorization), seja o criador da receita do id informado e envie um request body válido, a receita deve ser atualizada. Deve retornar status **200** e uma mensagem informando o sucesso na atualização;
15. Caso o usuário não esteja logado, deve retornar uma exceção com status **401**;
16. Caso o usuário logado não seja o dono da receita, deve retornar uma exceção com status **401**;
17. Caso o `id` informado na URL seja inválido, deve retornar uma exceção com status **404**;

##### Excluir receita - DELETE /recipes/{id}
18. Caso o usuário esteja logado (token Authorization) e seja o criador da receita do id informado, a receita deve ser excluída. Deve retornar status **200** e uma mensagem informando o sucesso na exclusão;
19. Caso o usuário não esteja logado, deve retornar uma exceção com status **401**;
20. Caso o usuário logado não seja o dono da receita, deve retornar uma exceção com status **401**;
21. Caso o `id` informado na URL seja inválido, deve retornar uma exceção com status **404**;

##### Buscar receita por id - GET /recipes/{id}
22. Caso exista uma receita para o id informado, deve retornar status **200** e o response body deve ter os campos `id` (int), `userId` (int), `name` (string), `ingredients` (array de strings), `instructions` (string), `preparationTime` (int), `cookingTime` (int), `totalTime` (int), `servings` (int), `views` (int), `createdAt` (string), `updatedAt` (string), `totalReviews` (int) e `averageAvaliation` (int);
23. O campo `views` deve ser incrementada toda vez que é feita uma requisição buscando a receita pelo id;
24. O campo `totalReviews` deve retornar a quantidade de avaliações para aquela receita;
25. O campo `averageAvaliation` deve retornar a média das avaliações para aquela receita;
26. Caso não exista receita para o `id` informado na URL, deve retornar uma exceção com status **404**;

##### Buscar todas as receitas - GET /recipes?page=
27. Caso exista receitas para o `page` informado na URL, deve ser retornado status **200** e o response body deve ter os campos `totalItems` (int), `page` (int), `limit` (int), `totalPages` (int) e `data` (array) cujo cada objeto do array contém os campos `id` (int), `name` (string), `ingredients` (array de strings), `instructions` (string), `preparationTime` (int), `cookingTime` (int), `totalTime` (int), `servings` (int), `views` (int), `createdAt` (string), `updatedAt` (string) e `userId` (int);
28. Caso não exista receitas para o `page` informado na URL, deve retornar status **200** e o response body deve ter os campos `data` (array) vazio, `totalItems` (int), `page` (int), `limit` (int) e `totalPages` (int);
29. O campo `totalItems` deve retornar a quantidade de receitas que tem naquela página;
30. O campo `page` deve retornar a página informada na requisição;
31. O campo `limit` deve retornar 10 (valor default);
32. Caso encontre resultados (cenário 27), não deve ser retornado mais do que 10 receitas;

##### Buscar receitas por nome - GET /recipes/search?name=
33. Caso exista receitas para o `name` informado na URL, deve ser retornado status **200** e o response body deve ser um array de objetos, onde cada objeto contém os campos `id` (int), `name` (string), `ingredients` (array de strings), `instructions` (string), `preparationTime` (int), `cookingTime` (int), `totalTime` (int), `servings` (int), `views` (int), `createdAt` (string), `updatedAt` (string) e `userId` (int);
34. Caso não exista receitas para o `name` informado na URL, deve retornar status **200** e o response body deve ter um array vazio;
35. O filtro deve ser case-insensitive;
36. O filtro deve reconhecer qualquer receita que CONTENHA o valor digitado no campo `name`;


##### Criar avaliação - POST /reviews
37. Deve receber obrigatoriamente os campos `avaliation` (int) e `recipeId` (int) e opcionalmente o campo `comment` (string);
38. Caso o usuário esteja logado (token Authorization) e envie um request body válido, deve ser criada uma avaliação e atribuída ao usuário logado. Deve retornar status **201** e o response body deve ter os campos `avaliation` (int), `comment` (string), `recipeId` (int), `userId` (int), `id` (int), `createdAt` (string) e `updatedAt` (string).
39. O campo `avaliation` deve ser um int maior que 0. Caso contrário deve retornar uma exceção com status **400**;
40. O campo `avaliation` deve ser um int menor que 5. Caso contrário deve retornar uma exceção com status **400**;
41. Caso o `recipeId` informado não exista, deve ser retornado uma exceção com status **404**;
42. Caso o usuário não esteja logado, deve retornar uma exceção com status **401**;
43. Caso o usuário esteja logado (token Authorization), envie um request body válido e que ele já tenha feito uma avaliação para o `recipeId` informado, a request deve ter sucesso e a avaliação anterior deve ser substituida. 

##### Excluir avaliação - DELETE /reviews/{id}
44. Caso o usuário esteja logado (token Authorization) e seja o criador da avaliação do `id` informado, a avaliação deve ser excluída. Deve retornar status **200** e uma mensagem informando o sucesso na exclusão;
45. Caso o usuário não esteja logado, deve retornar uma exceção com status **401**;
46. Caso o usuário logado não seja o dono da avaliação, deve retornar uma exceção com status **401**;
47. Caso o `id` informado na URL seja inválido, deve retornar uma exceção com status **404**;

##### Buscar avaliação por id - GET /reviews/{id}
48. Caso exista uma avaliação para o `id` informado, deve retornar status **200** e o response body deve ter os campos `id` (int), `avaliation` (int), `comment` (string), `createdAt` (string), `updatedAt` (string), `recipeId` (int) e `userId` (int);
49. Caso não exista avaliação para o `id` informado na URL, deve retornar uma exceção com status **404**;

##### Buscar todas avaliações de uma receita - GET /reviews/findReviewsOfRecipe/{id}
50. Caso exista uma receita para o `id` informado, deve buscar as avaliações que estão vinculas ao `id` informado. Deve retornar status **200** e o response body deve ser um array de objetos, onde cada objeto contém os campos `id` (int), `avaliation` (int), `comment` (string), `createdAt` (string), `updatedAt` (string), `recipeId` (int) e `userId` (int);
51. Caso não exista uma receita para o `id` informado, deve retornar uma exceção com status **404**;


##### Buscar perfil do usuário logado - GET /user/profile
52. Caso o usuário esteja logado (token Authorization), deve retornar status **200** e o response body deve ter os seguintes campos: `id` (int), `username` (string), `firstName` (string), `lastName` (string), `createdAt` (string) e `updatedAt` (string);
53. Caso o usuário não esteja logado, deve retornar uma exceção com status **401**;

##### Buscar avaliações do usuário logado - GET /user/reviews
54. Caso o usuário esteja logado (token Authorization), deve retornar status **200** e o response body deve ser um array de objetos, onde cada objeto contém os campos `id` (int), `avaliation` (int), `comment` (string), `createdAt` (string), `updatedAt` (string), `recipeId` (int) e `userId` (int);
55. Caso o usuário não esteja logado, deve retornar uma exceção com status **401**;

##### Buscar receitas do usuário logado - GET /user/recipes
56. Caso o usuário esteja logado (token Authorization), deve retornar status **200** e o response body deve ser um array de objetos, onde cada objeto contém os campos `id` (int), `name` (string), `ingredients` (array de strings), `instructions` (string), `preparationTime` (int), `cookingTime` (int), `totalTime` (int), `servings` (int), `views` (int), `createdAt` (string), `updatedAt` (string) e `userId` (int);
57. Caso o usuário não esteja logado, deve retornar uma exceção com status **401**.
