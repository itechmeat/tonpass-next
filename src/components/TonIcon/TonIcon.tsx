import { FC } from 'react'

type Props = {
  size?: number
  color?: string
  className?: string
}

export const TonIcon: FC<Props> = ({ size = 24, color = 'currentColor', className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 209 209"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M174.895 0H33.8895C7.96327 0 -8.46915 27.9703 4.57396 50.5806L91.5973 201.435C97.2771 211.285 111.509 211.285 117.187 201.435L204.228 50.5806C217.254 28.0057 200.804 0 174.895 0ZM91.5268 156.196L72.574 119.511L26.8445 37.7136C23.8277 32.478 27.5542 25.7695 33.8717 25.7695H91.5096V156.213L91.5268 156.196ZM181.905 37.6959L136.193 119.53L117.24 156.196V25.7518H174.878C181.194 25.7518 184.921 32.4603 181.905 37.6959Z"
        fill={color}
      />
    </svg>
  )
}
