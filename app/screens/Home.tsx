/* eslint-disable react-native/no-color-literals */
import { useEffect, useState, useCallback } from "react"
import { View, Text, SectionList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native"
import Entypo from "@expo/vector-icons/Entypo"
import Feather from "@expo/vector-icons/Feather"
import { useStores } from "../models"
import { generateRandomContacts } from "../utils/generateRandomContacts"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

interface Contact {
  id: string
  name: string
  phone: string
  photo: string
}

interface Section {
  title: string
  data: Contact[]
}

export const HomeScreen = () => {
  const { contactBasket } = useStores()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false)
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set())
  const navigation = useNavigation()

  const fetchContacts = useCallback(() => {
    // Map store contacts to our Contact interface
    const mappedContacts = contactBasket.contacts.map((contact) => ({
      id: contact.id.toString(),
      name: contact.name,
      phone: contact.phone,
      photo: contact.photo,
    }))
    setContacts(mappedContacts)
  }, [contactBasket.contacts])

  useEffect(() => {
    if (contactBasket.contacts.length === 0) {
      const randomContacts = generateRandomContacts(100)
      contactBasket.addContacts(randomContacts)
    }
    fetchContacts()
  }, [contactBasket, fetchContacts])

  useFocusEffect(
    useCallback(() => {
      fetchContacts()
    }, [fetchContacts]),
  )

  // Function to organize contacts into sections
  const organizeSections = (contacts: Contact[]): Section[] => {
    const sorted = contacts.sort((a, b) => a.name.localeCompare(b.name))
    const sections: { [key: string]: Contact[] } = {}

    sorted.forEach((contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase()
      if (!sections[firstLetter]) {
        sections[firstLetter] = []
      }
      sections[firstLetter].push(contact)
    })

    return Object.keys(sections)
      .sort()
      .map((title) => ({
        title,
        data: sections[title],
      }))
  }

  const toggleSelectContact = (contactId: string) => {
    setSelectedContacts((prev) => {
      const newSelected = new Set(prev)
      if (newSelected.has(contactId)) {
        newSelected.delete(contactId)
      } else {
        newSelected.add(contactId)
      }
      return newSelected
    })
  }

  const handleLongPress = (contact: Contact) => {
    setIsMultiSelectMode(true)
    toggleSelectContact(contact.id)
  }

  const handlePress = (contact: Contact) => {
    if (isMultiSelectMode) {
      toggleSelectContact(contact.id)
    } else {
      navigation.navigate("IndividualContact", { contactId: contact.id })
    }
  }

  const handleSelectAll = () => {
    if (selectedContacts.size === contacts.length) {
      setSelectedContacts(new Set())
    } else {
      setSelectedContacts(new Set(contacts.map((c) => c.id)))
    }
  }

  const handleDelete = () => {
    if (selectedContacts.size === 0) return

    Alert.alert(
      "Delete Contacts",
      `Are you sure you want to delete ${selectedContacts.size} contact${selectedContacts.size > 1 ? "s" : ""}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Delete from store
            const contactsToDelete = Array.from(selectedContacts)
            contactBasket.removeContacts(contactsToDelete)
            const updatedContacts = contacts.filter((contact) => !selectedContacts.has(contact.id))
            setContacts(updatedContacts)
            exitMultiSelectMode()
          },
        },
      ],
    )
  }

  const exitMultiSelectMode = () => {
    setIsMultiSelectMode(false)
    setSelectedContacts(new Set())
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isMultiSelectMode ? (
          <>
            <TouchableOpacity onPress={exitMultiSelectMode} style={styles.headerButton}>
              <Feather name="x" size={24} color="#8B5CF6" />
            </TouchableOpacity>
            <View style={styles.headerCenter}>
              <Text style={styles.selectionText}>{selectedContacts.size} selected</Text>
            </View>
            <View style={styles.multiSelectControls}>
              <TouchableOpacity onPress={handleSelectAll} style={styles.headerButton}>
                <Text style={styles.headerButtonText}>
                  {selectedContacts.size === contacts.length ? "Deselect All" : "Select All"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete} style={styles.headerButton}>
                <Feather name="trash" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.headerText}>Contacts</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("NewContact")}
              style={styles.headerButton}
            >
              <Feather name="plus" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <SectionList
        sections={organizeSections(contacts)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.contactItem, selectedContacts.has(item.id) && styles.selectedContact]}
            onPress={() => handlePress(item)}
            onLongPress={() => handleLongPress(item)}
          >
            <Image source={{ uri: item.photo }} style={styles.avatar} />
            <View style={styles.contactInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
            {isMultiSelectMode ? (
              <View style={styles.checkbox}>
                {selectedContacts.has(item.id) && (
                  <Feather name="check" size={20} color="#8B5CF6" />
                )}
              </View>
            ) : (
              <Entypo name="chevron-right" size={24} color="#666666" />
            )}
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 25,
    height: 50,
    marginRight: 12,
    width: 50,
  },
  checkbox: {
    alignItems: "center",
    borderColor: "#8B5CF6",
    borderRadius: 12,
    borderWidth: 2,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  contactInfo: {
    flex: 1,
    justifyContent: "center",
  },
  contactItem: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 12,
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 44,
    padding: 18,
  },
  headerButton: {
    marginHorizontal: 4,
    padding: 8,
  },
  headerButtonText: {
    color: "#8B5CF6",
    fontSize: 16,
    fontWeight: "500",
  },
  headerCenter: {
    alignItems: "center",
    flex: 1,
  },
  headerText: {
    color: "#000000",
    fontSize: 34,
    fontWeight: "bold",
    flex: 1,
  },
  multiSelectControls: {
    alignItems: "center",
    flexDirection: "row",
  },
  name: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  phone: {
    color: "#666666",
    fontSize: 14,
  },
  sectionHeader: {
    backgroundColor: "#ffffff",
    padding: 12,
    paddingLeft: 24,
  },
  sectionHeaderText: {
    color: "#2c3e50",
    fontSize: 25,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  selectedContact: {
    backgroundColor: "#E8E8E8",
  },
  selectionText: {
    color: "#8B5CF6",
    fontSize: 17,
    fontWeight: "500",
  },
})
