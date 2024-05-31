'use client'

import { FC, useCallback, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { supabaseClient } from '@/libs/supabaseClient'

export const AuthModal: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isNew, seIsNew] = useState(false)
  const [isForgot, seIsForgot] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = useCallback(
    async (value: { email: string; password: string }) => {
      setIsLoading(true)

      if (isNew) {
        const { data, error } = await supabaseClient.auth.signUp({
          email: value.email,
          password: value.password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_BASE_URL,
          },
        })
        setIsLoading(false)
        if (data) {
          setIsModalOpen(false)
        } else {
          console.error(error)
        }
        return
      }

      if (isForgot) {
        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(value.email)
        setIsLoading(false)
        if (data) {
          setIsModalOpen(false)
        } else {
          console.error(error)
        }
        return
      }

      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      })
      setIsLoading(false)
      if (data) {
        setIsModalOpen(false)
      } else {
        console.error(error)
      }
    },
    [isForgot, isNew],
  )

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Login</Button>
      <Modal
        title={isNew ? 'Create account' : isForgot ? 'Reset password' : 'Login'}
        centered
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical" autoComplete="off" onFinish={handleSubmit}>
          <Form.Item name={'email'} label="Email" rules={[{ type: 'email' }, { required: true }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          {!isForgot && (
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
          )}

          <Form.Item shouldUpdate>
            {() => (
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                >
                  {isNew ? 'Sign Up' : isForgot ? 'Reset' : 'Sign In'}
                </Button>
                {!isForgot && (
                  <>
                    <span style={{ marginLeft: '10px' }}> </span>
                    <Checkbox checked={isNew} onChange={e => seIsNew(e.target.checked)}>
                      Is new user
                    </Checkbox>
                  </>
                )}
                {!isNew && (
                  <>
                    <span style={{ marginLeft: '10px' }}> </span>
                    <Checkbox checked={isForgot} onChange={e => seIsForgot(e.target.checked)}>
                      Forgot password
                    </Checkbox>
                  </>
                )}
              </>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
