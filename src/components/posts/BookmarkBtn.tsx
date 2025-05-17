import { faBookmark as outlineBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type propsType = {
  isBooked: boolean
  onClick: () => void
}

function BookmarkBtn({ isBooked, onClick }: propsType) {
  // TODO: add optimistic update
  return (
    <button
      className='flex items-center gap-1'
      onClick={onClick}
    >
      {/* color it based on the isBooked state */}
      {isBooked ? (
        <FontAwesomeIcon
          icon={solidBookmark}
          className='text-sec/100'
        />
      ) : (
        <FontAwesomeIcon
          icon={outlineBookmark}
          className='text-sec'
        />
      )}
    </button>
  )
}

export default BookmarkBtn
