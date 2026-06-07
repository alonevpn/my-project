import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { AuthContext } from './context/AuthContext';
import { connectVpn } from './services/VpnTunnel';

export default function App() {
  const { profile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (!profile?.subscriptionActive) {
      Alert.alert('خطا', 'اشتراک شما فعال نیست.');
      return;
    }
    
    setLoading(true);
    const success = await connectVpn({ name: "Server-01" });
    setLoading(false);
    
    if (success) {
      Alert.alert('موفقیت', 'اتصال برقرار شد!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, loading && {opacity: 0.5}]} 
        onPress={handleConnect}
        disabled={loading}
      >
        <Text style={styles.text}>{loading ? 'در حال اتصال...' : 'اتصال به سرور'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#02152E' },
  button: { backgroundColor: '#00E5FF', padding: 20, borderRadius: 30 },
  text: { color: '#02152E', fontWeight: 'bold' }
});
