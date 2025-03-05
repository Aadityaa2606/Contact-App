# React Native Contact Manager

A modern mobile contact management application built with React Native, Expo, MobX State Tree, and TypeScript. This project serves as a learning resource for React Native development, demonstrating best practices and common mobile app patterns.

## 📱 Demo

https://drive.google.com/file/d/13rJX3VD9f-76cXHtUAVR-95nWA027-xY/view?usp=sharing

<div style="display: flex; gap: 10px;">
  <img src="image.png" alt="Contact List" width="250" />
  <img src="image-1.png" alt="Contact Details" width="250" />
  <img src="image-2.png" alt="Edit Contact" width="250" />
</div>

## 🚀 Features

- **Contact Management**
  - View contacts in an alphabetically sorted list
  - Add new contacts with details (name, phone, email, address)
  - Edit existing contact information
  - Delete single or multiple contacts
  - Multi-select mode for bulk actions
  
- **User Interface**
  - Modern, native-feeling UI with smooth animations
  - Section list with alphabetical headers
  - Responsive design that works on both iOS and Android
  - Form validation for required fields

- **Development Features**
  - TypeScript for type safety
  - MobX State Tree for state management
  - Expo for easy development and deployment
  - Random contact generation for testing

## 🛠️ Technology Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Programming language
- **MobX State Tree** - State management
- **React Navigation** - Navigation library
- **NativeWind** - Tailwind CSS for React Native
- **React Native MMKV** - Fast key-value storage

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (version specified in package.json engines)
- Yarn package manager
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app (for physical device testing)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd brysk_task
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn start
```

### Building for Devices

For iOS:
```bash
yarn build:ios:sim  # For iOS simulator
yarn build:ios:dev  # For iOS device (development)
yarn build:ios:prod # For iOS device (production)
```

For Android:
```bash
yarn build:android:sim  # For Android emulator
yarn build:android:dev  # For Android device (development)
yarn build:android:prod # For Android device (production)
```

## 📚 Learning Resources

This project demonstrates several key React Native concepts:

- **State Management**: Using MobX State Tree for predictable state updates
- **Navigation**: Stack navigation with React Navigation
- **Forms**: Form handling with validation
- **UI Components**: Custom components and styling
- **Storage**: Local data persistence
- **TypeScript**: Type safety and interfaces

## 🧪 Testing Data

The app includes a utility to generate random contacts for testing:

```typescript
import { generateRandomContacts } from "../utils/generateRandomContacts"

// Generate 100 random contacts
const randomContacts = generateRandomContacts(100)
```

## 📂 Project Structure

This project follows ignite-react-native-boilerplate structure with some modifications
https://github.com/infinitered/ignite

## 🤝 Contributing

This is a learning project, and contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is licensed under the MIT License
