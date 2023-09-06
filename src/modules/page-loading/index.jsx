import { Console } from 'ems-component'

export default function PageLoading () {
  return (
    <div className="w-full h-full py-52 flex items-center justify-center">
      <div className="w-32 h-32">
        <Console.LoadingIcon icon="bars" iconClass='text-primary' />
      </div>
    </div>
  )
}