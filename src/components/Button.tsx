type propsType = {
  className: string
  text: string
  type: 'button' | 'reset' | 'submit'
  onClick?: () => void
}

export default function Button({
  className,
  text,
  type = 'button',
  onClick = () => {},
}: propsType) {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
