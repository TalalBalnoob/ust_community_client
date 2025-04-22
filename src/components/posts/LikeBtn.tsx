import { faHeart as outlineHeart } from '@fortawesome/free-regular-svg-icons'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type propsType = {
  isLiked: boolean
  likes: number
  onClick: () => void
}

function LikeBtn({ isLiked, likes, onClick }: propsType) {
  // TODO: add optimistic update
  return (
    <button
      className='flex items-center gap-1'
      onClick={onClick}
    >
      {/* color it based on the isLiked state */}
      {isLiked ? (
        <FontAwesomeIcon
          icon={solidHeart}
          className='text-red-500'
        />
      ) : (
        <FontAwesomeIcon
          icon={outlineHeart}
          className='text-sec/80'
        />
      )}
      {/* number of likes */}
      <p className='text-sm'> {likes}</p>
    </button>
  )
}

export default LikeBtn
