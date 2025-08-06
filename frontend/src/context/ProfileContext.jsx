import React, { createContext, useContext, useReducer } from 'react';

const ProfileContext = createContext();

const initialState = {
  profiles: [],
  currentProfile: null,
  loading: false,
  error: null,
  filters: {},
  searchTypes: [],
  pagination: {
    currentPage: 1,
    totalResults: 0,
    hasNext: false
  },
  metadata: {}
};

function profileReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    case 'SET_PROFILES':
      return {
        ...state,
        profiles: action.payload.profiles,
        filters: action.payload.filters,
        searchTypes: action.payload.searchTypes,
        pagination: action.payload.pagination,
        metadata: action.payload.metadata,
        loading: false,
        error: null
      };
    
    case 'ADD_PROFILES':
      return {
        ...state,
        profiles: [...state.profiles, ...action.payload.profiles],
        pagination: action.payload.pagination,
        loading: false
      };
    
    case 'SET_CURRENT_PROFILE':
      return { ...state, currentProfile: action.payload };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profiles: state.profiles.map(profile =>
          profile.id === action.payload.id ? { ...profile, ...action.payload } : profile
        )
      };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'CLEAR_PROFILES':
      return { ...initialState };
    
    default:
      return state;
  }
}

export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setProfiles = (data) => {
    dispatch({ type: 'SET_PROFILES', payload: data });
  };

  const addProfiles = (data) => {
    dispatch({ type: 'ADD_PROFILES', payload: data });
  };

  const setCurrentProfile = (profile) => {
    dispatch({ type: 'SET_CURRENT_PROFILE', payload: profile });
  };

  const updateProfile = (profileData) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearProfiles = () => {
    dispatch({ type: 'CLEAR_PROFILES' });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    setProfiles,
    addProfiles,
    setCurrentProfile,
    updateProfile,
    setFilters,
    clearProfiles
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfiles() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
}
