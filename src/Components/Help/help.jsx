'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, AlertTriangle, ThumbsUp, HelpCircle, ChevronRight, MessageSquare, X } from 'lucide-react'
import '../Help/help.css'

const helpOptions = [
  { icon: Phone, text: 'Contact Driver', value: 'driver' },
  { icon: AlertTriangle, text: 'Report a Ride Issue', value: 'ride' },
  { icon: ThumbsUp, text: 'Provide Feedback', value: 'feedback' },
  { icon: HelpCircle, text: 'General Inquiries', value: 'general' }
]

export default function CustomerHelpPage() {
  const [selectedOption, setSelectedOption] = useState('')
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' })

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setIsFormVisible(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Your request has been submitted. We will get back to you soon.')
    setIsFormVisible(false)
    setFormData({ name: '', phone: '', message: '' })
  }

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="text-2xl font-bold text-gray-800">Rapido</h1>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-wrapper">
          <motion.div 
            className="help-options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {helpOptions.map((option, index) => (
              <motion.button
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className="help-option"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="help-option-content">
                  <option.icon className="help-option-icon h-5 w-5" />
                  <span className="help-option-text">{option.text}</span>
                </span>
                <ChevronRight className="help-option-arrow h-4 w-4" />
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence>
            {isFormVisible && (
              <motion.div
                className="help-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{selectedOption}</h2>
                    <button 
                      type="button" 
                      onClick={() => setIsFormVisible(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-200"
                  >
                    Submit
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="customer-support"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="customer-support-header">
              <MessageSquare className="customer-support-icon h-6 w-6" />
              <h2 className="customer-support-title">Need help with something else?</h2>
            </div>
            <p className="customer-support-text">
              Reach out to our customer support team at +91 123-456-7890.
            </p>
            <motion.button 
              className="chat-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ping us, we'll get back to you soon.
            </motion.button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}