import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${process.env.NEXT_PUBLIC_SITE_URL || ''}${path}`
}

export function calculateShipping(subtotal: number): number {
  const FREE_SHIPPING_THRESHOLD = 49
  const STANDARD_SHIPPING_RATE = 7.99
  
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_RATE
}

export function isHawaiiAddress(state: string): boolean {
  return state.toUpperCase() === 'HI' || state.toLowerCase() === 'hawaii'
}

export function getBusinessHours() {
  return {
    monday: '8:00 AM - 5:00 PM HST',
    tuesday: '8:00 AM - 5:00 PM HST',
    wednesday: '8:00 AM - 5:00 PM HST',
    thursday: '8:00 AM - 5:00 PM HST',
    friday: '8:00 AM - 5:00 PM HST',
    saturday: 'Closed',
    sunday: 'Closed',
  }
}

export function isBusinessOpen(): boolean {
  const now = new Date()
  const hawaiiTime = new Date(now.toLocaleString("en-US", {timeZone: "Pacific/Honolulu"}))
  const day = hawaiiTime.getDay()
  const hour = hawaiiTime.getHours()
  
  // Closed on weekends (0 = Sunday, 6 = Saturday)
  if (day === 0 || day === 6) return false
  
  // Open Monday-Friday 8 AM - 5 PM
  return hour >= 8 && hour < 17
}