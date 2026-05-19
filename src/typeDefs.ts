export const typeDefs = `
  type Product {
    id: ID!
    name: String!
    price: Float!
    inStock: Boolean!
  }
  type User {
    id: ID!
    name: String!
    cart: [Product!]!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    user(id: ID!): User
  }

  type Mutation {
    addProduct(name: String!, price: Float!, inStock: Boolean!): Product!
  }
`;