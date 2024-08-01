import { logoImg, logoutIcon, userImg } from '@/utils'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queries';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext()


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
      <div className='flex gap-4'>
        <Button variant="ghost" className='shad-button_ghost'  onClick={() => signOut()}> 
            <img src={logoutIcon} alt="logoutIcon" />
        </Button>
        <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img 
              src={user.imageUrl || userImg}
              alt="userImg"
              className='h-8 w-8 rounded-full'
            />
        </Link>
      </div>
    </div>
   </section>
  )
}

export default Topbar