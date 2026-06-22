import {BiLogOut} from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'

const LogoutButton = () => {

  const{loading,logout} = useLogout();

  return (
    <div>
      {!loading ? (
        <button
          className="icon-button hover:!border-[var(--app-danger)] hover:!text-[var(--app-danger)]"
          onClick={logout}
          aria-label="Log out"
        >
          <BiLogOut className='h-5 w-5' />
        </button>
      ) :(
        <span className='loading loading-spinner'></span>
      )}
        
    </div>
  )
}

export default LogoutButton
