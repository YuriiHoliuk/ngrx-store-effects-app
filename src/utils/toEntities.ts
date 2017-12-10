export function toEntities(collection: { id?: number }[]) {
    return collection.reduce((entities, entity) => {
        entities[entity.id] = entity;
        return entities;
    }, {});
}