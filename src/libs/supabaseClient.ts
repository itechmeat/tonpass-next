import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabaseClient = createClient(supabaseUrl || '', supabaseAnonKey || '')

export const uploadFile = async (file: File, name: string) => {
  const { data, error } = await supabaseClient.storage.from('covers').upload(name, file)
  if (error) {
    console.log('🚀 ~ uploadFile ~ error:', error)
  } else {
    console.log('🚀 ~ uploadFile ~ data:', data)
  }
}
