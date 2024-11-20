import { Button } from '@/components/ui/button'
import addition from '@/assets/addition.png'

export default function CreateBtn() {
  return (
    <Button size='lg' className='w-32 min-w-fit flex items-center gap-x-4 p-6 text-black border-spacing-1 border-solid border-1 hover:bg-gray-100'>
        <img src={addition} alt="logo" className='w-6 h-6' />
        <span>만들기</span>
    </Button>
  )
}
