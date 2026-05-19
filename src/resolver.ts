const mockProducts = [
  { id: '1', name: 'White Faux Leather Backpack', price: 39.99, inStock: true },
  { id: '2', name: 'Mechanical Keyboard', price: 120.00, inStock: false },
  { id: '3', name: 'Wireless Mouse', price: 45.50, inStock: true },
];
export const mockUsers = [
  { id: '101', name: 'Aquii', cartIds: ['1', '3'] },
  {id: '606', name: 'Almajiri', cartIds: ['1', '4', '5']} 
];

export const resolvers = {
  Query: {
    products: () => mockProducts,
    product: (_: any, args: { id: string }) => mockProducts.find(p => p.id === args.id),
    user: (_: any, args: { id: string }) => mockUsers.find(u => u.id === args.id),
  },
  User: {
    cart: (parent: any) => {
      return mockProducts.filter(product => parent.cartIds.includes(product.id));
    }
  },

  Mutation: {
    addProduct: (_: any, args: { name: string; price: number; inStock: boolean }) => {
      const newProduct = {
        id: String(mockProducts.length + 1),
        name: args.name, price: args.price, inStock: args.inStock,
      };
      mockProducts.push(newProduct);
      return newProduct;
    }
  }
};