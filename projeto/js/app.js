import UserView from './views/userView.js'
import LabView from './views/CatalogView.js'
import DetailLabView from './views/DetailLabView.js'
import AdminView from './views/adminView.js'
import ProfileView from './views/profileView.js'


class App {
    constructor() {
        this.routes = {
            '': [UserView],
            'index': [UserView],
            'adminUser':[AdminView],
            'labs': [
                LabView,
                UserView
            ],
            'detailLab': [
                DetailLabView,
                //UserView
            ],
            'profile': [
                ProfileView,
                UserView
            ],

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

        const labs = [
            {
                id: 1,
                name: 'Hospital CUF (Germano de Sousa)',
                description: 'Hospital CUF Porto',
                photo: 'https://www.josedemello.pt/wp-content/uploads/2017/01/hospital-cuf-porto.png',
                phone: "220039000",
                longitude: "-8.6690792",
                latitude: "41.1759538",
                type: 'antigénio',
                schedule: "09 às 18",
                price: "17€",
                // comments: ,
                // likes: ,
                morada: "Estrada da Circunvalação, 14341, 4100-180 Porto",
                views : "3"
            },
            {
                id: 2,
                name: 'Posto de Colheita Covid-19 Porto - Bonfim',
                type: 'antigénio',
                photo: 'https://lh5.googleusercontent.com/p/AF1QipNKTDR2_WPCrQekSteNJDiZtfm5GyPamkvfXXxF=w600-h650-p-k-no',
                description: 'Clínica do Bonfim',
                phone: "220125001 | 222401401",
                longitude: "-8.6167",
                latitude: "41.15",
                schedule: "09 às 16",
                price: "17€",
                // comments: ,
                // likes: ,
                morada: "Av. Fernão de Magalhães 412 R/Ch 4349-008 Porto",
                views: "5"
            },
            {
                id: 3,
                name: 'Posto de Colheita Covid-19 Porto - Paranhos',
                type: 'diagnostico',
                photo: 'https://www.unilabs.pt/sites/default/files/styles/google_my_business_site_400x266/public/2020-09/Bolama.jpg?h=d08f423e&itok=XkAHt0o1',
                description: 'Posto de Colheita Covid-19 Porto - Paranhos',
                phone: "220125001 | 222401401",
                longitude: "-8.603900",
                latitude: "41.165400",
                schedule: "10 às 20",
                price: "20€",
                // comments: ,
                // likes: ,
                morada: "Rua do Bolama, 233, 4200-139 Porto",
                views: "2"
            },
            {
                id: 4,
                name: 'Posto de Colheita Covid-19 Porto',
                type: 'diagnostico',
                photo: 'https://www.porto.pt/_next/image?url=https%3A%2F%2Fportopontocms-live-f03d42215130439cbde1-5c14293.divio-media.org%2Foriginal_images%2Fmno_centro_rastreio_01.JPG&w=1460&q=85',
                description: 'Posto de Colheita Covid-19 Porto',
                phone: "220125001",
                longitude: "-8.671870",
                latitude: "41.174390",
                schedule: "09 às 18",
                price: "20€",
                // comments: ,
                // likes: ,
                morada: "Queimódromo Porto - Estrada da Circunvalação Entrada Aeródromo, 4100-078 Porto",
                views: "10"
            },
            {
                id: 5,
                name: 'Posto de Colheita Covid-19 Porto - Amial',
                type: 'serológicos',
                photo: 'https://lh5.googleusercontent.com/p/AF1QipOdUPdHniPf_0s8-vwG7msX0522jcYWbyU5UEdm=w800-h800-n-k-no',
                description: 'LabMED Saúde Porto',
                phone: "220125001 | 222401401",
                longitude: "-8.614060",
                latitude: "41.178009",
                schedule: "09 às 18",
                price: "20€",
                // comments: ,
                // likes: ,
                morada: "Rua do Amial, nº 682, 4200-062 Paranhos",
                views: "1"
            },
            {
                id: 6,
                name: 'Posto de Colheita Covid-19 Porto - Cedofeita',
                type: 'serológicos',
                photo: 'https://lh3.googleusercontent.com/proxy/qQYpuFZCkRObOeNWYc1CSjaKii2sMzb4-IHm47FWnCnO5N06CAPZ1PzSop_4BwqkSiUamfpUmGaN4LaqRMFpECx4stkkVdptcVF9VkD4RHZmM8vzKf13TUtCCqRrmzb62EcE',
                description: 'LabMED Saúde Porto',
                phone: "220125001 | 222401401",
                longitude: "-8.614060",
                latitude: "41.178010",
                schedule: "09 às 18",
                price: "20€",
                // comments: ,
                // likes: ,
                morada: "Rua da Boavista, nº 668 , 4050-105 Cedofeita",
                views: "5"
            },
            {
                id: 7,
                name: 'Posto de Colheita Covid-19 Porto - Filipa de Lencastre (Synlab Porto)',
                type: 'serológicos',
                photo: 'https://www.synlab.pt/Media/Imagens/SYNLAB.PT/N05_20201012_THUMB_720px.jpg',
                description: 'Synlab Porto',
                phone: "222001507 | 227860743 - 935465241",
                longitude: "-8.612350",
                latitude: "41.147919",
                schedule: "09 às 18",
                price: "20€",
                // comments: ,
                // likes: ,
                morada: "Praça D.ª Filipa de Lencastre, 22, Sala 55, 4050-259 Porto",
                views: "4"
            },
        ];

        if (!localStorage.labs) {
            localStorage.setItem('labs', JSON.stringify(labs));
        }
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