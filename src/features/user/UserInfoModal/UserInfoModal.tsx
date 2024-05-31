import { WalletOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, List, Modal, Popconfirm, Switch } from 'antd'
import { useWalletStore } from '@/features/wallet/walletStore'
import styles from './UserInfoModal.module.scss'

type Props = {
  isOpen: boolean
  walletAddress: string
  onLogout: () => void
  onClose: () => void
}
export const UserInfoModal = ({ isOpen, walletAddress, onLogout, onClose }: Props) => {
  const { isDebugMode, changeDebugMode } = useWalletStore()

  const data = [
    {
      title: 'Your wallet address',
      description: walletAddress,
      icon: <WalletOutlined />,
    },
    {
      title: 'Debug mode',
      description: (
        <div>
          <Switch defaultChecked={isDebugMode} onChange={val => changeDebugMode(val)} />
        </div>
      ),
      icon: (
        <span style={{ color: '#ff4d4f' }}>
          <WarningOutlined />
        </span>
      ),
    },
  ]

  return (
    <Modal
      title="User info"
      centered
      open={isOpen}
      onCancel={onClose}
      footer={
        <div className={styles.footer}>
          <Button shape="round" onClick={onClose}>
            Close
          </Button>

          <Popconfirm
            title="Are you sure you want to disconnect?"
            description="Anyway, you can always connect again"
            onConfirm={onLogout}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="round" type="default" danger>
              Disconnect
            </Button>
          </Popconfirm>
        </div>
      }
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta avatar={item.icon} title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Modal>
  )
}
