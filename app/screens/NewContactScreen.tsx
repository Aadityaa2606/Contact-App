/* eslint-disable react-native/no-color-literals */
import { $styles } from "@/theme"
import { FC, useState, useEffect } from "react"
import { Screen, Text } from "@/components"
import { AppStackScreenProps } from "../navigators"
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardTypeOptions,
  Image,
  StyleSheet,
} from "react-native"
import { useStores } from "@/models"
import Entypo from "@expo/vector-icons/Entypo"

export interface NewContactScreenProps extends AppStackScreenProps<"NewContact"> {
  contactId?: string
}

interface InputFieldProps {
  label: string
  value: string
  onChangeText: (text: string) => void
  keyboardType?: KeyboardTypeOptions
  placeholder?: string
  icon?: string
  error?: string
  required?: boolean
}

interface ContactFormData {
  fullName: string
  phoneNumber: string
  email: string
  address: string
}

interface FormErrors {
  fullName?: string
  phoneNumber?: string
}

const InputField: FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  keyboardType = "default",
  placeholder,
  icon,
  error,
  required,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>
      {label}
      {required && <Text style={styles.requiredStar}> *</Text>}
    </Text>
    <View style={[styles.inputWrapper, error && styles.inputError]}>
      {icon && (
        <View style={styles.iconContainer}>
          <Entypo name={icon as any} size={20} color="#A78BFA" />
        </View>
      )}
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        autoCorrect={false}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
)

export const NewContactScreen: FC<NewContactScreenProps> = ({ navigation, route }) => {
  const { contactBasket } = useStores()
  const contactId = route.params?.contactId
  const isEditMode = !!contactId

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})

  // Prefill form data in edit mode
  useEffect(() => {
    if (isEditMode) {
      const contact = contactBasket.contacts.find((c) => c.id === Number(contactId))
      if (contact) {
        setFormData({
          fullName: contact.name,
          phoneNumber: contact.phone,
          email: contact.email || "",
          address: contact.address || "",
        })
      }
    }
  }, [contactId, isEditMode, contactBasket.contacts])

  const handleSave = () => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    if (isEditMode) {
      // Update contact
      contactBasket.updateContact(
        contactId,
        formData.fullName,
        formData.phoneNumber,
        formData.email,
        formData.address,
      )
    } else {
      // Add new contact
      contactBasket.addContact({
        id: Date.now(),
        name: formData.fullName,
        phone: formData.phoneNumber,
        photo: "https://avatar.iran.liara.run/public",
        email: formData.email,
        address: formData.address,
      })
    }

    navigation.goBack()
  }

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={[$styles.flex1, styles.container]}
      safeAreaEdges={["top", "bottom"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditMode ? "Edit Contact" : "New Contact"}</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>{isEditMode ? "Update" : "Save"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image
              source={{
                uri: formData.photo || "https://avatar.iran.liara.run/public",
              }}
              style={styles.profilePhoto}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Entypo name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <InputField
            label="Full Name"
            value={formData.fullName}
            onChangeText={(text) => {
              setFormData({ ...formData, fullName: text })
              if (errors.fullName) setErrors({ ...errors, fullName: undefined })
            }}
            placeholder="Enter full name"
            icon="globe"
            error={errors.fullName}
            required
          />
          <InputField
            label="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) => {
              setFormData({ ...formData, phoneNumber: text })
              if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined })
            }}
            keyboardType="phone-pad"
            placeholder="Enter phone number"
            icon="phone"
            error={errors.phoneNumber}
            required
          />
          <InputField
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            placeholder="Enter email address"
            icon="email"
          />
          <InputField
            label="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            placeholder="Enter address"
            icon="address"
          />
        </View>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  addPhotoText: {
    color: "#A78BFA",
    fontSize: 16,
    fontWeight: "500",
  },
  cameraButton: {
    backgroundColor: "#A78BFA",
    borderColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 2,
    bottom: 0,
    padding: 4,
    position: "absolute",
    right: 0,
  },
  cancelText: {
    color: "#A78BFA",
    fontSize: 16,
  },
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 24,
  },
  header: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#F3F4F6",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  iconContainer: {
    paddingLeft: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputError: {
    borderColor: "#EF4444", // Red border for error state
  },
  inputLabel: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  inputWrapper: {
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
  },
  photoContainer: {
    marginBottom: 16,
  },
  photoSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  profilePhoto: {
    borderRadius: 48,
    height: 96,
    width: 96,
  },
  requiredStar: {
    color: "#EF4444",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#A78BFA",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
})
