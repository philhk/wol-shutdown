# Wol-Shutdown

Wol-Shutdown is a Windows application that listens for specific UDP packets and triggers a shutdown command on the local machine when a matching packet is received. It provides an easy way to initiate a shutdown remotely by simply sending a Wake-on-LAN (WoL) packet to the running application.

## Usage

1. Download the appropriate executable for your system architecture from the [Releases](https://github.com/philhk/wol-shutdown/releases) tab.
2. Run the executable by double-clicking on it.
   The application will start listening for specific UDP packets on the predefined ports.
3. To initiate a shutdown remotely, send a Wake-on-LAN packet to the machine running the application.
   You can use any Wake-on-LAN tool or app that supports sending Wake-on-LAN packets. For example, you can use Wake-on-LAN apps available for Android devices from the Google Play Store.

   **Note:** Ensure that the machine running the application supports Wake-on-LAN and is properly configured to respond to Wake-on-LAN packets.

## Configuration

By default, the application listens on ports 7 and 9 for UDP packets. To modify the ports or other configuration settings, you need to modify the source code and rebuild the application.

## Building from Source

If you want to build the application from source, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/philhk/wol-shutdown.git
   ```

2. Navigate to the project directory:

   ```shell
   cd wol-shutdown
   ```

3. Install the required dependencies:

   ```shell
   npm install
   ```

4. Build the standalone executable:

   ```shell
   npm run build:exe
   ```

   This will generate standalone executable files in the `dist` directory for each supported architecture.

## License

This project is licensed under the [MIT License](LICENSE.md).
