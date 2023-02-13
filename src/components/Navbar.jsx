
import { logo } from '../utils/constants'
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { selectCategory } from '../redux/features/previewSlice';
import { useDispatch } from 'react-redux';

function SearchField({handleSubmit}) {

    

    return (
        <div className='relative flex items-center min-w-[28%]'>
            <input onKeyDown={handleSubmit}
            type="text" placeholder='Search'
                className='focus:border-red-600 focus:border-[2px] focus:outline-none w-[100%] rounded-[30px] py-[8px] pl-[20px] pr-[40px]' />
            <SearchIcon className='absolute right-3 text-red-600' />
        </div>
    )
}

export default function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        if(e.key === 'Enter'){
            navigate(`/search/${e.target.value}`)
        }
    }

    return (
        <div className='p-[20px] flex items-center justify-between mr-[50px] '>
            <Link to='/New'>
                <span onClick={() => dispatch(selectCategory("New"))}>
                    <img src={logo} alt="logo"
                        className='w-[50px] h-[50px]'
                    />
                </span>
            </Link>
            <SearchField handleSubmit={handleSubmit} />
        </div>
    )
}
