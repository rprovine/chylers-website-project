import { Metadata } from 'next'
import { BUSINESS_INFO, SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Chyler\'s Hawaiian Beef Chips. Please read these terms carefully before using our website or making a purchase.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <p className="text-lg mb-6">
              Welcome to Chyler's Hawaiian Beef Chips. These Terms of Service ("Terms") govern your use of our website 
              at {SITE_CONFIG.url} (the "Service") operated by Chyler's Hawaiian Beef Chips ("we," "us," or "our").
            </p>
            <p className="mb-6">
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part 
              of these terms, then you may not access the Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">1. Use of Our Service</h2>
            <p className="mb-4">You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the Service in any way that violates any applicable federal, state, local, or international law</li>
              <li>Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
              <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
              <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
              <li>Attempt to gain unauthorized access to any portion of the Service</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">2. Products and Pricing</h2>
            <p className="mb-4">
              All products are subject to availability. We reserve the right to discontinue any product at any time. 
              Prices for our products are subject to change without notice. We reserve the right to refuse or cancel 
              any order at our sole discretion.
            </p>
            <p className="mb-4">
              We strive to display accurate product descriptions and pricing. However, we do not warrant that product 
              descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">3. Orders and Payment</h2>
            <p className="mb-4">
              By placing an order, you represent that the products ordered will be used only in a lawful manner. 
              We reserve the right to refuse or cancel your order at any time for reasons including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Product or service availability</li>
              <li>Errors in the description or price of the product</li>
              <li>Errors in your order</li>
              <li>Suspected fraudulent activity</li>
            </ul>
            <p className="mb-4">
              You agree to provide current, complete, and accurate purchase and account information for all purchases 
              made through our Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">4. Shipping and Delivery</h2>
            <p className="mb-4">
              Shipping and delivery terms are outlined in our Shipping Policy. Risk of loss and title for products 
              purchased pass to you upon delivery to the carrier.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">5. Returns and Refunds</h2>
            <p className="mb-4">
              Our return and refund policy is outlined in our Returns & Refund Policy. By making a purchase, you 
              agree to the terms of our return and refund policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">6. Intellectual Property</h2>
            <p className="mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive 
              property of Chyler's Hawaiian Beef Chips and its licensors. The Service is protected by copyright, 
              trademark, and other laws. Our trademarks and trade dress may not be used in connection with any 
              product or service without our prior written consent.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">7. User Content</h2>
            <p className="mb-4">
              If you submit reviews, comments, or other content to us, you grant us a non-exclusive, royalty-free, 
              perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, 
              translate, create derivative works from, distribute, and display such content throughout the world 
              in any media.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">8. Privacy</h2>
            <p className="mb-4">
              Your use of our Service is also governed by our Privacy Policy. Please review our Privacy Policy, 
              which also governs the Site and informs users of our data collection practices.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">9. Disclaimers</h2>
            <p className="mb-4">
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
              we disclaim all warranties, express or implied, including but not limited to implied warranties of 
              merchantability and fitness for a particular purpose.
            </p>
            <p className="mb-4">
              We do not warrant that the Service will be uninterrupted, timely, secure, or error-free; that the 
              information on the Service is accurate, reliable, or complete; or that any defects or errors will be corrected.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">10. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall Chyler's Hawaiian Beef Chips, its directors, employees, partners, agents, suppliers, 
              or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
              resulting from your use of the Service.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Indemnification</h2>
            <p className="mb-4">
              You agree to defend, indemnify, and hold harmless Chyler's Hawaiian Beef Chips and its licensees and 
              licensors, and their employees, contractors, agents, officers and directors, from and against any and 
              all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not 
              limited to attorney's fees).
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">12. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of the State of Hawaii, without 
              regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms 
              will not be considered a waiver of those rights.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">13. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
              is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">14. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="font-semibold mb-2">{SITE_CONFIG.name}</p>
              <p>{BUSINESS_INFO.address}</p>
              <p>Email: <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary hover:underline">{BUSINESS_INFO.email}</a></p>
              <p>Phone: {BUSINESS_INFO.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}