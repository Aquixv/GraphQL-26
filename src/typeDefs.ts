export const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    price: Float!
    inStock: Boolean!
  }

  type Query {
    hello: String
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, inStock: Boolean!): Product!
    updateProduct(id: ID!, name: String, price: Float, inStock: Boolean): Product
    deleteProduct(id: ID!): String
  }
`;