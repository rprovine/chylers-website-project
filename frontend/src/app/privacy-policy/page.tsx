import { Metadata } from 'next'
import { BUSINESS_INFO, SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Chyler\'s Hawaiian Beef Chips. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
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
              At Chyler's Hawaiian Beef Chips ("we," "our," or "us"), we are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website {SITE_CONFIG.url} or make a purchase from us.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
            <p className="mb-4">We may collect personal information that you provide to us, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Mailing address</li>
              <li>Phone number</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Account credentials (if you create an account)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h3>
            <p className="mb-4">When you visit our website, we may automatically collect certain information, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website</li>
              <li>Geographic location (country/region)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping notifications</li>
              <li>Respond to customer service requests</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and customer experience</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Information Sharing</h2>
            <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate our business (e.g., payment processors, shipping companies, email service providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
              internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, 
              and personalize content. You can control cookies through your browser settings, but disabling cookies may 
              limit your ability to use certain features of our website.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Your Rights and Choices</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access and update your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us using the information provided below.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
            <p className="mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a child under 13, 
              please contact us immediately.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices 
              of these websites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">California Privacy Rights</h2>
            <p className="mb-4">
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including 
              the right to know what personal information we collect, the right to delete personal information, and 
              the right to opt-out of the sale of personal information (which we do not do).
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
              new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
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