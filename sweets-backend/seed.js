import mongoose from 'mongoose'
import Sweet from './models/Sweet.js'
import dotenv from 'dotenv'

dotenv.config()

const sweets = [
  {
    name: 'Ghevar',
    description: 'Traditional Rajasthani sweet made with flour, ghee, and sugar syrup. Crispy and delicious!',
    price: 450,
    quantity: 25,
    category: 'Traditional',
    emoji: '🍰',
    imageUrl: 'http://localhost:3000/images/ghevars.jpg'
  },
  {
    name: 'Gud Gajak',
    description: 'Crispy sweet made with jaggery and sesame seeds. A winter favorite!',
    price: 350,
    quantity: 30,
    category: 'Traditional',
    emoji: '🍬',
    imageUrl: 'http://localhost:3000/images/gud.jpg'
  },
  {
    name: 'Dhoodh Phinni Meethi',
    description: 'Creamy milk-based sweet with a rich, melt-in-mouth texture.',
    price: 380,
    quantity: 20,
    category: 'Milk Based',
    emoji: '🥛',
    imageUrl: 'http://localhost:3000/images/phini.jpg'
  },
  {
    name: 'Gulab Jamun',
    description: 'Soft, spongy milk dumplings soaked in sugar syrup. A classic favorite!',
    price: 320,
    quantity: 40,
    category: 'Milk Based',
    emoji: '🍮',
    imageUrl: 'http://localhost:3000/images/gulabjamun.avif'
  },
  {
    name: 'Gunjia',
    description: 'Spongy cottage cheese balls in light sugar syrup. Refreshing and sweet!',
    price: 280,
    quantity: 35,
    category: 'Milk Based',
    emoji: '🍡',
    imageUrl: 'http://localhost:3000/images/gunjia.jpg'
  },
  {
    name: 'Kaju Katli',
    description: 'Diamond-shaped cashew fudge. Rich, creamy, and absolutely divine!',
    price: 550,
    quantity: 28,
    category: 'Dry Sweets',
    emoji: '💎',
    imageUrl: 'http://localhost:3000/images/kaju.jpg'
  },
  {
    name: 'Barfi',
    description: 'Traditional Indian fudge made with condensed milk and flavored with cardamom.',
    price: 420,
    quantity: 32,
    category: 'Dry Sweets',
    emoji: '🍰',
    imageUrl: 'http://localhost:3000/images/barfi.jpg'
  },
  {
    name: 'Jalebi',
    description: 'Crispy, spiral-shaped sweet soaked in sugar syrup. Perfect with hot milk!',
    price: 250,
    quantity: 45,
    category: 'Traditional',
    emoji: '🌀',
    imageUrl: 'http://localhost:3000/images/jalebi.avif'
  },
  {
    name: 'Ladoo',
    description: 'Round sweet balls made with gram flour, ghee, and sugar. Festive favorite!',
    price: 300,
    quantity: 38,
    category: 'Traditional',
    emoji: '⚪',
    imageUrl: 'http://localhost:3000/images/ladu.jpg'
  },
  {
    name: 'Rasmalai',
    description: 'Soft cottage cheese patties in sweetened, thickened milk. Deliciously creamy!',
    price: 400,
    quantity: 22,
    category: 'Milk Based',
    emoji: '🥛',
    imageUrl: 'http://localhost:3000/images/rasmalai.jpeg'
  },
  {
    name: 'Milk Cake',
    description: 'Flaky, crispy sweet with a melt-in-mouth texture. Light and airy!',
    price: 350,
    quantity: 27,
    category: 'Dry Sweets',
    emoji: '❄️',
    imageUrl: 'http://localhost:3000/images/milkcake.webp'
  },
  {
    name: 'Halwa',
    description: 'Semolina-based sweet pudding with ghee, sugar, and nuts. Warm and comforting!',
    price: 320,
    quantity: 30,
    category: 'Traditional',
    emoji: '🍯',
    imageUrl: 'http://localhost:3000/images/halwa.jpg'
  }
]

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweets-store'
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')

    // Clear existing sweets
    await Sweet.deleteMany({})
    console.log('Cleared existing sweets')

    // Insert new sweets
    await Sweet.insertMany(sweets)
    console.log(`Seeded ${sweets.length} sweets successfully!`)

    // Display seeded sweets
    const seededSweets = await Sweet.find()
    console.log('\nSeeded Sweets:')
    seededSweets.forEach((sweet, index) => {
      console.log(`${index + 1}. ${sweet.name} - ₹${sweet.price} (${sweet.quantity} available)`)
    })

    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

