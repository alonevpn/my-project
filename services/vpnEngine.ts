import * as Network from 'expo-network';

export async function getNetworkInfo() {
  const ip = await Network.getIpAddressAsync();

  return {
    ip,
    ping: Math.floor(Math.random() * 40) + 10,
    download: Math.floor(Math.random() * 300) + 50,
    upload: Math.floor(Math.random() * 150) + 20,
  };
}

export async function connectVPN(server:any) {
  await new Promise(r => setTimeout(r,2000));

  return {
    success:true,
    server,
    connectedAt:new Date().toISOString(),
  };
}

export async function disconnectVPN() {
  await new Promise(r => setTimeout(r,1000));

  return true;
}
