# User Directory App

This is a React Native app that displays a list of users fetched from an API. The app allows users to search and sort by name or email. It supports pagination, so more users are loaded as the user scrolls down.

## Features

- Search users by name
- Sort users by name or email
- Infinite scrolling to load more users
- Displays user details (name, email, and image)

## Installation

### Prerequisites

To get started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (with npm)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) or [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) for Android/iOS development

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/user-directory-app.git
   cd user-directory-app
   ```

2. **Install dependencies**

   Run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

3. **Run the app**

   You can run the app using Expo or React Native CLI.

   - **Using Expo (Recommended for ease)**

     If you're using Expo, run the following command:

     ```bash
     expo start
     ```

     This will start the Expo development server. You can open the app on your phone by scanning the QR code using the Expo Go app.

   - **Using React Native CLI**

     For React Native CLI, run the following command:

     **For Android:**

     ```bash
     npx react-native run-android
     ```

     **For iOS (Mac Only)**

     ```bash
     npx react-native run-ios
     ```

     Make sure you have either an emulator running or a device connected.

## Running the App

1. Upon starting the app, the users' data will be fetched from https://jsonplaceholder.typicode.com/users.
2. You can search users by their name using the search bar.
3. You can sort the list by either name or email.
4. Scrolling down will load more users from the API.

## File Structure

```bash
/user-directory-app
  ├── App.js              # Main entry point of the app
  ├── components/
  │   └── UserListScreen.js  # Screen displaying the user list
  ├── assets/
  │   └── logo.png        # App logo
  ├── package.json        # Project dependencies and scripts
  └── README.md           # This file
```

## Contributing
If you'd like to contribute to this project, follow these steps:
1. Fork the repository
2. Create a new branch: git checkout -b feature-branch
3. Make your changes and commit them: git commit -m 'Add new feature'
4. Push to the branch: git push origin feature-branch
5. Create a new Pull Request