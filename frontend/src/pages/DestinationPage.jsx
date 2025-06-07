import React from 'react'
import { TopCategories } from '../components/TopCategarioes'
import GallaryPage from './GallaryPage'
import BookingForm from '../components/form/BookingForm'

export default function DestinationPage() {
  return (
    <div className='mt-10'>
            <TopCategories />
            <GallaryPage />
            <BookingForm />
    </div>
  )
}
