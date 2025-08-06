import express from 'express';
import { transformJeevansathiData } from '../services/profileService.js';

const router = express.Router();

// Transform Jeevansathi API response to our format
router.post('/transform', async (req, res) => {
  try {
    const { jeevansathiData, userPreferences } = req.body;
    
    if (!jeevansathiData) {
      return res.status(400).json({ error: 'Jeevansathi data is required' });
    }

    const transformedData = transformJeevansathiData(jeevansathiData, userPreferences);
    
    res.json({
      success: true,
      data: transformedData,
      message: 'Data transformed successfully'
    });
  } catch (error) {
    console.error('Error transforming profile data:', error);
    res.status(500).json({ 
      error: 'Failed to transform profile data',
      message: error.message 
    });
  }
});

// Get profile compatibility score
router.post('/compatibility', async (req, res) => {
  try {
    const { profile1, profile2 } = req.body;
    
    if (!profile1 || !profile2) {
      return res.status(400).json({ error: 'Both profiles are required' });
    }

    // Calculate compatibility based on various factors
    const compatibility = calculateCompatibility(profile1, profile2);
    
    res.json({
      success: true,
      compatibility,
      message: 'Compatibility calculated successfully'
    });
  } catch (error) {
    console.error('Error calculating compatibility:', error);
    res.status(500).json({ 
      error: 'Failed to calculate compatibility',
      message: error.message 
    });
  }
});

function calculateCompatibility(profile1, profile2) {
  let score = 0;
  let factors = [];

  // Age compatibility (prefer similar age or traditional age gap)
  const ageDiff = Math.abs(profile1.age - profile2.age);
  if (ageDiff <= 3) {
    score += 25;
    factors.push({ factor: 'Age', score: 25, reason: 'Similar age range' });
  } else if (ageDiff <= 5) {
    score += 15;
    factors.push({ factor: 'Age', score: 15, reason: 'Acceptable age difference' });
  } else {
    score += 5;
    factors.push({ factor: 'Age', score: 5, reason: 'Large age difference' });
  }

  // Education compatibility
  if (profile1.education === profile2.education) {
    score += 20;
    factors.push({ factor: 'Education', score: 20, reason: 'Same education level' });
  } else {
    score += 10;
    factors.push({ factor: 'Education', score: 10, reason: 'Different education levels' });
  }

  // Location compatibility
  if (profile1.location === profile2.location) {
    score += 15;
    factors.push({ factor: 'Location', score: 15, reason: 'Same city' });
  } else {
    score += 8;
    factors.push({ factor: 'Location', score: 8, reason: 'Different cities' });
  }

  // Caste compatibility (if important)
  if (profile1.caste === profile2.caste) {
    score += 15;
    factors.push({ factor: 'Caste', score: 15, reason: 'Same caste' });
  } else {
    score += 5;
    factors.push({ factor: 'Caste', score: 5, reason: 'Different caste' });
  }

  // Income compatibility
  if (profile1.income && profile2.income) {
    score += 10;
    factors.push({ factor: 'Income', score: 10, reason: 'Both have income information' });
  }

  // Mother tongue compatibility
  if (profile1.motherTongue === profile2.motherTongue) {
    score += 15;
    factors.push({ factor: 'Language', score: 15, reason: 'Same mother tongue' });
  } else {
    score += 5;
    factors.push({ factor: 'Language', score: 5, reason: 'Different mother tongues' });
  }

  return {
    totalScore: Math.min(score, 100),
    percentage: Math.min(score, 100),
    factors,
    compatibility: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Average' : 'Poor'
  };
}

export default router;
