import {Header} from '../components/Header'
import './NotFoundPage.css'
export function NotFoundPage({cart}){
    return(
        <>   
         <Header cart={cart}/>
         <title>404 page not found</title>
          <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
         <p className='not-found'>
     Page not found
        </p>
        </>
    
    );
}