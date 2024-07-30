import { logoImg, logoutIcon } from '@/utils'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries';
import { useEffect } from 'react';

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();


  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess, navigate]);


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
      {/* 2.20.15 */}
      <div className='flex gap-4'>
        <Button variant="ghost" className='shad-button_ghost'  onClick={() => signOut()}> 
            <img src={logoutIcon} alt="logoutIcon" />
        </Button>
      </div>
    </div>
   </section>
  )
}

export default Topbar