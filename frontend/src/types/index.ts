export interface Product {
  id: string
  title: string
  handle: string
  body_html?: string
  vendor: string
  product_type: string
  created_at: string
  updated_at: string
  published_at?: string
  tags: string[]
  variants: ProductVariant[]
  images: ProductImage[]
  options: ProductOption[]
  flavor?: string
  pack_sizes: string[]
  nutrition_info?: NutritionInfo
  is_award_winning: boolean
  is_bestseller: boolean
}

export interface ProductVariant {
  id: string
  product_id: string
  title: string
  price: string
  sku?: string
  position: number
  inventory_policy: string
  compare_at_price?: string
  option1?: string
  option2?: string
  option3?: string
  barcode?: string
  grams?: number
  weight?: number
  weight_unit: string
  inventory_quantity?: number
  available: boolean
  image_id?: string
  requires_shipping: boolean
  taxable: boolean
}

export interface ProductImage {
  id: string
  src: string
  alt?: string
  position: number
  width?: number
  height?: number
}

export interface ProductOption {
  id: string
  name: string
  position: number
  values: string[]
}

export interface NutritionInfo {
  protein: string
  carbs: string
  fat: string
  calories: string
  serving_size: string
  keto_friendly: boolean
  gluten_free: boolean
}

export interface CartItem {
  id: number
  cart_id: number
  shopify_product_id: string
  shopify_variant_id: string
  product_title: string
  variant_title?: string
  sku?: string
  quantity: number
  price: number
  line_total: number
  image_url?: string
  properties: Record<string, any>
  created_at: string
  updated_at?: string
}

export interface Cart {
  id: number
  session_id: string
  user_id?: number
  shopify_checkout_id?: string
  shopify_checkout_token?: string
  checkout_url?: string
  total_amount: number
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  discount_codes: string[]
  is_active: boolean
  expires_at?: string
  created_at: string
  updated_at?: string
  items: CartItem[]
  items_count: number
  is_free_shipping_eligible: boolean
}

export interface User {
  id: number
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  is_active: boolean
  is_admin: boolean
  created_at: string
  shopify_customer_id?: string
}

export interface Order {
  id: string
  order_number: number
  name: string
  email?: string
  created_at: string
  updated_at: string
  cancelled_at?: string
  closed_at?: string
  processed_at?: string
  customer?: Customer
  billing_address?: Address
  shipping_address?: Address
  currency: string
  total_price: string
  subtotal_price: string
  total_tax: string
  total_discounts: string
  line_items: LineItem[]
  shipping_lines: ShippingLine[]
  fulfillment_status?: string
  financial_status?: string
  confirmed: boolean
  buyer_accepts_marketing: boolean
  cancel_reason?: string
  note?: string
  tags: string[]
  discount_codes: any[]
  is_will_call: boolean
  pickup_location?: string
  pickup_date?: string
  pickup_confirmed: boolean
}

export interface Customer {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  verified_email: boolean
  accepts_marketing: boolean
  created_at: string
  updated_at: string
  orders_count: number
  state: string
  total_spent: string
  last_order_id?: string
  note?: string
  tax_exempt: boolean
  tags: string[]
  currency: string
  addresses: Address[]
  default_address?: Address
}

export interface Address {
  first_name?: string
  last_name?: string
  address1?: string
  address2?: string
  city?: string
  province?: string
  province_code?: string
  country?: string
  country_code?: string
  zip?: string
  phone?: string
  company?: string
}

export interface LineItem {
  id?: string
  variant_id: string
  quantity: number
  properties?: Record<string, any>
  product_id?: string
  title?: string
  variant_title?: string
  sku?: string
  vendor?: string
  price?: string
  requires_shipping?: boolean
  taxable?: boolean
  gift_card?: boolean
  name?: string
  total_discount?: string
  fulfillment_status?: string
}

export interface ShippingLine {
  id?: string
  title: string
  price: string
  code: string
  source?: string
  phone?: string
  delivery_category?: string
  carrier_identifier?: string
  discounted_price?: string
}

export interface ContactInquiry {
  id?: number
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  inquiry_type: 'general' | 'order' | 'product' | 'wholesale' | 'partnership' | 'support'
  order_number?: string
  created_at?: string
}

export interface BusinessInfo {
  company_name: string
  address: string
  phone: string
  email: string
  hours: Record<string, string>
  will_call_location: string
  will_call_hours: string
  certifications: string[]
  about_us: string
  story?: string
  mission?: string
  values: string[]
  founded_year: number
  social_media_links: SocialMediaLink[]
  is_open_now: boolean
  next_open_time?: string
}

export interface SocialMediaLink {
  id: number
  platform: string
  url: string
  username?: string
  is_active: boolean
  display_order: number
}