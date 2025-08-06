import express from 'express';
import { analyzeProfileWithAI, generateMatchRecommendation } from '../services/aiService.js';

const router = express.Router();

// Analyze single profile with AI
router.post('/analyze-profile', async (req, res) => {
  try {
    const { profile, userRequirements } = req.body;
    
    if (!profile) {
      return res.status(400).json({ error: 'Profile data is required' });
    }

    if (!userRequirements) {
      return res.status(400).json({ error: 'User requirements are required' });
    }

    const analysis = await analyzeProfileWithAI(profile, userRequirements);
    
    res.json({
      success: true,
      analysis,
      message: 'Profile analyzed successfully'
    });
  } catch (error) {
    console.error('Error analyzing profile:', error);
    res.status(500).json({ 
      error: 'Failed to analyze profile',
      message: error.message 
    });
  }
});

// Generate match recommendation for multiple profiles
router.post('/recommend-matches', async (req, res) => {
  try {
    const { profiles, userProfile, userRequirements } = req.body;
    
    if (!profiles || !Array.isArray(profiles)) {
      return res.status(400).json({ error: 'Profiles array is required' });
    }

    if (!userProfile) {
      return res.status(400).json({ error: 'User profile is required' });
    }

    if (!userRequirements) {
      return res.status(400).json({ error: 'User requirements are required' });
    }

    const recommendations = await generateMatchRecommendation(profiles, userProfile, userRequirements);
    
    res.json({
      success: true,
      recommendations,
      message: 'Match recommendations generated successfully'
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      message: error.message 
    });
  }
});

// Set user requirements
router.post('/set-requirements', async (req, res) => {
  try {
    const { requirements } = req.body;
    
    if (!requirements) {
      return res.status(400).json({ error: 'Requirements are required' });
    }

    // Here you could save to database in a real app
    // For now, we'll just validate and return
    
    res.json({
      success: true,
      requirements,
      message: 'Requirements saved successfully'
    });
  } catch (error) {
    console.error('Error setting requirements:', error);
    res.status(500).json({ 
      error: 'Failed to set requirements',
      message: error.message 
    });
  }
});

export default router;
