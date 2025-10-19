'use client'
 
import { useReportWebVitals } from 'next/web-vitals'
 
export default function WebVitals(): null {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  return null
}