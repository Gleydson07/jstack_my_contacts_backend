# COMANDOS DOCKER

##### Baixar imagens
### docker pull postgres

##### Listar imagens baixadas
### docker image ls

##### Criar container
### docker run --name pg -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres

##### Iniciar container docker
### docker start pg

##### Parar container docker
### docker stop pg

##### Executar container docker no modo interativo
### docker exec -it pg bash
##### Remover container docker (necessário parar antes)
### docker container rm pg

