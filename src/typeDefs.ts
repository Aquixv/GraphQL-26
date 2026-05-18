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
    # Takes in arguments, and returns the newly created Product!
    addProduct(name: String!, price: Float!, inStock: Boolean!): Product!
  }
`;