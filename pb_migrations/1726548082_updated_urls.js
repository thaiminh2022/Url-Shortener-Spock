/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s9pkuqv2v2f3oc5")

  collection.indexes = [
    "CREATE INDEX `idx_wsNdgvw` ON `urls` (`shortenedID`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s9pkuqv2v2f3oc5")

  collection.indexes = []

  return dao.saveCollection(collection)
})
