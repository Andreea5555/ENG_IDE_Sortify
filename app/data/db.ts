import db from '~/../db/db.json';

export type MarketplaceListing = {
  id: number
  title: string
  price: string
  quantity: string
  status: 'available' | 'reserved' | 'sold'
  location: string
  condition: string
  image: string
  description: string
  availableUntil: string
  sellerEmail: string
}

export const getListings = (): MarketplaceListing[] => {
  return db.materials.map(material => {
    const project = db.projects.find(p => p.id === material.project_id);
    const unit = db.units.find(u => u.id === material.unit_id);

    // Calculate availableUntil by adding 30 days to the project creation_date
    const creationDate = project ? new Date(project.creation_date) : new Date();
    const availableUntilDate = new Date(creationDate.setDate(creationDate.getDate() + 30));
    const availableUntil = availableUntilDate.toDateString(); // format as a string

    return {
      id: material.id,
      title: material.name,
      price: 'Price on request', // Placeholder as price is not in the db
      quantity: `${material.quantity} ${unit ? unit.value : ''}`,
      status: (material.status || 'available') as MarketplaceListing['status'],
      location: project ? project.location : 'Unknown',
      condition: material.condition,
      image: material.photo,
      description: material.description,
      availableUntil: availableUntil,
      sellerEmail: `seller${project ? project.seller_id : ''}@sortify.dk` // Placeholder
    };
  });
};
