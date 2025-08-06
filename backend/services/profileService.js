// Service to transform Jeevansathi API data to our frontend format
export function transformJeevansathiData(jeevansathiData, userPreferences = {}) {
  try {
    const { profiles = [], searchTypes, result_count, clusters } = jeevansathiData;
    
    // Transform profiles to our format
    const transformedProfiles = profiles.map(profile => transformSingleProfile(profile));
    
    // Transform search filters
    const transformedFilters = transformSearchFilters(clusters);
    
    // Transform search types (match types)
    const transformedSearchTypes = transformSearchTypes(searchTypes);
    
    return {
      profiles: transformedProfiles,
      filters: transformedFilters,
      searchTypes: transformedSearchTypes,
      pagination: {
        currentPage: parseInt(jeevansathiData.page_index) || 1,
        totalResults: parseInt(result_count) || 0,
        hasNext: jeevansathiData.next_avail === 'true'
      },
      metadata: {
        searchId: jeevansathiData.searchid,
        searchSummary: jeevansathiData.searchSummary?.searchSummaryFormatted,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error transforming Jeevansathi data:', error);
    throw new Error('Failed to transform profile data');
  }
}

function transformSingleProfile(profile) {
  return {
    id: profile.profileid,
    username: profile.username,
    name: profile.name_of_user || 'Name not provided',
    age: extractAge(profile.age),
    height: profile.height,
    
    // Basic Info
    education: profile.edu_level_new || profile.highestEducation,
    occupation: profile.occupation,
    company: profile.company_name,
    college: profile.college || profile.pg_college,
    income: profile.income,
    
    // Location
    location: profile.location,
    currentLocation: profile.current_location,
    
    // Cultural Info
    religion: profile.religion,
    caste: profile.caste || profile.newCaste,
    subcaste: profile.subcaste,
    motherTongue: profile.mtongue,
    
    // Personal
    maritalStatus: profile.mstatus,
    managedBy: profile.managedBy,
    diet: profile.diet,
    
    // Photos and Media
    photos: profile.photos || (profile.photo ? [profile.photo] : []),
    albumCount: profile.album_count || 0,
    hasVideo: profile.media?.video && !profile.media.video.be?.errorCode,
    
    // Verification
    isVerified: profile.verification_status === 1,
    verificationSeals: profile.verification_seal || [],
    verificationData: profile.verification_data,
    
    // Match Details
    matchScore: extractPercentage(profile.matchScore),
    profileTag: profile.profileTag,
    mostCompatible: profile.mostCompatible || false,
    
    // Activity
    lastOnline: profile.userloginstatus,
    isOnline: profile.online || false,
    
    // Subscription
    subscriptionType: profile.subscription_text,
    subscriptionIcon: profile.subscription_icon,
    
    // Interaction
    buttonDetails: profile.buttonDetails,
    contactState: profile.interactionStates?.contactState,
    
    // Tracking (for analytics)
    trackingData: {
      matchScore: profile.trackingMData?.ms,
      listingSource: profile.listingSource,
      sourceTracking: profile.sourceTracking
    },
    
    // Additional computed fields
    ageGroup: getAgeGroup(extractAge(profile.age)),
    educationLevel: getEducationLevel(profile.edu_level_new || profile.highestEducation),
    incomeRange: getIncomeRange(profile.income),
    isNearby: profile.profileTag === 'Nearby',
    isJustJoined: profile.profileTag === 'Just Joined'
  };
}

function transformSearchFilters(clusters) {
  if (!clusters?.result_arr) return [];
  
  return clusters.result_arr.map(cluster => ({
    id: cluster.id,
    label: cluster.label,
    isSlider: cluster.isSlider === 'true',
    selectedText: cluster.stext,
    isLocked: cluster.isLocked,
    options: cluster.arr2?.map(option => ({
      id: option.id,
      label: option.label,
      count: option.count,
      isSelected: option.isSelected === 'true' || option.isSelected === true,
      isHeading: option.isHeading === 'Y',
      parentId: option.parentId,
      // For slider types
      min: option.min,
      max: option.max
    })) || []
  }));
}

function transformSearchTypes(searchTypes) {
  if (!searchTypes?.arr2) return [];
  
  return searchTypes.arr2.map(type => ({
    id: type.id,
    label: type.label,
    isSelected: type.isSelected === 'true',
    count: type.count,
    searchParam: type.searchParam,
    isChicklet: type.isChicklet === 'true'
  }));
}

// Helper functions
function extractAge(ageString) {
  if (!ageString) return null;
  const match = ageString.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

function extractPercentage(scoreString) {
  if (!scoreString) return null;
  const match = scoreString.match(/(\d+)%?/);
  return match ? parseInt(match[1]) : null;
}

function getAgeGroup(age) {
  if (!age) return 'Unknown';
  if (age < 25) return 'Young (18-24)';
  if (age < 30) return 'Mid-twenties (25-29)';
  if (age < 35) return 'Early thirties (30-34)';
  if (age < 40) return 'Late thirties (35-39)';
  return 'Mature (40+)';
}

function getEducationLevel(education) {
  if (!education) return 'Not specified';
  
  const lowerEd = education.toLowerCase();
  
  if (lowerEd.includes('phd') || lowerEd.includes('ph.d')) return 'Doctorate';
  if (lowerEd.includes('m.tech') || lowerEd.includes('m.e') || lowerEd.includes('ms') || lowerEd.includes('mba') || lowerEd.includes('m.')) return 'Post Graduate';
  if (lowerEd.includes('b.tech') || lowerEd.includes('b.e') || lowerEd.includes('b.')) return 'Graduate';
  if (lowerEd.includes('diploma')) return 'Diploma';
  if (lowerEd.includes('high school') || lowerEd.includes('12th')) return 'High School';
  
  return 'Other';
}

function getIncomeRange(income) {
  if (!income || income === 'No Income') return 'Not specified';
  return income;
}
