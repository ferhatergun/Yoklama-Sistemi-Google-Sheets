import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Home() {
  return (
    <div className="container mx-auto text-center">
        <h2 className='font-semibold text-xl'>
            Yoklama Sistemine Hoşgeldiniz
        </h2>
        <h2 className='mt-2 mb-5'>
            Yoklama için kalan süreniz: 00:00:00
        </h2>
        <Link to="/attendance" className='p-2 bg-red-100 rounded-md '>
            Yoklama Sitemine Git
        </Link>
    </div>
  )
}
