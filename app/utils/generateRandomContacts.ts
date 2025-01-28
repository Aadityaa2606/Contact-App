import { faker } from "@faker-js/faker"
import { Contact } from "../models/Contacts"

export function generateRandomContacts(count: number = 100): Contact[] {
  const contacts: Contact[] = []

  for (let i = 0; i < count; i++) {
    const randomAvatarId = Math.floor(Math.random() * 100) + 1
    contacts.push({
      id: i + 1,
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      photo: `https://avatar.iran.liara.run/public/${randomAvatarId}`,
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
    })
  }

  return contacts
}
