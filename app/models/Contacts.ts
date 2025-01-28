import { Instance, types } from "mobx-state-tree"

export const ContactModel = types.model("Contact", {
  id: types.identifierNumber,
  name: types.string,
  phone: types.string,
  photo: types.string,
  email: types.string,
  address: types.string,
})

export const ContactBasketModel = types
  .model("ContactBasket", {
    contacts: types.optional(types.array(ContactModel), []),
  })
  .actions((self) => ({
    addContact(contact: Contact) {
      self.contacts.push(contact)
    },
    addContacts(contacts: Contact[]) {
      contacts.forEach((contact) => self.contacts.push(contact))
    },
    clearContacts() {
      self.contacts.clear()
    },
    removeContacts(contactIds: string[]) {
      const idsToRemove = contactIds.map(Number)
      self.contacts.replace(self.contacts.filter((contact) => !idsToRemove.includes(contact.id)))
    },
    updateContact(
      contactId: number,
      name?: string,
      phone?: string,
      email?: string,
      address?: string,
    ) {
      const contactToUpdate = self.contacts.find((c) => c.id === contactId)
      if (contactToUpdate) {
        if (name) contactToUpdate.name = name
        if (phone) contactToUpdate.phone = phone
        if (email) contactToUpdate.email = email
        if (address) contactToUpdate.address = address
      }
    },
  }))

export type Contact = Instance<typeof ContactModel>
export type ContactBasket = Instance<typeof ContactBasketModel>
