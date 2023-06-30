import { createSocket, Socket } from 'dgram';
import { exec } from 'child_process';
import * as os from 'os';

const ports: number[] = [7, 9];
const shutdownCommand: string = 'shutdown /s /f /t 0';

const sockets: Socket[] = ports.map((port) => {
  const socket = createSocket('udp4');

  socket.on('message', (msg) => {
    const magicPacket: string = msg.subarray(0, 6).toString('hex');
    const macAddress: string = msg.subarray(6, 12).toString('hex');

    if (magicPacket === 'ff'.repeat(6) && macAddress.length === 12) {
      console.log('Received a valid Wake-on-LAN packet!');

      if (macAddress === getLocalMACAddress())
        exec(shutdownCommand, (error) => {
          if (error)
            console.error(`Error while shutting down: ${error.message}`);
          else console.log('Shutting down the machine...');
        });
      else
        console.log(
          `Received MAC Address (${macAddress}) does not match the local MAC Address (${getLocalMACAddress()}).`
        );
    }
  });

  socket.bind(port, () => {
    const address = socket.address();
    console.log(`Socket listening on ${address.address}:${address.port}`);
  });

  return socket;
});

function getLocalMACAddress(): string | undefined {
  const networkInterfaces = os.networkInterfaces();
  const macAddress: string | undefined = (
    Object.values(networkInterfaces).flat() as os.NetworkInterfaceInfo[]
  ).find(({ internal, mac }) => !internal && mac)?.mac;
  return macAddress?.replaceAll(':', '');
}
