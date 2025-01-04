import { francAll } from 'franc'
import { useState } from 'react'

interface UseLanguageDetectionResult {
  detectedLanguage: string
  detectLanguage: (text: string) => void
  error: string
}

const useLanguageDetection = (): UseLanguageDetectionResult => {
  const [detectedLanguage, setDetectedLanguage] = useState<string>('')
  const [error, setError] = useState<string>('')

  const detectLanguage = (text: string): void => {
    try {
      const langCode = francAll(text, { only: ['eng', 'arb'], minLength: 5 })

      if (langCode[0][0] === 'und') {
        setDetectedLanguage('Unknown language')
      } else {
        setDetectedLanguage(
          langCode[0][0] ? langCode[0][0] : 'Unknown language',
        )
      }

      setError('') // Clear any previous errors
    } catch (err) {
      setError('Error detecting language')
      setDetectedLanguage('')
    }
  }

  return { detectedLanguage, detectLanguage, error }
}

export default useLanguageDetection
