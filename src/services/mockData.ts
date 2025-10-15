// Mock data for the ecommerce app
export const mockProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 999,
    description: 'The latest iPhone with advanced camera system and A17 Pro chip.',
    image: 'https://in.static.webuy.com/product_images/Phones/Phones%20iPhone/SAPPI15PM256GBLTUNLB_l.jpg',
    category: 'Electronics',
    inStock: true,
    quantity: 10,
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    price: 1199,
    description: 'Supercharged by the M2 chip, MacBook Air delivers exceptional performance.',
    image: 'data:image/jpeg;base64,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',
    category: 'Electronics',
    inStock: true,
    quantity: 5,
  },
  {
    id: '3',
    name: 'AirPods Pro',
    price: 249,
    description: 'Active noise cancellation for immersive sound. Transparency mode for hearing the world around you.',
    image: 'data:image/jpeg;base64,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',
    category: 'Electronics',
    inStock: true,
    quantity: 20,
  },
  {
    id: '4',
    name: 'Nike Air Max 270',
    price: 150,
    description: 'Comfortable running shoes with Max Air cushioning.',
    image: 'data:image/jpeg;base64,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',
    category: 'Fashion',
    inStock: true,
    quantity: 15,
  },
  {
    id: '5',
    name: 'Samsung Galaxy S24',
    price: 799,
    description: 'Powerful Android smartphone with advanced AI features.',
    image: 'https://www.myg.in/images/thumbnails/600/600/detailed/74/1_koh3-3z-removebg-preview.png.png',
    category: 'Electronics',
    inStock: false,
    quantity: 0,
  },
  {
    id: '6',
    name: 'Levi\'s 501 Jeans',
    price: 89,
    description: 'Classic straight fit jeans made from 100% cotton.',
    image: 'https://images-cdn.ubuy.co.in/66cec6a73735432bab740913-levi-s-men-s-501-original-fit-jeans.jpg',
    category: 'Fashion',
    inStock: true,
    quantity: 25,
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5',
    price: 399,
    description: 'Industry-leading noise canceling with Dual Noise Sensor technology.',
    image: 'https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/272419_jqvb9x.png?tr=w-1000',
    category: 'Electronics',
    inStock: true,
    quantity: 8,
  },
  {
    id: '8',
    name: 'Adidas Ultraboost 22',
    price: 180,
    description: 'Responsive running shoes with Boost midsole technology.',
    image: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/e3a7db18925d4728809baafc0106b761_9366/Ultraboost_20_Shoes_Black_EF1043_01_standard.jpg',
    category: 'Fashion',
    inStock: true,
    quantity: 12,
  },
];

export const mockUser = {
  id: '1',
  name: 'Varun Kumar M',
  email: 'varun@example.com',
};

// Mock API functions
export const mockApi = {
  // Simulate API delay
  delay: (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms)),

  // Mock login
  login: async (credentials: { email: string; password: string }) => {
    await mockApi.delay(1000);
    if (credentials.email === 'varun@example.com' && credentials.password === 'password') {
      return {
        user: mockUser,
        token: 'mock-jwt-token-12345',
      };
    }
    throw new Error('Invalid credentials');
  },

  // Mock register
  register: async (userData: { name: string; email: string; password: string }) => {
    await mockApi.delay(1000);
    return {
      user: { ...mockUser, ...userData },
      token: 'mock-jwt-token-12345',
    };
  },

  // Mock logout
  logout: async () => {
    await mockApi.delay(500);
    return { success: true };
  },

  // Mock fetch products
  fetchProducts: async () => {
    await mockApi.delay(800);
    return mockProducts;
  },

  // Mock fetch product by ID
  fetchProductById: async (id: string) => {
    await mockApi.delay(500);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },

  // Mock search products
  searchProducts: async (query: string) => {
    await mockApi.delay(600);
    const q = query.toLowerCase();
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(q)
    );
  },
};
