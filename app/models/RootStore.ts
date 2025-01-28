import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ContactBasketModel } from "./Contacts"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  contactBasket: types.optional(ContactBasketModel, { contacts: [] }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
