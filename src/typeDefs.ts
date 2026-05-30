// export const typeDefs = `
//   type Product {
//     id: ID!
//     name: String!
//     price: Float!
//     inStock: Boolean!
//   }
//   type User {
//     id: ID!
//     name: String!
//     cart: [Product!]!
//   }

//   type Query {
//     products: [Product!]!
//     product(id: ID!): Product
//     user(id: ID!): User
//     hello: String
//   }

//   type Mutation {
//     addProduct(name: String!, price: Float!, inStock: Boolean!): Product!
//     updateProduct(id: ID!, name: String, price: Float, inStock: Boolean): Product 
//     deleteProduct(id: ID!): String 
//   }
//     type PopcartProduct {
//   id: ID!
//   name: String!
//   price: Float   # No exclamation mark! If it's missing in DB, GraphQL safely returns null.
//   inStock: Boolean
// }
// `;
export const typeDefs = `#graphql
  # 1. The Nested Review Type
  type Review {
    id: ID!
    name: String
    rating: Int!
    comment: String!
  }

  # 2. The Main Product Type
  type Product {
    id: ID!
    title: String!
    thumbnail: String!
    brand: String
    category: String!
    description: String!
    price: Float!
    stock: Int!
    sold: Int!
    discountPercentage: Float
    rating: Float!
    numReviews: Int!
    reviews: [Review!]! # An array of the Review type above!
  }

  type Query {
    hello: String
    products: [Product!]!
  }
    type User {
    hello: String
    id: ID!
    name: String!
    email: String!
    avatar: String
    role: String!
}
    type AuthPayload{
    token: String!
    User: User
    }
      type Mutation {
    addProduct(
      title: String!
      brand: String!
      category: String!
      description: String!
      thumbnail: String!
      price: Float!
      stock: Int!
    ): Product!
    updateProduct(id: ID!, name: String, price: Float, inStock: Boolean): Product 
    deleteProduct(id: ID!): String 
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;