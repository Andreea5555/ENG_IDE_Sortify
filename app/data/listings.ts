export type MarketplaceListing = {
  id: number
  title: string
  price: string
  quantity: string
  location: string
  condition: string
  image: string
  description: string
  availableUntil: string
  sellerEmail: string
}

export const listings: MarketplaceListing[] = [
  {
    id: 1,
    title: 'Cross-laminated timber panels',
    price: 'DKK 1,200',
    quantity: '12 units · 40 mm',
    location: 'Copenhagen NV',
    condition: 'Good',
    image: '/timber_panels.jpg',
    description: 'Offcuts from a modular housing project, stored indoors and ready for milling or framing.',
    availableUntil: '28 Feb 2026',
    sellerEmail: 'timberhub@sortify.dk'
  },
  {
    id: 2,
    title: 'Reclaimed clay roof tiles',
    price: 'DKK 600',
    quantity: '320 tiles',
    location: 'Frederiksberg',
    condition: 'Fair',
    image: '/clay_tiles.jpg',
    description: 'Mixed batch of Danish clay tiles removed during a roof retrofit. Patina intact, ideal for repairs.',
    availableUntil: '15 Mar 2026',
    sellerEmail: 'roofworks@sortify.dk'
  },
  {
    id: 3,
    title: 'Insulated window units',
    price: 'DKK 2,450',
    quantity: '6 pieces · 120x140',
    location: 'Aarhus C',
    condition: 'New',
    image: '/insulated_windows.jpg',
    description: 'Surplus triple-glazed windows ordered in the wrong size. Factory wrapping still on.',
    availableUntil: '05 Apr 2026',
    sellerEmail: 'glazing@sortify.dk'
  },
  {
    id: 4,
    title: 'Galvanized steel conduit',
    price: 'DKK 350',
    quantity: '45 meters',
    location: 'Odense Ø',
    condition: 'Good',
    image: '/galvanized_steel.jpg',
    description: 'Leftover electrical conduit bundles from a logistics center fit-out, light wear from storage.',
    availableUntil: '30 Mar 2026',
    sellerEmail: 'steelstock@sortify.dk'
  },
  {
    id: 5,
    title: 'Concrete paving stones',
    price: 'DKK 1,050',
    quantity: '90 stones',
    location: 'Vejle',
    condition: 'Fair',
    image: '/paving_stones.jpg',
    description: 'Demolition salvage from a civic plaza. Expect natural weathering and minor chips.',
    availableUntil: '20 Mar 2026',
    sellerEmail: 'civicsalvage@sortify.dk'
  },
  {
    id: 6,
    title: 'Acoustic ceiling panels',
    price: 'DKK 780',
    quantity: '25 panels',
    location: 'Copenhagen K',
    condition: 'Good',
    image: '/acoustic_ceiling.jpg',
    description: 'Removed carefully during an office refresh; mineral fiber with intact edge profiles.',
    availableUntil: '12 Apr 2026',
    sellerEmail: 'soundproof@sortify.dk'
  }
]
