export const typeDefs = `#graphql
  # 1. The Blueprint (Notice the exclamation marks mean "Required/Cannot be null")
  type Product {
    id: ID!
    name: String!
    price: Float!
    inStock: Boolean!
  }

  # 2. The Menu
  type Query {
    hello: String
    products: [Product!]!          # Returns an array of Products
    product(id: ID!): Product      # Accepts an 'id' argument and returns one Product
  }
`;