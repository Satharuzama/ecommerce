import {Header} from '../components/Header'
import './NotFoundPage.css'
export function NotFoundPage({cart}){
    return(
        <>   
         <Header cart={cart}/>
         <title>404 page not found</title>
          <link rel="icon" type="image/png" href={`${import.meta.env.BASE_URL}home-favicon.png`} />
         <p className='not-found'>
     Page not found
        </p>
        </>
    
    );
}