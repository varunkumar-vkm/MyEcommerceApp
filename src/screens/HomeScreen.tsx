import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch, RootState } from '../store/store';
import { fetchProducts, setSearchQuery, addToCart, updateCartQuantity, removeFromCart, searchProducts } from '../store/slices/productSlice';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { products, filteredProducts, isLoading, searchQuery, cart } = useSelector(
    (state: RootState) => state.products
  );

  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(''));
      dispatch(fetchProducts());
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    setLocalQuery(query);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const trimmed = localQuery.trim();
      dispatch(setSearchQuery(localQuery));
      if (trimmed.length === 0) {
        dispatch(fetchProducts());
      } else {
        dispatch(searchProducts(trimmed));
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [localQuery, dispatch]);

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetail', { productId });
  };

  const handleCartPress = () => {
    
    navigation.navigate('MainTabs', {
      screen: 'Cart'
    });
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  const handleIncrement = (product: any) => {
    const existing = cart.find((c) => c.id === product.id);
    if (existing) {
      dispatch(updateCartQuantity({ id: product.id, quantity: existing.quantity + 1 }));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleDecrement = (product: any) => {
    const existing = cart.find((c) => c.id === product.id);
    if (!existing) return;
    const newQty = existing.quantity - 1;
    if (newQty <= 0) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(updateCartQuantity({ id: product.id, quantity: newQty }));
    }
  };

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item.id)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        {(() => {
          const inCart = cart.find((c) => c.id === item.id);
          const qty = inCart ? inCart.quantity : 0;
          if (qty > 0) {
            return (
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyButton} onPress={() => handleDecrement(item)}>
                  <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{qty}</Text>
                <TouchableOpacity style={styles.qtyButton} onPress={() => handleIncrement(item)}>
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            );
          }
          return (
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          );
        })()}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
            <Text style={styles.title}>My Ecommerce App</Text>
        <TouchableOpacity onPress={() => handleCartPress()}>
        <Text style={styles.cartCount}>🛒 ({cart.length})</Text>
        </TouchableOpacity>
      
      </View>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={localQuery}
        onChangeText={handleSearch}
      />

      {filteredProducts.length === 0 && !isLoading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubtext}>Try a different search term.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  cartCount: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  searchInput: {
    margin: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  productsList: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    marginBottom: 8,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  qtyValue: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default HomeScreen;
