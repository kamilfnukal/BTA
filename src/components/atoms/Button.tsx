type ButtonProps = {
  label: string
  onClick: () => any
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  )
}

export { Button }
