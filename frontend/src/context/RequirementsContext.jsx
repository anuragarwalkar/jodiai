import React, { createContext, useContext, useReducer } from 'react';

const RequirementsContext = createContext();

const initialState = {
  requirements: {
    ageRange: { min: 22, max: 35 },
    education: ['Graduate', 'Post Graduate'],
    occupation: [],
    location: [],
    income: { min: 0, max: 50 },
    caste: [],
    religion: ['Hindu'],
    motherTongue: [],
    height: { min: 5.0, max: 6.5 },
    maritalStatus: ['Never Married'],
    diet: [],
    profileTag: [],
    verification: true,
    photos: true
  },
  priorities: {
    education: 'high',
    occupation: 'medium',
    location: 'medium',
    income: 'low',
    caste: 'medium',
    age: 'high',
    height: 'low',
    verification: 'high'
  },
  dealBreakers: [],
  preferences: {
    showOnlineFirst: true,
    showVerifiedFirst: true,
    showNearbyFirst: false,
    aiAnalysisEnabled: true,
    autoAnalyze: true
  }
};

function requirementsReducer(state, action) {
  switch (action.type) {
    case 'SET_REQUIREMENTS':
      return {
        ...state,
        requirements: { ...state.requirements, ...action.payload }
      };
    
    case 'SET_PRIORITIES':
      return {
        ...state,
        priorities: { ...state.priorities, ...action.payload }
      };
    
    case 'SET_DEAL_BREAKERS':
      return {
        ...state,
        dealBreakers: action.payload
      };
    
    case 'ADD_DEAL_BREAKER':
      return {
        ...state,
        dealBreakers: [...state.dealBreakers, action.payload]
      };
    
    case 'REMOVE_DEAL_BREAKER':
      return {
        ...state,
        dealBreakers: state.dealBreakers.filter(item => item !== action.payload)
      };
    
    case 'SET_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    
    case 'RESET_REQUIREMENTS':
      return initialState;
    
    default:
      return state;
  }
}

export function RequirementsProvider({ children }) {
  const [state, dispatch] = useReducer(requirementsReducer, initialState);

  const setRequirements = (requirements) => {
    dispatch({ type: 'SET_REQUIREMENTS', payload: requirements });
  };

  const setPriorities = (priorities) => {
    dispatch({ type: 'SET_PRIORITIES', payload: priorities });
  };

  const setDealBreakers = (dealBreakers) => {
    dispatch({ type: 'SET_DEAL_BREAKERS', payload: dealBreakers });
  };

  const addDealBreaker = (dealBreaker) => {
    dispatch({ type: 'ADD_DEAL_BREAKER', payload: dealBreaker });
  };

  const removeDealBreaker = (dealBreaker) => {
    dispatch({ type: 'REMOVE_DEAL_BREAKER', payload: dealBreaker });
  };

  const setPreferences = (preferences) => {
    dispatch({ type: 'SET_PREFERENCES', payload: preferences });
  };

  const resetRequirements = () => {
    dispatch({ type: 'RESET_REQUIREMENTS' });
  };

  const value = {
    ...state,
    setRequirements,
    setPriorities,
    setDealBreakers,
    addDealBreaker,
    removeDealBreaker,
    setPreferences,
    resetRequirements
  };

  return (
    <RequirementsContext.Provider value={value}>
      {children}
    </RequirementsContext.Provider>
  );
}

export function useRequirements() {
  const context = useContext(RequirementsContext);
  if (!context) {
    throw new Error('useRequirements must be used within a RequirementsProvider');
  }
  return context;
}
