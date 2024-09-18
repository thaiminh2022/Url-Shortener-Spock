/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s9pkuqv2v2f3oc5")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s9pkuqv2v2f3oc5")

  collection.viewRule = "@request.auth.id = user.id"

  return dao.saveCollection(collection)
})
