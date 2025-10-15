import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchProductById, addToCart, updateCartQuantity, removeFromCart } from '../store/slices/productSlice';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;
  const { selectedProduct, isLoading, cart } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
    }
  };

  const handleIncrement = () => {
    if (!selectedProduct) return;
    const inCart = cart.find((c) => c.id === selectedProduct.id);
    if (inCart) {
      dispatch(updateCartQuantity({ id: selectedProduct.id, quantity: inCart.quantity + 1 }));
    } else {
      dispatch(addToCart(selectedProduct));
    }
  };

  const handleDecrement = () => {
    if (!selectedProduct) return;
    const inCart = cart.find((c) => c.id === selectedProduct.id);
    if (!inCart) return;
    const newQty = inCart.quantity - 1;
    if (newQty <= 0) {
      dispatch(removeFromCart(selectedProduct.id));
    } else {
      dispatch(updateCartQuantity({ id: selectedProduct.id, quantity: newQty }));
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading product...</Text>
      </SafeAreaView>
    );
  }

  if (!selectedProduct) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <Image source={{ uri: selectedProduct.image }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{selectedProduct.name}</Text>
        <Text style={styles.productPrice}>${selectedProduct.price}</Text>
        <Text style={styles.productDescription}>{selectedProduct.description}</Text>
        
        <View style={styles.productDetails}>
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{selectedProduct.category}</Text>
          
          <Text style={styles.detailLabel}>Availability:</Text>
          <Text style={[
            styles.detailValue,
            { color: selectedProduct.inStock ? '#4CAF50' : '#F44336' }
          ]}>
            {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        {(() => {
          const inCart = cart.find((c) => c.id === selectedProduct.id);
          const qty = inCart ? inCart.quantity : 0;
          if (selectedProduct.inStock && qty > 0) {
            return (
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyButton} onPress={handleDecrement}>
                  <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{qty}</Text>
                <TouchableOpacity style={styles.qtyButton} onPress={handleIncrement}>
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            );
          }
          return (
            <TouchableOpacity
              style={[styles.addToCartButton, { opacity: selectedProduct.inStock ? 1 : 0.5 }]}
              onPress={handleAddToCart}
              disabled={!selectedProduct.inStock}
            >
              <Text style={styles.addToCartText}>
                {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Text>
            </TouchableOpacity>
          );
        })()}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#F44336',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  productDetails: {
    marginBottom: 30,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  qtyValue: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 12,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
