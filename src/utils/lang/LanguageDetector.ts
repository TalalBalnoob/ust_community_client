import { francAll } from 'franc'
import { useState } from 'react'

interface UseLanguageDetectionResult {
  detectedLanguage: string
  detectLanguage: (text: string) => void
  error: string
}

// hook to detect the language of the text
const useLanguageDetection = (): UseLanguageDetectionResult => {
  // store the detected language
  const [detectedLanguage, setDetectedLanguage] = useState<string>('')
  const [error, setError] = useState<string>('')

  /**
   * Detects the language of the given text and sets the detected language state.
   * It uses the `francAll` library to determine if the language is English or Arabic.
   * If the language cannot be determined, it sets the detected language to 'Unknown language'.
   * In case of an error during detection, it sets an error message and clears the detected language.
   *
   * @param text - The text whose language needs to be detected. It should be at least 5 characters long.
   */
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

      setError('')
    } catch {
      setError('Error detecting language')
      setDetectedLanguage('')
    }
  }

  return { detectedLanguage, detectLanguage, error }
}

export default useLanguageDetection
