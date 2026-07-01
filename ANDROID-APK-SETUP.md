# 8 Ball Pool - Android APK Setup Guide

## 🎮 Quick Start for Android APK

This guide will help you create an Android APK file that you can download and install on your Android phone.

## ⚡ Easiest Method: Use WebView APK Builder (5 minutes)

### Option 1: Android Studio (Recommended)

**Requirements:**
- Download Android Studio: https://developer.android.com/studio
- Java Development Kit (JDK): https://www.oracle.com/java/technologies/downloads/

**Steps:**
1. Install Android Studio
2. Clone the Flutter project from this repo
3. Open Android Studio
4. Go to `Build` → `Generate Signed Bundle / APK`
5. Select APK
6. Create signing key (or use existing)
7. Select Release build
8. Click Finish
9. APK will be in `app/release/app-release.apk`

---

### Option 2: Using Web2APK (Easiest - No Coding)

**No installation needed!**

1. Go to: https://web2apk.com/
2. Fill in details:
   - **App Name:** 8 Ball Pool
   - **Package Name:** com.8ballpool.game
   - **URL:** `https://cdn.jsdelivr.net/gh/mohammedabduljunaid/My-first-code@main/play-now.html`
   - **App Icon:** Choose a nice icon
3. Click "Generate APK"
4. Download the APK file
5. Transfer to phone and install

---

### Option 3: AppsGeyser (Very Easy)

1. Visit: https://www.appsgeyser.com/
2. Click "Create your app"
3. Paste URL: `https://cdn.jsdelivr.net/gh/mohammedabduljunaid/My-first-code@main/play-now.html`
4. Customize (name, icon, colors)
5. Click "Create app"
6. Download APK
7. Install on Android device

---

### Option 4: Appetize.io (Cloud-based)

1. Go to: https://appetize.io/
2. Upload your HTML file or paste URL
3. Generate APK
4. Download instantly

---

## 📱 How to Install APK on Android

### Step 1: Enable Installation from Unknown Sources
1. Go to `Settings` → `Security` (or `Apps & notifications`)
2. Enable "Unknown sources" or "Install unknown apps"
3. For specific browsers, go to `Settings` → `Apps` → [Your Browser] → `Permissions` → Toggle "Install unknown apps"

### Step 2: Transfer APK to Phone
- Download APK file to computer
- Connect phone via USB
- Copy APK to phone's Downloads folder
- Or use AirDroid, Google Drive, or email

### Step 3: Install APK
1. Open File Manager on phone
2. Navigate to Downloads folder
3. Tap the APK file
4. Click "Install"
5. Wait for installation to complete
6. App will appear on home screen

---

## 🔧 Advanced: Build with Flutter (Professional)

### Prerequisites
```bash
# 1. Install Flutter
# Download from: https://flutter.dev/docs/get-started/install

# 2. Install Android SDK
# Use Android Studio or command line

# 3. Set environment variables
export ANDROID_SDK_ROOT=/path/to/android-sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
```

### Build APK
```bash
# Clone/Download the Flutter project
git clone https://github.com/mohammedabduljunaid/My-first-code.git
cd flutter-app

# Get dependencies
flutter pub get

# Build APK
flutter build apk --release

# APK location:
# build/app/outputs/flutter-apk/app-release.apk
```

### Build App Bundle (for Google Play)
```bash
flutter build appbundle --release

# Bundle location:
# build/app/outputs/bundle/release/app-release.aab
```

---

## 📥 Download Pre-built APK

### Recommended: Use Web2APK
✅ Fastest method (5 minutes)  
✅ No installation needed  
✅ Works on all Android devices  

**Direct link to Web2APK:** https://web2apk.com/

---

## 🚀 Installation Troubleshooting

### "App not installed" Error
- **Solution:** Enable "Unknown sources" in Settings
- Check Android version (minimum Android 5.0 required)
- Ensure enough storage space (50MB free)

### APK file not opening
- **Solution:** Use a file manager app
- Try installing from Google Play (if published)
- Check if file is corrupted - redownload

### Game not loading
- **Solution:** Check internet connection
- Clear app cache: Settings → Apps → 8 Ball Pool → Storage → Clear Cache
- Reinstall APK

---

## 📤 Share Your App

### Once you have the APK:

1. **Via Email:**
   - Attach APK file
   - Send to friends
   - They click file to install

2. **Via Google Drive:**
   - Upload APK to Drive
   - Share link
   - Friends download and install

3. **Via WhatsApp/Telegram:**
   - Share APK file directly
   - Friends tap to install

4. **Publish to Google Play:**
   - Create Google Play Developer account ($25 one-time)
   - Upload APK/AAB
   - Submit for review
   - Publish

---

## 💡 Best Practices

✅ **Test on multiple devices** before sharing  
✅ **Use a signing key** for production builds  
✅ **Keep APK updated** with new features  
✅ **Monitor app size** (keep under 50MB)  
✅ **Test offline functionality**  

---

## 📊 File Sizes

| Type | Size |
|------|------|
| Web2APK (Wrapper) | 5-10 MB |
| Flutter APK | 30-50 MB |
| App Bundle | 15-25 MB |

---

## 🎯 Next Steps

1. **Create APK** using Web2APK (easiest)
2. **Test on Android device**
3. **Share with friends**
4. **Gather feedback**
5. **Improve game** based on feedback
6. **Publish to Google Play** (optional)

---

## 📞 Support

If you have issues:
1. Check Android version (5.0+)
2. Ensure 50MB free storage
3. Enable "Unknown sources"
4. Try different file manager app
5. Clear cache and reinstall

---

**Easiest Solution:** Use **Web2APK** - takes 5 minutes! 🚀
