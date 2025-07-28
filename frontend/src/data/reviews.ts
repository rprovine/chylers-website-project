export interface Review {
  id: string
  author: string
  location: string
  rating: number
  date: string
  verified: boolean
  helpful: number
  flavor?: string
  title: string
  content: string
  pros?: string[]
  images?: string[]
}

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sarah K.',
    location: 'Honolulu, HI',
    rating: 5,
    date: '2024-01-15',
    verified: true,
    helpful: 24,
    flavor: 'Roasted Garlic',
    title: 'Best beef chips I\'ve ever had!',
    content: 'I discovered Chyler\'s at a local farmers market and I\'m hooked! The Roasted Garlic flavor is absolutely amazing - perfect balance of savory and garlic without being overpowering. The texture is incredible, truly like a chip not jerky. My whole family loves them!',
    pros: ['Perfect texture', 'Great flavor', 'High protein snack']
  },
  {
    id: '2',
    author: 'Mike T.',
    location: 'Los Angeles, CA',
    rating: 5,
    date: '2024-01-10',
    verified: true,
    helpful: 18,
    title: 'Perfect keto snack!',
    content: 'As someone on keto, finding good snacks is always a challenge. These beef chips are a game changer! 18g of protein and only 3g carbs - exactly what I need. I order the 15-pack every month. The free shipping over $49 is a nice bonus too.',
    pros: ['Keto friendly', 'High protein', 'Great value with bulk ordering']
  },
  {
    id: '3',
    author: 'Lisa M.',
    location: 'Kapolei, HI',
    rating: 5,
    date: '2024-01-08',
    verified: true,
    helpful: 15,
    title: 'Love supporting local Hawaii businesses',
    content: 'It\'s so nice to have a local option for high-quality snacks. I pick up my orders directly from their Kapolei location - the staff is always friendly and helpful. The Original flavor is my favorite, but they\'re all delicious. Quality is outstanding!',
    pros: ['Local business', 'Will-call pickup option', 'Friendly service']
  },
  {
    id: '4',
    author: 'David R.',
    location: 'Seattle, WA',
    rating: 5,
    date: '2023-12-28',
    verified: true,
    helpful: 12,
    flavor: 'Spicy',
    title: 'The spicy flavor is perfect!',
    content: 'I\'m a hot sauce fanatic and was hoping the spicy flavor would have some real heat - it delivers! Not overwhelmingly hot, but a nice kick that builds. The beef quality is excellent and the chips are super crispy. Shipping was fast too.',
    pros: ['Actually spicy', 'Crispy texture', 'Fast shipping']
  },
  {
    id: '5',
    author: 'Jennifer H.',
    location: 'San Francisco, CA',
    rating: 5,
    date: '2023-12-20',
    verified: true,
    helpful: 22,
    flavor: 'Cracked Pepper',
    title: 'Addictively good!',
    content: 'Warning: these are dangerously addictive! The Cracked Pepper flavor is my absolute favorite - you can actually see and taste the pepper. I love that they\'re made in Hawaii with such care. Started with a single pack to try, now I\'m a subscriber to the 6-pack option.',
    pros: ['Addictive flavor', 'Visible quality', 'Made in Hawaii']
  },
  {
    id: '6',
    author: 'Robert L.',
    location: 'Portland, OR',
    rating: 5,
    date: '2023-12-15',
    verified: true,
    helpful: 9,
    title: 'Great alternative to regular chips',
    content: 'I\'ve been trying to eat healthier but miss having crunchy snacks. These beef chips are the perfect solution - all the crunch and satisfaction of chips but with actual nutritional value. The fact that they\'re gluten-free is a bonus for my wife who has celiac.',
    pros: ['Healthy alternative', 'Gluten free', 'Satisfying crunch']
  },
  {
    id: '7',
    author: 'Amanda C.',
    location: 'Ewa Beach, HI',
    rating: 5,
    date: '2023-12-10',
    verified: true,
    helpful: 16,
    flavor: 'Roasted Garlic',
    title: 'Award winning for a reason!',
    content: 'The Roasted Garlic truly deserves its awards. I\'ve tried other beef chip brands but nothing compares to Chyler\'s. The family story behind the business makes it even better. I always keep a stash in my pantry and give them as gifts to mainland friends.',
    pros: ['Award winning flavor', 'Family owned', 'Great gift idea']
  },
  {
    id: '8',
    author: 'Kevin W.',
    location: 'Austin, TX',
    rating: 4,
    date: '2023-12-05',
    verified: true,
    helpful: 7,
    title: 'Really good, just wish they were bigger',
    content: 'The flavor and quality are excellent - no complaints there. My only minor issue is I wish the serving size was a bit bigger. I go through a pack pretty quickly! That said, I\'ll definitely keep ordering. The protein content is great for post-workout snacks.',
    pros: ['Great taste', 'High protein', 'Quality ingredients']
  },
  {
    id: '9',
    author: 'Maria S.',
    location: 'Phoenix, AZ',
    rating: 5,
    date: '2023-11-30',
    verified: true,
    helpful: 14,
    flavor: 'Original',
    title: 'My kids love these!',
    content: 'Getting my kids to eat protein is always a struggle, but they LOVE these beef chips. They think they\'re getting a treat, I know they\'re getting nutrition. Win-win! The Original flavor is perfect for kids - not too spicy or strong. We go through a 6-pack every few weeks.',
    pros: ['Kid-friendly', 'Nutritious snack', 'Original flavor is mild']
  },
  {
    id: '10',
    author: 'Thomas B.',
    location: 'Denver, CO',
    rating: 5,
    date: '2023-11-25',
    verified: true,
    helpful: 11,
    title: 'Perfect for hiking and camping',
    content: 'I\'m an avid hiker and these have become my go-to trail snack. Lightweight, high in protein, and they don\'t get crushed in my pack like regular chips. The flavor gives me something to look forward to on long hikes. Highly recommend for outdoor enthusiasts!',
    pros: ['Portable', 'Durable packaging', 'Energy boosting']
  },
  {
    id: '11',
    author: 'Nancy P.',
    location: 'Aiea, HI',
    rating: 5,
    date: '2023-11-20',
    verified: true,
    helpful: 19,
    flavor: 'All flavors',
    title: 'Been buying since 2010!',
    content: 'I\'ve been a loyal customer since I first tried these at a craft fair over a decade ago. It\'s been amazing watching this local family business grow while maintaining their quality. I\'ve tried all the flavors and honestly can\'t pick a favorite. The consistency and quality have never wavered.',
    pros: ['Consistent quality', 'Long-time customer', 'All flavors are great']
  },
  {
    id: '12',
    author: 'Chris D.',
    location: 'Chicago, IL',
    rating: 5,
    date: '2023-11-15',
    verified: true,
    helpful: 8,
    title: 'Found them on Amazon, now order direct',
    content: 'Originally found these on Amazon but now I order directly from their website. Better prices and I like supporting the business directly. These have replaced all other chips in my house. The fact that they\'re made in Hawaii with that aloha spirit just makes them taste even better!',
    pros: ['Better prices direct', 'Replaced unhealthy snacks', 'Made with aloha']
  }
]

export const REVIEW_SUMMARY = {
  average: 4.9,
  total: 247,
  distribution: {
    5: 231,
    4: 12,
    3: 3,
    2: 1,
    1: 0
  },
  verified_purchase_percentage: 98
}