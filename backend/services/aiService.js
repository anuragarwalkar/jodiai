import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';

// Initialize Gemini AI
let llm;
try {
  llm = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: 'gemini-pro',
    temperature: 0.7,
  });
} catch (error) {
  console.error('Failed to initialize Gemini AI:', error);
}

// Profile analysis prompt template
const PROFILE_ANALYSIS_TEMPLATE = `
You are an intelligent marriage consultant AI assistant. Analyze the given profile against the user's requirements and provide a detailed compatibility assessment.

USER REQUIREMENTS:
{userRequirements}

PROFILE TO ANALYZE:
Name: {profileName}
Age: {profileAge}
Education: {profileEducation}
Occupation: {profileOccupation}
Location: {profileLocation}
Income: {profileIncome}
Caste: {profileCaste}
Religion: {profileReligion}
Mother Tongue: {profileMotherTongue}
Height: {profileHeight}
Marital Status: {profileMaritalStatus}
Managed By: {profileManagedBy}
Verification Status: {profileVerification}

ANALYSIS REQUIREMENTS:
1. Provide a compatibility score (0-100)
2. List key compatibility factors (positive and negative)
3. Suggest conversation starters based on common interests
4. Highlight any red flags or concerns
5. Give an overall recommendation (Highly Recommended, Recommended, Consider, Not Recommended)

Please provide a structured JSON response with the following format:
{{
  "compatibilityScore": number,
  "overallRecommendation": "string",
  "positiveFactors": ["array of positive points"],
  "negativeFactors": ["array of concerns"],
  "conversationStarters": ["array of conversation topics"],
  "redFlags": ["array of potential concerns"],
  "summary": "detailed summary paragraph",
  "nextSteps": "recommended next steps"
}}

Be honest, practical, and culturally sensitive in your analysis.
`;

const MATCH_RECOMMENDATION_TEMPLATE = `
You are an AI marriage consultant. Analyze and rank the given profiles based on compatibility with the user's profile and requirements.

USER PROFILE:
{userProfile}

USER REQUIREMENTS:
{userRequirements}

PROFILES TO RANK:
{profilesToRank}

Please rank these profiles and provide detailed analysis for each. Return a JSON response with:
{{
  "rankings": [
    {{
      "profileId": "string",
      "rank": number,
      "compatibilityScore": number,
      "recommendation": "string",
      "keyPoints": ["array of key compatibility points"],
      "concerns": ["array of potential concerns"],
      "summary": "brief summary"
    }}
  ],
  "overallInsights": "general insights about the matches",
  "recommendations": "overall recommendations for the user"
}}

Rank from best to worst match based on compatibility.
`;

export async function analyzeProfileWithAI(profile, userRequirements) {
  if (!llm) {
    throw new Error('AI service not initialized. Please check your GOOGLE_API_KEY.');
  }

  try {
    const prompt = PromptTemplate.fromTemplate(PROFILE_ANALYSIS_TEMPLATE);
    const chain = new LLMChain({ llm, prompt });

    const result = await chain.call({
      userRequirements: JSON.stringify(userRequirements, null, 2),
      profileName: profile.name || 'Not provided',
      profileAge: profile.age || 'Not provided',
      profileEducation: profile.education || 'Not provided',
      profileOccupation: profile.occupation || 'Not provided',
      profileLocation: profile.location || 'Not provided',
      profileIncome: profile.income || 'Not provided',
      profileCaste: profile.caste || 'Not provided',
      profileReligion: profile.religion || 'Not provided',
      profileMotherTongue: profile.motherTongue || 'Not provided',
      profileHeight: profile.height || 'Not provided',
      profileMaritalStatus: profile.maritalStatus || 'Not provided',
      profileManagedBy: profile.managedBy || 'Not provided',
      profileVerification: profile.isVerified ? 'Verified' : 'Not verified'
    });

    // Parse AI response
    let analysis;
    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.warn('Failed to parse AI response as JSON, using fallback structure');
      analysis = {
        compatibilityScore: 70,
        overallRecommendation: 'Consider',
        positiveFactors: ['Profile information available'],
        negativeFactors: ['Unable to perform detailed analysis'],
        conversationStarters: ['General interests and background'],
        redFlags: [],
        summary: result.text,
        nextSteps: 'Review profile manually for more details'
      };
    }

    return {
      ...analysis,
      aiGenerated: true,
      timestamp: new Date().toISOString(),
      profileId: profile.id
    };

  } catch (error) {
    console.error('Error in AI profile analysis:', error);
    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

export async function generateMatchRecommendation(profiles, userProfile, userRequirements) {
  if (!llm) {
    throw new Error('AI service not initialized. Please check your GOOGLE_API_KEY.');
  }

  try {
    const prompt = PromptTemplate.fromTemplate(MATCH_RECOMMENDATION_TEMPLATE);
    const chain = new LLMChain({ llm, prompt });

    const result = await chain.call({
      userProfile: JSON.stringify(userProfile, null, 2),
      userRequirements: JSON.stringify(userRequirements, null, 2),
      profilesToRank: JSON.stringify(profiles.map(p => ({
        id: p.id,
        name: p.name,
        age: p.age,
        education: p.education,
        occupation: p.occupation,
        location: p.location,
        income: p.income,
        caste: p.caste,
        religion: p.religion,
        motherTongue: p.motherTongue
      })), null, 2)
    });

    // Parse AI response
    let recommendations;
    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.warn('Failed to parse AI recommendations as JSON, using fallback');
      recommendations = {
        rankings: profiles.map((profile, index) => ({
          profileId: profile.id,
          rank: index + 1,
          compatibilityScore: Math.floor(Math.random() * 30) + 60,
          recommendation: 'Consider',
          keyPoints: ['Manual review recommended'],
          concerns: ['AI analysis unavailable'],
          summary: 'Please review manually'
        })),
        overallInsights: 'AI analysis was limited, manual review recommended',
        recommendations: 'Review profiles manually for best results'
      };
    }

    return {
      ...recommendations,
      aiGenerated: true,
      timestamp: new Date().toISOString(),
      totalProfiles: profiles.length
    };

  } catch (error) {
    console.error('Error in AI match recommendation:', error);
    throw new Error(`Match recommendation failed: ${error.message}`);
  }
}

// Fallback function for basic compatibility scoring without AI
export function calculateBasicCompatibility(profile, userRequirements) {
  let score = 0;
  const factors = [];

  // Age compatibility
  if (userRequirements.ageRange) {
    const { min, max } = userRequirements.ageRange;
    if (profile.age >= min && profile.age <= max) {
      score += 20;
      factors.push('Age matches preference');
    }
  }

  // Education compatibility
  if (userRequirements.education && profile.education) {
    if (userRequirements.education.includes(profile.education)) {
      score += 15;
      factors.push('Education matches preference');
    }
  }

  // Location compatibility
  if (userRequirements.location && profile.location) {
    if (userRequirements.location.includes(profile.location)) {
      score += 15;
      factors.push('Location matches preference');
    }
  }

  // Income compatibility
  if (userRequirements.income && profile.income) {
    score += 10;
    factors.push('Income information available');
  }

  // Caste compatibility
  if (userRequirements.caste && profile.caste) {
    if (userRequirements.caste.includes(profile.caste)) {
      score += 15;
      factors.push('Caste matches preference');
    }
  }

  // Verification bonus
  if (profile.isVerified) {
    score += 10;
    factors.push('Verified profile');
  }

  // Photo availability
  if (profile.photos && profile.photos.length > 0) {
    score += 5;
    factors.push('Photos available');
  }

  return {
    compatibilityScore: Math.min(score, 100),
    factors,
    recommendation: score >= 70 ? 'Highly Recommended' : 
                   score >= 50 ? 'Recommended' : 
                   score >= 30 ? 'Consider' : 'Not Recommended'
  };
}
