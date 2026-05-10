const mockProducts = [
  { id: '1', name: 'White Faux Leather Backpack', price: 39.99, inStock: true },
  { id: '2', name: 'Mechanical Keyboard', price: 120.00, inStock: false },
  { id: '3', name: 'Wireless Mouse', price: 45.50, inStock: true },
];

export const resolvers = {
  Query: {
    hello: () => 'Hello from your new GraphQL Playground! 🚀',
    
    products: () => mockProducts,
    
    product: (_:number, args:string) => mockProducts.find(p => p.id === args.id),
  },
};