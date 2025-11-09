import React from 'react';
import { StylesConfig } from 'react-select';

export interface SelectOption {
  value: string;
  label: string;
  color: string;
}

export const getSelectStyles = (): StylesConfig<SelectOption, true> => ({
  option: (provided) => ({
    ...provided,
    backgroundColor: 'transparent !important',
    padding: '4px !important',
    ':hover': {
      backgroundColor: 'transparent !important'
    }
  }),
  multiValue: (provided, { data }) => ({
    ...provided,
    backgroundColor: data.color,
    borderRadius: '16px',
    padding: '4px 10px',
    margin: '2px',
    border: `2px solid ${data.color}`,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
    fontWeight: '700',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    padding: '2px 4px'
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: '50%',
    margin: '0 0 0 4px',
    ':hover': {
      backgroundColor: 'rgba(0,0,0,0.4)',
      color: 'white'
    }
  }),
  singleValue: (provided, { data }) => ({
    ...provided,
    color: data?.color || provided.color,
    fontWeight: '600',
    textShadow: data?.color ? '1px 1px 2px rgba(255,255,255,0.8)' : 'none'
  })
});

export const formatOptionLabel = (option: SelectOption, { context }: { context: string }) => (
  <div 
    style={{
      backgroundColor: context === 'menu' ? option.color : 'transparent',
      color: context === 'menu' ? 'white' : "white",
      padding: context === 'menu' ? '8px 12px' : '0',
      borderRadius: context === 'menu' ? '6px' : '0',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontSize: '0.875rem'
    }}
  >
    {option.label}
  </div>
);