import express from 'express'
import Sweet from '../models/Sweet.js'
import { authenticate, isAdmin } from '../middleware/auth.js'

const router = express.Router()

// Get all sweets (public)
router.get('/', async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ createdAt: -1 })
    res.json(sweets)
  } catch (error) {
    console.error('Error fetching sweets:', error)
    res.status(500).json({ message: 'Failed to fetch sweets' })
  }
})

// Get single sweet (public)
router.get('/:id', async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id)
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' })
    }
    res.json(sweet)
  } catch (error) {
    console.error('Error fetching sweet:', error)
    res.status(500).json({ message: 'Failed to fetch sweet' })
  }
})

// Create sweet (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { name, description, price, quantity, category, emoji, imageUrl } = req.body

    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({ message: 'Name, price, and quantity are required' })
    }

    const sweet = new Sweet({
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category,
      emoji: emoji || '🍬',
      imageUrl,
    })

    await sweet.save()
    res.status(201).json(sweet)
  } catch (error) {
    console.error('Error creating sweet:', error)
    res.status(500).json({ message: error.message || 'Failed to create sweet' })
  }
})

// Update sweet (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { name, description, price, quantity, category, emoji, imageUrl } = req.body

    const updateData = {}
    if (name) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = parseFloat(price)
    if (quantity !== undefined) updateData.quantity = parseInt(quantity)
    if (category !== undefined) updateData.category = category
    if (emoji) updateData.emoji = emoji
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl

    const sweet = await Sweet.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' })
    }

    res.json(sweet)
  } catch (error) {
    console.error('Error updating sweet:', error)
    res.status(500).json({ message: error.message || 'Failed to update sweet' })
  }
})

// Delete sweet (admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id)

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' })
    }

    res.json({ message: 'Sweet deleted successfully' })
  } catch (error) {
    console.error('Error deleting sweet:', error)
    res.status(500).json({ message: 'Failed to delete sweet' })
  }
})

// Purchase sweet (authenticated users)
router.post('/:id/purchase', authenticate, async (req, res) => {
  try {
    const { quantity = 1 } = req.body
    const purchaseQuantity = parseInt(quantity)

    if (purchaseQuantity <= 0) {
      return res.status(400).json({ message: 'Purchase quantity must be positive' })
    }

    const sweet = await Sweet.findById(req.params.id)

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' })
    }

    if (sweet.quantity < purchaseQuantity) {
      return res.status(400).json({ message: 'Insufficient stock' })
    }

    sweet.quantity -= purchaseQuantity
    await sweet.save()

    res.json({
      message: 'Purchase successful',
      sweet,
      purchasedQuantity: purchaseQuantity,
    })
  } catch (error) {
    console.error('Error processing purchase:', error)
    res.status(500).json({ message: error.message || 'Purchase failed' })
  }
})

export default router


