import * as jwt from 'jsonwebtoken'
import { Product } from "./models/products";
import User from "./models/User";

export const resolvers = {
  Query: {
    products: async () => await Product.find(), 
  },

  Mutation: {
    addProduct: async (parent: any, args: any, context: any) => {
      if (!context.user) {
        throw new Error("Not Authenticated! Please log in.");
      }
      const newProduct = new Product({
        user: context.user._id, 
        title: args.title,
        price: args.price,
        date: args.date,
        time: args.time
      });
      return await newProduct.save();
    },
    updateProduct: async (_: any, args: { id: string; name?: string; price?: number; inStock?: boolean }) => {
      return await Product.findByIdAndUpdate(
        args.id,
        {
          name: args.name,
          price: args.price,
          inStock: args.inStock,
        },
        { new: true } 
      );
    },

    deleteProduct: async (_: any, args: { id: string }) => {
      const deleted = await Product.findByIdAndDelete(args.id);
      if (!deleted) return "Product not found!";
      return `Product ${args.id} successfully deleted from MongoDB!`;
    },
    register: async (_: any, args: any) => {
      const userExists = await User.findOne({ email: args.email });
      if (userExists) {
        throw new Error('User already exists');
      }
      const user = await User.create({
        name: args.name,
        email: args.email,
        password: args.password,
      });
      const token = jwt.sign({ id: user._id }, process.env.API_SECRET as string, {
        expiresIn: '2d',
      });
      return { token, user };
    },
    login: async (_: any, args: any) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error('Invalid email or password');
      }
      const isMatch = await user.matchPassword(args.password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }
      const token = jwt.sign({ id: user._id }, process.env.API_SECRET as string, {
        expiresIn: '30d',
      });

      return { token, user };
    },
  }
};

// Popcart fetch Resolver
// export const resolvers = {
//   Query: {
//     hello: () => 'Connected to MongoDB server.',
//     products: async () => await Product.find(), 
//   }
// };

// Product Fetch and mutation using database Resolver 

// export const resolvers = {
//   Query: {
//     hello: () => 'Hello from your MongoDB connected GraphQL Server! 🚀',
//     products: async () => {
//       return await Product.find(); 
//     },
//     product: async (_: any, args: { id: string }) => {
//       return await Product.findById(args.id);
//     },
//   },

//   Mutation: {
//     addProduct: async (_: any, args: { name: string; price: number; inStock: boolean }) => {
//       const newProduct = new Product({
//         name: args.name,
//         price: args.price,
//         inStock: args.inStock,
//       });
//       return await newProduct.save();
//     },
//     updateProduct: async (_: any, args: { id: string; name?: string; price?: number; inStock?: boolean }) => {
//       return await Product.findByIdAndUpdate(
//         args.id,
//         {
//           name: args.name,
//           price: args.price,
//           inStock: args.inStock,
//         },
//         { new: true } 
//       );
//     },

//     deleteProduct: async (_: any, args: { id: string }) => {
//       const deleted = await Product.findByIdAndDelete(args.id);
//       if (!deleted) return "Product not found!";
//       return `Product ${args.id} successfully deleted from MongoDB!`;
//     }
//   }
// };
// export const resolvers = {
//   Query: {
//     products: () => mockProducts,
//     product: (_: any, args: { id: string }) => mockProducts.find(p => p.id === args.id),
//     user: (_: any, args: { id: string }) => mockUsers.find(u => u.id === args.id),
//   },
//   User: {
//     cart: (parent: any) => {
//       return mockProducts.filter(product => parent.cartIds.includes(product.id));
//     }
//   },

//   Mutation: {
//     addProduct: (_: any, args: { name: string; price: number; inStock: boolean }) => {
//       const newProduct = {
//         id: String(mockProducts.length + 1),
//         name: args.name, price: args.price, inStock: args.inStock,
//       };
//       mockProducts.push(newProduct);
//       return newProduct;
//     }
//   }
// };
// import { Product } from "./models/products";
// const mockProducts = [
//   { id: '1', name: 'White Faux Leather Backpack', price: 39.99, inStock: true },
//   { id: '2', name: 'Mechanical Keyboard', price: 120.00, inStock: false },
//   { id: '3', name: 'Wireless Mouse', price: 45.50, inStock: true },
// ];
// export const mockUsers = [
//   { id: '101', name: 'Aquii', cartIds: ['1', '3'] },
//   {id: '606', name: 'Almajiri', cartIds: ['1', '4', '5']} 
// ];