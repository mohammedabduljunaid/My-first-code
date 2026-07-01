import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '8 Ball Pool',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const PoolGameScreen(),
    );
  }
}

class PoolGameScreen extends StatefulWidget {
  const PoolGameScreen({Key? key}) : super(key: key);

  @override
  State<PoolGameScreen> createState() => _PoolGameScreenState();
}

class _PoolGameScreenState extends State<PoolGameScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('🎱 8 Ball Pool'),
        centerTitle: true,
      ),
      body: Container(
        color: const Color(0xFF1a1a2e),
        child: WebView(
          initialUrl: 'file:///android_asset/pool_game.html',
          javascriptMode: JavascriptMode.unrestricted,
        ),
      ),
    );
  }
}

// Import WebView
import 'package:webview_flutter/webview_flutter.dart';
