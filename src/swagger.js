module.exports = {
  swagger: "2.0",
  info: {
    description:
      "Esta API se encarga de manejar la infomación de la base de datos del proyecto `API FAVS`",
    version: "1.0.0",
    title: "API API FAVS",
    contact: {
      email: "apiteam@swagger.io",
    },
  },
  server: {
    url: "http://localhost:8080",
  },
  tags: [
    {
      name: "Fav",
      description:
        "Este endpoint maneja toda la informacion relacionada con los objetos favoritos que se encuentran en los listados.",
    },
    {
      name: "List",
      description:
        "Endpoint encargado de la información relacionada con los Listados en la base de datos.",
    },
    {
      name: "User",
      description:
        "Este endopoint maneja toda la informacion relacionada al usuario",
    },
  ],
  paths: {
    "/list": {
      post: {
        tags: ["List"],
        summary: "Guarda la información de una nueva lista en la BD.",
        produces: ["application/json"],
        parameters: [
          {
            name: "Authentication",
            in: "header",
            description: "Token de autorización.",
            required: true,
            schema: {
              type: "string",
              example:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2NWQ1YjZkMGFmYmU0YWU1YzhjZSIsImlhdCI6MTY1NDM1MTMxNywiZXhwIjoxNjU0NDM3NzE3fQ.pG0El3BK-m3AZcKH77H9rT7pQ4F5HnQa7uvGhSWuFJY",
            },
          },
          {
            name: "body",
            in: "body",
            description: "Cuerpo de los datos para crear una nueva lista.",
            required: true,
            schema: {
              $ref: "#/definitions/ListCreateRequest",
            },
          },
        ],
        responses: {
          201: {
            description: "List created",
            schema: {
              type: "object",
              example: "message: List created",
            },
          },
        },
      },
    },
    "/list/{:listId}": {
      get: {
        tags: ["List"],
        summary: "Recupera la Lista de la BD",
        produces: ["application/json"],
        parameters: [
          {
            name: "Authentication",
            in: "header",
            description: "Token de autorización.",
            required: true,
            schema: {
              type: "string",
              example:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2NWQ1YjZkMGFmYmU0YWU1YzhjZSIsImlhdCI6MTY1NDM1MTMxNywiZXhwIjoxNjU0NDM3NzE3fQ.pG0El3BK-m3AZcKH77H9rT7pQ4F5HnQa7uvGhSWuFJY",
            },
          },
        ],
        responses: {
          200: {
            description: "Lists found",
            schema: {
              type: "object",
              example: "message: Lists found",
            },
          },
        },
      },
    },
    "/list/lists": {
      get: {
        tags: ["List"],
        summary: "Recupera todas la Lista de la BD",
        produces: ["application/json"],
        parameters: [
          {
            name: "Authentication",
            in: "header",
            description: "Token de autorización.",
            required: true,
            schema: {
              type: "string",
              example:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2NWQ1YjZkMGFmYmU0YWU1YzhjZSIsImlhdCI6MTY1NDM1MTMxNywiZXhwIjoxNjU0NDM3NzE3fQ.pG0El3BK-m3AZcKH77H9rT7pQ4F5HnQa7uvGhSWuFJY",
            },
          },
          {
            name: "listId",
            in: "path",
            description: "Identificador de la Lista.",
            required: true,
            schema: {
              type: "string",
              example: "62b396dc5947fa740f417d01",
            },
          },
        ],
        responses: {
          200: {
            description: "List found",
            schema: {
              type: "object",
              example: "message: List found",
            },
          },
        },
      },
    },
    "/list/delete/{:listId}": {
      delete: {
        tags: ["List"],
        summary: "Elimina la Lista de la BD",
        produces: ["application/json"],
        parameters: [
          {
            name: "Authentication",
            in: "header",
            description: "Token de autorización.",
            required: true,
            schema: {
              type: "string",
              example:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2NWQ1YjZkMGFmYmU0YWU1YzhjZSIsImlhdCI6MTY1NDM1MTMxNywiZXhwIjoxNjU0NDM3NzE3fQ.pG0El3BK-m3AZcKH77H9rT7pQ4F5HnQa7uvGhSWuFJY",
            },
          },
          {
            name: "listId",
            in: "path",
            description: "Identificador de la Lista.",
            required: true,
            schema: {
              type: "string",
              example: "62b396dc5947fa740f417d01",
            },
          },
        ],
        responses: {
          200: {
            description: "List Deleted",
            schema: {
              type: "object",
              example: "message: List Deleted",
            },
          },
        },
      },
    },
    "/users": {
      get: {
        tags: ["User"],
        summary: "Recupera todos los usuarios de la BD",
        produces: ["application/json"],
        parameters: [
          {
            userName: "nickname",
            in: "query",
            description: "Nick del usuario",
            required: true,
            schema: {
              type: "string",
              example: "Rafael",
            },
          },
          {
            email: "email",
            in: "path",
            description: "correo del usuario.",
            required: true,
            schema: {
              type: "string",
              example: "rafael@hotmail.com",
            },
          },
        ],
        responses: {
          200: {
            description: "users found",
            schema: {
              type: "object",
              example: "message: users found",
            },
          },
        },
      },
    },
    "/user/signup": {
      post: {
        tags: ["User"],
        summary: "Ingresa los datos para registrar el usuario en la BD",
        produces: ["application/json"],
        parameters: [
          {
            name: "Authentication",
            in: "header",
            description: "Token de autorización.",
            required: true,
            schema: {
              type: "string",
              example:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2NWQ1YjZkMGFmYmU0YWU1YzhjZSIsImlhdCI6MTY1NDM1MTMxNywiZXhwIjoxNjU0NDM3NzE3fQ.pG0El3BK-m3AZcKH77H9rT7pQ4F5HnQa7uvGhSWuFJY",
            },
          },
          {
            name: "body",
            in: "body",
            description: "datos del usuario.",
            required: true,
            schema: {
              $ref: "#/definitions/user",
            },
          },
        ],
        responses: {
          200: {
            description: "users created",
            schema: {
              type: "object",
              example: "message: users created",
            },
          },
        }, // .end get
      },
    },
    "/user/signin": {
      post: {
        tags: ["User"],
        summary: "Ingresa los datos para registrar el usuario en la BD",
        produces: ["application/json"],
        parameters: [
          {
            name: "Authentication",
            in: "header",
            description: "Token de autorización.",
            required: true,
            schema: {
              type: "string",
              example:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2NWQ1YjZkMGFmYmU0YWU1YzhjZSIsImlhdCI6MTY1NDM1MTMxNywiZXhwIjoxNjU0NDM3NzE3fQ.pG0El3BK-m3AZcKH77H9rT7pQ4F5HnQa7uvGhSWuFJY",
            },
          },
          {
            name: "body",
            in: "body",
            description: "datos del usuario.",
            required: true,
            schema: {
              $ref: "#/definitions/userLogin",
            },
          },
        ],
        responses: {
          200: {
            description: "users login",
            schema: {
              type: "object",
              example: "message: users login",
            },
          },
        }, // .end get
      }, // .end get
    },
    "/list/fav/{listId}/new-fav": {
      post: {
        tags: ["Fav"],
        summary: "Ingresa los datos para registrar el usuario en la BD",
        produces: ["application/json"],
        parameters: [
          {
            name: "Authentication",
            in: "header",
            description: "Token de autorización.",
            required: true,
            schema: {
              type: "string",
              example:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2NWQ1YjZkMGFmYmU0YWU1YzhjZSIsImlhdCI6MTY1NDM1MTMxNywiZXhwIjoxNjU0NDM3NzE3fQ.pG0El3BK-m3AZcKH77H9rT7pQ4F5HnQa7uvGhSWuFJY",
            },
          },
          {
            name: "body",
            in: "body",
            description: "datos del Favorito.",
            required: true,
            schema: {
              $ref: "#/definitions/Fav",
            },
          },
        ],
        responses: {
          201: {
            description: "fav created",
            schema: {
              type: "object",
              example: "message: fav created",
            },
          },
        },
      },
    },
    "/list/fav/{listId}/remove-fav": {
      delete: {
        tags: ["Fav"],
        summary:
          "Elimina los datos que haya realizado el usuario con respecto a un fav de un usuario en la BD",
        produces: ["application/json"],
        parameters: [
          {
            name: "Authentication",
            in: "header",
            description: "Token de autorización.",
            required: true,
            schema: {
              type: "string",
              example:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWI2NWQ1YjZkMGFmYmU0YWU1YzhjZSIsImlhdCI6MTY1NDM1MTMxNywiZXhwIjoxNjU0NDM3NzE3fQ.pG0El3BK-m3AZcKH77H9rT7pQ4F5HnQa7uvGhSWuFJY",
            },
          },
        ],
        responses: {
          200: {
            description: "fav deleted",
            schema: {
              type: "object",
              example: "message: fav deleted",
            },
          },
        },
      },
    },
  },
  definitions: {
    user: {
      type: "object",
      required: ["name"],
      properties: {
        id: {
          type: "string",
          example: "629b65d5b6d0afbe4ae5c8ce",
        },
        userName: {
          type: "string",
          example: "Jonh",
        },
        email: {
          type: "string",
          example: "jophn@hotmail.com",
        },
        pasword: {
          type: "string",
          example: "Hola1234",
        },
        confirmPassword: {
          type: "string",
          example: "Hola1234",
        },
      },
    },
    userLogin: {
      type: "object",
      required: ["name"],
      properties: {
        email: {
          type: "string",
          example: "jophn@hotmail.com",
        },
        pasword: {
          type: "string",
          example: "Hola1234",
        },
      },
    },
    Fav: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "629b82eb8fe398f547c03c24",
        },
        titleFav: {
          type: "string",
          example: "Autos Deportivos",
        },
        description: {
          type: "string",
          example: "autos_deportivos",
        },
        Link: {
          type: "string",
          example: "https://www.youtube.com/watch?v=wvz97-lNPH8&t=1s",
        },
        userId: {
          type: "string",
          example: "629b82eb8dsethjki7c0312l",
        },
        listId: {
          type: "string",
          example: "leod82eb8dsethjki790pdk3",
        },
      }, // .end properties
    },
  },
};
