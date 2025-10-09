import { useState, type FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  trainingType: string;
  teamSize: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    trainingType: '',
    teamSize: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.trainingType) {
      newErrors.trainingType = 'Please select a training type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        trainingType: '',
        teamSize: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {submitSuccess && (
        <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-500 rounded-md">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <div>
              <p className="font-semibold text-green-800">Thank you for your inquiry!</p>
              <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'input-error' : ''}`}
              placeholder="John Smith"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={`input-field ${errors.company ? 'input-error' : ''}`}
              placeholder="Acme Corp"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`input-field ${errors.phone ? 'input-error' : ''}`}
              placeholder="+44 20 1234 5678"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Training Type Field */}
          <div>
            <label htmlFor="trainingType" className="block text-sm font-medium text-gray-700 mb-2">
              Training Type *
            </label>
            <select
              id="trainingType"
              name="trainingType"
              value={formData.trainingType}
              onChange={handleChange}
              className={`input-field ${errors.trainingType ? 'input-error' : ''}`}
            >
              <option value="">Select a training type</option>
              <option value="leadership">Leadership Development</option>
              <option value="staff-development">Staff Development</option>
              <option value="communication">Communication Skills</option>
              <option value="sales">Sales & Customer Service</option>
              <option value="productivity">Time & Productivity Management</option>
              <option value="dei">Diversity, Equity & Inclusion</option>
              <option value="custom">Custom Program</option>
            </select>
            {errors.trainingType && (
              <p className="mt-1 text-sm text-red-600">{errors.trainingType}</p>
            )}
          </div>

          {/* Team Size Field */}
          <div>
            <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-2">
              Team Size (Optional)
            </label>
            <select
              id="teamSize"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select team size</option>
              <option value="1-10">1-10 people</option>
              <option value="11-25">11-25 people</option>
              <option value="26-50">26-50 people</option>
              <option value="51-100">51-100 people</option>
              <option value="100+">100+ people</option>
            </select>
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Tell Us About Your Training Needs *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`input-field resize-none ${errors.message ? 'input-error' : ''}`}
            placeholder="Please describe your training objectives, challenges, and any specific requirements..."
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-600">* Required fields</p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Inquiry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
