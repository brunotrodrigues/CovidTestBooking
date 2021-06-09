import UserView from './views/userView.js'
import AdminView from './views/adminView.js'
import ProfileView from './views/profileView.js'
import LabView from './views/CatalogView.js'
import DetailLabView from './views/DetailLabView.js'


class App {
    constructor() {
        this.routes = {
            '': [UserView],
            'index': [UserView],
            'adminUser':[AdminView],
            'profile': [ProfileView],
            'labs': [LabView],
            'detailLab':[DetailLabView]
        };

        // import dummy data for testing purposes
        this.#importDataFixtures();

        // instantiate the views mapped in the routes object
        this.#instantiateViews();
    }

    #importDataFixtures() {
        const users = [
            {
                username: 'admin',
                password: 'admin',
                confirmPassword: 'admin',
                email: 'admin@admin.pt',
                phone: '123456789',
                birthday: '',
                address: '',
                gender: '',
                fullname: 'admin',
                photo: '',
                points: 999999999,
                type: 'admin'
            }
        ];

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    #instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];
        const views = this.#getViews(route);
        for (const view of views) {
            new view();
        }
    }

    #getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

}

new App();