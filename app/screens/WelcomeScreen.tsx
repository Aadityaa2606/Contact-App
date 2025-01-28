import { observer } from "mobx-react-lite"
import { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text, Screen, Button } from "@/components"
import { AppStackScreenProps } from "../navigators"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { themed } = useAppTheme()
  const { navigation } = _props
  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($welcomeContainer)}>
        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:welcome"
          preset="heading"
        />
        <Button
          tx={"welcomeScreen:btn"}
          onPress={() => navigation.navigate("Home")}
          style={themed($buttonStyle)}
        />
      </View>
    </Screen>
  )
})

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $welcomeContainer: ThemedStyle<ViewStyle> = () => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
})

const $buttonStyle: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  paddingHorizontal: spacing.lg,
  marginTop: spacing.md,
  backgroundColor: colors.error,
  minWidth: 200,
})
