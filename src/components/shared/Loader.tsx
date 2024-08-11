// 导入loaderIcon
import { loaderIcon } from '@/utils'

// 定义Loader组件
const Loader = () => {
  // 返回一个div，包含一个img标签，img标签的src属性为loaderIcon，alt属性为loader，width属性为24，height属性为24
  return (
    <div className='flex-center w-full'>
      <img 
        src={loaderIcon} 
        alt="loader"
        width={24}
        height={24} 
      />
    </div>
  )
}

// 导出Loader组件
export default Loader