import { FarmerProfile } from '../types';

export const FARMERS: FarmerProfile[] = [
  {
    id: 'farmer-1',
    name: 'Devender & Sunita Bishnoi',
    region: 'Alwar Foothills',
    state: 'Rajasthan',
    crop: 'Indigenous Yellow Mustard & Sesame',
    farmingMethod: 'Natural Zero-Budget Spiritual Farming (Subhash Palekar method)',
    experienceYears: 24,
    quote: 'The soil is not an inert substrate; it is our mother that drinks the first rain. When we press oil cold in seasoned wood, its fragrance tells the tale of our land.',
    story: 'Third-generation guardians of a 14-acre rainfed farm. In 2011, Devender transitioned away from synthetic chemicals entirely, restoring earthworm colonies and native nitrogen-fixing leguminous trees.',
    image: '/src/assets/images/oil_cold_pressed_1793650249541.jpg',
    hectaresRegenerated: 5.6
  },
  {
    id: 'farmer-2',
    name: 'Shanti Devi',
    region: 'Bundelkhand Drylands',
    state: 'Madhya Pradesh',
    crop: 'Heirloom Foxtail & Little Millets',
    farmingMethod: 'Dryland Rainfed Polyculture with Intercropped Pulses',
    experienceYears: 31,
    quote: 'Millets remember when rain was scarce. They ask for nothing except our love and one monsoonal cloud. They heal the body as they heal the soil.',
    story: 'Shanti leads a 60-women farmer self-help group conserving native drought-tolerant millet landraces that were almost lost to monoculture wheat.',
    image: '/src/assets/images/millets_heritage_grains_1793650250177.jpg',
    hectaresRegenerated: 28.4
  },
  {
    id: 'farmer-3',
    name: 'Kattunayakan Tribal Guild',
    region: 'Wayanad Canopy Forests',
    state: 'Kerala',
    crop: 'Wild Forest Raw Honey & Tellicherry Pepper',
    farmingMethod: 'Traditional Ethno-Botanical Sustainable Forest Foraging',
    experienceYears: 40,
    quote: 'We never harvest the entire hive. We take only the surplus comb after the bees have reared their young. Forest spirits bless those who take with respect.',
    story: 'Indigenous honey hunters of the Western Ghats canopy who scale 80-foot high rosewood trees at dusk without smoke torches to harvest wild multi-floral nectar.',
    image: '/src/assets/images/honey_raw_forest_1793650250709.jpg',
    hectaresRegenerated: 82.0
  },
  {
    id: 'farmer-4',
    name: 'Master Anand & Studio Guild',
    region: 'Khurja & Pondicherry',
    state: 'Uttar Pradesh & Tamil Nadu',
    crop: 'High-Fired Stoneware & Terracotta Vessels',
    farmingMethod: 'Local Mineral Clay Hand-throwing & Wood-ash Glazing',
    experienceYears: 28,
    quote: 'Clay is the earth cooled down. Storing oil or grain in a clay jar allows it to breathe, keeping it alive exactly as it was on the field.',
    story: 'Anand collaborates with traditional potters to design ergonomic kitchen vessels, spice pots, and chai mugs glazed with non-toxic lead-free wood-ash minerals.',
    image: '/src/assets/images/hero_ceramics_still_life_1793651013505.jpg',
    hectaresRegenerated: 0
  }
];

export const CERTIFICATIONS = [
  {
    title: 'Jaivik Bharat',
    badge: 'FSSAI Organic',
    description: 'Government of India authorized certification verifying 100% synthetic chemical and pesticide-free produce.'
  },
  {
    title: 'NPOP India Organic',
    badge: 'National Standard',
    description: 'National Programme for Organic Production standards for ethical farm management and soil fertility.'
  },
  {
    title: 'Cold-Press Mara Chekku',
    badge: '<38°C Extraction',
    description: 'Extracted in heritage slow wooden churns without synthetic solvent extraction or thermal bleaching.'
  },
  {
    title: 'Direct Fair Trade',
    badge: '+40% Over MSP',
    description: 'Paying 30% to 50% above government minimum support prices directly into women and marginal farmer bank accounts.'
  }
];
