o projeto utiliza as seguintes tecnologias:

- [pnpm](https://pnpm.io/) para gerenciamento dos pacotes
- [biomejs](https://biomejs.dev/) para linting e formatação do código
- [Tailwind CSS](https://tailwindcss.com/docs/installation) para estilização
- [shadcn/ui](https://ui.shadcn.com/) para componentes pré-definidos
- [@tanstack/react-query](https://tanstack.com/query/latest/docs/framework/react/overview) para lidar com o server state

## Iniciando o projeto

O primeiro passo é criar o arquivo `.env` com base no arquivo `.env.local.example`. Para isso, rode o comando e preencha o novo arquivo com os valores corretos:

```bash
cp .env.local.example .env
```

Depois, instale as dependências e inicie o servidor de desenvolvimento:

```bash
pnpm i
```

```bash
pnpm dev
```

Basta abrir o endereço [http://localhost:3000](http://localhost:3000) agora.
