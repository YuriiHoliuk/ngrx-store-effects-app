export function toEntities(collection: any[]) {
    return collection.reduce((entities, entity) => {
        entities[entity.id] = entity;
        return entities;
    }, {});
}