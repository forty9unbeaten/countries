import { Home } from './Home';
import { Details } from './Details';

export const routes = {
    Home: { path: '/', component: Home },
    Details: { path: '/details/:countryname', component: Details },
};
