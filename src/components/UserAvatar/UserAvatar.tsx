import Avatar, { genConfig } from 'react-nice-avatar'

type Props = {
  avatarStr: string
  size?: number
  className?: string
}
export const UserAvatar = ({ avatarStr, size = 40 }: Props) => {
  const config = genConfig(avatarStr)

  return <Avatar style={{ width: `${size}px`, height: `${size}px` }} {...config} />
}
