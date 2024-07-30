import { logoImg, logoutIcon } from '@/utils'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Topbar = () => {
  return (
   <section className='topbar'> 
    <div className='flex-between py-4 px-5'> 
      <Link to="/" className='flex items-center gap-3'>
        <img 
          src={logoImg} 
          alt="logo"
          width={130}
          height={325}
          />
      </Link>

      <div className='flex gap-4'>
        <Button> 
            <img src={logoutIcon} alt="" />
        </Button>
      </div>
    </div>
   </section>
  )
}

export default Topbar