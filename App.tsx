import "@expo/metro-runtime"
import * as SplashScreen from "expo-splash-screen"
import { App } from "@/app"
import "./global.css"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return <App />
}

export default IgniteApp
