'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BUSINESS_INFO } from '@/lib/constants'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { toast } from 'react-hot-toast'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  inquiry_type: z.enum(['general', 'order', 'product', 'wholesale', 'partnership', 'support']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  order_number: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiry_type: 'general',
    },
  })

  const inquiryType = watch('inquiry_type')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Thank you for your message! We\'ll get back to you soon.')
      reset()
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Whether you have questions about our products, need help with an order, or want to 
            share your beef chip experience, we're here to help! Our ohana takes pride in providing 
            exceptional customer service with the same care we put into making every batch of chips. 
            Reach out through the form below, give us a call, or better yet – stop by our Waipahu 
            facility to say aloha in person!
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      {...register('name')}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="inquiry_type">Inquiry Type *</Label>
                    <Select
                      onValueChange={(value) => setValue('inquiry_type', value as any)}
                      defaultValue="general"
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="order">Order Related</SelectItem>
                        <SelectItem value="product">Product Question</SelectItem>
                        <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {inquiryType === 'order' && (
                  <div>
                    <Label htmlFor="order_number">Order Number</Label>
                    <Input
                      id="order_number"
                      {...register('order_number')}
                      placeholder="e.g., #1234"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    {...register('subject')}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">{BUSINESS_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">{BUSINESS_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-muted-foreground">{BUSINESS_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      {BUSINESS_INFO.hours.weekdays}<br />
                      {BUSINESS_INFO.hours.weekends}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/10 rounded-lg">
                <h3 className="font-semibold mb-3">Will Call Pickup Available</h3>
                <p className="text-sm mb-3">
                  Save on shipping and experience the aloha spirit firsthand! Local customers can 
                  pick up orders at our {BUSINESS_INFO.willCall.location} during business hours.
                </p>
                <p className="text-sm">
                  <strong>Pro tip:</strong> Call ahead and we'll have your order ready when you arrive. 
                  Many customers love touring our facility and meeting the team that makes their 
                  favorite snacks!
                </p>
              </div>

              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-3">Wholesale & Partnership Inquiries</h3>
                <p className="text-sm mb-3">
                  Looking to carry Chyler's Hawaiian Beef Chips in your store or restaurant? 
                  We'd love to partner with you! We offer competitive wholesale pricing, 
                  marketing support, and flexible ordering options.
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> wholesale@chylers.com<br />
                  <strong>Phone:</strong> {BUSINESS_INFO.phone} (ask for Wholesale Department)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}