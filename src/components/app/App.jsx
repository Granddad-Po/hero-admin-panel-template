import HeroesList from '../heroesList/HeroesList.jsx';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm.jsx';
import HeroesFilters from '../heroesFilters/HeroesFilters.jsx';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;