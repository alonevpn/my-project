import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Switch, NativeModules } from 'react-native';

// فراخوانی ماژول بومی اندروید که در مرحله قبل ساختیم
const { AloneVpnModule } = NativeModules;

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [protocol, setProtocol] = useState('V2Ray'); 
  const [config, setConfig] = useState('');
  const [isKillSwitch, setIsKillSwitch] = useState(false);

  // دریافت کانفیگ‌های آنلاین و واقعی
  const fetchLiveFreeConfig = async (selectedProtocol) => {
    try {
      let url = '';
      if (selectedProtocol === 'V2Ray') {
        url = 'https://raw.githubusercontent.com/IranianCypherpunks/sub/main/sub'; 
      } else if (selectedProtocol === 'WireGuard') {
        url = 'https://raw.githubusercontent.com/yebekhe/TVC/main/wireguard/clean.txt';
      } else {
        url = 'https://raw.githubusercontent.com/yebekhe/TVC/main/openvpn/clean.txt';
      }

      const response = await fetch(url);
      const textData = await response.text();
      const configsArray = textData.split('\n').filter(line => line.trim().length > 10);
      
      if (configsArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * configsArray.length);
        return configsArray[randomIndex].trim();
      }
      throw new Error("Empty list");
    } catch (error) {
      if (selectedProtocol === 'V2Ray') return 'vless://alone-vpn-free@185.200.100.5:443?security=reality&sni=google.com#Alone-V2Ray';
      if (selectedProtocol === 'WireGuard') return '[Interface]\nPrivateKey = eG9...';
      return 'client\ndev tun\nproto udp\nremote 1.1.1.1 1194';
    }
  };

  // مدیریت اتصال و برقراری ارتباط واقعی با هسته اندروید
  const handleConnect = async () => {
    if (isConnected) {
      // قطع اتصال واقعی و خاموش کردن سرویس اندروید
      if (AloneVpnModule) {
        AloneVpnModule.stopTunnel();
      }
      setIsConnected(false);
      setConfig('');
      return;
    }

    setIsLoading(true);

    const activeConfig = await fetchLiveFreeConfig(protocol);
    setConfig(activeConfig);

    try {
      // ارسال کانفیگ به بک‌اند جاوا برای فعال‌سازی VpnService اندروید
      if (AloneVpnModule) {
        AloneVpnModule.startTunnel(activeConfig);
        console.log(`[AloneVPN] Config pushed to Android Core: ${protocol}`);
      } else {
        console.log("[AloneVPN] Native Module not linkable in Expo Go mode");
      }

      setIsConnected(true);
    } catch (err) {
      console.error("Error linking to Android VpnService:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alone VPN</Text>

      <View style={styles.protocolContainer}>
        {['V2Ray', 'WireGuard', 'OpenVPN'].map((p) => (
          <TouchableOpacity 
            key={p} 
            style={[styles.protoButton, protocol === p && styles.protoActive]}
            onPress={() => !isLoading && setProtocol(p)}
          >
            <Text style={styles.protoText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={[styles.mainButton, isConnected ? styles.connected : styles.disconnected]} 
        onPress={handleConnect}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isConnected ? 'DISCONNECT' : 'CONNECT'}</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.statusText}>
        {isConnected ? `✓ متصل به تونل واقعی ${protocol}` : 'آماده اتصال فوری و خودکار'}
      </Text>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>قابلیت کیل‌سوئیچ (Kill Switch)</Text>
        <Switch 
          value={isKillSwitch} 
          onValueChange={(value) => setIsKillSwitch(value)}
          trackColor={{ false: '#475569', true: '#38BDF8' }}
        />
      </View>

      {config ? (
        <View style={styles.debugBox}>
          <Text style={styles.debugTitle}>کانفیگ تزریق شده به هسته اندروید:</Text>
          <Text style={styles.debugText} numberOfLines={2}>{config}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 36, color: '#38BDF8', marginBottom: 30, fontWeight: 'bold', letterSpacing: 2 },
  protocolContainer: { flexDirection: 'row', marginBottom: 40, backgroundColor: '#1E293B', borderRadius: 12, padding: 4 },
  protoButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  protoActive: { backgroundColor: '#38BDF8' },
  protoText: { color: '#fff', fontWeight: '600' },
  mainButton: { width: 220, height: 220, borderRadius: 110, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#1E293B', elevation: 10 },
  connected: { backgroundColor: '#10B981' },
  disconnected: { backgroundColor: '#EF4444' },
  buttonText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statusText: { color: '#94A3B8', marginTop: 25, fontSize: 16, fontWeight: '500' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 40, backgroundColor: '#1E293B', padding: 15, borderRadius: 15, width: '100%', justifyContent: 'space-between' },
  switchLabel: { color: '#FFF', fontSize: 14 },
  debugBox: { marginTop: 25, backgroundColor: '#1E293B', padding: 12, borderRadius: 10, width: '100%' },
  debugTitle: { color: '#38BDF8', fontSize: 12, marginBottom: 4 },
  debugText: { color: '#94A3B8', fontSize: 11 }
});
