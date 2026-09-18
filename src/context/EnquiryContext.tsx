import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { Product } from '../data/products';

export interface EnquiryItem {
  product: Product;
  selectedColor: string;
  sizeQuantities: Record<string, number>; // e.g. { XS: 2, S: 5, M: 6 }
  totalQuantity: number;
}

interface EnquiryState {
  items: EnquiryItem[];
  isOpen: boolean;
}

type EnquiryAction =
  | { type: 'ADD_ITEM'; payload: EnquiryItem }
  | { type: 'UPDATE_ITEM'; payload: { productId: string; selectedColor: string; sizeQuantities: Record<string, number>; totalQuantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; selectedColor: string } }
  | { type: 'CLEAR_ENQUIRY' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' };

interface EnquiryContextType {
  state: EnquiryState;
  addItem: (item: EnquiryItem) => void;
  updateItem: (productId: string, selectedColor: string, sizeQuantities: Record<string, number>, totalQuantity: number) => void;
  removeItem: (productId: string, selectedColor: string) => void;
  clearEnquiry: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalProducts: number;
  totalUnits: number;
  isInEnquiry: (productId: string) => boolean;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

const STORAGE_KEY = 'noire_enquiry';

function enquiryReducer(state: EnquiryState, action: EnquiryAction): EnquiryState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIdx = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id && item.selectedColor === action.payload.selectedColor
      );
      if (existingIdx >= 0) {
        // Replace existing item (same product + color)
        const updated = [...state.items];
        updated[existingIdx] = action.payload;
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId && item.selectedColor === action.payload.selectedColor
            ? { ...item, sizeQuantities: action.payload.sizeQuantities, totalQuantity: action.payload.totalQuantity }
            : item
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.product.id === action.payload.productId && item.selectedColor === action.payload.selectedColor)
        ),
      };
    case 'CLEAR_ENQUIRY':
      return { ...state, items: [] };
    case 'OPEN_DRAWER':
      return { ...state, isOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

function loadEnquiry(): EnquiryState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { items: parsed.items || [], isOpen: false };
    }
  } catch {
    // ignore parse errors
  }
  return { items: [], isOpen: false };
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(enquiryReducer, undefined, loadEnquiry);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: state.items }));
  }, [state.items]);

  const addItem = (item: EnquiryItem) => dispatch({ type: 'ADD_ITEM', payload: item });

  const updateItem = (productId: string, selectedColor: string, sizeQuantities: Record<string, number>, totalQuantity: number) =>
    dispatch({ type: 'UPDATE_ITEM', payload: { productId, selectedColor, sizeQuantities, totalQuantity } });

  const removeItem = (productId: string, selectedColor: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, selectedColor } });

  const clearEnquiry = () => dispatch({ type: 'CLEAR_ENQUIRY' });
  const openDrawer = () => dispatch({ type: 'OPEN_DRAWER' });
  const closeDrawer = () => dispatch({ type: 'CLOSE_DRAWER' });

  const totalProducts = state.items.length;
  const totalUnits = state.items.reduce((sum, item) => sum + item.totalQuantity, 0);
  const isInEnquiry = (productId: string) => state.items.some((item) => item.product.id === productId);

  return (
    <EnquiryContext.Provider
      value={{ state, addItem, updateItem, removeItem, clearEnquiry, openDrawer, closeDrawer, totalProducts, totalUnits, isInEnquiry }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
}
