/* eslint-disable react-native/no-color-literals */
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "@/models"
import { FC, useCallback, useState } from "react"
import Entypo from "@expo/vector-icons/Entypo"
import { $styles } from "@/theme"
import { Screen } from "@/components"
import { useFocusEffect } from "@react-navigation/native"
import { Contact } from "@/models/Contacts"
import { observer } from "mobx-react-lite"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

export interface IndividualContactScreenProps extends AppStackScreenProps<"IndividualContact"> {
  contactId: number
}

export const IndividualContactScreen: FC<IndividualContactScreenProps> = observer(
  ({ navigation, route }) => {
    const { contactBasket } = useStores()
    const [contact, setContact] = useState<Contact | null>(null)

    useFocusEffect(
      useCallback(() => {
        const contact = contactBasket.contacts.find((c) => c.id === Number(route.params.contactId))
        setContact(contact || null)
      }, [contactBasket, route.params.contactId]),
    )

    if (!contact) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Contact not found</Text>
        </View>
      )
    }

    return (
      <Screen
        preset="auto"
        contentContainerStyle={[$styles.flex1, styles.container]}
        safeAreaEdges={["top", "bottom"]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Entypo name="chevron-left" size={34} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Details</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("NewContact", { contactId: contact.id })}
          >
            <MaterialCommunityIcons name="pencil" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.profileSection}>
            <Image source={{ uri: contact.photo }} style={styles.profilePhoto} />
            <Text style={styles.name}>{contact.name}</Text>
            <Text style={styles.role}>{contact.phone || "Role not specified"}</Text>
          </View>

          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoText}>{contact.phone}</Text>
          {contact.email && (
            <>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoText}>{contact.email}</Text>
            </>
          )}
          {contact.address && (
            <>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoText}>{contact.address}</Text>
            </>
          )}
        </View>
      </Screen>
    )
  },
)

const styles = StyleSheet.create({
  backButton: {
    marginRight: 8,
    padding: 8,
  },
  container: {
    backgroundColor: "#F9FAFB",
    flex: 1,
    paddingHorizontal: 16,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginTop: 50,
    textAlign: "center",
  },
  header: {
    alignItems: "center",
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingRight: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    color: "#1F2937",
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
  },
  infoLabel: {
    color: "#4B5563",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 12,
  },
  infoSection: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    elevation: 3,
    marginTop: 15,
    padding: 16,
  },
  infoText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 4,
  },
  name: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  profilePhoto: {
    borderColor: "#E5E7EB",
    borderRadius: 50,
    borderWidth: 2,
    height: 100,
    marginBottom: 12,
    width: 100,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  role: {
    color: "#6B7280",
    fontSize: 16,
  },
})
