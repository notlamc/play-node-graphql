import { authors, books } from "../dummyData";

import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQuery",

  description: "Root Query",

  fields: () => ({
    book: {
      type: BookType,

      description: "A single book",

      args: {
        id: {
          type: GraphQLInt,
        },
      },

      resolve: (_parent, args) => books.find((book) => book.id === args.id),
    },

    author: {
      type: AuthorType,

      description: "A single author",

      args: {
        id: {
          type: GraphQLInt,
        },
      },

      resolve: (_parent, args) =>
        authors.find((author) => author.id === args.id),
    },

    authors: {
      type: new GraphQLList(AuthorType),

      description: "List of all authors",

      resolve: () => authors,
    },

    books: {
      type: new GraphQLList(BookType),

      description: "List of all books",

      resolve: () => books,
    },
  }),
});

const AuthorType: GraphQLObjectType = new GraphQLObjectType({
  name: "Author",

  description: "This represents an author",

  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },

    name: {
      type: GraphQLNonNull(GraphQLString),
    },

    books: {
      type: GraphQLNonNull(GraphQLList(BookType)),

      resolve: (author) => books.filter((book) => book.authorId === author.id),
    },
  }),
});

const BookType: GraphQLObjectType = new GraphQLObjectType({
  name: "Book",

  description: "This represents a book written by an author",

  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
    },

    name: {
      type: GraphQLNonNull(GraphQLString),
    },

    authorId: {
      type: GraphQLNonNull(GraphQLInt),
    },

    author: {
      type: GraphQLNonNull(AuthorType),

      resolve: (book) => authors.find((author) => author.id === book.authorId),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "RootMutation",

  description: "Root Mutation",

  fields: () => ({
    addAuthor: {
      type: AuthorType,

      description: "Add author",

      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },
      },

      resolve: (_parent, args) => {
        const author = {
          id: authors.length + 1,

          name: args.name,
        };

        authors.push(author);

        return author;
      },
    },

    addBook: {
      type: BookType,

      description: "Add book",

      args: {
        name: {
          type: GraphQLNonNull(GraphQLString),
        },

        authorId: {
          type: GraphQLNonNull(GraphQLInt),
        },
      },

      resolve: (_parent, args) => {
        const book = {
          id: books.length + 1,

          name: args.name,

          authorId: args.authorId,
        };

        books.push(book);

        return book;
      },
    },
  }),
});

export { RootQueryType, AuthorType, BookType, RootMutationType };
