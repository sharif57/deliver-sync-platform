"use client"

import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
  const handleBack = () => {
    window.history.back()
  }

  return (
    <div className="">
     

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-gray-600">Last updated: December 2024</p>
          </div>

          <section>
            <h3 className="text-lg font-semibold mb-4">Information We Collect</h3>
            <p className="mb-4">
              We collect information you provide directly to us, such as when you create an account, use our services,
              or contact us for support.
            </p>
            <p className="mb-2">This includes:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Name, email address, and phone number</li>
              <li>Vehicle information and driving license details</li>
              <li>Location data for delivery services</li>
              <li>Payment and billing information</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">How We Use Your Information</h3>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services, process transactions,
              and communicate with you.
            </p>
            <p className="mb-2">Specifically, we use your information to:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Process and fulfill delivery requests</li>
              <li>Match customers with drivers</li>
              <li>Provide real-time tracking</li>
              <li>Handle payments and billing</li>
              <li>Send service notifications</li>
              <li>Provide customer support</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Information Sharing</h3>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your
              consent, except as described in this policy.
            </p>
            <p className="mb-2">We may share information when:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Required by law or legal process</li>
              <li>Necessary to protect our rights or safety</li>
              <li>With service providers who assist our operations</li>
              <li>In connection with a business transfer</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Data Security</h3>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p>
              This includes encryption of data in transit and at rest, limited access to authorized personnel, and
              regular security audits and monitoring.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Your Rights</h3>
            <p className="mb-4">
              You have certain rights regarding your personal information. You may exercise these rights by contacting
              us using the information provided below.
            </p>
            <p className="mb-2">Your rights include:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Access your personal information</li>
              <li>Update or correct your data</li>
              <li>Delete your account</li>
              <li>Opt-out of marketing emails</li>
              <li>Control notification preferences</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> privacy@deliveryapp.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Privacy Street, Suite 100, City, State 12345
              </p>
              <p>
                <strong>Response Time:</strong> We respond within 48 hours
              </p>
            </div>
          </section>

          <section className="border-t pt-6 mt-8">
            <p className="text-sm text-gray-600 text-center mb-6">
              This Privacy Policy is effective as of December 2024 and will remain in effect except with respect to any
              changes in its provisions in the future.
            </p>
            <div className="text-center">
              <Button className="bg-amber-400 hover:bg-amber-500 text-white px-8 py-2 rounded-lg" onClick={handleBack}>
                I Understand
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
