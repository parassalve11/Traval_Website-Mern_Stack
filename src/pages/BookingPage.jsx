import React from 'react'
import BookingForm from '../components/form/BookingForm'
import HowItWorks from '../components/HowItWorks'
import MediaGrid from '../components/MediaGrid'

export default function BookingPage() {
  return (
    <div className='mt-10'>
        <HowItWorks />
        <BookingForm />
        <MediaGrid />
    </div>
  )
}
