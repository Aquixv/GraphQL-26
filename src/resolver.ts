const mockProducts = [
  { id: '1', name: 'White Faux Leather Backpack', price: 39.99, inStock: true },
  { id: '2', name: 'Mechanical Keyboard', price: 120.00, inStock: false },
  { id: '3', name: 'Wireless Mouse', price: 45.50, inStock: true },
];

export const resolvers = {
  Query: {
    hello: () => 'Hello from your new GraphQL Playground! 🚀',
    products: () => mockProducts,
    product: (_: any, args: { id: string }) => mockProducts.find(p => p.id === args.id),
  },
  Mutation: {
    addProduct: (_: any, args: { name: string; price: number; inStock: boolean }) => {
      const newProduct = {
        id: String(mockProducts.length + 1), 
        name: args.name,
        price: args.price,
        inStock: args.inStock,
      };
      
      mockProducts.push(newProduct);
      return newProduct;
    },
    updateProduct: (_: any, args: { id: string; name?: string; price?: number; inStock?: boolean }) => {
        const product = mockProducts.find(p => p.id === args.id);
        if (!product) return null;
        if (args.name !== undefined) product.name = args.name;
        if (args.price !== undefined) product.price = args.price;
        if (args.inStock !== undefined) product.inStock = args.inStock;
  
        return product;
      },
      deleteProduct: (_: any, args: { id: string }) => {
        const index = mockProducts.findIndex(p => p.id === args.id);
        if (index === -1) return "Product not found";
        mockProducts.splice(index, 1);
        return `Product ${args.id} deleted successfully`;
      }
    }
  };